import type { MetadataRoute } from "next";
import { TOOL_PAGES } from "@/lib/tool-pages";

const baseUrl = "https://www.mp4tomp3.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Tool / converter pages
  const toolRoutes: MetadataRoute.Sitemap = TOOL_PAGES.map((p) => ({
    url: `${baseUrl}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.path === "/" ? "weekly" : "monthly",
    priority: p.path === "/" ? 1.0 : p.nav === "primary" ? 0.9 : 0.8,
  }));

  // All SEO content + policy pages (batches 1-30)
  const contentRoutes = [
    "/how-to-use", "/how-to-convert-mp4-to-mp3", "/mp4-vs-mp3", "/faq",
    "/mp4-to-mp3-converter-online-free", "/best-mp4-to-mp3-converter", "/mp4-to-mp3-online",
    "/change-video-to-audio", "/video-into-audio", "/mp4-mp3",
    "/video-to-audio-converter-online", "/video-to-audio-converter-for-pc", "/mp4-to-mp3-software",
    "/video-into-audio-file", "/video-to-audio-file-converter", "/video-to-audio-converter-online-free",
    "/convert-mov-to-mp3", "/convert-wav-to-mp4", "/change-video-to-mp3", "/mp4-to-wav-converter",
    "/get-audio-from-video", "/extracting-audio-from-video", "/extract-audio-from-mp4",
    "/mp4-to-mp3-320kbps", "/mp4-to-mp3-192kbps", "/mp4-to-mp3-128kbps",
    "/mp4-to-mp3-without-quality-loss", "/mp4-to-mp3-vbr-vs-cbr", "/mp4-to-mp3-sample-rate",
    "/mp4-to-mp3-no-audio", "/mp4-to-mp3-conversion-failed", "/mp4-to-mp3-file-too-large",
    "/mp4-to-mp3-slow-conversion", "/mp4-to-mp3-audio-out-of-sync", "/mp4-to-mp3-no-video-just-audio",
    "/online-vs-offline-mp4-to-mp3", "/free-vs-paid-mp4-to-mp3", "/browser-vs-app-mp4-to-mp3",
    "/mp4-to-mp3-vs-audacity", "/mp4-to-mp3-vs-vlc", "/mp4-to-mp3-vs-handbrake",
    "/is-mp4-to-mp3-conversion-legal", "/mp4-to-mp3-fair-use", "/mp4-to-mp3-personal-use",
    "/mp4-to-mp3-private", "/mp4-to-mp3-no-upload", "/mp4-to-mp3-gdpr",
    "/mp4-to-mp3-high-quality", "/mp4-to-mp3-best-quality", "/mp4-to-mp3-hd-audio",
    "/mp4-to-mp3-no-software", "/mp4-to-mp3-no-signup", "/mp4-to-mp3-no-watermark",
    "/mp4-to-mp3-batch", "/mp4-to-mp3-multiple-files", "/mp4-to-mp3-quickly",
    "/mp4-to-mp3-from-google-drive", "/mp4-to-mp3-from-dropbox", "/mp4-to-mp3-from-url",
    "/mp4-to-mp3-large-file", "/mp4-to-mp3-long-video", "/mp4-to-mp3-short-clip",
    "/what-is-mp4", "/what-is-mp3", "/what-is-ffmpeg",
    "/audio-codecs-explained", "/video-codecs-explained", "/container-formats-explained",
    "/lossy-vs-lossless", "/audio-compression-explained", "/bitrate-explained",
    "/extract-music-from-mp4", "/extract-voice-from-mp4", "/extract-background-music-from-mp4",
    "/mp4-to-mp3-for-car-stereo", "/mp4-to-mp3-for-phone", "/mp4-to-mp3-for-mp3-player",
    "/mp4-to-mp3-for-transcription", "/mp4-to-mp3-for-video-editing", "/mp4-to-mp3-for-language-learning",
    "/mp4-to-mp3-normalize-volume", "/mp4-to-mp3-trim-audio", "/mp4-to-mp3-metadata",
    "/mp4-to-mp3-stereo-vs-mono", "/mp4-to-mp3-id3-tags", "/mp4-to-mp3-album-art",
    "/best-mp4-to-mp3-converter-2026", "/mp4-to-mp3-no-install", "/mp4-to-mp3-in-browser",
    "/mp4-to-mp3-alternatives", "/mp4-to-mp3-common-questions", "/mp4-to-mp3-complete-guide",
    "/about", "/contact", "/privacy", "/terms", "/copyright",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...toolRoutes, ...contentRoutes];
}
