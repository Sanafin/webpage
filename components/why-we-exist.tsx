import { Fn } from "@/components/fn"
import { Reveal } from "@/components/reveal"
import { DotGrid } from "@/components/dot-grid"
import { Parallax } from "@/components/fx"

// Why we exist, lifted from the deck: one patient, one number, one sentence. The only
// dark band on the page. The 100-dot grid is the artefact: 46 teal, 54 muted, read
// left to right, so the figure is seen before it is read.
const REMISSION = 46

export function WhyWeExist() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative !py-0">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-[#1f1a17] text-white">
          <Parallax className="absolute -inset-y-10 inset-x-0" from={-28} to={28}>
            <img
              src="/media/why-patient.webp"
              alt="A woman at home eating a bowl of fruit with a strawberry on her spoon, photo posed by a model"
              className="h-full w-full object-cover object-[65%_center] opacity-80 md:opacity-100"
              loading="lazy"
            />
          </Parallax>
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,26,23,0.96)_0%,rgba(31,26,23,0.9)_42%,rgba(31,26,23,0.35)_100%)] md:bg-[linear-gradient(90deg,rgba(31,26,23,0.97)_0%,rgba(31,26,23,0.88)_40%,rgba(31,26,23,0.12)_62%,rgba(31,26,23,0.08)_76%,rgba(31,26,23,0.45)_100%)]"
            aria-hidden="true"
          />

          <div className="relative grid gap-12 px-6 py-14 md:grid-cols-[1.15fr_1fr] md:items-center md:px-14 md:py-20 lg:gap-20">
            <div className="max-w-xl">
              <p className="mb-5 text-[13px] text-white/55">Why we exist</p>
              <h2 id="why-title" className="font-display text-[1.9rem] leading-[1.12] sm:text-[2.4rem] md:text-[2.7rem]">
                <span className="text-[#5eead4]">46</span> of 100 people beat type 2 diabetes with diet. Insurance still pays for
                pills, not for health.
                <Fn id="direct-trial" className="text-white/40" />
              </h2>
              <p className="mt-9 font-display text-2xl leading-snug text-[#5eead4] sm:text-[1.9rem]">
                We fight for patients whose best care never gets paid for.
              </p>
            </div>

            <figure className="md:justify-self-end">
              <DotGrid remission={REMISSION} label={`${REMISSION} of 100 people beat type 2 diabetes within a year`} />
              <figcaption className="mt-5 text-[14px] text-white/70">
                <span className="font-medium text-[#5eead4] tabular-nums">{REMISSION} of 100</span> beat type 2 diabetes within a year
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
