import Image from "next/image"
import Link from "next/link"
import { AppPreview, MobileContractCard } from "@/components/app-preview"
import { AwardBadge } from "@/components/award-badge"
import { HeroCtas } from "@/components/hero-ctas"
import { MomentStrip } from "@/components/moment-strip"
import { Reveal } from "@/components/reveal"
import { ScreenFrame } from "@/components/screen-frame"
import { media } from "@/lib/media"
import { backers, lois } from "@/lib/traction"

// Centred hero, Stripe/Mixpanel pattern: claim, two CTAs, one proof line, then the
// product floating on a soft glow with the recognition row beneath. Rendered on
// the server so the headline and CTAs are in the first HTML.
export function Hero() {
  // The awards are the emblems; the row lists the programmes behind them
  const heroBackers = backers.filter((b) => b.inHero && b.relationship !== "Award")

  return (
    <section id="top" className="relative overflow-hidden bg-[#fbfaf8] !pt-[8.75rem] !pb-0">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] blueprint-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black_20%,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-[3.6rem] lg:text-[4.3rem] text-[#1f1a17] mb-6">
            Pay for verified care,{" "}
            <br className="hidden sm:block" />
            from anywhere.
          </h1>

          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#6f6660] mb-9">
            The payer sets the money aside up front. It is paid out only when an independent check confirms the care
            worked.
          </p>

          <div className="flex flex-col items-center">
            <HeroCtas />
          </div>

          <p data-proof-row className="mt-6 text-[13px] text-[#766d67]">
            Started with metabolic health in Switzerland ·{" "}
            <Link href="#traction" className="underline decoration-[#d9d1ca] underline-offset-4 hover:text-[#1f1a17]">
              {lois.length} signed letters of intent
            </Link>
          </p>

        </div>

        {/* Product on a soft glow */}
        <Reveal className="relative mx-auto mt-12 md:mt-14 max-w-5xl pb-5 md:pb-6" delay={0.15}>
          <div className="pointer-events-none absolute -inset-x-6 -top-6 -bottom-5 overflow-hidden rounded-[32px] md:-inset-x-10 md:-top-8" aria-hidden="true">
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
          <div className="relative mx-auto mt-6 hidden max-w-4xl md:block">
            <MomentStrip />
          </div>
        </Reveal>

        {/* Recognition: the award emblem leads, the programmes follow (Intercom / Vanta
            pattern: badges grouped with recognition, not floated over the hero) */}
        <div
          id="recognition"
          className="mx-auto mt-14 flex max-w-5xl scroll-mt-28 flex-col items-center gap-8 border-t border-[#ece7e2] pt-10 md:mt-16 md:flex-row md:items-center md:justify-center md:gap-12"
        >
          <div className="flex shrink-0 items-center gap-5">
            <AwardBadge award="ventureKick" zoom={0.72} />
            <AwardBadge award="innovationBooster" zoom={0.72} />
          </div>
          <span className="hidden h-24 w-px bg-[#ece7e2] md:block" aria-hidden="true" />
          <div className="flex flex-col items-center gap-5 md:items-start">
            <p className="text-center text-[12px] text-[#766d67] md:text-left">
              Supported by Swiss innovation programmes · Research from ETH Zurich and HSG
            </p>
            <ul className="flex flex-wrap items-end justify-center gap-x-10 gap-y-6 md:justify-start">
              {heroBackers.map((b) => (
                <li key={b.name} className="flex flex-col items-center gap-2">
                  <Image src={b.logo} alt={b.name} className={`${b.logoClass ?? "h-8"} w-auto object-contain opacity-90`} style={{ width: "auto" }} />
                  <span className="text-[11px] text-[#766d67]">{b.relationship}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="h-8 md:h-12" aria-hidden="true" />
    </section>
  )
}
