import { Fn } from "@/components/fn"
import { Reveal } from "@/components/reveal"
import { media } from "@/lib/media"

// Three sourced facts, then one calm comparison. Every figure carries a footnote
// into lib/sources.ts or is labelled as a Sanafin estimate.

const facts = [
  {
    value: "7 of 8",
    label: "published Swiss decisions on digital health applications rejected, all on effectiveness",
    sourceId: "foph-dga-decisions",
    region: "Switzerland · MiGeL Ch. 40",
  },
  {
    value: "22%",
    label: "of prescription apps ever admitted in Germany struck off for failing to prove a positive care effect",
    sourceId: "diga-report",
    region: "Germany · DiGA 2020–2025",
  },
  {
    value: "EUR 400 m",
    label: "paid by German statutory insurers for prescription apps, with a 59% average price cut at negotiation",
    sourceId: "diga-report",
    region: "Germany · DiGA 2020–2025",
  },
]

const today = [
  "Evidence is assembled by hand for each payer, at CHF 100k to 250k a project.",
  "Switzerland has no trial phase: no payer money moves before a listing exists.",
  "The verdict lives in a consultant's spreadsheet that nobody else can re-run.",
]

const withSanafin = [
  "A funder commits money to the outcome up front, held by a licensed custody partner.",
  "The result is verified against the pre-agreed threshold with WZW-native scoring.",
  "Either side can re-compute the proof from the exported file alone.",
]

export function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] font-medium text-[#f15d22] mb-4">The problem</p>
            <h2 id="problem-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              Reimbursement isn&apos;t the hard part any more.
              <br />
              <span className="text-[#1f1a17]/45">Proving the outcome is.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-[#6f6660] lg:pb-2">
            Payers in Germany and Switzerland now ask digital health products to show a measured effect before, and
            after, they are paid. The money to produce that evidence only arrives once the evidence exists.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.value + f.label} as="li" delay={i * 0.08} className="flex min-h-[220px] flex-col justify-between rounded-3xl bg-[#f5f1ed] p-7 sm:p-8">
              <p className="text-[13px] text-[#766d67]">{f.region}</p>
              <div>
                <p className="font-display text-5xl sm:text-6xl text-[#1f1a17]">
                  {f.value}
                  <Fn id={f.sourceId} />
                </p>
                <p className="mt-3 text-[15px] leading-snug text-[#6f6660]">{f.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4 overflow-hidden rounded-3xl border border-[#ece7e2] bg-white" delay={0.1}>
          <div className="grid md:grid-cols-2 md:divide-x divide-[#f0ebe6]">
            <div className="p-7 sm:p-8">
              <p className="text-[13px] text-[#766d67] mb-5">Today</p>
              <ul className="space-y-4">
                {today.map((t, i) => (
                  <li key={t} className="flex gap-3 text-[15px] sm:text-base leading-snug text-[#1f1a17]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d9d1ca]" aria-hidden="true" />
                    <span>
                      {t}
                      {i === 0 && <Fn id="consultancy-estimate" />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#f0ebe6] p-7 sm:p-8 md:border-t-0">
              <p className="text-[13px] text-[#0f766e] mb-5">With Sanafin</p>
              <ul className="space-y-4">
                {withSanafin.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] sm:text-base leading-snug text-[#1f1a17]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14b8a6]" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {media.problemStill && (
            <img
              src={media.problemStill}
              alt="A row of small brass tokens, most tipped over, with a single teal marble resting apart from them"
              className="h-56 w-full object-cover"
              loading="lazy"
            />
          )}
          <p className="border-t border-[#f0ebe6] px-7 py-4 text-[13px] text-[#766d67] sm:px-8">
            Our target: a pilot scoped within two weeks of the first call. A Sanafin target, not a customer result.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
