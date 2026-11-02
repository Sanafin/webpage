import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { publications } from "@/lib/research"

// The research behind Sanafin, as a calm index (Cartesia / OpenAI research pattern):
// a short intro with the numbers, the four EDEN principles, the four phases, then
// every publication grouped by year. Same tokens and closing band as the landing page.

const principles = [
  { letter: "E", label: "Enforceable" },
  { letter: "D", label: "Deterministic" },
  { letter: "E", label: "Evidence-based" },
  { letter: "N", label: "Neutral" },
]

const phases = [
  { name: "Reach", line: "Find the people at risk." },
  { name: "Retain", line: "Keep them in the programme." },
  { name: "Report", line: "Measure the outcome." },
  { name: "Reimburse", line: "Pay on the verified result." },
]

const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => Number(b) - Number(a))
const span = `${years[years.length - 1]}–${years[0]}`

export default function EdenFrameworkPage() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />

        <main id="main" className="landing-page">
          {/* Intro */}
          <section className="relative !pt-36 md:!pt-44">
            <div className="max-w-7xl mx-auto px-6">
              <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
                <div>
                  <p className="text-[13px] text-[#766d67] mb-4">EDEN framework</p>
                  <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-[3.6rem] text-[#1f1a17]">
                    The research behind Sanafin.
                  </h1>
                </div>
                <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660] lg:pb-2">
                  EDEN is our framework for paying for prevention on verified outcomes, developed at ETH Zurich and HSG.
                </p>
              </Reveal>

              <dl className="mt-14 grid grid-cols-3 divide-x divide-[#ece7e2] border-y border-[#ece7e2]">
                {[
                  [String(publications.length), "publications"],
                  [span, "research period"],
                  ["ETH · HSG", "where it was done"],
                ].map(([value, label]) => (
                  <div key={label} className="px-4 py-8 text-center sm:py-10">
                    <dt className="sr-only">{label}</dt>
                    <dd className="whitespace-nowrap font-display text-2xl tabular-nums text-[#1f1a17] sm:text-5xl">{value}</dd>
                    <dd className="mt-2 text-[13px] text-[#766d67]">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Principles and phases */}
          <section aria-labelledby="eden-how-title">
            <div className="max-w-7xl mx-auto px-6">
              <Reveal className="mx-auto mb-12 max-w-2xl text-center">
                <h2 id="eden-how-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
                  Four principles, four phases.
                </h2>
              </Reveal>

              <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {principles.map((p, i) => (
                  <li key={`${p.letter}-${i}`} className="rounded-3xl bg-[#f5f1ed] px-6 py-8 text-center">
                    <p className="font-display text-5xl text-[#1f1a17]">{p.letter}</p>
                    <p className="mt-2 text-[14px] text-[#6f6660]">{p.label}</p>
                  </li>
                ))}
              </ul>

              <ol className="mt-4 grid gap-4 rounded-3xl border border-[#ece7e2] bg-white p-6 sm:p-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#f0ebe6]">
                {phases.map((p, i) => (
                  <li key={p.name} className="md:px-6 md:first:pl-0 md:last:pr-0">
                    <p className="font-mono text-[11px] text-[#b5aaa0]">0{i + 1}</p>
                    <p className="mt-1 text-lg font-medium text-[#1f1a17]">{p.name}</p>
                    <p className="mt-1 text-[14px] text-[#6f6660]">{p.line}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Publications, indexed by year */}
          <section id="publications" aria-labelledby="publications-title" className="scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
              <Reveal className="mb-10">
                <h2 id="publications-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
                  Publications
                </h2>
              </Reveal>

              <div className="border-t border-[#ece7e2]">
                {years.map((year) => (
                  <div key={year} className="grid gap-4 border-b border-[#ece7e2] py-8 md:grid-cols-[12rem_1fr] md:gap-10">
                    <p className="font-display text-4xl text-[#1f1a17]/40">{year}</p>
                    <ul className="divide-y divide-[#f0ebe6]">
                      {publications
                        .filter((p) => p.year === year)
                        .map((p) => (
                          <li key={p.doi}>
                            <a
                              href={`https://doi.org/${p.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-start justify-between gap-6 py-4 first:pt-0"
                            >
                              <span>
                                <span className="block text-[17px] leading-snug text-[#1f1a17] group-hover:underline group-hover:decoration-[#d9d1ca] group-hover:underline-offset-4">
                                  {p.title}
                                </span>
                                <span className="mt-1 block text-[13px] text-[#766d67]">
                                  {p.authors}
                                  {p.venue ? ` · ${p.venue}` : ""}
                                </span>
                              </span>
                              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#766d67] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-[#766d67]">
                Research carried out by the founding team at ETH Zurich, the University of St. Gallen and HOCH Ostschweiz.
                Institutions do not endorse Sanafin.
              </p>
            </div>
          </section>

          <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  )
}
