import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { backers, lois, loiLabel } from "@/lib/traction"

// Design partners as hairline rows (a ledger, not a card grid) and recognition as
// one quiet logo row with the relationship spelled out. No logos or names for
// partners under NDA.
export function Recognition() {
  return (
    <section id="traction" aria-labelledby="traction-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] text-[#766d67] mb-4">Traction</p>
            <h2 id="traction-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              Shaped with Swiss care partners.
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-[#6f6660] lg:pb-2">
            Four organisations have signed letters of intent to validate Sanafin&apos;s workflows, and a clinical proof of
            concept is running. Partners are anonymised by agreement; signed letters are available to investors under NDA.
          </p>
        </Reveal>

        <ul className="border-t border-[#ece7e2]">
          {lois.map((loi) => (
            <li key={loi.partnerType} className="grid gap-2 border-b border-[#ece7e2] py-5 sm:grid-cols-[1.3fr_0.7fr_1fr_1fr] sm:items-baseline sm:gap-6">
              <p className="text-lg sm:text-xl text-[#1f1a17]">{loiLabel(loi)}</p>
              <p className="text-[13px] text-[#766d67]">
                Letter of intent{loi.signed ? ` · ${loi.signed}` : ""} · {loi.country}
              </p>
              <p className="text-[14px] text-[#6f6660]">{loi.focus}</p>
              <p className="text-[14px] text-[#0f766e] sm:text-right">{loi.status}</p>
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
