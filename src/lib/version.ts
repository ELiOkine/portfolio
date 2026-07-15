/** Build identity baked into the client bundle at compile time. */
export const APP_VERSION =
  process.env.NEXT_PUBLIC_APP_VERSION ??
  process.env.VERCEL_GIT_COMMIT_SHA ??
  "dev";
