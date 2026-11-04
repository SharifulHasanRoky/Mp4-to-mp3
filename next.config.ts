import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow long-running API routes (kept for backwards-compat with old
  // POST endpoint — the actual conversion is now client-side).
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  // Allow next/image to optimize our local logo + any remote images
  // the user might paste via URL (Google Drive thumbnails, etc.)
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

