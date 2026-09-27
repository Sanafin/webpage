"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Mail } from "lucide-react"
import { deckRequestSchema } from "@/lib/schemas"
import { CTA, site } from "@/lib/site"

// No server, no third-party service: the form composes a pre-filled email to the
// founders and opens the visitor's mail app. The CEO replies with the deck.

type Fields = "name" | "firm" | "email"

export function buildDeckMailto(values: { name: string; firm: string; email: string; note?: string }, source: string): string {
  const subject = `Deck request: ${values.name}, ${values.firm}`
  const lines = [
    `Hello Wasu,`,
    ``,
    `I would like to receive the Sanafin deck.`,
    ``,
    `Name: ${values.name}`,
    `Firm: ${values.firm}`,
    `Email: ${values.email}`,
    values.note?.trim() ? `Note: ${values.note.trim()}` : null,
    ``,
    `Sent from sanafin.tech (${source})`,
  ].filter((l): l is string => l !== null)
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`
}

export function DeckRequestForm({ source = "investors" }: { source?: "investors" | "demo" | "closing" }) {
  const [values, setValues] = useState({ name: "", firm: "", email: "", note: "" })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Fields, string>>>({})
  const [sent, setSent] = useState(false)

  function validateField(field: Fields) {
    const result = deckRequestSchema.shape[field].safeParse(values[field])
    setFieldErrors((e) => ({ ...e, [field]: result.success ? undefined : result.error.issues[0]?.message }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = deckRequestSchema.safeParse(values)
    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors
      setFieldErrors({ name: errs.name?.[0], firm: errs.firm?.[0], email: errs.email?.[0] })
      return
    }
    window.dispatchEvent(new CustomEvent("sanafin:track", { detail: { name: "deck_request_compose", props: { source } } }))
    window.location.href = buildDeckMailto(parsed.data, source)
    setSent(true)
  }

  const mailto = buildDeckMailto(values, source)

  if (sent) {
    const first = values.name.trim().split(/\s+/)[0]
    return (
      <div role="status" className="rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
        <p className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0f766e]">
          <Check className="h-4 w-4" aria-hidden="true" />
          Thank you{first ? `, ${first}` : ""}.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#1f1a17]">
          Your mail app should have opened with the request ready to send. {site.ceo.firstName} replies personally with the deck
          within one working day.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#766d67]">
          Nothing opened?{" "}
          <a href={mailto} className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
            Open the email again
          </a>{" "}
          or write to{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
            {site.contactEmail}
          </a>
          .
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
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
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

      <button
        type="submit"
        data-cta="request_deck_submit"
        data-location={source}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d]"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {CTA.investor}
      </button>

      <p className="mt-4 text-[12px] leading-relaxed text-[#766d67]">
        Opens a pre-filled email in your mail app. {site.ceo.name}, {site.ceo.title}, replies personally within one working day with a
        view-only link. No mailing lists; your details go nowhere else.
      </p>
    </form>
  )
}
