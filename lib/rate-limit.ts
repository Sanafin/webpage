// Best-effort per-isolate rate limit for the form routes. Cloudflare Workers can
// run many isolates, so this bounds abuse per instance rather than globally; a
// Workers rate-limit binding can replace it without touching the routes.

const WINDOW_MS = 60_000
const buckets = new Map<string, number[]>()

export function clientKey(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  )
}

export function isRateLimited(key: string, limit: number): boolean {
  const now = Date.now()
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= limit) {
    buckets.set(key, recent)
    return true
  }
  recent.push(now)
  buckets.set(key, recent)
  // Keep the map from growing without bound
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.every((t) => now - t >= WINDOW_MS)) buckets.delete(k)
  }
  return false
}
