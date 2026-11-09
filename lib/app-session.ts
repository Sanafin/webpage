// Session tokens for the private preview at /app. Runtime-neutral (Node for `next dev`,
// workerd in production): Web Crypto only, no node: imports, no dependencies.
//   token = base64url(JSON{exp, v:1}) + "." + base64url(HMAC-SHA256(payload))

const enc = new TextEncoder()
const dec = new TextDecoder()

export type Session = { exp: number; v: 1 }

const toB64u = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

const fromB64u = (s: string) => {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4)
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
}

const hmacKey = (secret: string) =>
  crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"])

export async function createSessionToken(secret: string, ttlSeconds: number): Promise<string> {
  const session: Session = { exp: Math.floor(Date.now() / 1000) + ttlSeconds, v: 1 }
  const payload = toB64u(enc.encode(JSON.stringify(session)))
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(payload)))
  return `${payload}.${toB64u(sig)}`
}

export async function verifySessionToken(token: string, secret: string): Promise<Session | null> {
  const parts = token.split(".")
  if (parts.length !== 2) return null
  try {
    // subtle.verify is constant-time in both runtimes.
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), fromB64u(parts[1]), enc.encode(parts[0]))
    if (!ok) return null
    const data = JSON.parse(dec.decode(fromB64u(parts[0]))) as Partial<Session>
    if (data.v !== 1 || typeof data.exp !== "number" || data.exp * 1000 <= Date.now()) return null
    return { exp: data.exp, v: 1 }
  } catch {
    return null
  }
}

// Constant-time string compare without a length leak: hash both sides first.
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(s))))
  const x = new Uint8Array(ha)
  const y = new Uint8Array(hb)
  let diff = 0
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i]
  return diff === 0
}
