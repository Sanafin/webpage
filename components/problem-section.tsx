import { Fn } from "@/components/fn"
import { media } from "@/lib/media"

// Every figure here carries a footnote into lib/sources.ts or is labelled as a
// Sanafin estimate. Nothing unsourced ships.

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
    region: "Germany · DiGA, 2020–2025",
  },
  {
    value: "EUR 400 m",
    label: "paid by German statutory insurers for prescription apps, with a 59% average price cut at negotiation",
    sourceId: "diga-report",
    region: "Germany · DiGA, 2020–2025",
  },
]

const today = [
  "Evidence is assembled by hand for each payer, at CHF 100k to 250k a project.",
  "Switzerland has no trial phase: no payer money moves before a listing exists.",
  "A verdict lives in a consultant's spreadsheet that nobody else can re-run.",
]

const withSanafin = [
  "A funder commits money to the outcome up front, held by a licensed custody partner.",
  "The result is verified against the pre-agreed threshold with WZW-native scoring.",
  "The proof can be re-computed by either side from the exported file alone.",
]

export function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] font-medium text-[#c4460f] mb-4">The problem</p>
            <h2 id="problem-title" className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17]">
              Reimbursement is no longer the hard part. Proving the outcome is.
            </h2>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#766d67] lg:pb-2">
            Payers in Germany and Switzerland now ask digital health products to show a measured effect before, and
            after, they are paid. The money to produce that evidence only arrives once the evidence exists.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facts.map((f) => (
            <li key={f.value + f.label} className="flex min-h-[220px] flex-col justify-between rounded-3xl bg-[#f5f1ed] p-7">
              <p className="text-[12px] text-[#766d67]">{f.region}</p>
              <div>
                <p className="font-display text-5xl sm:text-6xl text-[#1f1a17]">
                  {f.value}
                  <Fn id={f.sourceId} />
                </p>
                <p className="mt-3 text-[14px] leading-snug text-[#6f6660]">{f.label}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div className="rounded-3xl border border-[#ece7e2] bg-white p-7">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#766d67] mb-5">Today</p>
            <ul className="space-y-4">
              {today.map((t, i) => (
                <li key={t} className="flex gap-3 text-[15px] leading-snug text-[#1f1a17]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d9d1ca]" aria-hidden="true" />
                  <span>
                    {t}
                    {i === 0 && <Fn id="consultancy-estimate" />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-[#1f1a17] p-7 text-white">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/60 mb-5">With Sanafin</p>
            <ul className="space-y-4">
              {withSanafin.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14b8a6]" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-3xl bg-[#ebe4db]">
            {media.problemStill ? (
              <img
                src={media.problemStill}
                alt="A row of small brass tokens, most tipped over, with a single teal marble resting apart from them"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#efe8df] to-[#e4dbcf]" aria-hidden="true" />
            )}
            <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 px-4 py-3 text-[13px] leading-snug text-[#1f1a17] backdrop-blur">
              Our target: a pilot scoped within two weeks of the first call. A Sanafin target, not a customer result.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
