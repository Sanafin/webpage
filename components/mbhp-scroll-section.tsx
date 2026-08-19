"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import makePayImg from "@/components/ui/slides/make_pay.png"
import betterHealthImg from "@/components/ui/slides/better_health.png"

export function MbhpScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smoothly transform scroll progress into vertical displacement using percentage-based translation
  const betterHealthY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"])

  // Opacity: fades in as it enters, reaches full opacity at alignment, fades out as it leaves
  const betterHealthOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2])

  // Scale: zooms in slightly as it aligns for a tactile "snapping" connection feeling
  const betterHealthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.03, 0.94])

  // Glow: warm radial glow behind the text that lights up dynamically when they connect
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])

  return (
    <section className="py-2 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Integrated MBHP Parallax Scroll Graphic (Almost Full Width above the Use Cases section) */}
        <div 
          ref={containerRef}
          className="relative max-w-4xl mx-auto aspect-[16/9] w-full overflow-hidden bg-transparent rounded-[12px]"
        >
          {/* Subtle Dynamic Radial Glow behind the text */}
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(241,93,34,0.08)_0%,_transparent_65%)] pointer-events-none z-0"
          />

          {/* Base Layer: make_pay.png (Fixed in container) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Image
              src={makePayImg}
              alt="Make Pay"
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Overlay Layer: better_health.png (Pulls Up and scales/fades in on top) */}
          <motion.div 
            style={{ 
              y: betterHealthY,
              opacity: betterHealthOpacity,
              scale: betterHealthScale
            }}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
          >
            <Image
              src={betterHealthImg}
              alt="Better Health"
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
