import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Portfolio images are pre-sized static screenshots, so Vercel's on-the-fly
  // image optimization adds no real benefit and consumes Blob/optimization
  // quota on every redeploy. Serve them directly instead.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
