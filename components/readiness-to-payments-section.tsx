"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SwissCross } from "@/components/ui/swiss-cross"

const preEscrowPoints = [
  {
    num: "1",
    title: "Clinical endpoint mapping",
    desc: "Turn biomarkers into contract-ready endpoints."
  },
  {
    num: "2",
    title: "Automated evidence synthesis",
    desc: "Generate live, audit-ready evidence automatically."
  },
  {
    num: "3",
    title: "Continuous outcome verification",
    desc: "Track outcomes and flag gaps instantly."
  }
]

const strategicAdvantages = [
  {
    title: "Configurable contract templates",
    desc: "Reuse proven outcome and payment models."
  },
  {
    title: "Outcome-linked payment rules",
    desc: "Tie payment triggers to verified outcomes."
  },
  {
    title: "Enterprise workflow integrations",
    desc: "Connect finance and compliance systems."
  }
]

export function ReadinessToPaymentsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-transparent border-t border-[#efc2a5]/20">
      {/* Light Checker Pattern Background with smooth fading and entry animation */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.32) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.32) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f15d22] mb-4 font-bold block">
            What's included
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-6 leading-[1.1] font-medium tracking-tight">
            Outcome <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">verified</span> & <br />Contract <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">designed</span>
          </h2>
          <p className="text-[#8c6a59] font-sans text-base leading-relaxed max-w-2xl mx-auto">
            Everything you need to go from raw data to a running contract.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch mt-12 max-w-6xl mx-auto">

          {/* Left Column: Visual Flow Diagram */}
          <div className="relative flex flex-col w-full h-full space-y-4">
            <div className="w-full text-left p-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f15d22] font-bold block mb-2">
                Evidence Layer
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2f241f] font-semibold tracking-tight">
                From outcomes to evidence.
              </h3>
            </div>

            <div className="interactive-surface w-full rounded-xl border border-[#efc2a5]/35 shadow-lg bg-white/90 p-6 flex flex-col space-y-3 relative z-10 flex-1">
              {/* 1. Data Sources Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="w-full p-3.5 bg-white/60 border border-[#efc2a5]/20 rounded-lg shadow-sm text-center transition-colors hover:border-[#14B8A6]/25"
              >
                <p className="font-mono text-[8px] uppercase tracking-widest text-[#8c6a59] mb-1 font-bold">
                  Data Sources
                </p>
                <h4 className="font-serif text-base text-[#2f241f] font-semibold">
                  Apps / CGMs / Registries / EHRs
                </h4>
              </motion.div>

              {/* Arrow Connector 1 */}
              <div className="h-9 relative flex flex-col items-center justify-center z-20 w-full">
                {/* Vertical Line */}
                <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#f15d22]/40" />
                {/* Label Pill */}
                <span className="relative z-10 px-2 py-0.5 font-mono text-[8px] font-bold text-[#f15d22] bg-[#ffdcd0]/90 border border-[#f15d22]/30 rounded-full shadow-sm backdrop-blur-[2px]">
                  Sanafin Outcome Studio
                </span>
              </div>

              {/* 2. Middle Pre-Escrow Stack Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full p-4.5 bg-white border border-[#f15d22]/30 rounded-lg shadow-sm relative overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Ambient subtle cross in the corner */}
                <div className="absolute top-4 right-4 opacity-15">
                  <SwissCross className="w-6 h-6 text-[#f15d22]" />
                </div>

                <div className="space-y-3">
                  {preEscrowPoints.map((point) => (
                    <div key={point.num} className="flex gap-3.5 items-start font-sans text-xs">
                      <span className="w-4.5 h-4.5 rounded-full bg-[#f15d22]/15 text-[#f15d22] flex items-center justify-center font-mono font-bold shrink-0 text-[9px] mt-0.5">
                        {point.num}
                      </span>
                      <div>
                        <h5 className="font-serif text-sm font-semibold text-[#2f241f] leading-snug">
                          {point.title}
                        </h5>
                        <p className="text-[#8c6a59] text-[10.5px] mt-0.5 leading-relaxed font-sans">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow Connector 2 */}
              <div className="h-6 relative flex flex-col items-center justify-center w-full">
                {/* Vertical Line */}
                <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#efc2a5]/40" />
                <svg className="absolute bottom-0 w-3.5 h-3.5 text-[#efc2a5] -mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                </svg>
              </div>

              {/* 3. Target / Settlement Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full p-3.5 bg-[#251b18] border border-white/10 rounded-lg shadow-sm text-center text-white transition-transform hover:-translate-y-0.5"
              >
                <p className="font-mono text-[8px] uppercase tracking-widest text-[#efc2a5]/50 mb-1 font-bold">
                  Target / Settlement
                </p>
                <h4 className="font-serif text-base font-semibold">
                  Payers / Providers / Contract Pilots
                </h4>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Strategic Advantages */}
          <div className="relative flex flex-col w-full h-full space-y-4">
            <div className="w-full text-left p-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14B8A6] font-bold block mb-2">
                Contract Layer
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2f241f] font-semibold tracking-tight">
                From evidence to payment.
              </h3>
            </div>

            <div className="interactive-surface w-full rounded-xl border border-[#efc2a5]/35 shadow-lg bg-white/90 p-6 flex flex-col justify-between space-y-3 relative z-10 flex-1">
              {strategicAdvantages.map((advantage, idx) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                  className="interactive-row w-full p-4 bg-white/40 border border-[#efc2a5]/20 rounded-lg shadow-sm text-left flex-1 flex flex-col justify-center"
                >
                  <h4 className="font-serif text-sm font-semibold text-[#2f241f] mb-1.5 flex items-center gap-2">
                    <SwissCross className="w-2.5 h-2.5 text-[#14B8A6] shrink-0" />
                    {advantage.title}
                  </h4>
                  <p className="text-[#8c6a59] text-xs leading-relaxed font-sans pl-4.5">
                    {advantage.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
