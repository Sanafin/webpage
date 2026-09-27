"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { deckRequestSchema } from "@/lib/schemas"
import { CTA, site } from "@/lib/site"

type Fields = "name" | "firm" | "email"

const errorCopy: Record<string, string> = {
  rate_limited: "Too many requests from this network. Please try again in a minute.",
  unavailable: "The form is temporarily unavailable. Please try again shortly, or connect with us on LinkedIn.",
  upstream: "We couldn't record your request just now. Please try again in a moment.",
  network: "Network error. Please check your connection and try again.",
}

export function DeckRequestForm({ source = "investors" }: { source?: "investors" | "demo" | "closing" }) {
  const [values, setValues] = useState({ name: "", firm: "", email: "", note: "", website: "" })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Fields, string>>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")
  const [error, setError] = useState("")

  function validateField(field: Fields) {
    const result = deckRequestSchema.shape[field].safeParse(values[field])
    setFieldErrors((e) => ({ ...e, [field]: result.success ? undefined : result.error.issues[0]?.message }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const parsed = deckRequestSchema.safeParse({ ...values, source })
    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors
      setFieldErrors({ name: errs.name?.[0], firm: errs.firm?.[0], email: errs.email?.[0] })
      return
    }
    setStatus("loading")
    try {
      const res = await fetch("/api/request-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })
      if (res.ok) {
        setStatus("done")
        window.dispatchEvent(new CustomEvent("sanafin:track", { detail: { name: "deck_form_success", props: { source } } }))
      } else {
        const data = await res.json().catch(() => ({}))
        setError(errorCopy[data.error] ?? errorCopy.upstream)
        setStatus("idle")
      }
    } catch {
      setError(errorCopy.network)
      setStatus("idle")
    }
  }

  if (status === "done") {
    const first = values.name.trim().split(/\s+/)[0]
    return (
      <div role="status" className="rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
        <p className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0f766e]">
          <Check className="h-4 w-4" aria-hidden="true" />
          Thank you{first ? `, ${first}` : ""}.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#1f1a17]">
          {site.ceo.firstName} will send the deck to <span className="font-medium">{values.email.trim()}</span> personally within one working day.
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
          <li>
            <Link href="#how" className="inline-flex items-center gap-1 text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
              See how it works <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link href="#team" className="inline-flex items-center gap-1 text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
              Meet the team <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  const inputClass = (field: Fields) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1f1a17] outline-none transition-colors placeholder:text-[#a39a93] focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/30 ${
      fieldErrors[field] ? "border-[#c4460f]" : "border-[#e6dfd8]"
    }`

  return (
    <form onSubmit={handleSubmit} aria-busy={status === "loading"} noValidate className="rounded-3xl bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`deck-name-${source}`} className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
            Name
          </label>
          <input
            id={`deck-name-${source}`}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={() => validateField("name")}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? `deck-name-${source}-error` : undefined}
            className={inputClass("name")}
          />
          {fieldErrors.name && (
            <p id={`deck-name-${source}-error`} className="mt-1.5 text-[12px] text-[#c4460f]">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`deck-firm-${source}`} className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
            Firm
          </label>
          <input
            id={`deck-firm-${source}`}
            name="firm"
            autoComplete="organization"
            required
            value={values.firm}
            onChange={(e) => setValues((v) => ({ ...v, firm: e.target.value }))}
            onBlur={() => validateField("firm")}
            aria-invalid={Boolean(fieldErrors.firm)}
            aria-describedby={fieldErrors.firm ? `deck-firm-${source}-error` : undefined}
            className={inputClass("firm")}
          />
          {fieldErrors.firm && (
            <p id={`deck-firm-${source}-error`} className="mt-1.5 text-[12px] text-[#c4460f]">
              {fieldErrors.firm}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor={`deck-email-${source}`} className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
          Work email
        </label>
        <input
          id={`deck-email-${source}`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          onBlur={() => validateField("email")}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? `deck-email-${source}-error` : undefined}
          className={inputClass("email")}
        />
        {fieldErrors.email && (
          <p id={`deck-email-${source}-error`} className="mt-1.5 text-[12px] text-[#c4460f]">
            {fieldErrors.email}
          </p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor={`deck-note-${source}`} className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
          Anything specific? <span className="font-normal text-[#766d67]">(optional)</span>
        </label>
        <textarea
          id={`deck-note-${source}`}
          name="note"
          rows={2}
          maxLength={500}
          value={values.note}
          onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
          className="w-full rounded-xl border border-[#e6dfd8] bg-white px-4 py-3 text-[15px] text-[#1f1a17] outline-none transition-colors focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/30"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`deck-website-${source}`}>Website</label>
        <input id={`deck-website-${source}`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        data-cta="request_deck_submit"
        data-location={source}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : CTA.investor}
        {status !== "loading" && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-[13px] text-[#c4460f]">
          {error}
        </p>
      )}

      <p className="mt-4 text-[12px] leading-relaxed text-[#766d67]">
        Sent personally by {site.ceo.name}, {site.ceo.title}, within one working day. No mailing lists. We use your details only to
        send the deck and follow up.{" "}
        <Link href="/privacy" className="underline decoration-[#d9d1ca] underline-offset-2 hover:text-[#1f1a17]">
          Privacy policy
        </Link>
        .
      </p>
    </form>
  )
}
