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

  // Resource + policy pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/how-to-use", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/how-to-convert-mp4-to-mp3", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/mp4-vs-mp3", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-converter-online-free", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/best-mp4-to-mp3-converter", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-online", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/change-video-to-audio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/video-into-audio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-mp3", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/video-to-audio-converter-online", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/video-to-audio-converter-for-pc", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-software", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/video-into-audio-file", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/video-to-audio-file-converter", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/video-to-audio-converter-online-free", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/convert-mov-to-mp3", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/convert-wav-to-mp4", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/change-video-to-mp3", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-wav-converter", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/get-audio-from-video", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/extracting-audio-from-video", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/extract-audio-from-mp4", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-320kbps", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-192kbps", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-128kbps", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-without-quality-loss", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-vbr-vs-cbr", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-sample-rate", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-no-audio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-conversion-failed", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/mp4-to-mp3-file-too-large", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/copyright", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...toolRoutes, ...staticRoutes];
}
