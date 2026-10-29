import { NextRequest, NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { createWriteStream, createReadStream, mkdir, unlink, stat, writeFile, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { createReadStream as fsCreateReadStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Generous timeout — Vercel Pro allows 300s, dev server honors this
export const maxDuration = 300;

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB
// FFmpeg itself must finish within this many ms (90s)
const FFMPEG_TIMEOUT_MS = 90_000;
// ffprobe must finish within this many ms
const FFPROBE_TIMEOUT_MS = 10_000;

function isAllowedMime(mime: string): boolean {
  if (!mime) return false;
  const lower = mime.toLowerCase();
  if (lower.startsWith("video/")) return true;
  if (lower.startsWith("audio/")) return true;
  return ["application/octet-stream", "application/x-matroska"].includes(lower);
}

interface ProbeResult {
  duration: number;
  hasAudio: boolean;
}

/**
 * Run ffprobe synchronously with a timeout. Returns null if the file
 * cannot be probed (e.g. corrupted).
 */
function probeMedia(filePath: string): Promise<ProbeResult | null> {
  return new Promise((resolve) => {
    const proc = spawn(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration:stream=codec_type",
        "-of",
        "json",
        filePath,
      ],
      { stdio: ["ignore", "pipe", "pipe"] }
    );

    let stdout = "";
    let timer: NodeJS.Timeout | null = null;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      proc.removeAllListeners();
      try { proc.kill("SIGKILL"); } catch { /* ignore */ }
    };

    timer = setTimeout(() => {
      cleanup();
      resolve(null);
    }, FFPROBE_TIMEOUT_MS);

    proc.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    proc.on("error", () => {
      cleanup();
      resolve(null);
    });

    proc.on("close", (code) => {
      if (timer) clearTimeout(timer);
      if (code !== 0) {
        resolve(null);
        return;
      }
      try {
        const data = JSON.parse(stdout);
        const duration = Number(data?.format?.duration || 0);
        const streams: Array<{ codec_type?: string }> = data?.streams || [];
        const hasAudio = streams.some((s) => s.codec_type === "audio");
        resolve({ duration, hasAudio });
      } catch {
        resolve(null);
      }
    });
  });
}

type OutputFormat = "mp3" | "wav" | "mp4";

/**
 * Run ffmpeg. Output format determines which FFmpeg command to run:
 *  - mp3 (default): extract audio, re-encode to MP3 (libmp3lame VBR q=2)
 *  - wav: extract audio, decode to lossless PCM WAV (16-bit 44.1kHz stereo)
 *  - mp4: take audio input, wrap it in an MP4 video container with a static
 *         black image as the video track (1920x1080) and AAC audio
 */
function runFfmpeg(
  inputPath: string,
  outputPath: string,
  format: OutputFormat
): Promise<{ ok: boolean; error?: string; timedOut?: boolean }> {
  let args: string[];
  if (format === "mp3") {
    args = [
      "-y",
      "-i",
      inputPath,
      "-vn",
      "-map",
      "a",
      "-acodec",
      "libmp3lame",
      "-q:a",
      "2",
      outputPath,
    ];
  } else if (format === "wav") {
    args = [
      "-y",
      "-i",
      inputPath,
      "-vn",
      "-map",
      "a",
      "-acodec",
      "pcm_s16le",
      "-ar",
      "44100",
      "-ac",
      "2",
      outputPath,
    ];
  } else {
    // mp4 — generate a black background video (10fps, 1920x1080) with the
    // audio re-encoded as AAC. The video track is just a single black image
    // looped to match the audio duration.
    args = [
      "-y",
      "-i",
      inputPath,
      "-f",
      "lavfi",
      "-i",
      "color=c=black:s=1920x1080:r=10",
      "-shortest",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-movflags",
      "+faststart",
      outputPath,
    ];
  }

  return new Promise((resolve) => {
    const proc = spawn("ffmpeg", args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stderr = "";
    let timer: NodeJS.Timeout | null = null;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      proc.removeAllListeners();
      try { proc.kill("SIGKILL"); } catch { /* ignore */ }
    };

    timer = setTimeout(() => {
      cleanup();
      resolve({ ok: false, timedOut: true, error: "FFmpeg timed out after 90 seconds. Try a shorter or smaller file." });
    }, FFMPEG_TIMEOUT_MS);

    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 10_000) stderr = stderr.slice(-10_000);
    });

    proc.on("error", (err) => {
      cleanup();
      resolve({ ok: false, error: `Failed to launch FFmpeg: ${err.message}` });
    });

    proc.on("close", (code) => {
      if (timer) clearTimeout(timer);
      if (code === 0) {
        resolve({ ok: true });
      } else {
        const lastLines = stderr.split("\n").filter(Boolean).slice(-3).join(" ");
        resolve({
          ok: false,
          error: `FFmpeg exited with code ${code}. ${lastLines || "Unknown ffmpeg error."}`.trim(),
        });
      }
    });
  });
}

