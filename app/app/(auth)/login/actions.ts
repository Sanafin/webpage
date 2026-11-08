"use server"

import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import { createSessionToken, safeEqual } from "@/lib/app-session"
import { COOKIE_PATH, SESSION_COOKIE, SESSION_TTL_SECONDS, secret } from "@/lib/app-auth"

export type LoginState = { error?: string }

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const passcode = String(form.get("passcode") ?? "")
  if (!passcode || !(await safeEqual(passcode, secret("APP_PASSCODE")))) {
    return { error: "That passcode is not right." }
  }
  const token = await createSessionToken(secret("APP_SESSION_SECRET"), SESSION_TTL_SECONDS)
  const jar = await cookies()
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: SESSION_TTL_SECONDS,
  })
  redirect("/app", RedirectType.replace)
}

export async function logout() {
  const jar = await cookies()
  jar.set(SESSION_COOKIE, "", { path: COOKIE_PATH, maxAge: 0 })
  redirect("/app/login", RedirectType.replace)
}
