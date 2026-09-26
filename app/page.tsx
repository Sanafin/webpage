import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Recognition } from "@/components/recognition"
import { OutcomeFilm } from "@/components/outcome-film"
import { WhyNowSection } from "@/components/why-now-section"
import { ProductBento } from "@/components/product-bento"
import { PilotWorksSection } from "@/components/pilot-works-section"
import { FrameworkSection } from "@/components/framework-section"
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
          <Recognition />
          <OutcomeFilm />
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
