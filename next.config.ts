import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow long-running API routes (audio extraction with FFmpeg can take
  // 30-90 seconds for large videos).
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  // Increase the dev server response timeout so big-file extractions don't
  // get killed mid-flight
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
