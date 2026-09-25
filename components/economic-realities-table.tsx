"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const legacy = [
  { value: "CHF 50–150k", label: "Legacy HTA consultants", note: "Per reimbursement dossier" },
  { value: "CHF 100–250k", label: "Custom registries", note: "Bespoke evidence infrastructure" },
  { value: "12–18 mo", label: "To prepare one pilot", note: "Before the first reimbursed franc" },
]

function CornerMarks({ tone }: { tone: "muted" | "accent" }) {
  const c = tone === "accent" ? "border-[#14B8A6]" : "border-[#2f241f]/40"
  return (
    <>
      <span className={`absolute left-0 top-0 h-2.5 w-2.5 border-l border-t ${c}`} aria-hidden="true" />
      <span className={`absolute right-0 top-0 h-2.5 w-2.5 border-r border-t ${c}`} aria-hidden="true" />
      <span className={`absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l ${c}`} aria-hidden="true" />
      <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r ${c}`} aria-hidden="true" />
    </>
  )
}

export function EconomicRealitiesTable() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="problem" className="py-24 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[13px] font-medium text-[#f15d22] mb-4 font-bold">The bottleneck</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#2f241f] leading-[1.02] font-medium tracking-tight mb-6">
            Reimbursement costs more{" "}
            <span className="text-[#1f1a17]/40">than the product.</span>
          </h2>
          <p className="text-[#6f5346] text-base sm:text-lg leading-relaxed max-w-2xl">
            Before the first reimbursed franc, digital health teams burn up to CHF 400k and lose 18 months to manual consulting work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {legacy.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative flex min-h-[170px] lg:min-h-[240px] flex-col bg-white/60 p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <CornerMarks tone="muted" />
              <p className="text-[12px] text-[#8c6a59] font-medium">
                Today · {stat.label}
              </p>
              <p className="mt-auto whitespace-nowrap font-display text-[2rem] sm:text-4xl xl:text-[2.6rem] font-semibold tracking-tight text-[#2f241f]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#8c6a59]">{stat.note}</p>
            </motion.div>
          ))}

          <motion.div
            className="relative flex min-h-[170px] lg:min-h-[240px] flex-col bg-[#120d0b] p-6 text-[#fffaf6] shadow-[0_30px_60px_-30px_rgba(20,184,166,0.6)]"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.36, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <CornerMarks tone="accent" />
            <p className="text-[12px] text-[#14B8A6] font-medium">
              With Sanafin · Pilot ready
            </p>
            <p className="mt-auto whitespace-nowrap font-display text-[2rem] sm:text-4xl xl:text-[2.6rem] font-semibold tracking-tight bg-gradient-to-r from-[#5eead4] to-[#14B8A6] bg-clip-text text-transparent">
              &lt; 2 weeks
            </p>
            <p className="mt-2 text-sm text-[#fffaf6]/60">Software replaces the consulting layer, with a continuous evidence pipeline built in.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
