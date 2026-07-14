import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR when opening the local Network URL from another device on LAN.
  allowedDevOrigins: ["192.168.8.192"],
  // Portfolio images are pre-sized static screenshots, so Vercel's on-the-fly
  // image optimization adds no real benefit and consumes Blob/optimization
  // quota on every redeploy. Serve them directly instead.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
