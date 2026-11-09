"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

// The hero copy recedes a little as the page starts to scroll, and the product
// frame tilts up out of the page and settles flat as it reaches the centre of the
// viewport (the Ramp / Apple device-straightening move).

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 45%"] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.5 })
  const rotateX = useTransform(p, [0, 1], reduce ? [0, 0] : [16, 0])
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [0.92, 1])
  const y = useTransform(p, [0, 1], reduce ? [0, 0] : [64, 0])
  const opacity = useTransform(p, [0, 0.6], reduce ? [1, 1] : [0.45, 1])

  return (
    <div ref={ref} className={className} style={{ perspective: 1800 }}>
      <motion.div style={{ rotateX, scale, y, opacity, transformOrigin: "50% 100%", willChange: "transform" }}>{children}</motion.div>
    </div>
  )
}
