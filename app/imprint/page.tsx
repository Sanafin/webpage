"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ImprintPage() {
  useScrollReveal()

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        
        <main className="max-w-5xl mx-auto px-6 py-24 min-h-[70vh]">
          <div className="reveal">
            <span className="font-mono text-xs uppercase tracking-widest text-[#14B8A6] font-semibold block mb-4">
              Transparency
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-[#2f241f] mb-6">
              Imprint
            </h1>
            <p className="text-[#8c6a59] mb-12 text-lg max-w-3xl leading-relaxed">
              Official company registration and regulatory information for Sanafin.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Provider Information */}
              <section className="border border-[#efc2a5]/30 p-8 md:p-10 bg-[#fffaf6] rounded-[10px] shadow-[0_8px_30px_rgba(47,36,31,0.02)] hover:shadow-[0_16px_40px_rgba(47,36,31,0.04)] transition-all duration-300">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-6">Provider Information</h2>
                <div className="space-y-4 text-xs font-sans text-[#8c6a59] leading-relaxed">
                  <div>
                    <strong className="text-[#2f241f] block mb-1">Company Name</strong>
                    Sanafin.tech
                  </div>
                  <div>
                    <strong className="text-[#2f241f] block mb-1">Registered Address</strong>
                    St. Gallen, Switzerland
                  </div>
                  <div>
                    <strong className="text-[#2f241f] block mb-1">Entity Type</strong>
                    Swiss technological platform and software operator
                  </div>
                </div>
              </section>

              {/* Contact & Registration */}
              <section className="border border-[#efc2a5]/30 p-8 md:p-10 bg-[#fffaf6] rounded-[10px] shadow-[0_8px_30px_rgba(47,36,31,0.02)] hover:shadow-[0_16px_40px_rgba(47,36,31,0.04)] transition-all duration-300">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-6">Contact & Operations</h2>
                <div className="space-y-4 text-xs font-sans text-[#8c6a59] leading-relaxed">
                  <div>
                    <strong className="text-[#2f241f] block mb-1">General Inquiries</strong>
                    For administrative, commercial, or technical operations, contact:
                    <a className="text-[#14B8A6] hover:text-[#0D9488] font-mono font-semibold block mt-1 text-sm hover:underline" href="mailto:hello@sanafin.tech">
                      hello@sanafin.tech
                    </a>
                  </div>
                  <div>
                    <strong className="text-[#2f241f] block mb-1">Responsible Entity</strong>
                    Corporate communications and operational platform management
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
