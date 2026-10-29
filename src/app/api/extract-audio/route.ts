import { NextResponse } from "next/server";

/**
 * This endpoint is kept for backwards-compatibility but is no longer used
 * for audio extraction. All conversion now happens client-side in the
 * browser using FFmpeg.wasm — this is more private (files never leave
 * the user's device) and works on any static host (Vercel, Netlify,
 * Cloudflare Pages, GitHub Pages) without needing a system FFmpeg binary.
 *
 * For implementation, see src/components/audio-extractor.tsx.
 */
export function GET() {
  return NextResponse.json({
    name: "MP4 to MP3 API",
    status: "ok",
    message:
      "Audio extraction is performed client-side in your browser using FFmpeg.wasm. There is no server-side endpoint to call.",
    documentation: "https://github.com/SharifulHasanRoky/reelaudio-studio-app",
  });
}

export function POST() {
  return NextResponse.json(
    {
      error:
        "Server-side extraction has been deprecated. All conversion now happens client-side in your browser using FFmpeg.wasm. Just use the upload tool on any page.",
    },
    { status: 410 }
  );
}
