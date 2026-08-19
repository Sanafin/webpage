import { ChevronDown } from "lucide-react"

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
    question: "What happens after I join the waitlist?",
    answer: "You’ll receive product updates and hear from us when beta access opens."
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold block">
            Common questions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-6 leading-[1.1] font-medium tracking-tight">
            Frequently asked <span className="text-primary italic font-semibold">questions</span>
          </h2>
        </div>

        <div className="reveal divide-y divide-[#efc2a5]/25 border-y border-[#efc2a5]/25">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group/details">
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 rounded-lg px-2 py-5 transition-colors hover:bg-[#fffaf6]/75 [&::-webkit-details-marker]:hidden">
                <span className="w-8 shrink-0 font-mono text-xs text-[#6B7280]">0{index + 1}</span>
                <h3 className="flex-1 font-serif text-lg sm:text-xl text-[#2f241f] leading-snug font-semibold tracking-tight">{faq.question}</h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#efc2a5]/35 bg-white/60 text-[#8c6a59] transition-all duration-300 group-open/details:rotate-180 group-open/details:border-[#14B8A6]/35 group-open/details:text-[#14B8A6]">
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <div className="grid md:grid-cols-12 gap-4 px-2 pb-7">
                <div className="hidden md:block md:col-span-1" />
                <p className="md:col-span-11 text-[#8c6a59] leading-relaxed text-base max-w-3xl font-sans pr-12">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
