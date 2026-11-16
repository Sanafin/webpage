"use client"

import { useState } from "react"
import { Check, Mail } from "lucide-react"
import { joinSchema } from "@/lib/schemas"
import { joinInterests } from "@/lib/join"
import { site } from "@/lib/site"

// Same pattern as the deck form: no server, no third-party service. The form composes a
// pre-filled email to hello@ and opens the visitor's mail app, so nothing is stored here.

type Fields = "name" | "email" | "studies"

const starts = ["December 2026", "January or February 2027", "Spring 2027", "Later"] as const

type Values = { name: string; email: string; studies: string; link: string; note: string }

export function buildJoinMailto(values: Values, interests: string[], start: string, source: string): string {
  const labels = joinInterests.filter((i) => interests.includes(i.id)).map((i) => i.label)
  const subject = `Joining Sanafin: ${values.name}${labels.length ? `, ${labels[0]}` : ""}`
  const lines = [
    `Hello Wasu,`,
    ``,
    `I'd like to work with Sanafin.`,
    ``,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Studies: ${values.studies}`,
    labels.length ? `Interested in: ${labels.join(", ")}` : null,
    start ? `Could start: ${start}` : null,
    values.link.trim() ? `LinkedIn / CV: ${values.link.trim()}` : null,
    values.note.trim() ? `Note: ${values.note.trim()}` : null,
    ``,
    `(Feel free to attach your CV.)`,
    `Sent from sanafin.tech/join (${source})`,
  ].filter((l): l is string => l !== null)
  return `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`
}

export function JoinForm({ source = "join" }: { source?: string }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", studies: "", link: "", note: "" })
  const [interests, setInterests] = useState<string[]>([])
  const [start, setStart] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Fields, string>>>({})
  const [sent, setSent] = useState(false)

  function validateField(field: Fields) {
    const result = joinSchema.shape[field].safeParse(values[field])
    setFieldErrors((e) => ({ ...e, [field]: result.success ? undefined : result.error.issues[0]?.message }))
  }

  function toggle(id: string) {
    setInterests((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = joinSchema.safeParse(values)
    if (!parsed.success) {
      const errs = parsed.error.flatten().fieldErrors
      setFieldErrors({ name: errs.name?.[0], email: errs.email?.[0], studies: errs.studies?.[0] })
      return
    }
    window.dispatchEvent(new CustomEvent("sanafin:track", { detail: { name: "join_compose", props: { source } } }))
    window.location.href = buildJoinMailto(values, interests, start, source)
    setSent(true)
  }

  const mailto = buildJoinMailto(values, interests, start, source)

  if (sent) {
    const first = values.name.trim().split(/\s+/)[0]
    return (
      <div role="status" className="rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
        <p className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0f766e]">
          <Check className="h-4 w-4" aria-hidden="true" />
          Thank you{first ? `, ${first}` : ""}.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#1f1a17]">
          Your mail app should have opened with everything filled in. Press send, and attach your CV if you like.{" "}
          {site.ceo.firstName} replies personally within a few working days.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#6f6660]">
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
      </div>
    )
  }

  const inputClass = (field?: Fields) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#1f1a17] outline-none transition-colors placeholder:text-[#a39a93] focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/30 ${
      field && fieldErrors[field] ? "border-[#c4460f]" : "border-[#e6dfd8]"
    }`

  const text = (field: Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`join-${field}`} className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
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
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
      <div className="grid gap-4 sm:grid-cols-2">
        {text("name", "Name", { autoComplete: "name" })}
        {text("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
      </div>
      <div className="mt-4">{text("studies", "What and where you study", { placeholder: "e.g. MSc Computer Science, ETH" })}</div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[13px] font-medium text-[#1f1a17]">
          Interested in <span className="font-normal text-[#6f6660]">(pick any)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {joinInterests.map((i) => {
            const on = interests.includes(i.id)
            return (
              <button
                key={i.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i.id)}
                className={`rounded-full px-3.5 py-2 text-[14px] transition-colors ${
                  on ? "bg-[#1f1a17] text-white" : "bg-[#f5f1ed] text-[#1f1a17] hover:bg-[#ece7e2]"
                }`}
              >
                {i.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="join-start" className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
            Could start <span className="font-normal text-[#6f6660]">(optional)</span>
          </label>
          <select id="join-start" value={start} onChange={(e) => setStart(e.target.value)} className={inputClass()}>
            <option value="">Choose…</option>
            {starts.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="join-link" className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
            LinkedIn or CV link <span className="font-normal text-[#6f6660]">(optional)</span>
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

      <div className="mt-4">
        <label htmlFor="join-note" className="mb-1.5 block text-[13px] font-medium text-[#1f1a17]">
          Anything you&apos;d like us to know? <span className="font-normal text-[#6f6660]">(optional)</span>
        </label>
        <textarea
          id="join-note"
          name="note"
          rows={2}
          maxLength={800}
          value={values.note}
          onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
          className={inputClass()}
        />
      </div>

      <button
        type="submit"
        data-cta="join_submit"
        data-location={source}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d]"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Send my interest
      </button>

      <p className="mt-4 text-[12px] leading-relaxed text-[#6f6660]">
        Opens a pre-filled email to {site.contactEmail} in your mail app. Nothing is stored on this site and there is no mailing list.
      </p>
    </form>
  )
}
