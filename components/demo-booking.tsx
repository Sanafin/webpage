"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Check, Clock, Globe, Video } from "lucide-react"
import demoVideoPreview from "@/components/ui/slides/demo-yt.png"

export function DemoBooking() {
  const doodleUrl = "https://doodle.com/bp/wasumekniran/discover-sanafin"
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const topics = [
    "Evidence-generation bottlenecks across metabolic endpoints",
    "Swiss HTA gaps in your current pilot or clinical data",
    "Payer risk-sharing viability for your business model",
    "Architecture fit for an automated validation layer",
  ]
  const rightFit = [
    "Planning or running a Swiss pilot or clinical study",
    "Turning raw metabolic data into payer-ready evidence",
    "Pressure-testing reimbursement strategy before custom infrastructure",
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Please try again.")
      }
    } catch {
      setError("Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      aria-labelledby="demo-booking-title"
      className="w-full overflow-hidden rounded-[18px] border border-[#efc2a5]/45 bg-[#fffaf6] shadow-[var(--shadow-lg)] grid grid-cols-1 lg:grid-cols-12"
    >
      <div className="relative flex min-h-[540px] flex-col justify-between overflow-hidden bg-[#241c18] text-white lg:col-span-7">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(140deg,rgba(20,184,166,0.14)_0%,rgba(20,184,166,0)_38%),linear-gradient(320deg,rgba(241,93,34,0.12)_0%,rgba(241,93,34,0)_42%)]" />
        <div className="relative z-10">
          <div className="overflow-hidden border-b border-white/10 bg-white/[0.04]">
            <div className="relative aspect-[16/8.4]">
              <Image
                src={demoVideoPreview}
                alt="Sanafin demo video preview"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="px-7 pt-7 md:px-10 md:pt-8">
            <h1
              id="demo-booking-title"
              className="font-serif text-3xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl"
            >
              Book a discovery call.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#f4dfd2]/78 md:text-base">
              Map your Swiss market-access path and align metabolic outcomes with HTA readiness. This is a collaborative discovery call, not a generic sales pitch or trial access.
            </p>

            <div className="mt-7">
              <ul className="grid gap-3 md:grid-cols-2">
                {topics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm leading-5 text-[#f4dfd2]/72">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5eead4]" aria-hidden="true" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-7 md:pb-10" />
      </div>

      <aside className="flex items-center bg-white p-7 md:p-10 lg:col-span-5">
        <div className="mx-auto w-full max-w-md">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#8c6a59]">
              Discovery call
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight text-[#2f241f]">
              Align your evidence plan.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#7f6153]">
              We will explore your evidence bottlenecks, Swiss HTA timeline, and whether automated data infrastructure belongs in your roadmap.
            </p>
          </div>

          <a
            href={doodleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#14B8A6] px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_24px_-14px_rgba(20,184,166,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#0f8f81] hover:shadow-[0_18px_32px_-16px_rgba(20,184,166,0.85)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14B8A6]"
          >
            Schedule on Doodle
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="mt-6 grid gap-3 text-sm text-[#5f493f]">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-[#14B8A6]" aria-hidden="true" />
              <span>25-minute session</span>
            </div>
            <div className="flex items-center gap-3">
              <Video className="h-4 w-4 text-[#14B8A6]" aria-hidden="true" />
              <span>Zoom video call</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-[#14B8A6]" aria-hidden="true" />
              <span>Timezone-aware booking</span>
            </div>
          </div>

          <div className="mt-7 border-t border-[#efc2a5]/35 pt-7">
            {submitted ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0f8f81]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>You're on the beta waiting list.</span>
              </div>
            ) : (
              <>
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6a59]">
                  Beta waiting list
                </p>
                <form onSubmit={handleSubmit} aria-busy={loading} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    aria-label="Email address"
                    aria-invalid={Boolean(error)}
                    className="min-h-10 min-w-0 flex-1 rounded-[8px] border border-[#efc2a5]/45 bg-[#fffaf6] px-3 py-2 text-sm text-[#2f241f] outline-none transition-colors placeholder:text-[#8c6a59]/55 focus:border-[#14B8A6]"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="min-h-10 shrink-0 rounded-[8px] bg-[#2f241f] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1f1714] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Joining" : "Join"}
                  </button>
                </form>
                {error && (
                  <p role="alert" className="mt-2 text-xs text-red-600">
                    {error}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mt-7 border-t border-[#efc2a5]/35 pt-7">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#2f241f]">
              Right fit if you are
            </h3>
            <ul className="mt-4 space-y-3">
              {rightFit.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#5f493f]">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/10">
                    <Check className="h-3 w-3 text-[#14B8A6]" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </section>
  )
}
