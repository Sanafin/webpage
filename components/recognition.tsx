import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { backers, lois, loiLabel, pathway } from "@/lib/traction"

// Design partners on one shared pathway, letter of intent → proof of concept →
// implementation → scale. Each row is a track showing how far that partnership has
// come. Names stay anonymised under NDA; recognition is one quiet logo row.
export function Recognition() {
  const n = pathway.length
  return (
    <section id="traction" aria-labelledby="traction-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] text-[#766d67] mb-4">Traction</p>
            <h2 id="traction-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              Four partners, one pathway.
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660] lg:pb-2">
            Every partnership moves from a signed letter to a proof of concept, then into care and across sites.
            Anonymised by agreement; letters available to investors under NDA.
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
          {lois.map((loi) => (
            <li key={loi.partnerType} className="grid gap-4 border-b border-[#ece7e2] py-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] md:items-center md:gap-10">
              <div>
                <p className="text-lg sm:text-xl text-[#1f1a17]">{loiLabel(loi)}</p>
                <p className="mt-1 text-[13px] text-[#766d67]">
                  {loi.focus}
                  {loi.signed ? ` · signed ${loi.signed}` : ""}
                </p>
              </div>

              {/* Track */}
              <div className="relative" role="img" aria-label={`${loiLabel(loi)}: ${pathway[loi.stage - 1]}, ${loi.status}`}>
                <div className="grid items-center" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                  {pathway.map((stage, i) => {
                    const idx = i + 1
                    const reached = idx < loi.stage
                    const current = idx === loi.stage
                    return (
                      <div key={stage} className="relative flex h-8 items-center">
                        {/* segment line */}
                        {idx < n && (
                        <span
                          className={`absolute inset-y-1/2 left-0 right-0 h-px -translate-y-1/2 ${
                            idx < loi.stage ? "bg-[#14b8a6]" : idx === loi.stage ? "bg-gradient-to-r from-[#14b8a6] to-[#ece7e2]" : "bg-[#ece7e2]"
                          }`}
                          aria-hidden="true"
                        />
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
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#14b8a6]/10 px-2.5 py-1 text-[11.5px] font-medium text-[#0f766e]">
                            {loi.status}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="mt-2 text-[12px] text-[#766d67] md:hidden">
                  {pathway[loi.stage - 1]} · {loi.status}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[#766d67]">Recognised by Swiss innovation programmes</p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {backers.map((b) => (
              <li key={b.name} className="flex items-center gap-3">
                <Image src={b.logo} alt={b.name} className="h-7 w-auto object-contain opacity-80" style={{ width: "auto" }} />
                <span className="text-[12px] text-[#766d67]">
                  {b.relationship}
                  {b.sourceUrl && (
                    <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center hover:text-[#1f1a17]" aria-label={`${b.name} source`}>
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
