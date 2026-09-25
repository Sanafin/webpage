import Image from "next/image"
import { FileSignature } from "lucide-react"
import { backers, lois } from "@/lib/traction"

export function BackedBy() {
  // Duplicated so the strip can loop seamlessly
  const strip = [...backers, ...backers, ...backers, ...backers]

  return (
    <section id="backers" aria-label="Backers and partners" className="relative bg-[#120d0b] text-[#fffaf6] pb-20 md:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#fffaf6]/45 font-bold text-center mb-8">
          Backed &amp; recognised by
        </p>

        <div
          className="marquee relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <ul className="marquee-track flex w-max items-center gap-16 md:gap-24">
            {strip.map((backer, i) => (
              <li key={`${backer.name}-${i}`} className="flex shrink-0 items-center" aria-hidden={i >= backers.length}>
                <Image
                  src={backer.logo}
                  alt={i < backers.length ? backer.name : ""}
                  className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-55 transition-opacity duration-300 hover:opacity-100"
                  style={{ width: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>

        {lois.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#14B8A6]/60" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] font-bold">
                {lois.length} signed letters of intent
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#14B8A6]/60" aria-hidden="true" />
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {lois.map((loi) => (
                <li
                  key={loi.partner}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-[#14B8A6]/40 hover:bg-white/[0.06]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#14B8A6]/15 text-[#14B8A6]">
                    <FileSignature className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight">{loi.partner}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#fffaf6]/50">{loi.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
