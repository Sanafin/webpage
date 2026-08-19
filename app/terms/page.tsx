"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SwissCross } from "@/components/ui/swiss-cross"

export default function TermsPage() {
  useScrollReveal()

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        
        <main className="max-w-5xl mx-auto px-6 py-24 min-h-[70vh]">
          <div className="reveal">
            <span className="font-mono text-xs uppercase tracking-widest text-[#14B8A6] font-semibold block mb-4">
              Agreement & Trust
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-[#2f241f] mb-6">
              Terms of Service & Compliance
            </h1>
            <p className="text-[#8c6a59] mb-12 text-lg max-w-3xl leading-relaxed">
              These terms define the service boundaries, regulatory compliance frameworks, and trust standards between Sanafin and our enterprise partners.
            </p>

            <div className="space-y-12">
              {/* Using Sanafin */}
              <section className="border border-[#efc2a5]/30 p-8 md:p-10 bg-[#fffaf6] rounded-[10px] shadow-[0_8px_30px_rgba(47,36,31,0.02)] hover:shadow-[0_16px_40px_rgba(47,36,31,0.04)] transition-all duration-300">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Using Sanafin</h2>
                <p className="text-[#8c6a59] leading-relaxed mb-0 text-sm">
                  Sanafin provides SaaS infrastructure to structure, deploy, and automate outcome-based healthcare contracts. Our platform integrates smart escrow accounts, data verification feeds, and automated routing pipelines to help health insurers, sponsors, and care teams execute value-based agreements.
                </p>
              </section>

              {/* Grid: Account Access and User Responsibilities */}
              <div className="grid md:grid-cols-2 gap-10">
                <section className="border border-[#efc2a5]/20 p-8 bg-[#fffaf6]/50 rounded-[10px]">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-6">Account & Access Rules</h2>
                  <ul className="space-y-4 font-sans text-xs text-[#8c6a59] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Authorized Credentials</strong>
                        Users must maintain the confidentiality of all system credentials and API tokens.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Access Scope</strong>
                        Platform access is granted solely to configure contracts, integrate clinical data sources, and manage escrow accounts.
                      </div>
                    </li>
                  </ul>
                </section>

                <section className="border border-[#efc2a5]/20 p-8 bg-[#fffaf6]/50 rounded-[10px]">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-6">User Responsibilities</h2>
                  <ul className="space-y-4 font-sans text-xs text-[#8c6a59] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Accurate Thresholds</strong>
                        Customers are responsible for specifying correct clinical metrics and verification logic in contract models.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Lawful Data Sourcing</strong>
                        You must ensure all digital health data, laboratory results, or clinical evidence feeds are legally obtained.
                      </div>
                    </li>
                  </ul>
                </section>
              </div>

              {/* Grid: Security & Compliance */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Security */}
                <section className="border border-[#efc2a5]/20 p-8 bg-[#fffaf6]/50 rounded-[10px]">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-6">Security Infrastructure</h2>
                  <p className="text-[#8c6a59] text-xs leading-relaxed mb-4">
                    We secure customer systems and data through institutional-grade controls:
                  </p>
                  <ul className="space-y-4 font-sans text-xs text-[#8c6a59] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">End-to-End Encryption</strong>
                        All data is encrypted in transit using TLS 1.3 and at rest with AES-256 keys.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Role-Based Access (RBAC)</strong>
                        Strict authentication rules govern access to contract rules, escrow balances, and API credentials.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">De-identification Sinks</strong>
                        Clinical biomarker feeds are pseudonymized at the integration source to protect privacy.
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Compliance */}
                <section className="border border-[#efc2a5]/20 p-8 bg-[#fffaf6]/50 rounded-[10px]">
                  <h2 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-6">Compliance & Governance</h2>
                  <p className="text-[#8c6a59] text-xs leading-relaxed mb-4">
                    Our governance framework is aligned with leading national and global standards:
                  </p>
                  <ul className="space-y-4 font-sans text-xs text-[#8c6a59] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Regulatory Alignment</strong>
                        Designed to meet the operational standards of GDPR (Europe), DSG (Switzerland), and HIPAA (United States).
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Swiss Legal Principles</strong>
                        Escrow allocations and contract triggers are modeled to reflect the Swiss Code of Obligations.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <SwissCross className="w-2 h-2 text-[#f15d22] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#2f241f] block mb-0.5">Audit-Ready Logs</strong>
                        Platform activity logs are designed for institutional SOC-2 compliance audits.
                      </div>
                    </li>
                  </ul>
                </section>
              </div>

              {/* Acceptable Use */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Acceptable Use</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  You agree not to bypass security configurations, introduce malicious code, reverse-engineer the contract execution compiler, or attempt to manipulate verification events. Any suspicious activity will result in immediate API suspension.
                </p>
              </section>

              {/* Risk Management */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Risk Management & Fallbacks</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm mb-6">
                  We mitigate operational risks through clear contract safety valves and automated fallbacks. Every outcome-based contract structured on Sanafin includes explicit parameters to manage edge cases:
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-serif text-base text-[#2f241f] font-semibold tracking-tight mb-2">Exception Paths</h3>
                    <p className="text-xs text-[#8c6a59] leading-relaxed">
                      Predefined logic handles missing data feeds, client dropouts, or temporary connection issues without locking funds.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#2f241f] font-semibold tracking-tight mb-2">Oracle Fallbacks</h3>
                    <p className="text-xs text-[#8c6a59] leading-relaxed">
                      If primary digital health validation sources fail, secure human-review checkpoints resolve clinical disputes.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#2f241f] font-semibold tracking-tight mb-2">Escrow Safety</h3>
                    <p className="text-xs text-[#8c6a59] leading-relaxed">
                      Funds are routed only upon verified outcome confirmation, preventing unauthorized or early payout release.
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Payment & Escrow Terms</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Platform subscription fees and escrow service charges are defined in executed Statements of Work (SOW) or Order Forms. Escrow deposits are held securely in custody bank accounts and can only be routed according to deterministic, verified contract criteria.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Intellectual Property</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Sanafin owns all proprietary software, databases, API designs, and interfaces. Open-source specifications, including the EDEN framework schema, are licensed separately under their respective MIT/standard open licenses.
                </p>
              </section>

              {/* Verification Transparency */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Verification Transparency</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Transparency is key to eliminating disputes. Sanafin publishes the mathematical algorithms used to verify outcomes and calculate time-value thresholds under the open-source EDEN framework. Payers and providers can inspect and run independent tests on the validation scripts to confirm correctness before deploying them to production.
                </p>
              </section>

              {/* Limitations of Liability */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Limitations of Liability</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Sanafin is a software provider and is not a party to clinical treatment outcomes or care decisions. We do not provide medical or clinical advisory. To the maximum extent permitted by law, Sanafin is not liable for indirect, incidental, or consequential damages resulting from clinical data inaccuracies or verification source failures.
                </p>
              </section>

              {/* Termination Conditions */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Termination</h2>
                <p className="text-[#8c6a59] leading-relaxed max-w-3xl text-sm">
                  Either party may terminate platform access in accordance with SOW agreements. Upon termination, active escrow balances will be refunded or routed according to the final contract status in the secure auditing registry.
                </p>
              </section>

              {/* Contact */}
              <section className="border-t border-[#efc2a5]/20 pt-12">
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Contact & Inquiries</h2>
                <p className="text-[#8c6a59] leading-relaxed text-sm">
                  For legal inquiries, terms compliance, or data security documentation, contact:{" "}
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
