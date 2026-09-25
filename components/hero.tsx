"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, BadgeCheck, Lock } from "lucide-react"
import { HeroFlow } from "@/components/hero-flow"
import { HeroBackdrop } from "@/components/hero-backdrop"
import { SwissCross } from "@/components/ui/swiss-cross"
import { lois } from "@/lib/traction"

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
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const proofPoints = [
  "Swiss-hosted",
  "Built on ETH Zurich research",
  `${lois.length} signed letters of intent`,
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const cardY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80])
  const cardRotate = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 0 : -6, 0])

  return (
    <section ref={sectionRef} id="platform" className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28 text-[#fffaf6]">
      <HeroBackdrop />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-16 lg:gap-10 items-center">
          <motion.div
            className="min-w-0 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={itemVariants}
              className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur px-3.5 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#efc2a5] font-bold"
            >
              <SwissCross className="w-2.5 h-2.5 text-[#f15d22]" />
              Outcome-based reimbursement infrastructure
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-serif font-medium tracking-[-0.02em] leading-[0.98] text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] mb-7"
            >
              Payers now pay for outcomes.{" "}
              <span className="italic font-semibold bg-gradient-to-r from-[#ffb08a] via-[#f15d22] to-[#ff6f3b] bg-clip-text text-transparent pr-2">
                We make them provable.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[#fffaf6]/70 text-base sm:text-lg leading-relaxed max-w-xl mb-10"
            >
              Sanafin is the software layer between digital health products and the payers who fund them. Connect patient data, verify outcomes, and settle value-based contracts automatically.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
              <Link
                href="/demo"
                className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-[10px] bg-[#f15d22] px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_12px_40px_-10px_rgba(241,93,34,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
                Book a discovery call
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#how"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/20 bg-white/[0.04] px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#fffaf6] backdrop-blur transition-colors hover:border-white/40 hover:bg-white/[0.08]"
              >
                See how it works
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-[#fffaf6]/55 font-bold"
            >
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.9)]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="min-w-0 relative [perspective:1400px]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div style={{ y: cardY, rotateY: cardRotate }} className="relative">
              <HeroFlow />

              {/* Floating detail chips */}
              <motion.div
                className="hidden sm:flex absolute -left-6 lg:-left-12 -top-6 items-center gap-2 rounded-xl border border-white/15 bg-[#1d1512]/80 backdrop-blur-md px-3.5 py-2.5 shadow-2xl"
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <BadgeCheck className="h-4 w-4 text-[#14B8A6]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#fffaf6]/85 font-bold">Outcome verified</span>
              </motion.div>
              <motion.div
                className="hidden sm:flex absolute -right-4 lg:-right-8 -bottom-6 items-center gap-2 rounded-xl border border-white/15 bg-[#1d1512]/80 backdrop-blur-md px-3.5 py-2.5 shadow-2xl"
                animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Lock className="h-4 w-4 text-[#f15d22]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#fffaf6]/85 font-bold">Audit trail signed</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
