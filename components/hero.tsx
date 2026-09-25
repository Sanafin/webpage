"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AppPreview } from "@/components/app-preview"
import { Laurel } from "@/components/ui/laurel"
import { heroVideo } from "@/lib/media"
import { lois } from "@/lib/traction"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <section ref={sectionRef} id="platform" className="relative overflow-hidden pt-36 md:pt-44 bg-[#fbfaf8]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.a
            variants={itemVariants}
            href="https://ibsdf.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#e9e4df] bg-white px-4 py-1.5 text-[13px] text-[#6f6660] transition-colors hover:border-[#d9d1ca] hover:text-[#1f1a17]"
          >
            <Laurel className="h-4 w-auto text-[#c7a98f]" />
            Winner, InnoBooster Sustainable Digital Finance Award
            <Laurel className="h-4 w-auto text-[#c7a98f]" flip />
          </motion.a>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[2.5rem] leading-[1.06] sm:text-[3.4rem] lg:text-[4.1rem] font-medium text-[#1f1a17] mb-6"
          >
            <span className="lg:whitespace-nowrap">Payers now pay for outcomes.</span>
            <br />
            <span className="lg:whitespace-nowrap text-[#1f1a17]/40">We make them provable.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base sm:text-lg leading-relaxed text-[#6f6660] mb-9"
          >
            The software layer between digital health products and the payers who fund them. Connect patient data, verify outcomes and settle value-based contracts, in weeks rather than months.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <Link
              href="/demo"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f15d22] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(241,93,34,0.7)] transition-colors hover:bg-[#d94f18]"
            >
              Book a discovery call
            </Link>
            <Link
              href="/#how"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
            >
              See how it works
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[13px] text-[#a39a93]">
            Swiss-hosted · Built on ETH Zurich research · {lois.length} signed letters of intent
          </motion.p>
        </motion.div>

        {/* Product preview with soft glow, Mercury-style */}
        <motion.div
          className="relative mx-auto mt-16 md:mt-20 max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute -inset-x-24 -top-16 bottom-0 overflow-hidden rounded-[48px]" aria-hidden="true">
            <div className="absolute left-[10%] top-[10%] h-[70%] w-[45%] rounded-full bg-[#ffb08a]/40 blur-[90px]" />
            <div className="absolute right-[8%] top-[20%] h-[70%] w-[45%] rounded-full bg-[#9ee6dc]/45 blur-[90px]" />
            {heroVideo && (
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-30 motion-reduce:hidden"
                style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }}
                src={heroVideo.src}
                poster={heroVideo.poster}
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
          <div className="relative">
            <AppPreview />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
