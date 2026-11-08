import type { Metadata } from 'next'
import { CTASection } from '@/components/cta-section'
import { Walkthrough } from '@/components/demo/walkthrough'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'See it work',
  description:
    'One outcome contract from commitment to settlement: a payer commits CHF 180,000 for 100 patients, six months of evidence arrive, an independent evaluation scores the cohort, and payment is released or returned. Real verification run, synthetic cohort.',
  alternates: { canonical: '/demo' },
}

// Fully static: the walkthrough is a client component over committed fixtures, so
// this route is prerendered and served from the asset cache like the landing page.
export default function DemoPage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-grow pt-32 md:pt-36">
        <section aria-labelledby="demo-title" className="max-w-7xl mx-auto px-6">
          <p className="text-[13px] text-[#766d67]">Product walkthrough</p>
          <h1 id="demo-title" className="mt-3 max-w-3xl font-display text-[2.4rem] sm:text-[3.2rem] leading-[1.04] text-[#1f1a17]">
            One contract, start to finish.
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-[17px] leading-relaxed text-[#6f6660]">
            A payer commits CHF 180,000 for 100 patients. Six months of care, one independent evaluation, one payment.
            Every number below comes from a real verification run on a synthetic cohort; no patient is real and no
            customer is shown.
          </p>
        </section>

        <section aria-label="Interactive walkthrough" className="max-w-7xl mx-auto px-6 pt-8 pb-24">
          <Walkthrough />
        </section>

        <div className="pb-24">
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
