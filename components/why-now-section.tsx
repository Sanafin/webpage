"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// Every claim here links to a primary or well-established source. Keep it that way.
const shifts = [
  {
    region: "Germany",
    date: "July 2026",
    stat: "≥20%",
    statLabel: "of a DiGA's price tied to outcomes",
    title: "Outcome-linked pricing is now law",
    body: "Under the Digital Act (DigiG), new reimbursement agreements for prescribable health apps (DiGA) must tie at least 20% of the price to measured outcomes.",
    source: "vfa — DigiG overview",
    href: "https://www.vfa.de/de/forschung-entwicklung/digitalhub/digitalisierung-in-der-versorgung/diga-epa-co.-ein-blick-ins-digig",
  },
  {
    region: "Switzerland",
    date: "March 2024",
    stat: "≥5%",
    statLabel: "weight loss in 16 weeks to stay reimbursed",
    title: "Reimbursement conditional on results",
    body: "Swiss insurers cover Wegovy only if patients lose at least 5% of body weight within 16 weeks. Continued payment depends on verified progress.",
    source: "FOPH — Specialty list decision",
    href: "https://www.bag.admin.ch/dam/de/sd-web/4UEBFvIzBFFM/wegovy-neuaufnahme-01-03-2024.pdf",
  },
  {
    region: "European Union",
    date: "March 2025",
    stat: "2027",
    statLabel: "EU health data rules start to apply",
    title: "Health data becomes portable",
    body: "The European Health Data Space regulation entered into force, creating an EU-wide framework for sharing electronic health data. It applies in stages from 2027.",
    source: "EUR-Lex — Regulation (EU) 2025/327",
    href: "https://eur-lex.europa.eu/eli/reg/2025/327/oj",
  },
]

export function WhyNowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      id="why-now"
      className="py-16 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-14 grid lg:grid-cols-2 gap-6 lg:gap-16 lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f15d22] mb-4 font-bold">
              Why now
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2f241f] leading-[1.02] font-medium tracking-tight">
              Regulators now make payment{" "}
              <span className="italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">
                depend on outcomes.
              </span>
            </h2>
          </div>
          <p className="text-[#6f5346] text-base sm:text-lg leading-relaxed lg:pb-2">
            In Europe&apos;s largest health markets, reimbursement is moving from paying for access to paying for results. Every one of these contracts needs outcomes that are measured, verified and audited. The tools to do that don&apos;t exist yet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shifts.map((shift, idx) => (
            <motion.article
              key={shift.title}
              className="interactive-surface flex flex-col rounded-3xl border border-[#efc2a5]/40 bg-white/70 backdrop-blur p-7 sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-8 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="text-[#0f8f81]">{shift.region}</span>
                <span className="text-[#8c6a59]/70">{shift.date}</span>
              </div>
              <p className="font-serif text-6xl sm:text-7xl font-semibold tracking-tight leading-none bg-gradient-to-br from-[#ff824c] via-[#f15d22] to-[#b83305] bg-clip-text text-transparent mb-3">
                {shift.stat}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#8c6a59] font-bold mb-8">
                {shift.statLabel}
              </p>
              <h3 className="font-serif text-xl font-semibold tracking-tight text-[#2f241f] mb-2">
                {shift.title}
              </h3>
              <p className="text-sm text-[#6f5346] leading-relaxed mb-6 flex-1">
                {shift.body}
              </p>
              <a
                href={shift.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link inline-flex w-fit items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#8c6a59] hover:text-[#2f241f]"
              >
                Source: {shift.source}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
