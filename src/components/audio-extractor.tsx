"use client";

import { useCallback, useRef, useState } from "react";
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

type Status = "idle" | "uploading" | "processing" | "ready" | "error";

interface ResultInfo {
  url: string;
  filename: string;
  sizeBytes: number;
  durationSec: number;
}

const ACCEPTED = ".mp4,.mov,.webm,.mkv,.avi,.m4v,.3gp,.flv,.mp3,.m4a,.aac,.wav,.ogg,.opus,.flac";
const MAX_SIZE = 100 * 1024 * 1024; // 100 MB

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
  /** Output format: mp3 (default), wav (lossless), mp4 (audio-to-video) */
  outputFormat?: "mp3" | "wav" | "mp4";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResultInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
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

  const startExtraction = async () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(5);

    try {
      // Simulated upload progress (caps at 50% — extraction phase comes after)
      const uploadInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 3, 50));
      }, 200);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("output", outputFormat);

      // Use AbortController with a generous 5-minute timeout. Large
      // videos can take 60-120 seconds to extract with FFmpeg.
      const controller = new AbortController();
      const timeoutMs = 5 * 60 * 1000;
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      let res: Response;
      try {
        res = await fetch("/api/extract-audio", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });
      } catch (fetchErr) {
        clearTimeout(timeout);
        clearInterval(uploadInterval);
        if (fetchErr instanceof Error && fetchErr.name === "AbortError") {
          throw new Error(
            "The extraction took too long and was cancelled. Please try a shorter or smaller video (under 100 MB)."
          );
        }
        throw new Error(
          "Network error during upload. Please check your internet connection and try again."
        );
      }

      clearTimeout(timeout);
      clearInterval(uploadInterval);
      setProgress(75);
      setStatus("processing");

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status}). Please try again.`);
      }

      // Stream-based response: the body itself is the converted file
      const blob = await res.blob();
      setProgress(95);

      const url = URL.createObjectURL(blob);
      const sizeBytes = Number(res.headers.get("X-Audio-Size") || blob.size);
      const durationSec = Number(res.headers.get("X-Audio-Duration") || 0);
      const origName = res.headers.get("X-Original-Name") || file.name;
      const baseName = origName.replace(/\.[^.]+$/, "") || "audio";
      const filename = `${baseName}.${outputFormat}`;

      setResult({ url, filename, sizeBytes, durationSec });
      setProgress(100);
      setStatus("ready");
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
      const message = err instanceof Error ? err.message : "Unknown error";
      setStatus("error");
      setErrorMsg(message);
      toast({
        title: "Extraction failed",
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
              Max 100 MB. Only upload videos you own or have permission to use.
            </p>
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

            {(status === "uploading" || status === "processing") && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {progress < 50
                      ? "Uploading video to server..."
                      : progress < 80
                      ? "Extracting audio with FFmpeg..."
                      : "Finalizing your MP3..."}
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-[11px] text-muted-foreground/80">
                  This usually takes 5–20 seconds for typical Reels. Larger
                  files may take up to a minute.
                </p>
              </div>
            )}

            {status === "idle" && (
              <Button
                onClick={startExtraction}
                size="lg"
                className="w-full rounded-full"
              >
                <FileAudio className="h-4 w-4" /> {primaryButtonLabel}
              </Button>
            )}

            {(status === "uploading" || status === "processing") && (
              <Button disabled size="lg" className="w-full rounded-full">
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
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
                <p className="text-base font-semibold">Audio ready!</p>
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
                Extract another file
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
