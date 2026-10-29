"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import {
  Upload,
  FileAudio,
  Loader2,
  Download,
  AlertCircle,
  X,
  Music,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

// Lazy-load FFmpeg WASM only on the client to avoid SSR issues.
// The dynamic import also reduces initial bundle size.
type FFmpegInstance = {
  writeFile: (path: string, data: Uint8Array) => Promise<boolean>;
  exec: (args: string[]) => Promise<number>;
  readFile: (path: string) => Promise<Uint8Array>;
  deleteFile: (path: string) => Promise<boolean>;
  loaded: boolean;
  on: (event: string, cb: (e: { progress?: number; time?: number }) => void) => void;
  off: (event: string, cb: (e: { progress?: number; time?: number }) => void) => void;
};

type FFmpegModule = {
  FFmpeg: new () => FFmpegInstance;
};

type Status = "idle" | "loading" | "uploading" | "processing" | "ready" | "error";

interface ResultInfo {
  url: string;
  filename: string;
  sizeBytes: number;
  durationSec: number;
}

const ACCEPTED =
  ".mp4,.mov,.webm,.mkv,.avi,.m4v,.3gp,.flv,.mp3,.m4a,.aac,.wav,.ogg,.opus,.flac";
const MAX_SIZE = 100 * 1024 * 1024; // 100 MB

// Cache the FFmpeg instance across uploads — the WASM core is ~30MB
// so we don't want to re-download/re-init it on every conversion.
let ffmpegInstance: FFmpegInstance | null = null;
let ffmpegLoadPromise: Promise<FFmpegInstance> | null = null;

async function loadFFmpeg(): Promise<FFmpegInstance> {
  if (ffmpegInstance && ffmpegInstance.loaded) return ffmpegInstance;
  if (ffmpegLoadPromise) return ffmpegLoadPromise;

  ffmpegLoadPromise = (async () => {
    // Dynamically import the FFmpeg WASM modules.
    const { FFmpeg } = (await import("@ffmpeg/ffmpeg")) as FFmpegModule;
    const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

    const ffmpeg = new FFmpeg();

    // Listen for progress events
    ffmpeg.on("progress", ({ progress }) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("ffmpeg-progress", {
            detail: { progress: Math.max(0, Math.min(1, progress)) },
          })
        );
      }
    });

    // Load the WASM core from a CDN that sends proper CORS headers.
    // jsDelivr sends `access-control-allow-origin: *` which unpkg doesn't.
    const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      // Multi-threaded worker (requires COOP/COEP headers — set in next.config.ts)
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  return ffmpegLoadPromise;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDuration(sec: number): string {
  if (!sec || !isFinite(sec)) return "—";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Get the audio duration of a File using the browser's built-in
 * HTMLAudioElement. This avoids needing ffprobe.
 */
function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(0);
      return;
    }
    // For audio files, use HTMLAudioElement directly.
    // For video files, use HTMLVideoElement.
    const isVideo = file.type.startsWith("video/");
    const media = document.createElement(isVideo ? "video" : "audio") as
      HTMLMediaElement;
    media.preload = "metadata";
    media.onloadedmetadata = () => {
      const d = media.duration;
      resolve(isFinite(d) ? d : 0);
      media.src = "";
    };
    media.onerror = () => resolve(0);
    media.src = URL.createObjectURL(file);
  });
}

