import { NextResponse } from "next/server"
import { accessRequestSchema } from "@/lib/schemas"
import { subscribeContact } from "@/lib/notify"
import { clientKey, isRateLimited } from "@/lib/rate-limit"

// Product-updates subscription (marketing consent) via Plunk contacts. Logs carry
// outcome codes only.

function log(outcome: string, status: number, started: number) {
  console.log(JSON.stringify({ route: "request-access", outcome, status, ms: Date.now() - started }))
}

export async function POST(request: Request) {
  const started = Date.now()

  if (isRateLimited(clientKey(request), 10)) {
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

  const parsed = accessRequestSchema.safeParse(body)
  if (!parsed.success) {
    log("invalid_fields", 400, started)
    return NextResponse.json({ error: "invalid_request", fields: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  if (parsed.data.website) {
    log("honeypot", 200, started)
    return NextResponse.json({ ok: true })
  }

  const secret = process.env.PLUNK_SECRET_KEY
  if (!secret) {
    log("unconfigured", 503, started)
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }

  try {
    const res = await subscribeContact(secret, parsed.data)
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
