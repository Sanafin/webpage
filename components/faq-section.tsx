"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

// Objections by persona. Answers marked with a trailing note are drafted for the
// founders to confirm before launch; none makes a claim the deck does not.

const groups = [
  {
    id: "manufacturers",
    label: "Digital health",
    faqs: [
      {
        q: "What does Sanafin cost?",
        a: "A platform licence, a per-patient fee on enrolment into an outcome-linked pathway, and a success fee on funds recovered when a cohort misses its threshold. The first pilot is a fixed price agreed on the call.",
      },
      {
        q: "How is this different from an HTA consultant or a CRO?",
        a: "A consultancy appraises evidence by hand, per project; a CRO runs the study but brings no money. Sanafin makes the funding conditional and the verification repeatable: the outcome definition, the threshold and the settlement rule are written once, and the verdict can be re-run by anyone from the exported file.",
      },
      {
        q: "What happens when data is missing or a patient drops out?",
        a: "Dropout and data-freshness rules are part of the contract. Monitoring surfaces gaps early, and unmet or unverifiable milestones are held or returned to the funder rather than paid on trust.",
      },
      {
        q: "How fast can a pilot start?",
        a: "Our target is a scoped pilot within two weeks of the first call: data connected in week one, rules live with a first verification report in week two. Going live depends on data access and the funder's sign-off.",
      },
    ],
  },
  {
    id: "funders",
    label: "Insurers, employers, hospitals",
    faqs: [
      {
        q: "Who holds the money?",
        a: "A licensed custody partner. The funder commits funds up front; they are held by the custodian and only leave when Sanafin issues a settlement instruction on a verified pass. Sanafin never holds funds and is not a bank or payment institution.",
      },
      {
        q: "Is Sanafin a medical device?",
        a: "Sanafin does not diagnose or treat. It checks agreed endpoints against contract rules for payment purposes. The classification of each programme under the medical devices ordinance is assessed with regulatory counsel before production use.",
      },
      {
        q: "How do you prevent gaming or selection bias?",
        a: "The threshold, cohort definition and data sources are fixed before enrolment, every value is hashed on entry, and the verdict is re-computable offline. Changing one value after the fact changes the fingerprint, which either side can detect without trusting Sanafin.",
      },
      {
        q: "Where is data hosted and who can see it?",
        a: "Hosting region is agreed per contract, in Switzerland or the EU. Data is pseudonymised for verification, access is role-based, and both parties receive the same audit record.",
      },
    ],
  },
  {
    id: "investors",
    label: "Investors",
    faqs: [
      {
        q: "How big is this beyond Swiss digital health?",
        a: "Switzerland is the proving ground: its reimbursement bar is among the strictest in Europe, and clearing it is the credential. The same conditional-settlement layer applies to German DiGA price components that are now performance-linked by law, and later to gene and cell therapies.",
      },
      {
        q: "Why not Lyfegen, EY or a rebate platform?",
        a: "Each covers one third of the workflow: evidence, contract logic or settlement. Rebate platforms move money only as a claw-back inside an existing commercial relationship, which a pre-listing manufacturer does not have. Sanafin combines verification, contract logic and settlement in one reusable layer, with proofs anyone can re-run.",
      },
      {
        q: "What is the traction today?",
        a: "Four signed letters of intent with Swiss care partners, a clinical proof of concept running with a Swiss hospital to October 2026, eight publications behind the model, and non-dilutive support from Innosuisse-funded programmes. The next milestones are one funder with a named budget owner and the first CHF committed conditionally.",
      },
      {
        q: "How do I get the deck?",
        a: "Use the form above. Wasu, the CEO, sends it personally within one working day.",
        link: { href: "#investors", label: "Request the deck" },
      },
    ],
  },
] as const

export function FAQSection() {
  const [active, setActive] = useState<(typeof groups)[number]["id"]>("manufacturers")
  const group = groups.find((g) => g.id === active) ?? groups[0]

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div>
          <p className="text-[13px] font-medium text-[#f15d22] mb-4">FAQ</p>
          <h2 id="faq-title" className="font-display text-4xl sm:text-5xl leading-[1.05] text-[#1f1a17] mb-6">
            The questions
            <br />
            <span className="text-[#1f1a17]/45">each side asks first.</span>
          </h2>
          <p className="text-[15px] text-[#766d67] leading-relaxed max-w-sm mb-8">
            Anything else?{" "}
            <Link href="/demo" className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
              Book a discovery call
            </Link>{" "}
            and we&apos;ll walk you through it.
          </p>

          <div role="tablist" aria-label="Questions by audience" className="flex flex-wrap gap-2">
            {groups.map((g) => {
              const selected = g.id === active
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  id={`faq-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`faq-panel-${g.id}`}
                  onClick={() => setActive(g.id)}
                  className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                    selected ? "bg-[#1f1a17] text-white" : "bg-[#f5f1ed] text-[#1f1a17] hover:bg-[#ece7e2]"
                  }`}
                >
                  {g.label}
                </button>
              )
            })}
          </div>
        </div>

        <div id={`faq-panel-${group.id}`} role="tabpanel" aria-labelledby={`faq-tab-${group.id}`} className="divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
          {group.faqs.map((faq) => (
            <details key={faq.q} className="group/details">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] sm:text-lg font-medium text-[#1f1a17] leading-snug">{faq.q}</h3>
                <Plus className="h-5 w-5 shrink-0 text-[#766d67] transition-transform duration-300 group-open/details:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-10 text-[15px] leading-relaxed text-[#6f6660]">
                {faq.a}
                {"link" in faq && faq.link ? (
                  <>
                    {" "}
                    <Link href={faq.link.href} className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
                      {faq.link.label} →
                    </Link>
                  </>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
