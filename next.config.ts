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
};

export default nextConfig;

