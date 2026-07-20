#!/usr/bin/env node
/**
 * Production deploy that also repoints emmanuel-okine.vercel.app.
 * CLI --prod updates the default project aliases, but this custom
 * vercel.app domain was stuck on an older deployment until re-aliased.
 */
import { spawnSync } from "node:child_process";

const DOMAIN = "emmanuel-okine.vercel.app";

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...opts,
  });
  if (result.status !== 0) {
    const err = result.stderr || result.stdout || `${cmd} failed`;
    console.error(err);
    process.exit(result.status ?? 1);
  }
  return result.stdout;
}

console.log("Deploying to Vercel production…");
const deployOut = run("npx", ["vercel", "--prod", "--yes"], {
  stdio: ["ignore", "pipe", "inherit"],
});
process.stdout.write(deployOut);

let deploymentUrl;
try {
  const jsonStart = deployOut.lastIndexOf("{");
  if (jsonStart >= 0) {
    const payload = JSON.parse(deployOut.slice(jsonStart));
    deploymentUrl = payload?.deployment?.url;
  }
} catch {
  // fall through
}

if (!deploymentUrl) {
  const match = deployOut.match(/https:\/\/portfolio-[a-z0-9]+-fleetly123\.vercel\.app/);
  deploymentUrl = match?.[0];
}

if (!deploymentUrl) {
  console.error("Could not determine deployment URL to alias.");
  process.exit(1);
}

const host = deploymentUrl.replace(/^https?:\/\//, "");
console.log(`\nPointing ${DOMAIN} → ${host}`);
run("npx", ["vercel", "alias", "set", host, DOMAIN], {
  stdio: "inherit",
});
console.log(`\nLive: https://${DOMAIN}`);
