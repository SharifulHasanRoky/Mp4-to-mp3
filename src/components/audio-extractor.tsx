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
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { track } from "@/lib/analytics";
import {
  detectUnsupportedPlatform,
  normalizeCloudStorageUrl,
  detectCloudProvider,
  type NormalizedUrl,
} from "@/lib/cloud-storage";

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
// Maximum file size: 500 MB.
// Since all processing happens client-side (in the browser via FFmpeg.wasm),
// there's no server upload limit. The only constraint is browser memory
// and how long the user is willing to wait. 500 MB is a reasonable cap that
// covers almost all personal videos while keeping conversion times under
// ~5 minutes for typical home internet connections.
const MAX_SIZE = 500 * 1024 * 1024; // 500 MB

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
    const { toBlobURL } = await import("@ffmpeg/util");

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

    // Load the single-threaded WASM core.
    // IMPORTANT: We deliberately use the single-threaded core (not @ffmpeg/core-mt)
    // because the multi-threaded version requires SharedArrayBuffer, which in turn
    // requires Cross-Origin-Embedder-Policy headers — and those headers break
    // third-party scripts like Google AdSense, Google Analytics, Facebook Pixel,
    // and most embeds. Single-threaded is ~3x slower but works everywhere with
    // no special configuration, and AdSense still loads normally.
    const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd";

    // 30 second timeout for loading the WASM core. The file is ~30MB so on a
    // slow connection this can take a while, but if it's not loaded in 30s
    // something is probably wrong (network blocked, CDN down, etc).
    const loadTimeout = new Promise<never>((_, reject) => {
      setTimeout(
        () =>
          reject(
            new Error(
              "FFmpeg engine took too long to load (>30s). Check your internet connection and try again. If the problem persists, the CDN may be blocked in your region."
            )
          ),
        30_000
      );
    });

    await Promise.race([
      ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      }),
      loadTimeout,
    ]);

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
  page = "/",
}: {
  id?: string;
  uploadTitle?: string;
  uploadHint?: string;
  primaryButtonLabel?: string;
  outputFormat?: "mp3" | "wav" | "mp4";
  /** Current page path, used for analytics attribution (no PII). */
  page?: string;
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
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");

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
    setUrlError("");
    if (mode === "url") {
      // Keep the URL input so the user can tweak and retry
    } else {
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [mode]);

  /**
   * Validate a URL string. Returns the parsed URL object or null.
   * Accepts http(s) URLs pointing to a video/audio file.
   */
  const validateUrl = (input: string): URL | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      return null;
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed;
  };


  /**
   * Try to fetch a remote URL through several CORS-friendly strategies.
   * Browser CORS rules block client-side fetch() from cross-origin URLs
   * that don't send Access-Control-Allow-Origin. We try, in order:
   *
   *   1. Direct fetch (works for CORS-enabled sources: GitHub raw, AWS S3
   *      with CORS, archive.org, etc.)
   *   2. OUR OWN proxy at /api/proxy (most reliable — runs on Vercel,
   *      no rate limit, no API key, handles Google Drive + Dropbox)
   *   3. allorigins.win (public CORS proxy fallback)
   *   4. corsproxy.io (public CORS proxy fallback)
   *
   * Returns the fetched Blob, or throws on failure with a clear message.
   */
  async function fetchUrlWithCorsFallback(url: string): Promise<Blob> {
    const strategies: Array<{ name: string; url: string }> = [
      { name: "direct", url },
      // Our own proxy — FIRST fallback. Server-side fetch has no CORS
      // restrictions, so this works for Google Drive, Dropbox, and any
      // other URL the user might paste.
      {
        name: "own-proxy",
        url: `/api/proxy?url=${encodeURIComponent(url)}`,
      },
      // Public proxies as last-resort fallbacks
      { name: "allorigins", url: `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` },
      { name: "corsproxy.io", url: `https://corsproxy.io/?url=${encodeURIComponent(url)}` },
    ];

    let lastError: Error | null = null;
    for (const strategy of strategies) {
      try {
        const res = await fetch(strategy.url, {
          method: "GET",
          redirect: "follow",
        });

        if (!res.ok) {
          // Try to extract a JSON error message from our own proxy
          let detail = "";
          if (strategy.name === "own-proxy") {
            try {
              const errBody = await res.json();
              detail = errBody?.error ? `: ${errBody.error}` : "";
            } catch {
              // not JSON, ignore
            }
          }
          lastError = new Error(
            `${strategy.name} returned HTTP ${res.status}${detail}`
          );
          continue;
        }

        const blob = await res.blob();
        if (blob.size === 0) {
          lastError = new Error(`${strategy.name} returned empty response`);
          continue;
        }
        // Sanity check: a video/audio file should be at least 1 KB
        if (blob.size < 1024) {
          lastError = new Error(
            `${strategy.name} returned suspiciously small response (${blob.size} bytes)`
          );
          continue;
        }
        return blob;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        continue;
      }
    }
    throw new Error(
      `Could not fetch the URL. The host may block cross-origin requests, or the URL may be invalid. Last error: ${
        lastError?.message || "unknown"
      }. Try downloading the file and uploading it instead.`
    );
  }

  const handleFile = useCallback((f: File) => {
    if (f.size > MAX_SIZE) {
      setStatus("error");
      setErrorMsg(`File too large (${formatBytes(f.size)}). Max 500 MB.`);
      toast({
        title: "File too large",
        description: "Please upload a file under 500 MB.",
        variant: "destructive",
      });
      track.conversionError(outputFormat, "upload", "file_too_large", page);
      return;
    }
    setFile(f);
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    // Track successful file selection (no PII, just size bucket + source)
    track.fileUploadSuccess(f.size, page);
  }, [outputFormat, id]);

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
    if (mode === "upload" && !file) return;
    let effectiveUrl: string | null = null;
    let cloudProvider: string | null = null;

    if (mode === "url") {
      // Validate URL first
      const parsed = validateUrl(urlInput);
      if (!parsed) {
        setUrlError("Please enter a valid http(s) URL pointing to a video or audio file.");
        return;
      }
      // Check for known streaming/social platforms that can't be converted
      const platformError = detectUnsupportedPlatform(parsed.href);
      if (platformError) {
        setUrlError(platformError);
        toast({
          title: "Unsupported URL",
          description: platformError,
          variant: "destructive",
        });
        track.conversionError(outputFormat, "url", "unsupported_platform", page);
        return;
      }

      // Try all cloud storage normalizers in order (Google Drive,
      // Dropbox, OneDrive, MediaFire, Mega, Box, pCloud, WeTransfer,
      // TeraBox, Send.cm, GoFile, AnonFiles, Catbox).
      // Each returns {url}, {error}, or null.
      const cloudResult: NormalizedUrl = normalizeCloudStorageUrl(parsed.href);
      if (cloudResult && "error" in cloudResult) {
        // Invalid URL for a known cloud provider (e.g. Dropbox preview URL)
        setUrlError(cloudResult.error);
        toast({
          title: "URL issue",
          description:
            cloudResult.error.length > 200
              ? cloudResult.error.substring(0, 200) + "..."
              : cloudResult.error,
          variant: "destructive",
        });
        track.conversionError(outputFormat, "url", "invalid_cloud_url", page);
        return;
      }
      if (cloudResult && "url" in cloudResult) {
        effectiveUrl = cloudResult.url;
        // Detect provider name for the "Fetching from X..." progress label
        cloudProvider = detectCloudProvider(parsed.href);
      } else {
        // No cloud provider matched — try the URL as-is via the proxy.
        effectiveUrl = parsed.href;
      }
      setUrlError("");
    }

    setStatus("loading");
    setProgress(5);
    setProgressLabel("Loading FFmpeg engine (one-time, ~30MB)...");

    // Track conversion start
    track.conversionStart(outputFormat, mode, page);
    if (mode === "url") track.urlPasteStart(page);
    else if (file) track.fileUploadStart(page);

    try {
      // Pre-load FFmpeg (shows progress in UI)
      const ffmpeg = await loadFFmpeg();

      // Determine source: uploaded file OR fetched blob from URL
      let sourceBlob: Blob;
      let sourceName: string;

      if (mode === "url" && effectiveUrl) {
        setProgress(20);
        setStatus("uploading");
        setProgressLabel(
          cloudProvider
            ? `Fetching file from ${cloudProvider}...`
            : "Fetching file from URL..."
        );
        const fetchedBlob = await fetchUrlWithCorsFallback(effectiveUrl);

        // Enforce 500 MB size limit
        if (fetchedBlob.size > MAX_SIZE) {
          throw new Error(
            `Fetched file is too large (${formatBytes(
              fetchedBlob.size
            )}). Max 500 MB.`
          );
        }

        // Track successful URL fetch (size bucket only, no URL itself)
        track.urlPasteSuccess(fetchedBlob.size, page);

        sourceBlob = fetchedBlob;
        // Try to extract filename from the (effective, possibly normalized)
        // URL path, else fallback. For Google Drive, the path won't contain
        // a real filename, so we use a generic name.
        let urlPath = "";
        try {
          urlPath = new URL(effectiveUrl).pathname;
        } catch {
          urlPath = "";
        }
        const lastSegment = urlPath.split("/").filter(Boolean).pop() || "";
        sourceName = lastSegment.includes(".")
          ? lastSegment
          : cloudProvider
          ? `${cloudProvider.toLowerCase().replace(/[^a-z0-9]/g, "-")}-file.${
              outputFormat === "mp4" ? "mp4" : "mp3"
            }`
          : `input-from-url.${outputFormat === "mp4" ? "mp4" : "mp3"}`;
      } else {
        sourceBlob = file!;
        sourceName = file!.name;
      }

      setProgress(45);
      setProgressLabel("Reading file data...");

      // Read source into Uint8Array
      const sourceArray = new Uint8Array(await sourceBlob.arrayBuffer());

      // Generate unique filenames inside FFmpeg's virtual FS
      const inputExt = sourceName.split(".").pop()?.toLowerCase() || "mp4";
      const inputName = `input.${inputExt}`;
      const outputName = `output.${outputFormat}`;

      setProgress(55);
      setProgressLabel("Writing file to FFmpeg virtual FS...");
      await ffmpeg.writeFile(inputName, sourceArray);

      // Get audio duration (used for MP4 video track length)
      setProgress(58);
      setProgressLabel("Analyzing audio...");
      // For URL mode, getAudioDuration needs a File (uses HTMLMediaElement
      // with createObjectURL). Convert blob → File for that purpose.
      const durationFile = new File([sourceBlob], sourceName, {
        type: sourceBlob.type || "video/mp4",
      });
      const duration = await getAudioDuration(durationFile);

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

      const baseName = sourceName.replace(/\.[^.]+$/, "") || "audio";
      const filename = `${baseName}.${outputFormat}`;

      setResult({
        url,
        filename,
        sizeBytes: outputArray.byteLength,
        durationSec: duration,
      });

      setProgress(100);
      setStatus("ready");

      // Track successful conversion
      track.conversionSuccess(outputFormat, mode, page);

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
      // Track conversion error (categorize for analytics without PII)
      const errorType = message.includes("fetch")
        ? "fetch_failed"
        : message.includes("ffmpeg")
        ? "ffmpeg_error"
        : message.includes("timeout") || message.includes("took too long")
        ? "timeout"
        : message.includes("size") || message.includes("large")
        ? "file_too_large"
        : "unknown";
      track.conversionError(outputFormat, mode, errorType, page);
      toast({
        title: "Conversion failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const download = () => {
    if (!result) return;
    // Track the download event before triggering it
    track.download(outputFormat, page);
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
        {/* Mode toggle: Upload | From URL */}
        {!file && status !== "ready" && (
          <div className="mb-4 flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-secondary/40 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("upload");
                  setUrlError("");
                  reset();
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  mode === "upload"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Upload className="h-3.5 w-3.5" /> Upload
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("url");
                  setFile(null);
                  setResult(null);
                  setErrorMsg("");
                  setStatus("idle");
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  mode === "url"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" /> From URL
              </button>
            </div>
          </div>
        )}

        {/* Upload mode (drag-and-drop) */}
        {!file && status !== "ready" && mode === "upload" && (
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
              Max 500 MB. Files are processed entirely in your browser — they
              never leave your device.
            </p>
          </div>
        )}

        {/* URL mode (paste link) */}
        {!file && status !== "ready" && mode === "url" && (
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-dashed border-border bg-secondary/30 p-6 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LinkIcon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-semibold sm:text-lg">
                Paste a video URL
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Direct link to a video or audio file (MP4, MOV, WebM, MKV,
                MP3, WAV, etc.)
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (urlError) setUrlError("");
                  }}
                  placeholder="https://example.com/video.mp4"
                  className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      startConversion();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={startConversion}
                  disabled={!urlInput.trim()}
                  className="rounded-full sm:flex-shrink-0"
                  size="lg"
                >
                  <FileAudio className="h-4 w-4" /> Convert
                </Button>
              </div>
              {urlError && (
                <p className="mt-2 text-xs text-destructive">{urlError}</p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                Max 500 MB. Only use URLs pointing to files you own or have
                permission to use. We try multiple CORS proxies automatically
                if the source blocks cross-origin requests.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                <strong>Works with:</strong> Direct file links ending in{" "}
                <code>.mp4</code>, <code>.mov</code>, <code>.webm</code>,{" "}
                <code>.mkv</code>, <code>.mp3</code>, <code>.wav</code> (e.g.
                from your own website, archive.org, GitHub raw, AWS S3 with
                CORS).
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                <strong>Cloud storage supported:</strong>{" "}
                Google Drive, Dropbox, OneDrive, MediaFire, Box, pCloud,
                WeTransfer, TeraBox, Send.cm, GoFile, AnonFiles, Catbox,
                Mega, GitHub raw, archive.org, AWS S3. Use the share link
                for each — right-click the file and choose &quot;Copy link.&quot;
              </p>
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                <strong>Tip:</strong> Don&apos;t paste URLs from your
                browser&apos;s address bar (like Dropbox /preview/ links).
                Always use the &quot;Copy link&quot; / &quot;Share&quot;
                button — that gives a direct-download URL we can fetch.
              </p>
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                <strong>Does NOT work with:</strong> YouTube, TikTok, Instagram,
                Facebook, Twitter, Spotify, Netflix, SoundCloud, Vimeo — these
                serve HTML pages, not video files, and downloading from them
                violates copyright law.
              </p>
            </div>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Button disabled size="lg" className="w-full rounded-full">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {primaryButtonLabel}...
                  </Button>
                  <Button
                    onClick={() => {
                      // Force-reset back to idle. The underlying WASM call
                      // will continue in the background, but the user can
                      // start fresh with a new file.
                      setStatus("idle");
                      setProgress(0);
                      setProgressLabel("");
                    }}
                    variant="outline"
                    size="lg"
                    className="flex-shrink-0 rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
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
                    All processing happens in your browser. Your file never
                    leaves your device — fully private. Large files may take
                    a few minutes.
                  </p>
                </div>
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
                {mode === "url" ? "Convert another URL" : "Convert another file"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
