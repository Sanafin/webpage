import { Fn } from "@/components/fn"
import { Reveal } from "@/components/reveal"

// Where the settlement layer goes after the proving ground. A stat row, not cards:
// the section above is a timeline and the one below is a split, so three numerals on
// hairlines keep the page from reading as another grid. Each pool is a ceiling on the
// money that could settle against an outcome, never a revenue forecast, and the
// caption says so once.

const stages = [
  {
    stage: "Proving ground",
    when: "Now",
    venue: "Digital therapeutics before listing · Switzerland",
    value: "CHF 6M",
    sourceId: "dtx-study-budgets",
    body: "Study budgets available a year, in a market where seven of eight published decisions were rejected for want of evidence.",
    bodySourceId: "foph-dga-decisions",
    why: "Cheapest place to prove that a funder will commit money to a threshold.",
  },
  {
    stage: "First revenue",
    when: "2029",
    venue: "Outcome-conditional drug payment · Switzerland, then Germany",
    value: "CHF 350M",
    sourceId: "kvg-52b",
    body: "Outcome rebates targeted a year under Art. 52b E-KVG, in consultation since February 2026.",
    why: "The same contract, two orders of magnitude more money per arrangement.",
  },
  {
    stage: "The destination",
    when: "2030",
    venue: "Advanced therapies · Europe, then the United States",
    value: "USD 5.9bn",
    sourceId: "atmp-spend",
    body: "Spent on cell and gene therapies in 2023, after averaging 65% annual growth over five years. Instalment payment is already the agreed model.",
    why: "Where paying first and reconciling later costs the most to get wrong.",
  },
]

export function MarketLadder() {
  return (
    <section id="market" aria-labelledby="market-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] text-[#766d67] mb-4">Where this goes</p>
            <h2 id="market-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              One settlement layer,
              <br />
              <span className="text-[#1f1a17]/45">three sizes of money.</span>
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660] lg:pb-2">
            The money waits for the outcome, whatever the outcome is about. We start where proof is cheapest and
            move to where paying first costs the most.
          </p>
        </Reveal>

        <ol className="border-t border-[#ece7e2]">
          {stages.map((s, i) => (
            <Reveal key={s.stage} delay={i * 0.05}>
              {/* Source order is stage → value → copy so the number leads when this stacks on
                  a phone. From md up, explicit column placement puts the value back on the
                  right without changing the DOM. Bodies are written to stand alone rather
                  than continue the numeral, so they read at either width. */}
              <li className="grid gap-3 border-b border-[#ece7e2] py-9 md:grid-cols-[13rem_1fr_auto] md:items-baseline md:gap-10">
                <div className="md:col-start-1 md:row-start-1">
                  <p className="text-[15px] font-medium text-[#1f1a17]">{s.stage}</p>
                  <p className="font-mono text-[12px] text-[#766d67]">{s.when}</p>
                </div>
                <p className="font-display text-4xl sm:text-5xl text-[#1f1a17] md:col-start-3 md:row-start-1 md:text-right">
                  {s.value}
                  <Fn id={s.sourceId} />
                </p>
                <div className="max-w-xl md:col-start-2 md:row-start-1">
                  <p className="text-[13px] text-[#0f766e] mb-2">{s.venue}</p>
                  <p className="text-[15px] sm:text-base leading-snug text-[#1f1a17]">
                    {s.body}
                    {s.bodySourceId && <Fn id={s.bodySourceId} />}
                  </p>
                  <p className="mt-2 text-[14px] leading-snug text-[#766d67]">{s.why}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mt-6 max-w-2xl text-[12.5px] leading-relaxed text-[#766d67]">
          Each figure is the money in play in that venue — a ceiling on what could settle against an outcome, not a
          forecast of what Sanafin earns. None of these programmes has a settlement layer today.
        </p>
      </div>
    </section>
  )
}
