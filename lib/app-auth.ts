import "server-only"
// Data-access-layer style session check for /app. Layouts do not re-render on client
// navigation, so every dashboard page and action awaits requireSession() itself.
import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifySessionToken, type Session } from "@/lib/app-session"

export const SESSION_COOKIE = "sf_app"
export const SESSION_TTL_SECONDS = 60 * 60 * 12
export const COOKIE_PATH = "/app"

// Read at call time, never at module scope: module scope is also evaluated during
// `next build`, where the Worker secrets are not present.
export function secret(name: "APP_PASSCODE" | "APP_SESSION_SECRET"): string {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is not configured`)
  return v
}

export const getSession = cache(async (): Promise<Session | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token, secret("APP_SESSION_SECRET"))
})

export const requireSession = cache(async (): Promise<Session> => {
  const session = await getSession()
  if (!session) redirect("/app/login")
  return session
})
