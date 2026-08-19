"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import Image from "next/image"
import { SwissCross } from "@/components/ui/swiss-cross"
import mosiacBgImg from "@/components/ui/slides/mosaic_tasks.png"
import engine1Img from "@/components/ui/slides/Engine1.png"
import engine2Img from "@/components/ui/slides/Engine2.png"

const blocks = [
  {
    number: "01",
    title: "Outcome Verification",
    tagline: "Map endpoints, find gaps, and generate audit-ready evidence.",
    image: engine1Img
  },
  {
    number: "02",
    title: "Contract Design Engine",
    tagline: "Set outcomes, payment rules, and pilot terms in one workflow.",
    image: engine2Img
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export function MissingLayerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="pt-6 pb-12 relative overflow-hidden bg-transparent">
      {/* Background Mosaic Image with smooth fading and entry animation */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        }}
      >
        <Image
          src={mosiacBgImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f15d22] mb-3 font-bold block">
            What Sanafin does
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-5 leading-[1.1] font-medium tracking-tight">
            Reimbursement.<br /><span className="text-[#f15d22] italic font-semibold bg-gradient-to-r from-[#ff824c] via-[#f15d22] to-[#d03d00] bg-clip-text text-transparent pr-1">Now a workflow.</span>
          </h2>
          <p className="text-[#8c6a59] font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            One workspace to turn raw health data into live contracts.
          </p>
        </div>

        {/* 2-Column Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-5 max-w-xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {blocks.map((block) => (
            <motion.div
              key={block.number}
              variants={itemVariants}
              className="interactive-surface bg-[#fffaf6]/60 backdrop-blur-[8px] border border-[#efc2a5]/35 rounded-xl flex flex-col overflow-hidden shadow-md group"
            >
              {/* Top part: Text content with plain white background */}
              <div className="bg-white p-5 border-b border-[#efc2a5]/25 relative overflow-hidden">
                {/* Background Watermark Number */}
                <span className="absolute right-4 -top-1 font-serif text-6xl text-[#efc2a5]/12 group-hover:text-[#f15d22]/15 transition-colors duration-500 font-bold select-none pointer-events-none z-0">
                  {block.number}
                </span>

                <div className="relative z-10 pr-10">
                  <h3 className="font-serif text-lg text-[#2f241f] font-semibold tracking-tight mb-1.5">
                    {block.title}
                  </h3>
                  <p className="text-[#8c6a59] text-xs leading-relaxed font-sans">
                    {block.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom part: Graphic nested inside the glass card without padding */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '570/473' }}
              >
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
