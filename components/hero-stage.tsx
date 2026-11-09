"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

// The hero copy recedes a little as the page starts to scroll, and the product
// frame tilts up out of the page and settles flat as it reaches the centre of the
// viewport (the Ramp / Apple device-straightening move). Once it has settled it
// hands off: as it leaves the top of the viewport it eases back a touch, so the
// dark band that follows reads as the next scene rather than the next block.

export function HeroCopy({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 90])
  const opacity = useTransform(scrollY, [0, 520], [1, reduce ? 1 : 0.25])
  return (
    <motion.div style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Entering: tilt, lift and fade in until the frame is centred
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center 45%"] })
  const pIn = useSpring(enter, { stiffness: 140, damping: 26, mass: 0.5 })
  const rotateX = useTransform(pIn, [0, 1], reduce ? [0, 0] : [16, 0])
  const scaleIn = useTransform(pIn, [0, 1], reduce ? [1, 1] : [0.92, 1])
  const yIn = useTransform(pIn, [0, 1], reduce ? [0, 0] : [64, 0])
  const opacityIn = useTransform(pIn, [0, 0.6], reduce ? [1, 1] : [0.45, 1])

  // Leaving: ease back and dim slightly as the frame scrolls out at the top
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["center 45%", "end start"] })
  const scaleOut = useTransform(leave, [0, 1], reduce ? [1, 1] : [1, 0.96])
  const yOut = useTransform(leave, [0, 1], reduce ? [0, 0] : [0, -28])
  const opacityOut = useTransform(leave, [0.3, 1], reduce ? [1, 1] : [1, 0.55])

  const scale = useTransform([scaleIn, scaleOut], ([a, b]) => (a as number) * (b as number))
  const y = useTransform([yIn, yOut], ([a, b]) => (a as number) + (b as number))
  const opacity = useTransform([opacityIn, opacityOut], ([a, b]) => (a as number) * (b as number))

  return (
    <div ref={ref} className={className} style={{ perspective: 1800 }}>
      <motion.div style={{ rotateX, scale, y, opacity, transformOrigin: "50% 100%", willChange: "transform" }}>{children}</motion.div>
    </div>
  )
}
