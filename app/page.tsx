import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Recognition } from "@/components/recognition"
import { WhyWeExist } from "@/components/why-we-exist"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { FounderNote } from "@/components/founder-note"
import { AnywhereSection } from "@/components/anywhere-section"
import { TeamSection } from "@/components/team-section"
import { InvestorSection } from "@/components/investor-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

// Server component: the hero and every static section render visible HTML with no
// hydration gate. Interactive islands are client components of their own.
export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header announce />
        <main id="main" className="landing-page">
          <Hero />
          <WhyWeExist />
          <ProblemSection />
          <HowItWorks />
          <FounderNote />
          <AnywhereSection />
          <Recognition />
          <TeamSection />
          <InvestorSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer sources />
      </div>
    </div>
  )
}
