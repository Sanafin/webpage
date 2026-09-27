"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Fn } from "@/components/fn"
import { contracts } from "@/lib/examples"

// One tabbed example contract at a time, next to the pilot offer. Illustrative
// structures, not customer data; clinical thresholds are footnoted.

const pilot = {
  scope: ["One funder with a named budget owner", "One manufacturer with a defined outcome", "One cohort, one pre-agreed threshold"],
  timeline: [
    ["Day 0", "Discovery call"],
    ["Week 1", "Data connected, threshold agreed"],
    ["Week 2", "Rules live, first verification report"],
    ["Months 3–12", "Milestones verified and settled"],
  ],
  fit: ["You are heading for a MiGeL Ch. 40 listing or a German DiGA price negotiation", "A funder is willing to commit money against a measurable outcome", "Your programme already produces biomarker or claims data"],
}

export function ExampleContracts() {
  const [active, setActive] = useState<(typeof contracts)[number]["id"]>(contracts[0].id)
  const c = contracts.find((x) => x.id === active) ?? contracts[0]

  return (
    <section id="examples" aria-labelledby="examples-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 grid lg:grid-cols-2 gap-6 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] font-medium text-[#c4460f] mb-4">Where we start</p>
            <h2 id="examples-title" className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17]">
              Metabolic health first.
            </h2>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#766d67] lg:pb-2">
            Measurable endpoints, rising spend and funders already asking for conditional terms. These are example
            contract designs Sanafin can structure today, illustrative rather than customer data.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Tabbed contract */}
          <div className="rounded-3xl bg-[#f5f1ed] p-3">
            <div role="tablist" aria-label="Example contracts" className="flex flex-wrap gap-1 p-1">
              {contracts.map((x) => {
                const selected = x.id === active
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    id={`contract-tab-${x.id}`}
                    aria-selected={selected}
                    aria-controls={`contract-${x.id}`}
                    onClick={() => setActive(x.id)}
                    className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                      selected ? "bg-[#1f1a17] text-white" : "text-[#1f1a17] hover:bg-white"
                    }`}
                  >
                    {x.name}
                  </button>
                )
              })}
            </div>

            <div id={`contract-${c.id}`} role="tabpanel" aria-labelledby={`contract-tab-${c.id}`} className="mt-2 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(47,36,31,0.05)]">
              <p className="text-[12px] text-[#766d67] mb-1">Example contract · illustrative</p>
              <h3 className="font-display text-2xl text-[#1f1a17] mb-1">{c.name}</h3>
              <p className="text-[14px] text-[#6f6660] mb-6">{c.population}</p>

              <dl className="grid grid-cols-2 gap-4 pb-5 border-b border-[#f0ebe6]">
                <div>
                  <dt className="text-[12px] text-[#766d67]">Committed by the funder</dt>
                  <dd className="mt-1 text-xl font-medium tracking-tight text-[#1f1a17]">{c.committed}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-[#766d67]">Duration</dt>
                  <dd className="mt-1 text-xl font-medium tracking-tight text-[#1f1a17]">{c.duration}</dd>
                </div>
              </dl>

              <div className="py-5 border-b border-[#f0ebe6]">
                <p className="text-[12px] text-[#766d67] mb-3">Settlement is instructed when</p>
                <ul className="space-y-2">
                  {c.targets.map((t) => (
                    <li key={t.label} className="flex items-start justify-between gap-4 text-[14px]">
                      <span className="text-[#1f1a17]">{t.label}</span>
                      <span className="text-right font-medium text-[#0f766e]">
                        {t.threshold}
                        {"sourceId" in t && t.sourceId ? <Fn id={t.sourceId} /> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-5 border-b border-[#f0ebe6]">
                <p className="text-[12px] text-[#766d67] mb-3">Release schedule</p>
                <ul className="space-y-2">
                  {c.milestones.map((m) => (
                    <li key={m.text} className="flex items-center justify-between text-[14px]">
                      <span className="text-[#6f6660]">{m.text}</span>
                      <span className="text-[#1f1a17]">{m.amount}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[12px] text-[#766d67]">Unmet milestones return to the funder.</p>
              </div>

              <div className="pt-5">
                <p className="text-[12px] text-[#766d67] mb-2">Evidence from</p>
                <ul className="flex flex-wrap gap-1.5">
                  {c.sources.map((s) => (
                    <li key={s} className="rounded-full bg-[#f5f1ed] px-2.5 py-1 text-[12px] text-[#6f6660]">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pilot offer */}
          <aside className="flex flex-col rounded-3xl border border-[#ece7e2] bg-white p-7 sm:p-8">
            <p className="text-[13px] font-medium text-[#c4460f] mb-3">Start a pilot</p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#1f1a17] mb-6">One funder, one manufacturer, one outcome.</h3>

            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#766d67] mb-3">Scope</p>
            <ul className="mb-6 space-y-2">
              {pilot.scope.map((s) => (
                <li key={s} className="flex gap-2.5 text-[14px] text-[#1f1a17]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#766d67] mb-3">Timeline · our target</p>
            <ol className="mb-6 divide-y divide-[#f0ebe6] rounded-2xl border border-[#f0ebe6]">
              {pilot.timeline.map(([when, what]) => (
                <li key={when} className="flex items-center gap-4 px-4 py-2.5 text-[14px]">
                  <span className="w-24 shrink-0 font-mono text-[12px] text-[#766d67]">{when}</span>
                  <span className="text-[#1f1a17]">{what}</span>
                </li>
              ))}
            </ol>

            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#766d67] mb-3">A pilot fits if</p>
            <ul className="mb-8 space-y-2">
              {pilot.fit.map((s) => (
                <li key={s} className="flex gap-2.5 text-[14px] text-[#6f6660]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d9d1ca]" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                href="/demo"
                data-cta="book_call"
                data-location="pilot"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d]"
              >
                Scope a pilot on a call
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="text-center text-[12px] text-[#766d67]">Commercials are discussed on the call. NDA on request.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
