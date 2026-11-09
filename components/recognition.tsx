import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Grow, Words } from "@/components/fx"
import { publications } from "@/lib/research"
import { lois, loiLabel, pathway } from "@/lib/traction"

// The three metabolic-health papers the template is built on, newest first.
const metabolicResearch = publications.filter((p) => /diabet/i.test(p.title))

// Design partners on one shared pathway, letter of intent → proof of concept →
// implementation → scale. Each row is a track showing how far that partnership has
// come, and each track draws itself in stage by stage on first view. Names stay
// anonymised under NDA; recognition is one quiet logo row.
export function Recognition() {
  const n = pathway.length
  return (
    <section id="traction" aria-labelledby="traction-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <h2 id="traction-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              <Words text="Proven first in Swiss metabolic health." />
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660] lg:pb-2">
            Swiss reimbursement is among Europe&apos;s strictest, so we started here.
          </p>
        </Reveal>

        {/* Stage header */}
        <div className="hidden md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] md:gap-10 border-b border-[#ece7e2] pb-3">
          <span className="text-[12px] text-[#766d67]">Partner</span>
          <ol className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {pathway.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2 text-[12px] text-[#766d67]">
                <span className="font-mono text-[11px]">0{i + 1}</span>
                {stage}
              </li>
            ))}
          </ol>
        </div>

        <ul>
          {lois.map((loi, rowIndex) => (
            <Reveal as="li" key={loi.partnerType} delay={rowIndex * 0.1} className="grid gap-4 py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] md:items-center md:gap-10">
              <div>
                <p className="text-lg sm:text-xl text-[#1f1a17]">{loiLabel(loi)}</p>
                <p className="mt-1 text-[13px] text-[#766d67]">
                  {loi.focus}
                  {loi.signed ? ` · signed ${loi.signed}` : ""}
                </p>
              </div>

              {/* Track */}
              <div className="relative pb-6" role="img" aria-label={`${loiLabel(loi)}: ${pathway[loi.stage - 1]}, ${loi.status}`}>
                <div className="grid items-center" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                  {pathway.map((stage, i) => {
                    const idx = i + 1
                    const reached = idx < loi.stage
                    const current = idx === loi.stage
                    return (
                      <div key={stage} className="relative flex h-6 items-center">
                        {/* segment line */}
                        {idx < n && (
                          <>
                            <span className="absolute inset-y-1/2 left-0 right-0 h-px -translate-y-1/2 bg-[#ece7e2]" aria-hidden="true" />
                            {/* The reached part of the track draws itself in, one stage after the other */}
                            {idx <= loi.stage && (
                              <Grow
                                className={`absolute inset-y-1/2 left-0 right-0 h-px -translate-y-1/2 ${
                                  idx < loi.stage ? "bg-[#14b8a6]" : "bg-gradient-to-r from-[#14b8a6] to-[#ece7e2]"
                                }`}
                                delay={0.25 + rowIndex * 0.1 + i * 0.22}
                                duration={0.6}
                              />
                            )}
                          </>
                        )}
                        {/* node */}
                        <span
                          className={`relative z-10 inline-block rounded-full ${
                            current
                              ? "h-3.5 w-3.5 bg-[#14b8a6] ring-4 ring-[#14b8a6]/15"
                              : reached
                                ? "h-2.5 w-2.5 bg-[#14b8a6]"
                                : "h-2.5 w-2.5 border border-[#d9d1ca] bg-[#fbfaf8]"
                          }`}
                          aria-hidden="true"
                        />
                        {current && (
                          <span className="absolute left-0 top-full mt-2 hidden whitespace-nowrap text-[12px] font-medium text-[#0f766e] md:block">
                            {loi.status}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="mt-7 text-[12px] text-[#766d67] md:hidden">
                  {pathway[loi.stage - 1]} · {loi.status}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-2 text-[12px] text-[#766d67]">Partner names withheld by agreement · letters shared with investors under NDA</p>

        <div className="mt-14 grid gap-6 border-t border-[#ece7e2] pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-10">
          <p className="text-[13px] text-[#766d67]">Research · ETH Zurich and HSG</p>
          <ul className="divide-y divide-[#ece7e2]">
            {metabolicResearch.map((p) => (
              <li key={p.doi} className="py-3 first:pt-0">
                <a
                  href={`https://doi.org/${p.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-1 text-[15px] leading-snug text-[#1f1a17] hover:underline hover:decoration-[#d9d1ca] hover:underline-offset-4"
                >
                  {p.title}
                  <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#766d67]" aria-hidden="true" />
                </a>
                <p className="mt-0.5 text-[13px] text-[#766d67]">
                  {p.venue ? `${p.venue} · ` : ""}
                  {p.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
