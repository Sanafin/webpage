"use client"

import { useRef, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { joinSchema } from "@/lib/schemas"
import { joinInterests, joinRoles } from "@/lib/join"
import { site } from "@/lib/site"

// Same pattern as the deck form: no server, no third-party service. The form composes a
// pre-filled email to hello@ and opens the visitor's mail app, so nothing is stored here.
// Picking a role in the list preselects it in the form and scrolls there.

type Fields = "name" | "email" | "studies"
type Values = { name: string; email: string; studies: string; link: string; note: string }

export function buildJoinMailto(values: Values, interest: string, source: string): string {
  const label = joinInterests.find((i) => i.id === interest)?.label
  const subject = `Joining Sanafin: ${values.name}${label ? `, ${label}` : ""}`
  const lines = [
    `Hello Wasu,`,
    ``,
    `I'd like to work with Sanafin.`,
    ``,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Studies: ${values.studies}`,
    label ? `Interested in: ${label}` : null,
    values.link.trim() ? `LinkedIn / CV: ${values.link.trim()}` : null,
    ``,
    `(Feel free to attach your CV.)`,
    `Sent from sanafin.tech/join (${source})`,
  ].filter((l): l is string => l !== null)
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`
}

const row = "group flex w-full items-center justify-between gap-6 border-b border-[#ece7e2] py-5 text-left"

export function JoinRolesAndForm({ source = "join", children }: { source?: string; children?: React.ReactNode }) {
  const [interest, setInterest] = useState("")
  const formRef = useRef<HTMLDivElement>(null)

  function pick(id: string) {
    setInterest(id)
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.setTimeout(() => document.getElementById("join-name")?.focus({ preventScroll: true }), 450)
  }

  return (
    <>
      <section id="roles" aria-labelledby="roles-title" className="mt-20 scroll-mt-28">
        <h2 id="roles-title" className="text-[13px] text-[#766d67]">
          Open roles
        </h2>
        <ul className="mt-3 border-t border-[#ece7e2]">
          {joinRoles.map((r) => (
            <li key={r.id}>
              <button type="button" onClick={() => pick(r.id)} className={row}>
                <span>
                  <span className="block text-[16px] text-[#1f1a17]">{r.title}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-[#766d67]">{r.what}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3 text-[13px] text-[#766d67]">
                  <span className="hidden sm:inline">{r.format}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => pick("other")} className={row}>
              <span>
                <span className="block text-[16px] text-[#1f1a17]">Open application</span>
                <span className="mt-1 block text-[14px] leading-snug text-[#766d67]">Not listed? Tell us what you would like to do.</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#766d67] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </section>

      {children}

      <div ref={formRef} id="interest" className="scroll-mt-28">
        <JoinForm source={source} interest={interest} setInterest={setInterest} />
      </div>
    </>
  )
}

function JoinForm({ source, interest, setInterest }: { source: string; interest: string; setInterest: (v: string) => void }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", studies: "", link: "", note: "" })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Fields, string>>>({})
  const [sent, setSent] = useState(false)

  function validateField(field: Fields) {
    const result = joinSchema.shape[field].safeParse(values[field])
    setFieldErrors((e) => ({ ...e, [field]: result.success ? undefined : result.error.issues[0]?.message }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = joinSchema.safeParse(values)
    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors
      setFieldErrors({ name: errs.name?.[0], email: errs.email?.[0], studies: errs.studies?.[0] })
      return
    }
    window.dispatchEvent(new CustomEvent("sanafin:track", { detail: { name: "join_compose", props: { source, interest } } }))
    window.location.href = buildJoinMailto(values, interest, source)
    setSent(true)
  }

  const mailto = buildJoinMailto(values, interest, source)

  if (sent) {
    const first = values.name.trim().split(/\s+/)[0]
    return (
      <div role="status" className="mt-20 border-t border-[#ece7e2] pt-8">
        <p className="inline-flex items-center gap-2 text-[16px] text-[#0f766e]">
          <Check className="h-4 w-4" aria-hidden="true" />
          Thank you{first ? `, ${first}` : ""}.
        </p>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#1f1a17]">
          Your mail app should have opened with everything filled in. Press send, and attach your CV if you like.
        </p>
        <p className="mt-3 text-[13px] text-[#766d67]">
          Nothing opened?{" "}
          <a href={mailto} className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
            Try again
          </a>{" "}
          or write to {site.contactEmail}.
        </p>
      </div>
    )
  }

  const inputClass = (field?: Fields) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1f1a17] outline-none transition-colors placeholder:text-[#a39a93] focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/30 ${
      field && fieldErrors[field] ? "border-[#c4460f]" : "border-[#e6dfd8]"
    }`
  const labelClass = "mb-1.5 block text-[13px] text-[#1f1a17]"

  const text = (field: Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`join-${field}`} className={labelClass}>
        {label}
      </label>
      <input
        id={`join-${field}`}
        name={field}
        required
        value={values[field]}
        onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
        onBlur={() => validateField(field)}
        aria-invalid={Boolean(fieldErrors[field])}
        aria-describedby={fieldErrors[field] ? `join-${field}-error` : undefined}
        className={inputClass(field)}
        {...props}
      />
      {fieldErrors[field] && (
        <p id={`join-${field}-error`} className="mt-1.5 text-[12px] text-[#c4460f]">
          {fieldErrors[field]}
        </p>
      )}
    </div>
  )

  return (
    <section aria-labelledby="interest-title" className="mt-20">
      <h2 id="interest-title" className="font-display text-3xl text-[#1f1a17]">
        Send your interest
      </h2>
      <p className="mt-2 text-[15px] text-[#766d67]">One minute. We reply to everyone.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {text("name", "Name", { autoComplete: "name" })}
          {text("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
        </div>
        {text("studies", "What and where you study", { placeholder: "e.g. MSc Computer Science, ETH" })}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="join-interest" className={labelClass}>
              Interested in
            </label>
            <select id="join-interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={inputClass()}>
              <option value="">Choose…</option>
              {joinInterests.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="join-link" className={labelClass}>
              LinkedIn or CV link <span className="text-[#766d67]">(optional)</span>
            </label>
            <input
              id="join-link"
              name="link"
              type="url"
              inputMode="url"
              value={values.link}
              onChange={(e) => setValues((v) => ({ ...v, link: e.target.value }))}
              className={inputClass()}
            />
          </div>
        </div>

        <button
          type="submit"
          data-cta="join_submit"
          data-location={source}
          className="!mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d] sm:w-auto"
        >
          Send my interest
        </button>
        <p className="text-[12px] leading-relaxed text-[#766d67]">
          Opens a pre-filled email to {site.contactEmail}. Nothing is stored on this site.
        </p>
      </form>
    </section>
  )
}
