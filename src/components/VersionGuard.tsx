"use client";

import { useEffect } from "react";
import { APP_VERSION } from "@/lib/version";

const CHECK_INTERVAL_MS = 60_000;
const RELOAD_PARAM = "_v";

async function fetchRemoteVersion(signal?: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(`/api/version?t=${Date.now()}`, {
      cache: "no-store",
      signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
}

function forceReload() {
  const url = new URL(window.location.href);
  url.searchParams.set(RELOAD_PARAM, Date.now().toString());
  window.location.replace(url.toString());
}

function clearReloadParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(RELOAD_PARAM)) return;
  url.searchParams.delete(RELOAD_PARAM);
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", next);
}

/**
 * Polls the live build version and hard-reloads when the tab still runs an older deploy.
 */
export default function VersionGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!APP_VERSION || APP_VERSION === "dev") return;

    let cancelled = false;
    const controller = new AbortController();

    const check = async () => {
      const remote = await fetchRemoteVersion(controller.signal);
      if (cancelled || !remote) return;
      if (remote !== APP_VERSION) {
        forceReload();
        return;
      }
      clearReloadParam();
    };

    void check();
    const id = window.setInterval(() => void check(), CHECK_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
