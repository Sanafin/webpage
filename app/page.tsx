"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MissingLayerSection } from "@/components/missing-layer-section"
import { EconomicRealitiesTable } from "@/components/economic-realities-table"
import { AntiManifestoSection } from "@/components/anti-manifesto"
import { ProblemSection } from "@/components/problem-section"
import { ReadinessToPaymentsSection } from "@/components/readiness-to-payments-section"
import { PilotWorksSection } from "@/components/pilot-works-section"
import { PrecisionMedicineFitStrip } from "@/components/buyer-fit-strip"
import { SecuritySection } from "@/components/security-section"
import { FrameworkSection } from "@/components/framework-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { ResourcesSection } from "@/components/resources-section"

export default function Home() {
  useScrollReveal()

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        <main className="landing-page">
          <Hero />
          <MissingLayerSection />
          <EconomicRealitiesTable />
          <AntiManifestoSection />
          <ProblemSection />
          <ReadinessToPaymentsSection />
          <PilotWorksSection />
          <PrecisionMedicineFitStrip />
          <FrameworkSection />
          <TeamSection />
          <ResourcesSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
