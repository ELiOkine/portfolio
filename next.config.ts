import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const packageVersion = JSON.parse(
  readFileSync(join(process.cwd(), "package.json"), "utf8"),
).version as string;

const appVersion =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_APP_VERSION ??
  `${packageVersion}-${Date.now()}`;

const nextConfig: NextConfig = {
  // Allow HMR when opening the local Network URL from another device on LAN.
  allowedDevOrigins: ["192.168.8.192"],
  // Portfolio images are pre-sized static screenshots, so Vercel's on-the-fly
  // image optimization adds no real benefit and consumes Blob/optimization
  // quota on every redeploy. Serve them directly instead.
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: appVersion,
  },
};

export default nextConfig;
