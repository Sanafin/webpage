"use client"

import { motion } from "framer-motion"

// Gentle fade-up on first view. Server components wrap their blocks in this;
// MotionConfig in the root layout disables it for reduced-motion users.
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article" | "section"
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
