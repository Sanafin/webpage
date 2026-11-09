"use client"

import { motion } from "framer-motion"

// Gentle fade-up on first view. Server components wrap their blocks in this;
// MotionConfig in the root layout disables it for reduced-motion users.
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  style,
  y = 20,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article" | "section"
  style?: React.CSSProperties
  /** How far the block travels up as it appears, in px */
  y?: number
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: y > 20 ? 0.9 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
