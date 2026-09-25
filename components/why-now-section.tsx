"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// Every claim here links to a primary or well-established source. Keep it that way.
const shifts = [
  {
    region: "Germany",
    date: "July 2026",
    title: "Outcome-linked pricing is now law",
    body: "Under the Digital Act (DigiG), new reimbursement agreements for prescribable health apps (DiGA) must tie at least 20% of the price to measured outcomes.",
    source: "vfa — DigiG overview",
    href: "https://www.vfa.de/de/forschung-entwicklung/digitalhub/digitalisierung-in-der-versorgung/diga-epa-co.-ein-blick-ins-digig",
  },
  {
    region: "Switzerland",
    date: "March 2024",
    title: "Reimbursement conditional on results",
    body: "Swiss insurers cover Wegovy only if patients lose at least 5% of body weight within 16 weeks. Continued payment depends on verified progress.",
    source: "FOPH — Specialty list decision",
    href: "https://www.bag.admin.ch/dam/de/sd-web/4UEBFvIzBFFM/wegovy-neuaufnahme-01-03-2024.pdf",
  },
  {
    region: "European Union",
    date: "March 2025",
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
      className="py-16 relative overflow-hidden bg-gradient-to-br from-[#072520] via-[#0a352e] to-[#041613] text-white scroll-mt-24"
    >
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(20, 184, 166, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 184, 166, 0.12) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)"
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#14B8A6]/6 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold">
            Why now
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-[1.1] font-medium tracking-tight">
            Regulators are making payment depend on outcomes.{" "}
            <span className="italic font-semibold bg-gradient-to-r from-[#ff9e79] via-[#f15d22] to-[#ff6f3b] bg-clip-text text-transparent pr-1">
              The tools to prove them don&apos;t exist yet.
            </span>
          </h2>
          <p className="text-teal-50/70 text-base sm:text-lg leading-relaxed">
            In Europe&apos;s largest health markets, reimbursement is moving from paying for access to paying for results. Every one of these contracts needs outcomes that are measured, verified and audited.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shifts.map((shift, idx) => (
            <motion.article
              key={shift.title}
              className="interactive-surface-dark flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-7"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-6 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="text-[#14B8A6]">{shift.region}</span>
                <span className="text-white/45">{shift.date}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight mb-3">
                {shift.title}
              </h3>
              <p className="text-sm text-teal-50/70 leading-relaxed mb-6 flex-1">
                {shift.body}
              </p>
              <a
                href={shift.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link inline-flex w-fit items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/55 hover:text-white"
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
