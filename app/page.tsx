"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BackedBy } from "@/components/backed-by"
import { EconomicRealitiesTable } from "@/components/economic-realities-table"
import { WhyNowSection } from "@/components/why-now-section"
import { ProductBento } from "@/components/product-bento"
import { PilotWorksSection } from "@/components/pilot-works-section"
import { FrameworkSection } from "@/components/framework-section"
import { TeamSection } from "@/components/team-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  useScrollReveal()

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        <main className="landing-page">
          <Hero />
          <BackedBy />
          <EconomicRealitiesTable />
          <WhyNowSection />
          <ProductBento />
          <PilotWorksSection />
          <FrameworkSection />
          <TeamSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