async function cleanupFile(filePath: string) {
  try {
    if (existsSync(filePath)) await unlink(filePath);
  } catch {
    // ignore
  }
}

export async function POST(req: NextRequest) {
  const tmpDir = path.join(tmpdir(), "reelaudio-uploads");
  try {
    await mkdir(tmpDir, { recursive: true });
  } catch {
    // dir may already exist
  }

  let inputPath = "";
  let outputPath = "";

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided. Please upload a video file." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          error: `File too large (${(file.size / 1024 / 1024).toFixed(
            1
          )} MB). Maximum allowed size is 100 MB.`,
        },
        { status: 413 }
      );
    }

    if (!isAllowedMime(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload a video file (MP4, MOV, WebM, MKV, AVI) or audio file (MP3, WAV, M4A, AAC, OGG).",
        },
        { status: 415 }
      );
    }

    // Parse output format from form data (default: mp3)
    const requestedFormat = (formData.get("output") as string | null) || "mp3";
    const outputFormat: OutputFormat = (
      ["mp3", "wav", "mp4"].includes(requestedFormat.toLowerCase())
        ? requestedFormat.toLowerCase()
        : "mp3"
    ) as OutputFormat;

    // Sanitize file name
    const safeBaseName = path
      .basename(file.name || "input")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 80);
    const id = randomUUID();
    inputPath = path.join(tmpDir, `${id}-in-${safeBaseName}`);
    outputPath = path.join(tmpDir, `${id}-out.${outputFormat}`);

    // Stream the file to disk (avoid loading entire file in memory)
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(arrayBuffer));

    // Probe to verify it has an audio stream
    const probe = await probeMedia(inputPath);
    if (!probe) {
      return NextResponse.json(
        {
          error:
            "Could not read the file. It may be corrupted or in an unsupported format. Please try a different video file (MP4, MOV, or WebM recommended).",
        },
        { status: 422 }
      );
    }
    if (!probe.hasAudio) {
      return NextResponse.json(
        {
          error:
            "No audio track was found in this file. Please upload a video or audio file that contains audio.",
        },
        { status: 422 }
      );
    }

    // Run FFmpeg with a hard timeout
    const result = await runFfmpeg(inputPath, outputPath, outputFormat);
    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.error || "Conversion failed. Please try a different file.",
        },
        { status: 502 }
      );
    }

    // Verify output exists and is non-empty
    if (!existsSync(outputPath)) {
      return NextResponse.json(
        { error: "FFmpeg did not produce an output file. Please try a different video." },
        { status: 502 }
      );
    }

    const outputStat = await stat(outputPath);
    if (outputStat.size === 0) {
      return NextResponse.json(
        { error: "The extracted audio file is empty. The source video may not have a valid audio track." },
        { status: 422 }
      );
    }

    // Stream the file back instead of buffering the whole thing in memory
    const friendlyBase = safeBaseName.replace(/\.[^.]+$/, "") || "audio";
    const downloadName = `${friendlyBase}.${outputFormat}`;
    const contentType =
      outputFormat === "mp3"
        ? "audio/mpeg"
        : outputFormat === "wav"
        ? "audio/wav"
        : "video/mp4";

    const readStream = fsCreateReadStream(outputPath);
    const stream = new ReadableStream({
      start(controller) {
        readStream.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk)));
        readStream.on("end", () => {
          controller.close();
          // Best-effort cleanup after the stream is fully consumed
          cleanupFile(outputPath).catch(() => {});
        });
        readStream.on("error", (err) => {
          controller.error(err);
          cleanupFile(outputPath).catch(() => {});
        });
      },
      cancel() {
        readStream.destroy();
        cleanupFile(outputPath).catch(() => {});
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(outputStat.size),
        "Content-Disposition": `attachment; filename="${downloadName.replace(
          /"/g,
          ""
        )}"`,
        "X-Audio-Size": String(outputStat.size),
        "X-Audio-Duration": String(probe.duration || 0),
        "X-Original-Name": encodeURIComponent(file.name || downloadName),
        "X-Output-Format": outputFormat,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[extract-audio] Error:", err);
    const message =
      err instanceof Error ? err.message : "Audio extraction failed.";
    return NextResponse.json(
      {
        error: `Could not extract audio: ${message}. Please verify the file is a valid video.`,
      },
      { status: 500 }
    );
  } finally {
    // Always clean up the input file (the output is cleaned up after streaming)
    if (inputPath) await cleanupFile(inputPath);
  }
}
