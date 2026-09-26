import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Recognition } from "@/components/recognition"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { WhyNowSection } from "@/components/why-now-section"
import { OutcomeStudio } from "@/components/outcome-studio"
import { ExampleContracts } from "@/components/example-contracts"
import { TeamSection } from "@/components/team-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

// Server component: the hero and every static section render visible HTML with no
// hydration gate. Interactive islands are client components of their own.
export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        <main id="main" className="landing-page">
          <Hero />
          <ProblemSection />
          <WhyNowSection />
          <HowItWorks />
          <OutcomeStudio />
          <ExampleContracts />
          <TeamSection />
          <Recognition />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
