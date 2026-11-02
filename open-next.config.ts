import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every route except /demo is prerendered at build time. Without an incremental
// cache the worker re-renders those pages on every request (~265 ms CPU each),
// which is what produced the 1102 "exceeded resource limits" errors. Serving the
// prerendered output from static assets makes those requests near-zero CPU.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
