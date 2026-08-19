"use client"

import { useState, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import Image from "next/image"
import demoHero from "@/components/ui/slides/Demo_Hero.svg"
import heroRs from "@/components/ui/slides/Hero_rs.svg"
import threeClick from "@/components/ui/slides/3_click.svg"

import innoboosterLogo from "@/components/ui/logo/innobooster.png"
import kickfoundationLogo from "@/components/ui/logo/kickfoundation_pos_farbe.png"
import sicLogo from "@/components/ui/logo/SIC-logo.png"

export function WhoIsThisFor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    // Scale rotation to max 8 degrees
    setRotateX(-mouseY / height * 8)
    setRotateY(mouseX / width * 8)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const logos = [
    { name: "InnoBooster", src: innoboosterLogo, width: 140, height: 40 },
    { name: "SIC", src: sicLogo, width: 120, height: 60 },
    { name: "Kick Foundation", src: kickfoundationLogo, width: 140, height: 40 },
  ]

  return (
    <div ref={containerRef} className="relative mt-2">
      <div className="mt-2 w-full leading-none px-4 md:px-8 lg:px-12 select-none overflow-visible">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1200,
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          }}
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 25,
          }}
          className="relative w-full h-auto cursor-default overflow-visible"
        >
          {/* Base Dashboard Graphic Container */}
          <div className="relative w-full flex items-center justify-center">
            <Image
              src={demoHero}
              alt="Sanafin dashboard preview"
              className="block h-auto w-full relative z-0"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>

          {/* Hero_rs.svg (Z-axis offset overlay card) */}
          <motion.div
            className="absolute pointer-events-none z-10"
            style={{
              left: "75%",
              top: "10%",
              width: "23%",
              height: "85%",
              transformStyle: "preserve-3d",
              z: 50,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 1, ease: "easeOut" },
            }}
          >
            <motion.div
              animate={shouldReduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror" as const,
                duration: 3,
                ease: "easeInOut",
              }}
              className="w-full h-full"
            >
              <Image
                src={heroRs}
                alt="Sanafin dashboard overlay"
                className="block h-full w-full object-contain drop-shadow-[0_12px_32px_rgba(47,36,31,0.09)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* 3_click.svg (Z-axis higher offset overlay card) */}
          <motion.div
            className="absolute pointer-events-none z-20"
            style={{
              left: "14%",
              top: "32%",
              width: "68%",
              height: "58%",
              transformStyle: "preserve-3d",
              z: 100,
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
            }}
          >
            <motion.div
              animate={shouldReduceMotion ? { y: 0 } : { y: [0, -4, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror" as const,
                duration: 4,
                ease: "easeInOut",
              }}
              className="w-full h-full"
            >
              <Image
                src={threeClick}
                alt="Sanafin features overlay"
                className="block h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(47,36,31,0.22)]"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Featured In Overlay */}
        <div className="mt-10 md:mt-12 mb-4">
          <div className="flex flex-col items-center mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#2f241f]/80 font-bold">
              TOP INCUBATORS SUPPORT SANAFIN
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 py-4 px-6">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.name}
                className="relative group grayscale transition-all duration-500 hover:grayscale-0"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={isInView ? { opacity: 0.35, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
                whileHover={{ opacity: 0.8, scale: 1.02 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  className="h-10 md:h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ width: "auto" }}
                  priority
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
