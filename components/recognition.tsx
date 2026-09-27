import Image from "next/image"
import { ArrowUpRight, Building2, FlaskConical, HeartPulse, Smartphone } from "lucide-react"
import { backers, lois, loiLabel } from "@/lib/traction"

const kindIcon = {
  hospital: Building2,
  "digital-health": Smartphone,
  university: FlaskConical,
  provider: HeartPulse,
} as const

// Recognition ledger and design-partner fact sheets. Static, specific, and honest
// about what each relationship is. No logos or names for partners under NDA.
export function Recognition() {
  return (
    <section id="traction" aria-labelledby="traction-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] font-medium text-[#f15d22] mb-4">Traction</p>
            <h2 id="traction-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              Shaped with
              <br />
              <span className="text-[#1f1a17]/45">Swiss care partners.</span>
            </h2>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#766d67] lg:pb-2">
            Four organisations have signed letters of intent to validate Sanafin&apos;s workflows, and a clinical
            proof of concept is running. Partners are anonymised by agreement; signed letters are available to
            investors under NDA.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lois.map((loi) => {
            const Icon = kindIcon[loi.kind]
            return (
              <li key={loi.partnerType} className="flex flex-col rounded-3xl bg-[#f5f1ed] p-6">
                <p className="text-[12px] text-[#766d67] mb-5">
                  Letter of intent{loi.signed ? ` · signed ${loi.signed}` : " · signed"}
                </p>
                <div className="mb-6 flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e] shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl leading-tight text-[#1f1a17]">{loiLabel(loi)}</h3>
                </div>
                <dl className="mt-auto space-y-2.5 border-t border-[#e9e2db] pt-4 text-[13px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#766d67]">Country</dt>
                    <dd className="text-right text-[#1f1a17]">{loi.country}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#766d67]">Focus</dt>
                    <dd className="text-right text-[#1f1a17]">{loi.focus}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#766d67]">Status</dt>
                    <dd className="text-right text-[#0f766e]">{loi.status}</dd>
                  </div>
                </dl>
              </li>
            )
          })}
        </ul>

        <div className="mt-16">
          <p className="text-[13px] text-[#766d67] mb-6">Recognised by Swiss innovation programmes</p>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {backers.map((b) => (
              <li key={b.name} className="flex flex-col justify-between gap-6 rounded-3xl border border-[#ece7e2] bg-white p-6">
                <Image src={b.logo} alt={b.name} className="h-8 w-auto self-start object-contain" style={{ width: "auto" }} />
                <div>
                  <p className="text-[12px] text-[#766d67]">
                    {b.relationship}
                    {b.year ? ` · ${b.year}` : ""}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-[#1f1a17]">{b.description}</p>
                  {b.sourceUrl && (
                    <a
                      href={b.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-0.5 text-[12px] text-[#766d67] hover:text-[#1f1a17]"
                    >
                      Source
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
