"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import whyMattersImg from "@/components/ui/slides/Why_matters.png"
import sfCubeBgImg from "@/components/ui/slides/sf-cube_bg.png"

function SwissCross({ className = "w-2.5 h-2.5 text-[#14B8A6] shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <path d="M4,1 H6 V4 H9 V6 H6 V9 H4 V6 H1 V4 H4 Z" />
    </svg>
  )
}

const propositions = [
  {
    title: "Easy to Collect",
    description: "Connect your data. Turn biomarkers into contract-ready endpoints."
  },
  {
    title: "Efficient to Verify",
    description: "Find evidence gaps early. Keep every outcome audit-ready."
  },
  {
    title: "Equitable to Finance",
    description: "Link payment to verified outcomes with transparent contract rules."
  }
]

export function AntiManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="why-sanafin" className="py-20 relative overflow-hidden bg-transparent border-t border-[#efc2a5]/20 scroll-mt-24">
      {/* Background sf-cube_bg.png with smooth fading and entry animation */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <Image
          src={sfCubeBgImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold block">
            Why Sanafin
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-6 leading-[1.1] font-medium tracking-tight">
            The 3E infrastructure for <span className="text-[#f15d22] italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">value-based care</span>
          </h2>
          <p className="text-[#8c6a59] font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Easy to collect. Efficient to verify. Equitable to finance.
          </p>
        </div>

        {/* 2-Column layout: propositions on the left, Stripe-style graphic on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center max-w-5xl mx-auto">

          {/* Left Column: typographic items */}
          <div className="space-y-8 py-2">
            {propositions.map((item, idx) => (
              <div
                key={idx}
                className="interactive-row flex gap-4 items-start group p-4 -mx-4"
              >
                <SwissCross className="w-3 h-3 text-[#14B8A6] mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                <div>
                  <h3 className="font-serif text-lg text-[#2f241f] font-semibold tracking-tight mb-2 group-hover:text-[#14B8A6] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#8c6a59] text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Graphic showing bridging the gap */}
          <div className="media-surface relative w-full rounded-2xl overflow-hidden border border-[#efc2a5]/35 shadow-lg bg-white/30 backdrop-blur-[8px] p-3 flex items-center justify-center">
            <Image
              src={whyMattersImg}
              alt="Why this matters illustration - bridging the gap with 3 E's"
              className="w-full h-auto block object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  )
}
