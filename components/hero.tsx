import Image from "next/image"
import Link from "next/link"
import { AppPreview, MobileContractCard } from "@/components/app-preview"
import { HeroCtas } from "@/components/hero-ctas"
import { MomentStrip } from "@/components/moment-strip"
import { Reveal } from "@/components/reveal"
import { ScreenFrame } from "@/components/screen-frame"
import { media } from "@/lib/media"
import { backers, lois } from "@/lib/traction"
import innoBooster from "@/components/ui/logo/innobooster.png"

// Centred hero, Stripe/Mixpanel pattern: claim, two CTAs, one proof line, then the
// product floating on a soft glow with the recognition row beneath. Rendered on
// the server so the headline and CTAs are in the first HTML.
export function Hero() {
  const heroBackers = backers.filter((b) => b.inHero)

  return (
    <section id="top" className="relative overflow-hidden bg-[#fbfaf8] pt-36 md:pt-44 !pb-0">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] blueprint-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black_20%,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Link
            href="#traction"
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#e9e4df] bg-white py-1.5 pl-2 pr-4 text-[13px] text-[#6f6660] transition-colors hover:border-[#d9d1ca] hover:text-[#1f1a17]"
          >
            <Image src={innoBooster} alt="" className="h-5 w-auto" style={{ width: "auto" }} />
            <span className="h-3.5 w-px bg-[#e9e4df]" aria-hidden="true" />
            <span className="hidden sm:inline">Innovation Booster Sustainable Digital Finance · Winner</span>
            <span className="sm:hidden">Innovation Booster winner</span>
          </Link>

          <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-[3.6rem] lg:text-[4.3rem] text-[#1f1a17] mb-6">
            Money moves{" "}
            <br className="hidden sm:block" />
            <span className="font-serif italic font-normal text-[#1f1a17]/55">when outcomes do.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#6f6660] mb-9">
            A funder commits money to a digital health outcome before it happens. Sanafin verifies the result against
            Swiss WZW criteria and instructs settlement the moment the agreed threshold is met. Funds sit with a licensed
            custody partner, never with Sanafin.
          </p>

          <div className="flex flex-col items-center">
            <HeroCtas />
          </div>

          <p data-proof-row className="mt-7 text-[13px] text-[#766d67]">
            For Swiss digital health manufacturers and the insurers, employers and hospitals who fund their evidence ·{" "}
            <Link href="#traction" className="underline decoration-[#d9d1ca] underline-offset-4 hover:text-[#1f1a17]">
              {lois.length} signed letters of intent
            </Link>
          </p>
        </div>

        {/* Product on a soft glow */}
        <Reveal className="relative mx-auto mt-16 md:mt-20 max-w-5xl pb-6 md:pb-8" delay={0.15}>
          <div className="pointer-events-none absolute -inset-x-24 -top-16 -bottom-6 overflow-hidden rounded-[48px]" aria-hidden="true">
            {media.heroPlate ? (
              <img src={media.heroPlate} alt="" className="h-full w-full object-cover opacity-90" />
            ) : (
              <>
                <div className="absolute left-[10%] top-[10%] h-[70%] w-[45%] rounded-full bg-[#ffb08a]/40 blur-[90px]" />
                <div className="absolute right-[8%] top-[20%] h-[70%] w-[45%] rounded-full bg-[#9ee6dc]/45 blur-[90px]" />
              </>
            )}
          </div>
          <div className="relative hidden md:block">
            <ScreenFrame kind="illustrative" hideCaption>
              <AppPreview />
            </ScreenFrame>
          </div>
          <div className="relative md:hidden mx-auto max-w-sm">
            <ScreenFrame kind="illustrative">
              <MobileContractCard />
            </ScreenFrame>
          </div>
          <div className="relative mx-auto mt-6 max-w-4xl">
            <MomentStrip />
          </div>
        </Reveal>

        {/* Recognition row */}
        <div className="mx-auto mt-14 md:mt-16 flex max-w-4xl flex-col items-center gap-5 border-t border-[#ece7e2] pt-8">
          <p className="text-[12px] text-[#766d67]">Recognised by Swiss innovation programmes · Research from ETH Zurich and HSG</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {heroBackers.map((b) => (
              <li key={b.name} className="flex items-center">
                <Image src={b.logo} alt={b.name} className="h-7 w-auto object-contain opacity-80" style={{ width: "auto" }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-8 md:h-12" aria-hidden="true" />
    </section>
  )
}
