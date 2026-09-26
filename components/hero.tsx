import Image from "next/image"
import Link from "next/link"
import { AppPreview, MobileContractCard } from "@/components/app-preview"
import { HeroCtas } from "@/components/hero-ctas"
import { ScreenFrame } from "@/components/screen-frame"
import { Laurel } from "@/components/ui/laurel"
import { media } from "@/lib/media"
import { site } from "@/lib/site"
import { backers, lois } from "@/lib/traction"

// Server-rendered hero: the headline, CTAs and proof row are in the HTML before
// any JavaScript runs. Left five columns sell, right seven show the product.
export function Hero() {
  const heroBackers = backers.filter((b) => b.inHero)

  return (
    <section id="top" className="relative overflow-hidden bg-[#fbfaf8] pt-28 md:pt-36 lg:pt-32 !pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Link
              href="#traction"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e9e4df] bg-white px-4 py-1.5 text-[13px] text-[#766d67] transition-colors hover:border-[#d9d1ca] hover:text-[#1f1a17]"
            >
              <Laurel className="h-4 w-auto text-[#c7a98f]" />
              <span className="hidden sm:inline">Winner, Innovation Booster Sustainable Digital Finance</span>
              <span className="sm:hidden">Innovation Booster award winner</span>
              <Laurel className="h-4 w-auto text-[#c7a98f]" flip />
            </Link>

            <p className="mb-3 text-[13px] font-medium text-[#c4460f]">
              For digital health manufacturers seeking Swiss reimbursement, and the funders behind their evidence
            </p>

            <h1 className="font-display text-[2.5rem] leading-[1.04] sm:text-[3.2rem] lg:text-[3.25rem] xl:text-[3.6rem] 2xl:text-[3.9rem] text-[#1f1a17] mb-5">
              Money moves{" "}
              <br />
              <span className="text-[#1f1a17]/60">when outcomes do.</span>
            </h1>

            <p className="max-w-xl text-base lg:text-[15.5px] xl:text-[17px] leading-relaxed text-[#6f6660] mb-7">
              {site.positioning}
            </p>

            <HeroCtas />

            {/* Proof row */}
            <div data-proof-row className="mt-8 border-t border-[#ece7e2] pt-5">
              <p className="text-[12px] text-[#766d67] mb-3">Recognised by</p>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {heroBackers.map((b) => (
                  <li key={b.name} className="flex items-center">
                    <Image src={b.logo} alt={b.name} className="h-6 w-auto object-contain" style={{ width: "auto" }} />
                  </li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-2">
                <li>
                  <Link href="#traction" className="inline-flex items-center rounded-full bg-[#f5f1ed] px-3 py-1 text-[12px] text-[#1f1a17] hover:bg-[#ece7e2]">
                    {lois.length} signed letters of intent
                  </Link>
                </li>
                <li>
                  <Link href="#team" className="inline-flex items-center rounded-full bg-[#f5f1ed] px-3 py-1 text-[12px] text-[#1f1a17] hover:bg-[#ece7e2]">
                    Research from ETH Zurich · HSG · Imperial
                  </Link>
                </li>
                <li className="hidden 2xl:block">
                  <Link href="#how" className="inline-flex items-center rounded-full bg-[#f5f1ed] px-3 py-1 text-[12px] text-[#1f1a17] hover:bg-[#ece7e2]">
                    Sanafin never holds funds
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Product */}
          <div className="relative lg:col-span-7">
            <div
              className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 overflow-hidden rounded-[40px] lg:-right-[20vw]"
              aria-hidden="true"
            >
              {media.heroPlate ? (
                <img src={media.heroPlate} alt="" className="h-full w-full object-cover object-left" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[#f5f1ed]" />
                  <div className="absolute left-[10%] top-[10%] h-[70%] w-[45%] rounded-full bg-[#ffb08a]/40 blur-[90px]" />
                  <div className="absolute right-[8%] top-[20%] h-[70%] w-[45%] rounded-full bg-[#9ee6dc]/45 blur-[90px]" />
                </>
              )}
            </div>

            <div className="hidden md:block lg:w-[112%]">
              <ScreenFrame kind="illustrative" tilt hideCaption>
                <AppPreview />
              </ScreenFrame>
            </div>
            <div className="md:hidden mx-auto max-w-sm">
              <ScreenFrame kind="illustrative">
                <MobileContractCard />
              </ScreenFrame>
            </div>
          </div>
        </div>
      </div>
      <div className="h-14 md:h-20" aria-hidden="true" />
    </section>
  )
}
