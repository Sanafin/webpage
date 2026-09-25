import Image from "next/image"
import { backers, lois } from "@/lib/traction"

export function BackedBy() {
  return (
    <section id="backers" aria-label="Backers and partners" className="relative border-y border-[#efc2a5]/25 bg-white/40">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8c6a59] font-bold text-center md:text-left">
            Backed &amp; recognised by
          </p>
          <ul className="flex flex-1 flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-6">
            {backers.map((backer) => (
              <li key={backer.name} className="flex items-center">
                <Image
                  src={backer.logo}
                  alt={backer.name}
                  className="h-8 md:h-9 w-auto object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
                  style={{ width: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>

        {lois.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[#efc2a5]/25 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0f8f81] font-bold text-center md:text-left">
              Signed with
            </p>
            <ul className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-6">
              {lois.map((loi) => (
                <li key={loi.partner} className="flex items-center gap-3">
                  {loi.logo ? (
                    <Image src={loi.logo} alt={loi.partner} className="h-8 w-auto object-contain" style={{ width: "auto" }} />
                  ) : null}
                  <div>
                    <p className="text-sm font-semibold text-[#2f241f] leading-tight">{loi.partner}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#8c6a59]">{loi.detail}</p>
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
