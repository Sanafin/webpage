"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

// Small motion primitives shared by the landing sections. After the taste / Emil
// Kowalski / Vercel pass most of them render still; the ones that move explain
// something (map routes drawing in, a progress track growing) and play once, and
// MotionConfig in the root layout stills them for reduced-motion users.

export const EASE = [0.16, 1, 0.3, 1] as const

// Headings used to rise word by word as they entered the viewport. They now render as
// plain text: a heading that animates on every section is decoration seen too often.
export function Words({ text, className = "" }: { text: string; className?: string; delay?: number; stagger?: number }) {
  return <span className={className}>{text}</span>
}

// Figures used to count up from zero as they scrolled into view. A sourced figure
// should never be shown with a wrong value, even for a second, so it now renders final.
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  return (
    <span className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// Used to move photos against the scroll. Parallax is decoration seen on every visit,
// so it now renders still; the prop names stay for callers.
export function Parallax({ children, className = "" }: { children: ReactNode; className?: string; from?: number; to?: number }) {
  return <div className={className}>{children}</div>
}

// An SVG path that draws itself in on first view.
export function DrawPath({ d, delay = 0, duration = 1.4, ...rest }: { d: string; delay?: number; duration?: number } & React.SVGProps<SVGPathElement>) {
  return (
    <motion.path
      d={d}
      {...(rest as object)}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.3, delay } }}
    />
  )
}

// Map pins. They used to pop in from scale(0), which nothing in the real world does
// (Emil Kowalski); they now start at 0.96 and fade, in 250 ms, once.
export function Pop({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.g
      initial={{ scale: 0.96, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.25, ease: EASE, delay: Math.min(delay, 0.3) }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {children}
    </motion.g>
  )
}

// True once the component has mounted on the client. Scroll-linked styles that would
// otherwise render their "before" state into the server HTML wait for this, so the
// no-script page and the first paint always show the finished layout.
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

// Bands used to grow from 94 % as they scrolled into view. They now sit still.
export function Settle({ children, className = "" }: { children: ReactNode; className?: string; from?: number }) {
  return <div className={className}>{children}</div>
}

// The mission line used to brighten word by word with the scroll, which left most of
// it dimmed on arrival. It is now set fully lit, like any other sentence.
export function ScrubWords({ text, className = "" }: { text: string; className?: string; dim?: number }) {
  return <span className={className}>{text}</span>
}

// Team photos used to ease out of a zoom on first view. They now sit at rest.
export function Zoom({ children, className = "" }: { children: ReactNode; className?: string; delay?: number; from?: number }) {
  return <div className={className}>{children}</div>
}

// A line that grows from its left edge on first view, used for progress tracks.
export function Grow({ className = "", delay = 0, duration = 0.7 }: { className?: string; delay?: number; duration?: number }) {
  return (
    <motion.span
      className={className}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, ease: EASE, delay }}
      style={{ transformOrigin: "0 50%" }}
    />
  )
}
