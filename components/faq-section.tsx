import Link from "next/link"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What does Sanafin cost?",
    answer: "Sanafin combines a high-margin annual Outcome Studio license with usage-based fees for continuous evidence processing and enterprise workflow integrations."
  },
  {
    question: "How is Sanafin different from an HTA consultant?",
    answer: "Consulting produces a bespoke, static deliverable. Sanafin is a repeatable software workflow that maps endpoints, surfaces evidence gaps, and keeps the evidence package continuously audit-ready."
  },
  {
    question: "Which data sources are supported?",
    answer: "Sources can include clinical systems, EHRs, wearables, and lab registries, including HL7 FHIR integrations. Each contract defines its approved sources."
  },
  {
    question: "What happens when evidence is missing?",
    answer: "Outcome Studio surfaces evidence gaps early, before teams commit to expensive custom infrastructure. Contracts can also define alternative sources, grace periods, and clinical review."
  },
  {
    question: "What is your compliance scope?",
    answer: "Sanafin is Swiss-hosted and designed to support nDSG and GDPR requirements. Applicable controls and audit records depend on the implementation."
  },
  {
    question: "How quickly can we launch a pilot?",
    answer: "Sanafin is designed to prototype and deploy a reimbursement pilot in under two weeks. Production timing depends on data access, integration scope, and stakeholder readiness."
  },
  {
    question: "How do we get started?",
    answer: "Book a discovery call. We scope a pilot around your product, your data sources, and the payer you want to contract with."
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div>
          <p className="text-[13px] font-medium text-[#f15d22] mb-4">FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] text-[#1f1a17] mb-6">
            Questions,
            <br />
            <span className="text-[#1f1a17]/40">answered.</span>
          </h2>
          <p className="text-[15px] text-[#6f6660] leading-relaxed max-w-sm">
            Anything else? <Link href="/demo" className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">Book a discovery call</Link> and we&apos;ll walk you through it.
          </p>
        </div>

        <div className="divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group/details">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] sm:text-lg font-medium text-[#1f1a17] leading-snug">{faq.question}</h3>
                <Plus className="h-5 w-5 shrink-0 text-[#a39a93] transition-transform duration-300 group-open/details:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-10 text-[15px] leading-relaxed text-[#6f6660]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
