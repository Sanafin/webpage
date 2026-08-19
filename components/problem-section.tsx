"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import type { Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import threeClickImg from "@/components/ui/slides/3_click.svg"

const problems = [
  {
    number: "01",
    title: "Connect your data",
    description: "Sync apps, wearables, labs, registries, and EHRs."
  },
  {
    number: "02",
    title: "Build the evidence",
    description: "Map endpoints, find gaps, and generate the audit trail."
  },
  {
    number: "03",
    title: "Launch the contract",
    description: "Set outcome rules, deploy the pilot, and verify continuously."
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
}

const headerVariants: Variants = {
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <section ref={sectionRef} id="how" className="py-16 relative z-10 overflow-hidden scroll-mt-24">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#e2531e]/5 via-transparent to-transparent blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="bg-gradient-to-br from-[#f06634] via-[#e2531e] to-[#b83305] rounded-[32px] p-6 md:p-12 relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(226,83,30,0.12)] border border-white/10">
          {/* Outlined Swiss cross pattern with radial fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cpath d='M34,32 h12 v12 h12 v12 h-12 v12 h-12 v-12 h-12 v-12 h12 z' fill='none' stroke='rgba(255,255,255,0.14)' stroke-width='1.2'/%3E%3Cpath d='M126,23 h8 v8 h8 v8 h-8 v-8 h-8 v-8 h8 z' fill='none' stroke='rgba(255,255,255,0.11)' stroke-width='1'/%3E%3Cpath d='M82,126 h6 v6 h6 v6 h-6 v-6 h-6 v-6 h6 z' fill='none' stroke='rgba(255,255,255,0.10)' stroke-width='0.9'/%3E%3Cpath d='M153,99 h4 v4 h4 v4 h-4 v-4 h-4 v-4 h4 z' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='0.8'/%3E%3Cpath d='M24,116 h2 v3 h3 v2 h-3 v-3 h-2 v-3 h-3 v-2 h3 z' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='0.8'/%3E%3Cpath d='M33,14 h4 v4 h4 v4 h-4 v-4 h-4 v-4 h4 z' fill='none' stroke='rgba(255,255,255,0.10)' stroke-width='0.9'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              maskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)'
            }}
          />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center relative z-10 w-full">
            {/* Centered Header */}
            <motion.div
              className="text-center mb-8 max-w-3xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                variants={headerVariants}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 mb-3 font-bold block"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "auto" } : { width: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-block overflow-hidden whitespace-nowrap"
                >
                  How it works
                </motion.span>
              </motion.p>
              <motion.h2
                variants={headerVariants}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-[1.1] font-medium tracking-tight"
              >
                From clinical data to value-based reimbursement
              </motion.h2>
            </motion.div>

            {/* Centered Workflow Graphic */}
            <motion.div
              className="w-full max-w-3xl mx-auto mb-4"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="media-surface relative w-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/10 bg-white/4 backdrop-blur-[12px] p-3 flex items-center justify-center">
                <Image
                  src={threeClickImg}
                  alt="Sanafin features workflow"
                  className="w-full h-auto block object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Callouts Grid aligned horizontally underneath */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {problems.map((problem, index) => (
                <div key={problem.title} className="flex flex-col items-center group w-full">
                  {/* Callout connector pointing up to the graphic */}
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors duration-300" />
                    <div className="w-px h-6 border-l border-dashed border-white/30 group-hover:border-white/50 transition-colors duration-300" />
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-white/10 group-hover:border-b-white/20 transition-colors duration-300" />
                  </div>

                  {/* Card Description */}
                  <motion.div
                    variants={cardVariants}
                    className="interactive-surface-dark bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[160px] w-full"
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 pointer-events-none"
                      whileHover={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0) 100%)"
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Animated border on hover */}
                    <motion.div
                      className="absolute inset-0 border border-transparent rounded-[10px] pointer-events-none"
                      whileHover={{
                        borderColor: "rgba(255, 255, 255, 0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <div className="mb-2">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                        >
                          <motion.span
                            className="font-mono text-2xl text-[#ffd6bc]/80 group-hover:text-white transition-colors duration-500 block"
                            whileHover={{ scale: 1.05 }}
                          >
                            {problem.number}
                          </motion.span>
                        </motion.div>
                      </div>

                      <div className="bg-transparent z-10 relative">
                        <motion.h3
                          className="font-serif text-sm md:text-base text-white mb-1.5 leading-tight font-semibold tracking-tight"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        >
                          {problem.title}
                        </motion.h3>

                        <motion.p
                          className="text-[11px] text-white/70 leading-relaxed mb-0 font-sans"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        >
                          {problem.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-8 flex justify-center"
            >
              <Link
                href="/demo"
                className="action-inverse inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#b83305] shadow-md transition-all hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Book a discovery call
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
