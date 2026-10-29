# ReelAudio Studio

A free, private, SEO-optimized online **MP4 to MP3 converter** and video-to-audio tool. Built with Next.js 16 + Tailwind CSS 4 + FFmpeg backend. No sign-up, no watermark, no software install.

## Features

- **Working audio extractor** — upload any video file, get a clean MP3 (or WAV / MP4) in seconds
- **11 dedicated landing pages**, one per primary SEO keyword
- **FFmpeg-powered backend** — `libmp3lame` VBR ~190 kbps (MP3), `pcm_s16le` (WAV), H.264+AAC (MP4)
- **Privacy-first** — files deleted automatically after processing, nothing stored
- **Legal & AdSense-safe** — only processes user-uploaded files, no scraping
- **Mobile-first responsive** with sticky footer
- **Full SEO setup**: unique metadata, canonical URLs, JSON-LD schema, sitemap, robots.txt
- **Internal linking** — every page cross-links to related tools via a central registry

## Tool Pages (one per keyword)

| Path | Primary Keyword |
|------|----------------|
| `/` | mp4 to mp3, convert mp4 to mp3, best mp4 to mp3 converter |
| `/video-to-audio-converter` | video to audio converter |
| `/convert-video-to-audio` | convert video to audio file |
| `/extract-audio-from-video` | extract audio from video |
| `/video-to-mp3-converter` | video to mp3 converter |
| `/mp3-extractor` | mp3 extractor |
| `/mov-to-mp3` | mov to mp3 |
| `/mkv-to-mp3` | mkv to mp3 |
| `/mp4-to-wav` | mp4 to wav (lossless) |
| `/wav-to-mp4` | wav to mp4 (audio → video) |
| `/m4a-to-mp4` | m4a to mp4 (iPhone voice memos → video) |

Plus support pages: `/how-to-use`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/copyright`.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Media processing**: FFmpeg + ffprobe (system binary)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- FFmpeg installed and on PATH

```bash
# Verify FFmpeg is installed
ffmpeg -version
ffprobe -version
```

### Install & Run

```bash
# Install dependencies
bun install   # or: npm install

# Run dev server
bun run dev   # or: npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
bun run build
bun run start
```

## API

### `POST /api/extract-audio`

Accepts a `multipart/form-data` request with:

- `file` — the video or audio file (max 100 MB)
- `output` (optional) — `mp3` (default), `wav`, or `mp4`

Returns the converted file as a binary stream with these headers:

- `Content-Type`: `audio/mpeg` / `audio/wav` / `video/mp4`
- `Content-Disposition`: `attachment; filename="..."`
- `X-Audio-Size`: file size in bytes
- `X-Audio-Duration`: source duration in seconds
- `X-Original-Name`: URL-encoded original filename

**Example:**

```bash
curl -X POST http://localhost:3000/api/extract-audio \
  -F "file=@myvideo.mp4" \
  -F "output=mp3" \
  -o output.mp3
```

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Deploy — no env vars needed

> **Note**: FFmpeg is available on Vercel's Node.js runtime by default. For files over 4.5 MB on the free tier, you may need to upgrade to Pro for longer function timeouts.

## Legal & Copyright

This tool only processes files users upload themselves. It does **not** scrape, fetch, or download content from Instagram, TikTok, YouTube, Facebook, or any other platform. Users must only upload videos they own or have explicit permission to use. See [`/terms`](./src/app/terms/page.tsx) and [`/copyright`](./src/app/copyright/page.tsx) for the full DMCA / copyright policy.

## License

MIT — see [LICENSE](./LICENSE) (or use the project freely for personal or commercial purposes).

## Project Structure

```
src/
├── app/
│   ├── api/extract-audio/route.ts   # FFmpeg-powered backend
│   ├── page.tsx                     # Homepage (MP4 to MP3)
│   ├── sitemap.ts                   # Dynamic sitemap from TOOL_PAGES registry
│   ├── robots.ts
│   ├── {tool-page}/page.tsx         # 10 dedicated landing pages
│   ├── how-to-use/page.tsx
│   ├── faq/page.tsx
│   ├── about/, contact/
│   └── privacy/, terms/, copyright/
├── components/
│   ├── audio-extractor.tsx          # The drag-drop upload + convert UI
│   ├── landing-page.tsx              # Shared landing page layout
│   ├── all-tools-grid.tsx            # Cross-link grid (auto-generated)
│   ├── site-header.tsx               # Nav with "All Tools" mega-menu
│   ├── site-footer.tsx               # 5-column organized footer
│   ├── faq.tsx, json-ld.tsx, page-shell.tsx
└── lib/
    └── tool-pages.ts                 # CENTRAL registry of all tool pages
```

The `src/lib/tool-pages.ts` file is the single source of truth — add a new page entry there and it shows up in the nav, footer, sitemap, and "related tools" grids everywhere automatically.
