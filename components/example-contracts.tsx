import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { example } from "@/lib/examples"
import { CTA } from "@/lib/site"

// The wedge as two Mercury-style tiles: a soft plate holding one floating product
// card, with a one-line caption and a quiet action underneath. Left, the contract
// (a PayPal-style ring of what is released vs held); right, the pilot (a Ramp-style
// dot timeline). Uses the shared example dataset, labelled illustrative.

const amount = (s: string) => Number(s.replace(/[^\d]/g, ""))
const chf = (n: number) => `CHF ${n.toLocaleString("en-US")}`

const timeline = [
  { when: "Day 0", what: "Discovery call" },
  { when: "Week 2", what: "First verification" },
  { when: "Month 6", what: "First release" },
] as const

function Ring({ share }: { share: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#ece7e2" strokeWidth="7" />
      <circle cx="40" cy="40" r={r} fill="none" stroke="#14b8a6" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${c * share} ${c}`} />
    </svg>
  )
}

export function ExampleContracts() {
  const total = example.milestones.reduce((sum, m) => sum + amount(m.amount), 0)
  const released = example.milestones.filter((m) => m.status === "Released").reduce((sum, m) => sum + amount(m.amount), 0)
  const releasedCount = example.milestones.filter((m) => m.status === "Released").length

  return (
    <section id="examples" aria-labelledby="examples-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="examples-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17] mb-4">
            One pathway, written once.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#6f6660]">Metabolic health first. Every new payer reuses the same contract.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* The contract */}
          <div className="flex flex-col rounded-3xl bg-[#f5f1ed] p-4 sm:p-6">
            <div className="flex flex-1 items-center justify-center rounded-2xl px-2 py-8 sm:px-8 sm:py-12">
              <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-[0_24px_48px_-28px_rgba(47,36,31,0.35)] sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[14px] font-medium text-[#1f1a17]">Type 2 diabetes</p>
                  <p className="font-mono text-[11.5px] text-[#766d67]">
                    {example.cohort} patients · {example.duration}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-5">
                  <div className="relative">
                    <Ring share={released / total} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[15px] font-medium tabular-nums text-[#1f1a17]">
                        {releasedCount} of {example.milestones.length}
                      </span>
                      <span className="text-[10.5px] text-[#766d67]">released</span>
                    </div>
                  </div>
                  <dl className="space-y-3">
                    <div>
                      <dt className="flex items-center gap-1.5 text-[12px] text-[#766d67]">
                        <span className="h-2 w-2 rounded-full bg-[#14b8a6]" aria-hidden="true" />
                        Released
                      </dt>
                      <dd className="font-display text-2xl tabular-nums text-[#1f1a17]">{chf(released)}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-[12px] text-[#766d67]">
                        <span className="h-2 w-2 rounded-full bg-[#e3dcd5]" aria-hidden="true" />
                        Held until verified
                      </dt>
                      <dd className="font-display text-2xl tabular-nums text-[#1f1a17]">{chf(total - released)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#f0ebe6] pt-4">
                  <span className="text-[13px] text-[#1f1a17]">
                    {example.threshold.label} {example.delta}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#14b8a6]/12 px-2.5 py-1 text-[11.5px] font-medium text-[#0f766e]">
                    <Check className="h-3 w-3" aria-hidden="true" />
                    Threshold met
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2 pt-2">
              <p className="text-[17px] leading-snug text-[#1f1a17]">Paid on verified changes in blood sugar, weight and drug cost.</p>
              <p className="mt-1 text-[13px] text-[#766d67]">Illustrative contract. Anything not verified goes back to the payer.</p>
            </div>
          </div>

          {/* The pilot */}
          <div className="flex flex-col rounded-3xl bg-[#f5f1ed] p-4 sm:p-6">
            <div className="flex flex-1 items-center justify-center rounded-2xl px-2 py-8 sm:px-8 sm:py-12">
              <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-[0_24px_48px_-28px_rgba(47,36,31,0.35)] sm:p-6">
                <p className="text-[14px] font-medium text-[#1f1a17]">Pilot · one payer, one cohort</p>
                <ol className="relative mt-6 grid grid-cols-3">
                  <span className="absolute left-[16.6%] right-[16.6%] top-[7px] h-px bg-[#e3dcd5]" aria-hidden="true" />
                  {timeline.map((t, i) => (
                    <li key={t.when} className="relative flex flex-col items-center text-center">
                      <span className={`h-3.5 w-3.5 rounded-full border-2 border-white ${i === timeline.length - 1 ? "bg-[#14b8a6]" : "bg-[#1f1a17]"} ring-1 ring-[#e3dcd5]`} aria-hidden="true" />
                      <span className="mt-3 rounded-md border border-[#ece7e2] px-2 py-0.5 font-mono text-[11px] text-[#1f1a17]">{t.when}</span>
                      <span className="mt-2 text-[12.5px] leading-snug text-[#6f6660]">{t.what}</span>
                    </li>
                  ))}
                </ol>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-[#f0ebe6] pt-4">
                  <div>
                    <dt className="text-[12px] text-[#766d67]">Downside</dt>
                    <dd className="text-[14px] text-[#1f1a17]">Capped at the budget</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] text-[#766d67]">Upside</dt>
                    <dd className="text-[14px] text-[#1f1a17]">Share of verified savings</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4 px-2 pt-2">
              <div>
                <p className="text-[17px] leading-snug text-[#1f1a17]">Our target: live in two weeks.</p>
                <p className="mt-1 text-[13px] text-[#766d67]">Pricing on the call · NDA on request</p>
              </div>
              <Link
                href="/call"
                data-cta="book_call"
                data-location="pilot"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#1f1a17] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#3a322d]"
              >
                {CTA.buyer}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
