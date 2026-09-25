import Image from "next/image"
import { FileSignature } from "lucide-react"
import { backers, lois } from "@/lib/traction"

export function BackedBy() {
  // Duplicated so the strip can loop seamlessly
  const strip = [...backers, ...backers, ...backers, ...backers]

  return (
    <section id="backers" aria-label="Backers and partners" className="relative bg-[#fbfaf8] pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[13px] text-[#a39a93] mb-8">Backed and recognised by</p>

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
                  className="h-8 md:h-9 w-auto object-contain grayscale opacity-55 transition duration-300 hover:grayscale-0 hover:opacity-100"
                  style={{ width: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>

        {lois.length > 0 && (
          <div className="mt-16">
            <p className="text-center text-[13px] text-[#a39a93] mb-6">
              {lois.length} signed letters of intent
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {lois.map((loi) => (
                <li
                  key={loi.partner}
                  className="flex items-start gap-3 rounded-2xl bg-[#f5f1ed] p-4"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#0f8f81] shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
                    <FileSignature className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium leading-tight text-[#1f1a17]">{loi.partner}</p>
                    <p className="mt-1 text-[12px] text-[#6f6660]">{loi.detail}</p>
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
