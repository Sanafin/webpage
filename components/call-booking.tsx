"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowUpRight, Check, Clock, Video } from "lucide-react"
import { DeckRequestForm } from "@/components/deck-request-form"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"

// Light booking page in the landing-page system. Visitors pick who they are; the
// scheduler stays on Doodle for now, and investors are routed to the deck form.

// Ids stay stable for outreach links (?role=…); labels follow the payer story.
const roles = [
  { id: "funder", label: "Insurer, employer or public payer" },
  { id: "provider", label: "Care provider" },
  { id: "manufacturer", label: "Digital health company" },
  { id: "investor", label: "Investor" },
  { id: "other", label: "Other" },
] as const

type Role = (typeof roles)[number]["id"]

const agenda = ["The outcome your programme can prove", "What the contract would look like", "Whether a pilot fits"]

// `readRoleFromUrl` reads ?role= (kept stable for outreach links) on the client, so the
// page stays prerendered. Render without it inside the Suspense fallback.
export function CallBooking({ readRoleFromUrl = false }: { readRoleFromUrl?: boolean }) {
  return readRoleFromUrl ? <RoleFromUrl /> : <CallBookingInner />
}

function RoleFromUrl() {
  const params = useSearchParams()
  return <CallBookingInner initialRole={params.get("role") ?? undefined} />
}

function CallBookingInner({ initialRole }: { initialRole?: string }) {
  const valid = roles.find((r) => r.id === initialRole)?.id
  const [role, setRole] = useState<Role | null>(valid ?? null)

  return (
    <section aria-labelledby="call-booking-title" className="grid gap-6 lg:grid-cols-12">
      {/* Calendly pattern: host first, then the meeting, its format, and three points */}
      <div className="lg:col-span-6">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#ebe4db]">
            <Image src={wasuProfile} alt="" fill sizes="48px" className="object-cover object-top" />
          </span>
          <div>
            <p className="text-[15px] font-medium text-[#1f1a17]">{site.ceo.name}</p>
            <p className="text-[13px] text-[#6f6660]">{site.ceo.title}, Sanafin</p>
          </div>
        </div>

        <h1 id="call-booking-title" className="mt-8 font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
          Book a discovery call.
        </h1>

        <ul className="mt-5 flex flex-wrap gap-2 text-[13px] text-[#1f1a17]">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f1ed] px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-[#0f766e]" aria-hidden="true" />
            25 minutes
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f1ed] px-3 py-1.5">
            <Video className="h-3.5 w-3.5 text-[#0f766e]" aria-hidden="true" />
            Video call
          </li>
          <li className="rounded-full bg-[#f5f1ed] px-3 py-1.5">NDA on request</li>
        </ul>

        <p className="mt-6 max-w-md text-base sm:text-[17px] leading-relaxed text-[#574e48]">A working session, not a pitch.</p>

        <ul className="mt-6 space-y-2.5">
          {agenda.map((a) => (
            <li key={a} className="flex gap-3 text-[15px] leading-snug text-[#1f1a17]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      <aside className="lg:col-span-6 lg:pl-6">
        <div className="rounded-[28px] bg-[#f5f1ed] p-4 sm:p-6">
          <p className="text-[13px] font-medium text-[#1f1a17] mb-3">
            <span className="font-mono text-[12px] text-[#6f6660] mr-2">1</span>I&apos;m a…
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
                <span className="font-mono text-[12px] text-[#6f6660] mr-2">2</span>Investors get the deck first; a call follows if useful.
              </p>
              <DeckRequestForm source="call" />
            </>
          ) : (
            <>
              <p className="text-[13px] font-medium text-[#1f1a17] mb-3">
                <span className="font-mono text-[12px] text-[#6f6660] mr-2">2</span>Choose a time
              </p>
              <div className="rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
                <a
                  href={`${site.doodleUrl}${role ? `?role=${role}` : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="doodle_open"
                  data-location="call"
                  data-audience={role ?? "unset"}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d1480f] px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(209,72,15,0.55)] press hover:bg-[#b23d0c]"
                >
                  Choose a time
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-3 text-center text-[12px] text-[#6f6660]">Opens our scheduling page in a new tab.</p>
              </div>
              {!role && <p className="mt-3 text-[12px] text-[#6f6660]">Picking a role helps us prepare; it is optional.</p>}
            </>
          )}
        </div>
      </aside>
    </section>
  )
}
