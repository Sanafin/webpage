"use client"

import { motion } from "framer-motion"

// Illustrative programme designs. These are example contract structures, not
// customer data, and the section says so.
const programs = [
  {
    name: "Weight management",
    population: "800 patients on GLP-1 therapy",
    duration: "12 weeks",
    budget: "CHF 120,000",
    sources: ["Smart scales", "Adherence tracker", "Telehealth"],
    targets: [
      { label: "Weight loss", threshold: "≥ 7%" },
      { label: "GLP-1 adherence", threshold: "≥ 85%" },
    ],
    milestones: [
      { text: "Week 6", amount: "CHF 30,000" },
      { text: "Week 12", amount: "CHF 60,000" },
      { text: "Adherence bonus", amount: "CHF 30,000" },
    ],
  },
  {
    name: "Diabetes prevention",
    population: "1,000 patients with HbA1c 5.7–6.4%",
    duration: "6 months",
    budget: "CHF 250,000",
    sources: ["Lab results", "Wearables", "Coaching"],
    targets: [
      { label: "HbA1c reduction", threshold: "≥ 0.5 pts" },
      { label: "Weight loss", threshold: "≥ 5%" },
    ],
    milestones: [
      { text: "Month 3", amount: "CHF 80,000" },
      { text: "Month 6", amount: "CHF 120,000" },
      { text: "Weight-loss bonus", amount: "CHF 50,000" },
    ],
  },
  {
    name: "Diabetes reversal",
    population: "500 patients with type 2 diabetes",
    duration: "12–18 months",
    budget: "CHF 225,000",
    sources: ["CGM", "Pharmacy", "Lab HbA1c"],
    targets: [
      { label: "HbA1c remission", threshold: "< 5.6%" },
      { label: "Medication reduction", threshold: "≥ 30%" },
    ],
    milestones: [
      { text: "Month 6", amount: "CHF 75,000" },
      { text: "Month 12", amount: "CHF 100,000" },
      { text: "Glycaemic control bonus", amount: "CHF 50,000" },
    ],
  },
]

export function PilotWorksSection() {
  return (
    <section id="usecases" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-14 grid lg:grid-cols-2 gap-6 lg:gap-16 lg:items-end"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-[13px] font-medium text-[#f15d22] mb-4">Where we start</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17]">
              Metabolic health first.
              <br />
              <span className="text-[#1f1a17]/40">Longevity next.</span>
            </h2>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#6f6660] lg:pb-2">
            Metabolic care has measurable endpoints, rising spend and payers already asking for outcome-based terms. These are example contract designs Sanafin can structure today. They are illustrative, not customer data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.map((p, i) => (
            <motion.article
              key={p.name}
              className="flex flex-col rounded-3xl bg-[#f5f1ed] p-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-4 pt-4 pb-5">
                <p className="text-[12px] text-[#a39a93] mb-2">Example contract</p>
                <h3 className="font-display text-2xl text-[#1f1a17] mb-1">{p.name}</h3>
                <p className="text-[14px] text-[#6f6660]">{p.population}</p>
              </div>

              <div className="flex flex-1 flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(47,36,31,0.05)]">
                <dl className="grid grid-cols-2 gap-4 pb-5 border-b border-[#f0ebe6]">
                  <div>
                    <dt className="text-[12px] text-[#a39a93]">Outcome-linked budget</dt>
                    <dd className="mt-1 text-xl font-medium tracking-tight text-[#1f1a17]">{p.budget}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] text-[#a39a93]">Duration</dt>
                    <dd className="mt-1 text-xl font-medium tracking-tight text-[#1f1a17]">{p.duration}</dd>
                  </div>
                </dl>

                <div className="py-5 border-b border-[#f0ebe6]">
                  <p className="text-[12px] text-[#a39a93] mb-3">Payment is triggered when</p>
                  <ul className="space-y-2">
                    {p.targets.map((t) => (
                      <li key={t.label} className="flex items-center justify-between text-[14px]">
                        <span className="text-[#1f1a17]">{t.label}</span>
                        <span className="font-medium text-[#0f8f81]">{t.threshold}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="py-5 border-b border-[#f0ebe6]">
                  <p className="text-[12px] text-[#a39a93] mb-3">Payout schedule</p>
                  <ul className="space-y-2">
                    {p.milestones.map((m) => (
                      <li key={m.text} className="flex items-center justify-between text-[14px]">
                        <span className="text-[#6f6660]">{m.text}</span>
                        <span className="text-[#1f1a17]">{m.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-auto">
                  <p className="text-[12px] text-[#a39a93] mb-2">Evidence from</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.sources.map((s) => (
                      <li key={s} className="rounded-full bg-[#f5f1ed] px-2.5 py-1 text-[12px] text-[#6f6660]">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
