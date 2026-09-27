import { NextResponse } from "next/server"
import { deckRequestSchema } from "@/lib/schemas"
import { trackDeckRequested } from "@/lib/klaviyo"
import { clientKey, isRateLimited } from "@/lib/rate-limit"

// Investor deck requests. Records a Klaviyo event (no marketing consent) that the
// owner's flow turns into a notification. Logs carry outcome codes only, never
// names or emails.

function log(outcome: string, status: number, started: number) {
  console.log(JSON.stringify({ route: "request-deck", outcome, status, ms: Date.now() - started }))
}

export async function POST(request: Request) {
  const started = Date.now()

  if (isRateLimited(clientKey(request), 5)) {
    log("rate_limited", 429, started)
    return NextResponse.json({ error: "rate_limited" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    log("invalid_json", 400, started)
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  const parsed = deckRequestSchema.safeParse(body)
  if (!parsed.success) {
    log("invalid_fields", 400, started)
    return NextResponse.json({ error: "invalid_request", fields: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  // Honeypot filled: pretend success, do nothing
  if (parsed.data.website) {
    log("honeypot", 200, started)
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY
  if (!apiKey) {
    log("unconfigured", 503, started)
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }

  try {
    const res = await trackDeckRequested(apiKey, parsed.data)
    if (!res.ok) {
      log("upstream_error", 502, started)
      return NextResponse.json({ error: "upstream" }, { status: 502 })
    }
  } catch {
    log("upstream_timeout", 502, started)
    return NextResponse.json({ error: "upstream" }, { status: 502 })
  }

  log("ok", 200, started)
  return NextResponse.json({ ok: true })
}
