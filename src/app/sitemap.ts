import type { MetadataRoute } from "next";
import { TOOL_PAGES } from "@/lib/tool-pages";

const baseUrl = "https://reelaudiosudio.example.com";

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
