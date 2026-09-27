"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Check, Clock, Video } from "lucide-react"
import { DeckRequestForm } from "@/components/deck-request-form"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"

// Light booking page in the landing-page system. Visitors pick who they are; the
// scheduler stays on Doodle for now, and investors are routed to the deck form.

const roles = [
  { id: "manufacturer", label: "Digital health manufacturer" },
  { id: "funder", label: "Insurer or employer" },
  { id: "provider", label: "Hospital or provider" },
  { id: "investor", label: "Investor" },
  { id: "other", label: "Other" },
] as const

type Role = (typeof roles)[number]["id"]

const agenda = [
  "Your programme, the outcome it can prove and who would fund it",
  "What an outcome-conditional contract would look like on your data",
  "Whether a two-week pilot makes sense, and what it needs",
]

const next = [
  ["Day 0", "25-minute call with a founder"],
  ["Week 1", "Data connected, threshold agreed"],
  ["Week 2", "Rules live, first verification report"],
]

export function DemoBooking({ initialRole }: { initialRole?: string }) {
  const valid = roles.find((r) => r.id === initialRole)?.id
  const [role, setRole] = useState<Role | null>(valid ?? null)

  return (
    <section aria-labelledby="demo-booking-title" className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="text-[13px] text-[#766d67] mb-4">Discovery call</p>
        <h1 id="demo-booking-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17] mb-5">
          Book a 25-minute discovery call.
        </h1>
        <p className="max-w-xl text-base sm:text-[17px] leading-relaxed text-[#6f6660] mb-8">
          A working session, not a pitch. We map your programme onto an outcome-conditional contract and tell you
          honestly whether a pilot fits.
        </p>

        <p className="text-[13px] text-[#766d67] mb-3">What we&apos;ll cover</p>
        <ul className="mb-8 space-y-2.5">
          {agenda.map((a) => (
            <li key={a} className="flex gap-3 text-[15px] leading-snug text-[#1f1a17]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>

        <p className="text-[13px] text-[#766d67] mb-3">Who you&apos;ll talk to</p>
        <div className="mb-8 flex items-center gap-4 rounded-3xl bg-[#f5f1ed] p-4">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#ebe4db]">
            <Image src={wasuProfile} alt={site.ceo.name} fill sizes="56px" className="object-cover object-top" />
          </span>
          <div>
            <p className="text-[15px] font-medium text-[#1f1a17]">{site.ceo.name}</p>
            <p className="text-[13px] text-[#6f6660]">{site.ceo.title} · PhD in healthcare financing, ETH Zurich · researcher at HSG</p>
          </div>
        </div>

        <p className="text-[13px] text-[#766d67] mb-3">What happens next</p>
        <ol className="divide-y divide-[#ece7e2] rounded-2xl border border-[#ece7e2]">
          {next.map(([when, what]) => (
            <li key={when} className="flex items-center gap-4 px-4 py-2.5 text-[14px]">
              <span className="w-16 shrink-0 font-mono text-[12px] text-[#766d67]">{when}</span>
              <span className="text-[#1f1a17]">{what}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[12.5px] text-[#766d67]">Timeline is our target. NDA on request; nothing you share is used outside this conversation.</p>
      </div>

      <aside className="lg:col-span-6 lg:pl-6">
        <div className="rounded-[28px] bg-[#f5f1ed] p-4 sm:p-6">
          <p className="text-[13px] font-medium text-[#1f1a17] mb-3">
            <span className="font-mono text-[12px] text-[#766d67] mr-2">1</span>I&apos;m a…
          </p>
          <div role="radiogroup" aria-label="Your role" className="mb-5 flex flex-wrap gap-2">
            {roles.map((r) => {
              const selected = role === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setRole(r.id)}
                  className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                    selected ? "bg-[#1f1a17] text-white" : "bg-white text-[#1f1a17] hover:bg-[#ece7e2]"
                  }`}
                >
                  {r.label}
                </button>
              )
            })}
          </div>

          {role === "investor" ? (
            <>
              <p className="text-[13px] font-medium text-[#1f1a17] mb-3">
                <span className="font-mono text-[12px] text-[#766d67] mr-2">2</span>Investors get the deck first; a call follows if useful.
              </p>
              <DeckRequestForm source="demo" />
            </>
          ) : (
            <>
              <p className="text-[13px] font-medium text-[#1f1a17] mb-3">
                <span className="font-mono text-[12px] text-[#766d67] mr-2">2</span>Choose a time
              </p>
              <div className="rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
                <a
                  href={`${site.doodleUrl}${role ? `?role=${role}` : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="doodle_open"
                  data-location="demo"
                  data-audience={role ?? "unset"}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f15d22] px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(241,93,34,0.7)] transition-colors hover:bg-[#d94f18]"
                >
                  Choose a time
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-3 text-center text-[12px] text-[#766d67]">Opens our scheduling page in a new tab.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-[13px] text-[#6f6660]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#0f766e]" aria-hidden="true" />
                    25 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-[#0f766e]" aria-hidden="true" />
                    Video call
                  </div>
                </div>
              </div>
              {!role && <p className="mt-3 text-[12px] text-[#766d67]">Picking a role helps us prepare; it is optional.</p>}
            </>
          )}
        </div>
      </aside>
    </section>
  )
}
