"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { FileText, TrendingUp, Database, Zap, ShieldAlert, Sparkles, HelpCircle, ArrowUpRight } from "lucide-react"

function SwissCross({ className = "w-2.5 h-2.5 text-[#f15d22] shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <path d="M4,1 H6 V4 H9 V6 H6 V9 H4 V6 H1 V4 H4 Z" />
    </svg>
  )
}

export function ReimbursementWallSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const problemCosts = [
    {
      title: "Direct FOPH & Swissmedic Fees",
      cost: "CHF 3,500 – CHF 15,000",
      desc: "Pure administrative processing fees required for dossier submission.",
      icon: <FileText className="w-5 h-5 text-[#c78f70]" />,
      badge: "Filing Cost"
    },
    {
      title: "Manual HTA Modeling & Dossiers",
      cost: "CHF 50,000 – CHF 130,000",
      desc: "Static budget impact, efficacy, and WZW simulation dossiers.",
      icon: <TrendingUp className="w-5 h-5 text-[#c78f70]" />,
      badge: "Consulting Fees"
    },
    {
      title: "Swiss RWD / CED Infrastructure",
      cost: "CHF 100,000 – CHF 250,000+",
      desc: "Custom registry platforms to capture local pilot clinical data.",
      icon: <Database className="w-5 h-5 text-[#c78f70]" />,
      badge: "Data Registry"
    }
  ]

  const solutionBenefits = [
    {
      title: "90% Reduction in Setup Costs",
      saving: "Save ~CHF 110,000",
      desc: "Turn high-cost economic consulting dossiers into an API-driven implementation.",
      icon: <Sparkles className="w-5 h-5 text-[#14B8A6]" />,
      badge: "API-Driven"
    },
    {
      title: "Zero-Escrow Pilot Speed",
      saving: "< 2 Weeks vs 18 Months",
      desc: "Launch revenue-generating, risk-shared insurance pilots programmatically.",
      icon: <Zap className="w-5 h-5 text-[#14B8A6]" />,
      badge: "Instant GTM"
    },
    {
      title: "Automated CED Compliance",
      saving: "Save CHF 250,000+",
      desc: "Our data pipeline automatically aggregates patient streams into FOPH-ready value reports.",
      icon: <Sparkles className="w-5 h-5 text-[#14B8A6]" />,
      badge: "Continuous Evidence"
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section ref={sectionRef} id="reimbursement-wall" className="py-24 relative overflow-hidden bg-transparent border-t border-[#efc2a5]/20 scroll-mt-24">
      {/* Premium Background Grain & Subtle Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.16) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f15d22] mb-4 font-bold block">
            Problem
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-6 leading-[1.1] font-medium tracking-tight">
            The Swiss <span className="text-[#f15d22] italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">Reimbursement Wall</span>
          </h2>
          <p className="text-[#8c6a59] font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Swiss digital health ventures are trapped. To scale, you must get reimbursed under mandatory health insurance (OKP), but manual paths create immense barriers.
          </p>
        </div>

        {/* July 2026 KLV Catalyst Card - Premium Timeline & Badge layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-5xl mx-auto rounded-[24px] bg-gradient-to-br from-[#2f241f] to-[#1c1512] border border-[#efc2a5]/30 p-8 shadow-[0_24px_50px_-12px_rgba(47,36,31,0.22)] relative overflow-hidden group hover:border-[#f15d22]/50 transition-colors duration-500"
        >
          {/* Subtle gold vector path design inside catalyst card */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_20%,#efc2a5_0%,transparent_60%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 relative z-10">
            {/* Timeline date indicator */}
            <div className="flex flex-col items-center lg:items-start shrink-0">
              <div className="font-mono text-xs text-[#efc2a5]/60 uppercase tracking-widest font-bold mb-1">
                Effective Date
              </div>
              <div className="font-serif text-3xl sm:text-4xl text-white font-semibold tracking-tight bg-gradient-to-r from-[#ff9e79] to-[#ffdcd0] bg-clip-text text-transparent">
                July 2026
              </div>
              <div className="h-1.5 w-12 bg-[#f15d22] rounded-full mt-3" />
            </div>

            <div className="h-px w-full lg:h-12 lg:w-px bg-[#efc2a5]/15" />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff824c] font-bold bg-[#ff824c]/10 px-3 py-1 rounded-full border border-[#ff824c]/20">
                  KLV Article 33 Precedent
                </span>
                <span className="font-mono text-[9px] text-[#efc2a5]/50 font-bold uppercase tracking-wider">
                  Federal Office of Public Health (FOPH/BAG)
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold tracking-tight mb-3 leading-snug">
                Provisional Reimbursement via Coverage with Evidence Development (CED)
              </h3>
              <p className="text-sm text-[#efc2a5]/80 font-sans leading-relaxed">
                The regulatory landscape just cracked open. Payers will now grant <strong>provisional reimbursement early</strong> for digital cognitive behavioral therapy (CBT), provided the platform actively captures and proves localized, real-world cost-effectiveness.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status Quo vs Sanafin Comparison Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch max-w-5xl mx-auto">

          {/* Left Column: The Cost of Inaction (Sophisticated Warm-Rust/Copper Palette) */}
          <div className="flex flex-col space-y-8">
            <div className="border-b border-[#efc2a5]/40 pb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b83305] font-bold block mb-2">
                THE STATUS QUO
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2f241f] font-semibold tracking-tight">
                Legacy Manual Pathways
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 flex-1"
            >
              {problemCosts.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="bg-[#fffaf6]/60 border border-[#efc2a5]/30 rounded-[16px] p-5 flex gap-4 items-start shadow-xs hover:border-[#b83305]/20 transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-[#b83305]/5 text-[#b83305] rounded-[10px] shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline gap-4 mb-1 flex-wrap">
                      <h4 className="font-serif text-sm font-semibold text-[#2f241f]">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8c6a59]/60 font-bold bg-[#8c6a59]/5 px-2 py-0.5 rounded-[4px]">
                        {item.badge}
                      </span>
                    </div>
                    <div className="font-mono text-sm text-[#b83305] font-bold mb-1.5">
                      {item.cost}
                    </div>
                    <p className="text-[#8c6a59] text-xs font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Baseline Capital Burden Card (Sophisticated dark highlight card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-[#2f241f] text-white rounded-[16px] p-6 border border-white/5 relative overflow-hidden shadow-md group hover:border-[#b83305]/30 transition-all duration-300"
            >
              <div className="absolute right-4 bottom-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <ShieldAlert className="w-28 h-28 text-white" />
              </div>
              <div className="relative z-10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#efc2a5]/70 block mb-1 font-bold">
                  BASELINE CAPITAL BURDEN
                </span>
                <h4 className="font-serif text-2xl font-semibold mb-2 text-[#ffdcd0] tracking-tight">
                  CHF 154,000 to CHF 395,000+
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 bg-[#b83305] rounded-full" />
                  <p className="text-xs font-mono text-[#efc2a5] uppercase tracking-wider font-bold">
                    12 to 18-month capital-dry spell
                  </p>
                </div>
                <p className="text-[11px] text-[#efc2a5]/80 leading-relaxed font-sans">
                  Burned entirely on generating static, spreadsheet-based proof for bi-annual listing updates.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sanafin Economic Arbitrage (Brand Accent Color Palette) */}
          <div className="flex flex-col space-y-8">
            <div className="border-b border-[#efc2a5]/40 pb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14B8A6] font-bold block mb-2">
                THE SANAFIN WAY
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2f241f] font-semibold tracking-tight">
                Economic Arbitrage
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 flex-1"
            >
              {solutionBenefits.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="bg-[#f0f9f8] border border-teal-500/10 rounded-[16px] p-5 flex gap-4 items-start shadow-xs hover:border-[#14B8A6]/30 transition-all duration-300 group"
                >
                  <div className="p-2.5 bg-[#14B8A6]/10 text-[#14B8A6] rounded-[10px] shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline gap-4 mb-1 flex-wrap">
                      <h4 className="font-serif text-sm font-semibold text-[#2f241f]">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-teal-700 font-bold bg-[#14B8A6]/10 px-2 py-0.5 rounded-[4px]">
                        {item.badge}
                      </span>
                    </div>
                    <div className="font-mono text-sm text-[#14B8A6] font-bold mb-1.5">
                      {item.saving}
                    </div>
                    <p className="text-[#8c6a59] text-xs font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Sanafin Value Callout Card (Deep elegant dark green card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-[#072520] text-white rounded-[16px] p-6 border border-[#14B8A6]/20 relative overflow-hidden shadow-md group hover:border-[#14B8A6]/40 transition-all duration-300"
            >
              <div className="absolute right-4 bottom-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-28 h-28 text-teal-400" />
              </div>
              <div className="relative z-10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#14B8A6] block mb-1 font-bold">
                  Sanafin economic payoff
                </span>
                <h4 className="font-serif text-2xl font-semibold mb-2 text-[#ffdcd0] tracking-tight">
                  Reimbursement in Real Time
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 bg-[#14B8A6] rounded-full" />
                  <p className="text-xs font-mono text-teal-300 uppercase tracking-wider font-bold">
                    Software layer over consulting
                  </p>
                </div>
                <p className="text-[11px] text-teal-100/80 leading-relaxed font-sans">
                  We replace manual, high-cost HTA consulting blocks with an automated data pipeline to synthesize outcome streams directly.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
