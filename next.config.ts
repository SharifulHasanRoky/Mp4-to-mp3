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
  httpAgentOptions: {
    keepAlive: true,
  },
  // Required headers for FFmpeg.wasm — without these, SharedArrayBuffer
  // is not available and the WASM version falls back to single-threaded
  // mode which can be 5-10x slower. With these headers, multi-threaded
  // WASM works and extraction is fast.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
