"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

// Objections by persona. Answers marked with a trailing note are drafted for the
// founders to confirm before launch; none makes a claim the deck does not.

const groups = [
  {
    id: "payers",
    label: "Payers",
    faqs: [
      {
        q: "How do I trust the measurement?",
        a: "The check is independent of both the payer and the provider. It scores the result against the Swiss WZW standard for cost-effectiveness, and the method is published. Every verdict comes with an audit record. Either side can re-run it on their own computer.",
      },
      {
        q: "Who holds the money, and in what currency?",
        a: "A licensed custody partner holds it, in your own currency. The money leaves only when Sanafin confirms a verified pass. Sanafin never holds funds and is not a bank.",
      },
      {
        q: "What is the regulatory set-up?",
        a: "A pilot is a purchase of results, not of services. How the money is held is kept separate from the rules that govern the care itself. Each programme is reviewed with regulatory counsel before it goes live.",
      },
      {
        q: "How do you prevent gaming or selection bias?",
        a: "The target, the patient group and the data sources are fixed before anyone enrols. Every value is stamped on entry, and the verdict can be recomputed offline. Change one value later and the stamp no longer matches. Either side can spot that without trusting Sanafin.",
      },
    ],
  },
  {
    id: "providers",
    label: "Care providers",
    faqs: [
      {
        q: "What does Sanafin cost?",
        a: "A platform licence, a fee per enrolled patient, and a fee per verified outcome. The first pilot is a fixed price agreed on the call.",
      },
      {
        q: "What happens when data is missing or a patient drops out?",
        a: "Rules for dropouts and stale data are part of the contract. Gaps show up early. A milestone that cannot be verified is held or returned to the payer, never paid on trust.",
      },
      {
        q: "How fast can a pilot start?",
        a: "Our target is two weeks from the first call. Week one: data connected. Week two: rules live and a first verification report. Going live depends on data access and the payer's sign-off.",
      },
      {
        q: "Where is data hosted and who can see it?",
        a: "The hosting region is agreed per contract. Data is pseudonymised before verification. Access is by role, and both sides get the same audit record.",
      },
    ],
  },
  {
    id: "investors",
    label: "Investors",
    faqs: [
      {
        q: "Why start with metabolic health in Switzerland?",
        a: "Metabolic disease is the largest and best-measured chronic condition, and its drug costs are rising fastest. Swiss reimbursement is among the strictest in Europe. A contract that clears it is a credential everywhere else. The same four fields describe a German app price, a US chronic-care target or a medicine rebate.",
      },
      {
        q: "Why not Lyfegen, EY or a rebate platform?",
        a: "Each covers one third of the job: evidence, contract logic or payment. Rebate platforms only claw money back inside an existing deal. Sanafin combines the independent check, a reusable contract and the payment release in one layer, with proofs anyone can re-run.",
      },
      {
        q: "What is the traction today?",
        a: "Four signed letters of intent with Swiss care partners. A diabetes proof of concept with a Swiss cantonal hospital, now being implemented. Eight publications behind the model, and grant support from Innosuisse-funded programmes. No payer has committed money yet and no fee has been tested. Next milestones: one payer with a named budget owner, and the first francs committed.",
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
  const [active, setActive] = useState<(typeof groups)[number]["id"]>("payers")
  const group = groups.find((g) => g.id === active) ?? groups[0]

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div>
          <p className="text-[13px] text-[#766d67] mb-4">FAQ</p>
          <h2 id="faq-title" className="font-display text-4xl sm:text-5xl leading-[1.05] text-[#1f1a17] mb-6">
            The questions each side asks first.
          </h2>
          <p className="text-[15px] text-[#766d67] leading-relaxed max-w-sm mb-8">
            Anything else?{" "}
            <Link href="/call" className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
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
