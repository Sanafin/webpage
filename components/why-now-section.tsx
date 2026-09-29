import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { getSource } from "@/lib/sources"

// Dated, sourced regulatory events on one vertical timeline (Wise pattern), with a
// "Today" marker between the events that have happened and the one still to come.
const events = [
  {
    date: "Jan 2026",
    region: "Germany",
    stat: "≥ 20%",
    title: "Outcome-linked pricing became law",
    body: "At least 20% of a prescription app's price must now depend on measured performance (§ 134 SGB V). No product has implemented it yet.",
    sources: [
      ["sgb5-134", "§ 134 SGB V"],
      ["bfarm-digig", "BfArM"],
      ["diga-report", "DiGA-Bericht 2025"],
    ],
    past: true,
  },
  {
    date: "Jan 2026",
    region: "Switzerland",
    stat: "TARDOC",
    title: "Cost containment becomes the organising principle",
    body: "TARDOC and flat rates replaced TARMED, with a mandatory electronic invoice standard. Every new digital service has to fit this rail.",
    sources: [["tardoc", "OAAT"]],
    past: true,
  },
  {
    date: "Jul 2026",
    region: "Switzerland",
    stat: "MiGeL Ch. 40",
    title: "A reimbursement path opens, with a proof requirement",
    body: "Product group 40 opened for digital health applications. The first listing was admitted under evaluation only, judged on effectiveness, appropriateness and economy.",
    sources: [["migel-40", "FOPH · MiGeL"]],
    past: true,
  },
  {
    date: "31 Dec 2026",
    region: "Switzerland",
    stat: "Evidence due",
    title: "The federal question on dGA cost-effectiveness closes",
    body: "The first admission's evaluation ends. Whatever evidence exists by then sets the bar for everyone who follows.",
    sources: [["migel-40", "FOPH · MiGeL"]],
    past: false,
  },
  {
    date: "2027",
    region: "European Union",
    stat: "EHDS",
    title: "Health data becomes portable",
    body: "The European Health Data Space applies in stages from 2027, patient summaries from 2029.",
    sources: [["ehds", "EUR-Lex"]],
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
              Outcome evidence
              <br />
              <span className="text-[#1f1a17]/45">stopped being optional.</span>
            </h2>
            <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660]">
              Germany and Switzerland moved from paying for access to paying for results, with dates attached. Today that proof is still produced by hand.
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
