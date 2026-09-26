"use client"

import { useState } from "react"
import { Check } from "lucide-react"

// Product-updates field in the footer (marketing consent, Klaviyo list).
export function UpdatesForm() {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "done">("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState("loading")
    setError("")
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source: "Footer product updates" }),
      })
      if (res.ok) setState("done")
      else {
        const data = await res.json().catch(() => ({}))
        setError(data.error === "rate_limited" ? "Too many requests. Please try again in a minute." : "Something went wrong. Please try again.")
        setState("idle")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
      setState("idle")
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="inline-flex items-center gap-2 text-[13px] text-[#0f766e]">
        <Check className="h-4 w-4" aria-hidden="true" />
        You&apos;re subscribed. Unsubscribe any time.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={state === "loading"} className="max-w-xs">
      <label htmlFor="updates-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-1 rounded-full border border-[#e6dfd8] bg-white p-1">
        <input
          id="updates-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "updates-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-[13px] text-[#1f1a17] placeholder:text-[#a39a93] outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 rounded-full bg-[#1f1a17] px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-[#3a322d] disabled:opacity-60"
        >
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="updates-website">Website</label>
        <input id="updates-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {error && (
        <p id="updates-error" role="alert" className="mt-2 text-[12px] text-[#c4460f]">
          {error}
        </p>
      )}
      <p className="mt-2 text-[12px] text-[#766d67]">Occasional product updates. Unsubscribe any time.</p>
    </form>
  )
}
