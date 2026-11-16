#!/bin/bash
set -e
cd /home/z/my-project

# Get all page slugs (excluding root page)
SLUGS=$(find src/app -name "page.tsx" -not -path "src/app/page.tsx" | sed 's|src/app||;s|/page.tsx||' | sort)

echo "=== Total pages: $(echo "$SLUGS" | wc -l) ==="

# Update tracking file - batch 30 complete
cat > scripts/seo-batch-state.json << 'EOF'
{
  "lastBatchCompleted": 30,
  "nextBatch": 31,
  "totalBatches": 30,
  "pagesPerBatch": 3,
  "completedPages": "all 90 SEO content pages + 18 tool/policy pages",
  "createdAt": "2026-11-04",
  "lastRunAt": "2026-11-16",
  "status": "fully_complete"
}
EOF
echo "✓ Tracking file updated (batch 30 complete)"

# Build sitemap.ts with all pages
cat > src/app/sitemap.ts << 'SITEMAPEOF'
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
SITEMAPEOF
echo "✓ Sitemap updated with all pages"

# Build llms.txt Links section
python3 << 'PYEOF'
import os
pages = []
for root, dirs, files in os.walk("src/app"):
    if "page.tsx" in files:
        rel = os.path.relpath(os.path.join(root, "page.tsx"), "src/app")
        if rel == "page.tsx":
            slug = "/"
            label = "Homepage / MP4 to MP3 converter"
        else:
            slug = "/" + rel.replace("/page.tsx", "")
            # Convert slug to label
            label = slug.strip("/").replace("-", " ").replace("/", " ").title()
        pages.append((slug, label))
pages.sort(key=lambda x: (x[0] != "/", x[0]))

# Read existing llms.txt up to "## Links"
with open("public/llms.txt", "r") as f:
    content = f.read()
before_links = content.split("## Links")[0]

# Build new links section
links = ["## Links", ""]
for slug, label in pages:
    links.append(f"- {label}: https://www.mp4tomp3.online{slug}")

# Find everything after the original Links section's Technology/Contact
after_parts = content.split("## Technology")
if len(after_parts) > 1:
    after = "## Technology" + after_parts[1]
else:
    after = ""

with open("public/llms.txt", "w") as f:
    f.write(before_links + "\n".join(links) + "\n\n" + after)
print(f"✓ llms.txt updated with {len(pages)} URLs")
PYEOF

echo ""
echo "=== Final lint check ==="
bun run lint 2>&1 | tail -3
