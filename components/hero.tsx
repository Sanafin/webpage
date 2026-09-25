"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { HeroFlow } from "@/components/hero-flow"
import { SwissCross } from "@/components/ui/swiss-cross"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const proofPoints = [
  "Swiss-hosted",
  "Built on ETH Zurich research",
  "Live in weeks, not 18 months",
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <section ref={sectionRef} id="platform" className="pt-36 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.18) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-12 items-center">
          <motion.div
            className="min-w-0 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={itemVariants}
              className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#efc2a5]/50 bg-white/70 px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#8c6a59] font-bold"
            >
              <SwissCross className="w-2.5 h-2.5 text-[#f15d22]" />
              Outcome-based reimbursement infrastructure
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-[#2f241f] font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mb-6"
            >
              Payers now pay for outcomes.{" "}
              <span className="italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">
                We make them provable.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[#6f5346] text-base sm:text-lg leading-relaxed max-w-xl mb-9"
            >
              Sanafin is the software layer between digital health products and the payers who fund them. Connect patient data, verify outcomes, and settle value-based contracts automatically.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-9">
              <Link
                href="/demo"
                className="action-primary inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 bg-[#14B8A6] text-white hover:bg-[#0f8f81] font-mono uppercase tracking-widest text-xs font-bold rounded-[10px]"
              >
                Book a discovery call
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#how"
                className="action-secondary inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 border border-[#2f241f]/15 hover:border-[#2f241f]/35 bg-white/60 text-[#2f241f] font-mono uppercase tracking-widest text-xs font-bold rounded-[10px]"
              >
                See how it works
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-[#8c6a59] font-bold"
            >
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroFlow />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
