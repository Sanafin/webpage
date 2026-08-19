"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SwissCross } from "@/components/ui/swiss-cross"

export default function PrivacyPage() {
  useScrollReveal()

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        
        <main className="max-w-5xl mx-auto px-6 py-24 min-h-[70vh]">
          <div className="reveal">
            <span className="font-mono text-xs uppercase tracking-widest text-[#14B8A6] font-semibold block mb-4">
              Trust & Security
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-[#2f241f] mb-6">
              Privacy Policy
            </h1>
            <p className="text-[#8c6a59] mb-12 text-lg max-w-3xl leading-relaxed">
              At Sanafin, data protection is a product principle, not just a legal requirement. We design our outcome-based contract systems to prioritize data privacy, security, transparency, and responsible processing at every layer.
            </p>

            <div className="space-y-12">
              {/* Data Protection at the Core */}
              <section className="border border-[#efc2a5]/30 p-8 md:p-10 bg-[#fffaf6] rounded-[10px] shadow-[0_8px_30px_rgba(47,36,31,0.02)] hover:shadow-[0_16px_40px_rgba(47,36,31,0.04)] transition-all duration-300">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Data Protection at the Core</h2>
                <p className="text-[#8c6a59] leading-relaxed mb-0 text-sm">
                  We build our platform with privacy-by-design. Personal and commercial data is processed only to the extent necessary to structure, verify, and execute outcome-based healthcare contracts. We are committed to transparency, minimization of data footprints, and maintaining healthcare-grade security.
                </p>
              </section>

              {/* Grid: Collected and Processed */}
              <div className="grid md:grid-cols-2 gap-10">
                <section className="border border-[#efc2a5]/20 p-8 bg-[#fffaf6]/50 rounded-[10px]">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-6">What Data We Collect</h2>
                  <ul className="space-y-4 font-sans text-xs text-[#8c6a59] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Account & Profile Information</strong>
                        Names, business email addresses, roles, and institutional affiliations.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Contract & Rules Metadata</strong>
                        Target thresholds, timeline boundaries, and logical criteria defining clinical outcome success.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Clinical Verification Events</strong>
                        De-identified clinical biomarker feeds, digital health data, or audit-trail inputs uploaded to trigger contract payouts.
                      </div>
                    </li>
                  </ul>
                </section>

                <section className="border border-[#efc2a5]/20 p-8 bg-[#fffaf6]/50 rounded-[10px]">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-6">Why We Process Data</h2>
                  <ul className="space-y-4 font-sans text-xs text-[#8c6a59] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Contract Execution</strong>
                        To calculate cost performance, verify clinical milestones, and automatically trigger payout routing.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Auditability & Operations</strong>
                        To maintain immutable history records for payers, providers, and auditors to review outcome performance.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Service Improvement</strong>
                        To optimize behavioral engagement rules and support onboarding or integration requests.
                      </div>
                    </li>
                  </ul>
                </section>
              </div>

              {/* How data is protected */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">How Data is Protected</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  We secure data using transport-layer encryption (TLS 1.3), encryption-at-rest (AES-256), strict role-based access controls (RBAC), and secure escrow system segmentation. All clinical verification events are de-identified at the source whenever possible, ensuring personal health information is not exposed to financial operators.
                </p>
              </section>

              {/* Data Sharing & Third Parties */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Data Sharing & Third Parties</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Sanafin never sells personal or healthcare data. We share data only with authorized escrow bank institutions to route payouts or with neutral clinical verification platforms as specified under active, customer-consented contracting rules.
                </p>
              </section>

              {/* User Rights */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Your Rights</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Depending on your jurisdiction, you have the right to access, rectify, or delete your personal data processed on our systems. You can manage access permissions for specific clinical integrations through your client dashboard at any time.
                </p>
              </section>

              {/* Contact Information */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Privacy Contact</h2>
                <p className="text-[#8c6a59] leading-relaxed text-sm">
                  For data processing inquiries or to exercise your privacy rights, contact our trust team at:{" "}
                  <a className="text-[#14B8A6] hover:text-[#0D9488] font-mono font-semibold hover:underline" href="mailto:hello@sanafin.tech">
                    hello@sanafin.tech
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
