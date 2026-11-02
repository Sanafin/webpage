import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { getSource } from "@/lib/sources"

// Dated, sourced regulatory events on one vertical timeline (Wise pattern), with a
// "Today" marker between the events that have happened and the one still to come.
// Three jurisdictions and four asset classes, because the breadth is the argument:
// each of them wrote the condition into law and left the settlement out.
const events = [
  {
    date: "Mar 2025",
    region: "United States",
    stat: "32 states",
    title: "CMS negotiated outcomes for gene therapy",
    body: "CMS negotiates outcomes-based agreements for 32 states, DC and Puerto Rico. It settles by rebate, over eleven years.",
    sources: [["cms-cgt", "CMS · CGT Access Model"]],
    past: true,
  },
  {
    date: "Jan 2026",
    region: "Germany",
    stat: "≥ 20%",
    title: "Outcome-linked pricing became law for apps",
    body: "At least 20% of an app's price must depend on measured performance (§ 134 SGB V). How it settles is left to the parties. No product has done it yet.",
    sources: [
      ["sgb5-134", "§ 134 SGB V"],
      ["bfarm-digig", "BfArM"],
      ["diga-report", "DiGA-Bericht 2025"],
    ],
    past: true,
  },
  {
    date: "Feb 2026",
    region: "Switzerland",
    stat: "CHF 350M",
    title: "A legal basis for outcome rebates on medicines opened",
    body: "Art. 52b E-KVG went to consultation with CHF 350M of annual savings attached — the first Swiss rule tying a medicine's price to the result.",
    sources: [["kvg-52b", "Art. 52b E-KVG"]],
    past: true,
  },
  {
    date: "Jul 2026",
    region: "Switzerland",
    stat: "MiGeL Ch. 40",
    title: "A reimbursement path opens, with a proof requirement",
    body: "Product group 40 opened for digital health applications. The first listing was admitted under evaluation only, to 31 December 2026.",
    sources: [["migel-40", "FOPH · MiGeL"]],
    past: true,
  },
  {
    date: "Jul 2026",
    region: "United States",
    stat: "Thresholds",
    title: "Chronic care payment tied to measured results",
    body: "The CMS ACCESS model starts. Payment depends on the share of patients meeting biomarker or PROM thresholds — well beyond drugs and devices.",
    sources: [["cms-access", "CMS · ACCESS model"]],
    past: true,
  },
  {
    date: "15 Apr 2027",
    region: "Germany",
    stat: "Evidence due",
    title: "The first outcome data falls due",
    body: "Fifteen months after the pricing rule, the first performance data is due. The deadlines do not line up, and nothing holds the money in between.",
    sources: [["sgb5-134", "§ 134 SGB V"]],
    past: false,
  },
] as const

export function WhyNowSection() {
  const todayIndex = events.findIndex((e) => !e.past)

  return (
    <section id="why-now" aria-labelledby="why-now-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[13px] text-[#766d67] mb-4">Why now</p>
            <h2 id="why-now-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17] mb-6">
              Three jurisdictions wrote the rule.
              <br />
              <span className="text-[#1f1a17]/45">None built the settlement.</span>
            </h2>
            <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660]">
              In two years the US, Germany and Switzerland moved from paying for access to paying for results —
              gene therapy, apps, medicines, chronic care. Every one wrote the condition and left out the settlement.
            </p>
          </Reveal>

          <ol className="relative border-l border-[#e3dcd5] pl-8 sm:pl-10">
            {events.map((e, i) => (
              <li key={e.title} className="relative">
                {i === todayIndex && (
                  <div className="relative mb-8 flex items-center gap-3" aria-label="Today, September 2026">
                    <span className="absolute -left-[41px] sm:-left-[49px] h-4 w-4 rounded-full border-4 border-[#fbfaf8] bg-[#14b8a6]" aria-hidden="true" />
                    <span className="rounded-full bg-[#14b8a6] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white">Today</span>
                    <span className="h-px flex-1 bg-[#14b8a6]/30" aria-hidden="true" />
                  </div>
                )}
                <Reveal delay={i * 0.05} className="pb-10 last:pb-0">
                  <span
                    className={`absolute -left-[37px] sm:-left-[45px] top-1.5 h-2.5 w-2.5 rounded-full ${e.past ? "bg-[#f15d22]" : "bg-[#d9d1ca]"}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-[13px] font-medium text-[#1f1a17]">{e.date}</span>
                    <span className="text-[13px] text-[#0f766e]">{e.region}</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-medium leading-snug text-[#1f1a17] mb-2">{e.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#6f6660] mb-3">{e.body}</p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-1">
                        {e.sources.map(([id, label]) => {
                          const s = getSource(id)
                          return (
                            <li key={id}>
                              <a
                                href={s.href ?? "#sources"}
                                target={s.href ? "_blank" : undefined}
                                rel={s.href ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-0.5 text-[12.5px] text-[#766d67] underline decoration-[#e3dcd5] underline-offset-2 hover:text-[#1f1a17]"
                              >
                                {label}
                                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <p className="font-display text-2xl sm:text-3xl text-[#1f1a17]/70 sm:text-right sm:pl-4">{e.stat}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