export function AudioExtractor({
  id = "extractor",
  uploadTitle = "Drop your MP4 file here",
  uploadHint = "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
  primaryButtonLabel = "Convert to MP3",
  outputFormat = "mp3",
}: {
  id?: string;
  uploadTitle?: string;
  uploadHint?: string;
  primaryButtonLabel?: string;
  outputFormat?: "mp3" | "wav" | "mp4";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResultInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);

  // Check if browser supports SharedArrayBuffer (needed for multi-threaded
  // FFmpeg WASM). If not, we fall back to single-threaded (still works,
  // just slower).
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSAB =
        typeof SharedArrayBuffer !== "undefined" &&
        typeof Atomics !== "undefined";
      setSupported(hasSAB);
    }
  }, []);

  // Subscribe to FFmpeg progress events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.progress === "number") {
        // FFmpeg progress goes 0 → 1; map it to our 60-95% range
        const pct = Math.round(60 + detail.progress * 35);
        setProgress(pct);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("ffmpeg-progress", handler);
      return () => window.removeEventListener("ffmpeg-progress", handler);
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setProgressLabel("");
    setFile(null);
    setResult(null);
    setErrorMsg("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleFile = useCallback((f: File) => {
    if (f.size > MAX_SIZE) {
      setStatus("error");
      setErrorMsg(`File too large (${formatBytes(f.size)}). Max 100 MB.`);
      toast({
        title: "File too large",
        description: "Please upload a file under 100 MB.",
        variant: "destructive",
      });
      return;
    }
    setFile(f);
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const buildFFmpegArgs = (
    inputName: string,
    outputName: string,
    format: "mp3" | "wav" | "mp4",
    duration: number
  ): string[] => {
    const args: string[] = ["-i", inputName];

    if (format === "mp3") {
      // Extract audio, encode as MP3 (libmp3lame VBR ~190 kbps)
      args.push(
        "-vn",
        "-map",
        "a",
        "-acodec",
        "libmp3lame",
        "-q:a",
        "2"
      );
    } else if (format === "wav") {
      // Lossless PCM WAV (16-bit 44.1kHz stereo)
      args.push(
        "-vn",
        "-map",
        "a",
        "-acodec",
        "pcm_s16le",
        "-ar",
        "44100",
        "-ac",
        "2"
      );
    } else {
      // MP4 — generate a black background video with the audio track.
      // We use a color filter source matched to the audio duration.
      args.push(
        "-f",
        "lavfi",
        "-i",
        `color=c=black:s=320x240:r=10:d=${duration.toFixed(2)}`,
        "-map",
        "1:v",
        "-map",
        "0:a",
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-preset",
        "ultrafast",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-shortest",
        "-movflags",
        "+faststart"
      );
    }

    args.push(outputName);
    return args;
  };

  const startConversion = async () => {
    if (!file) return;
    setStatus("loading");
    setProgress(5);
    setProgressLabel("Loading FFmpeg engine (one-time, ~30MB)...");

    try {
      // Pre-load FFmpeg (shows progress in UI)
      const ffmpeg = await loadFFmpeg();

      setProgress(35);
      setStatus("uploading");
      setProgressLabel("Reading file...");

      // Read file into Uint8Array
      const { fetchFile } = await import("@ffmpeg/util");
      const fileData = await fetchFile(file);

      // Generate unique filenames inside FFmpeg's virtual FS
      const inputExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const inputName = `input.${inputExt}`;
      const outputName = `output.${outputFormat}`;

      setProgress(50);
      setProgressLabel("Writing file to FFmpeg virtual FS...");
      await ffmpeg.writeFile(inputName, fileData);

      // Get audio duration (used for MP4 video track length)
      setProgress(58);
      setProgressLabel("Analyzing audio...");
      const duration = await getAudioDuration(file);

      setProgress(60);
      setStatus("processing");
      setProgressLabel(`Converting to ${outputFormat.toUpperCase()}...`);

      // Build FFmpeg args based on output format
      const args = buildFFmpegArgs(inputName, outputName, outputFormat, duration || 30);
      await ffmpeg.exec(args);

      setProgress(95);
      setProgressLabel("Reading converted file...");

      // Read output
      const outputData = await ffmpeg.readFile(outputName);
      const outputArray =
        outputData instanceof Uint8Array
          ? outputData
          : new Uint8Array(outputData);

      const mime =
        outputFormat === "mp3"
          ? "audio/mpeg"
          : outputFormat === "wav"
          ? "audio/wav"
          : "video/mp4";

      const blob = new Blob([outputArray], { type: mime });
      const url = URL.createObjectURL(blob);

      const baseName = file.name.replace(/\.[^.]+$/, "") || "audio";
      const filename = `${baseName}.${outputFormat}`;

      setResult({
        url,
        filename,
        sizeBytes: outputArray.byteLength,
        durationSec: duration,
      });

      setProgress(100);
      setStatus("ready");

      // Cleanup FFmpeg virtual files
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      } catch {
        // ignore cleanup errors
      }

      const friendlyType =
        outputFormat === "mp3"
          ? "MP3 audio"
          : outputFormat === "wav"
          ? "WAV audio"
          : "MP4 video";
      toast({
        title: "Conversion complete",
        description: `Your ${friendlyType} file is ready to download.`,
      });
    } catch (err) {
      console.error("[AudioExtractor] Conversion failed:", err);
      const message =
        err instanceof Error ? err.message : "Conversion failed.";
      setStatus("error");
      setErrorMsg(
        message.includes("SharedArrayBuffer") ||
        message.includes("COOP") ||
        message.includes("COEP")
          ? "Your browser or hosting environment doesn't support multi-threaded FFmpeg. Conversion may be slower. Please try a smaller file."
          : `Conversion failed: ${message}`
      );
      toast({
        title: "Conversion failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id={id} className="scroll-mt-24">
      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        {!file && (
          <div
            ref={dragRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors sm:p-12 ${
              dragOver
                ? "border-primary bg-accent/40"
                : "border-border bg-secondary/30 hover:border-primary/60 hover:bg-secondary/50"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-semibold sm:text-lg">
              {uploadTitle}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {uploadHint}
            </p>
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-full"
              size="lg"
            >
              <Upload className="h-4 w-4" /> Choose File
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED}
              onChange={onInputChange}
              className="hidden"
            />
            <p className="mt-4 text-xs text-muted-foreground">
              Max 100 MB. Files are processed entirely in your browser — they
              never leave your device.
            </p>
            {supported === false && (
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                Your browser doesn&apos;t support multi-threaded WASM. Conversion
                will still work, but may be slower.
              </p>
            )}
          </div>
        )}

        {file && status !== "ready" && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Film className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)} · {file.type || "video"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="flex-shrink-0"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {(status === "loading" ||
              status === "uploading" ||
              status === "processing") && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {progressLabel || "Processing..."}
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-[11px] text-muted-foreground/80">
                  All processing happens in your browser. Your file never leaves
                  your device — fully private.
                </p>
              </div>
            )}

            {status === "idle" && (
              <Button
                onClick={startConversion}
                size="lg"
                className="w-full rounded-full"
              >
                <FileAudio className="h-4 w-4" /> {primaryButtonLabel}
              </Button>
            )}

            {status === "error" && (
              <div className="space-y-3">
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                <Button
                  onClick={reset}
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full"
                >
                  Try another file
                </Button>
              </div>
            )}
          </div>
        )}

        {status === "ready" && result && (
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Music className="h-8 w-8" />
              </div>
              <div>
                <p className="text-base font-semibold">Conversion complete!</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {result.filename} · {formatBytes(result.sizeBytes)}
                  {result.durationSec > 0 &&
                    ` · ${formatDuration(result.durationSec)}`}
                </p>
              </div>
              <Button
                onClick={download}
                size="lg"
                className="mt-1 w-full rounded-full sm:w-auto"
              >
                <Download className="h-4 w-4" /> Download {outputFormat.toUpperCase()}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={reset}
                variant="outline"
                className="w-full rounded-full"
              >
                Convert another file
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
