import { Fn } from "@/components/fn"
import { Reveal } from "@/components/reveal"
import { CountUp, Parallax, Words } from "@/components/fx"

// The problem as the deck tells it: one line, three people, three numbers. Each figure
// sits under the photo of the person it happens to, so the statistic has a face before
// it has a caption. Photos are stock, posed by models, and say so once in the caption.

const facts = [
  {
    photo: "/media/problem-pharmacy.webp",
    alt: "A pharmacist handing a medicine pack to an older woman at the counter",
    eyebrow: "Medicines",
    value: "CHF 9.7bn",
    count: { value: 9.7, prefix: "CHF ", suffix: "bn", decimals: 1 },
    label: "a year on medicines, with rebates chased afterwards",
    sourceId: "okp-medicines",
  },
  {
    photo: "/media/problem-scale.webp",
    alt: "A woman in a bathrobe standing on a scale at home",
    eyebrow: "Weight-loss GLP-1",
    value: "52%",
    count: { value: 52, suffix: "%" },
    label: "stop treatment within a year, and it is tracked by hand",
    sourceId: "glp1-discontinuation",
  },
  {
    photo: "/media/problem-bills.webp",
    alt: "A couple at the kitchen table going through bills with a laptop and calculator",
    eyebrow: "Basic insurance premiums",
    value: "3.2×",
    count: { value: 3.2, suffix: "×", decimals: 1 },
    label: "premium rise since 1996, still paid per visit, not per result",
    sourceId: "okp-premiums",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-12 max-w-3xl">
          <h2 id="problem-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
            <Words text="Money can't tell valuable care from merely billable care." />
          </h2>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-[#6f6660]">
            Whether patients get healthier doesn&apos;t change the bill. Everyone pays for that.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal as="li" key={f.value} delay={i * 0.12}>
              <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-[#ebe4db]">
                <Parallax className="absolute -inset-y-6 inset-x-0" from={-18} to={18}>
                  <img src={f.photo} alt={f.alt} className="h-full w-full object-cover" loading="lazy" />
                </Parallax>
              </div>
              <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-[#6f6660]">{f.eyebrow}</p>
              <p className="mt-2 font-display text-5xl tabular-nums text-[#1f1a17] sm:text-6xl">
                <CountUp {...f.count} duration={1.6 + i * 0.2} />
              </p>
              <p className="mt-3 max-w-xs text-[15px] leading-snug text-[#6f6660]">
                {f.label}
                <Fn id={f.sourceId} />
              </p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-[12px] text-[#6f6660]">Photos posed by models.</p>
      </div>
    </section>
  )
}
