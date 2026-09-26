import { ArrowUpRight } from "lucide-react"
import { getSource } from "@/lib/sources"

// Dated, sourced regulatory events on one ruler. Cards stay in chronological order;
// the teal marker is today (September 2026).
const events = [
  {
    date: "Jan 2026",
    region: "Germany",
    stat: "≥ 20%",
    statLabel: "of a DiGA's price tied to measured performance",
    title: "Outcome-linked pricing became law",
    body: "Under the Digital Act, at least 20% of a prescription app's reimbursement price must depend on measured performance. § 134 SGB V applies to agreements from 1 January 2026; BfArM describes new agreements from 1 July 2026. Germany's own payer report notes no product has implemented one yet.",
    sources: [
      ["sgb5-134", "§ 134 SGB V"],
      ["bfarm-digig", "BfArM"],
      ["diga-report", "DiGA-Bericht 2025"],
    ],
    pos: 6,
  },
  {
    date: "Jan 2026",
    region: "Switzerland",
    stat: "TARDOC",
    statLabel: "replaces TARMED for outpatient care",
    title: "Cost containment becomes the organising principle",
    body: "The new outpatient tariff and flat rates took effect on 1 January 2026, alongside a mandatory electronic invoice standard. Every new digital service has to fit this rail.",
    sources: [["tardoc", "OAAT"]],
    pos: 18,
  },
  {
    date: "Jul 2026",
    region: "Switzerland",
    stat: "Ch. 40",
    statLabel: "digital health applications enter MiGeL",
    title: "A reimbursement path opens, with a proof requirement",
    body: "Product group 40 opened for digital health applications. The first listing, a digital CBT programme, was admitted under evaluation only, and applicants are judged on effectiveness, appropriateness and economic efficiency.",
    sources: [["migel-40", "FOPH · MiGeL"]],
    pos: 52,
  },
  {
    date: "31 Dec 2026",
    region: "Switzerland",
    stat: "Evidence due",
    statLabel: "the first listing's evaluation period ends",
    title: "The federal question on dGA cost-effectiveness closes",
    body: "That first admission runs under evaluation to 31 December 2026. Whatever evidence exists by then sets the bar for everyone who follows.",
    sources: [["migel-40", "FOPH · MiGeL"]],
    pos: 82,
  },
  {
    date: "2027",
    region: "European Union",
    stat: "EHDS",
    statLabel: "health data rules start to apply",
    title: "Health data becomes portable",
    body: "The European Health Data Space regulation entered into force in March 2025. It applies in stages from 2027, with patient summaries from 2029.",
    sources: [["ehds", "EUR-Lex"]],
    pos: 96,
  },
] as const

const TODAY_POS = 66 // late September 2026 on a Jan 2026 → early 2027 ruler

export function WhyNowSection() {
  return (
    <section id="why-now" aria-labelledby="why-now-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] font-medium text-[#c4460f] mb-4">Why now</p>
            <h2 id="why-now-title" className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17]">
              Outcome evidence stopped being optional in 2026.
            </h2>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#766d67] lg:pb-2">
            In Europe&apos;s two largest German-speaking health markets, reimbursement moved from paying for access to
            paying for results, with dates attached. Today that proof is produced by hand, one contract at a time.
          </p>
        </div>

        {/* Ruler */}
        <div className="relative mb-8 hidden md:block" aria-hidden="true">
          <div className="ruler-line h-px w-full" />
          {events.map((e) => (
            <span
              key={e.title}
              className="absolute -top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#c4460f]"
              style={{ left: `${e.pos}%` }}
            />
          ))}
          <span className="absolute -top-2.5 flex -translate-x-1/2 flex-col items-center" style={{ left: `${TODAY_POS}%` }}>
            <span className="h-5 w-0.5 bg-[#14b8a6]" />
            <span className="mt-1 rounded-full bg-[#14b8a6] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">Today</span>
          </span>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:pt-6">
          {events.map((e) => (
            <li key={e.title} className="flex flex-col rounded-3xl border border-[#ece7e2] bg-white p-6">
              <div className="mb-6 flex items-center justify-between text-[12px] font-medium">
                <span className="text-[#0f766e]">{e.region}</span>
                <span className="text-[#766d67]">{e.date}</span>
              </div>
              <p className="font-display text-4xl leading-none text-[#1f1a17] mb-2">{e.stat}</p>
              <p className="text-[12px] text-[#766d67] mb-6">{e.statLabel}</p>
              <h3 className="text-[16px] font-medium leading-snug text-[#1f1a17] mb-2">{e.title}</h3>
              <p className="flex-1 text-[13.5px] leading-relaxed text-[#6f6660] mb-5">{e.body}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {e.sources.map(([id, label]) => {
                  const s = getSource(id)
                  return (
                    <li key={id}>
                      <a
                        href={s.href ?? "#sources"}
                        target={s.href ? "_blank" : undefined}
                        rel={s.href ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-0.5 text-[12px] text-[#766d67] underline decoration-[#e3dcd5] underline-offset-2 hover:text-[#1f1a17]"
                      >
                        {label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
