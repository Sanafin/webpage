"use client"

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"

// Small scroll-driven primitives shared by the landing sections. Every one of them
// renders its final state on the server and only moves once the visitor scrolls,
// and all of them stand still for reduced-motion users.

export const EASE = [0.16, 1, 0.3, 1] as const

// Each word rises out of its own clipped line as the headline enters the viewport.
// The observer sits on the headline, not the words: a word pushed below its clip
// box never intersects the viewport on its own.
export function Words({ text, className = "", delay = 0, stagger = 0.045 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ")
  return (
    <motion.span className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-60px" }}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "112%" },
                shown: { y: 0, transition: { duration: 0.85, ease: EASE, delay: delay + i * stagger } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  )
}

// A figure that counts up from zero the first time it scrolls into view. The server
// and no-script output is the final value.
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.5,
  className = "",
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const [n, setN] = useState(value)
  const armed = useRef(false)

  // Before first paint on the client, reset to zero so the count has somewhere to go.
  useLayoutEffect(() => {
    if (reduce || armed.current) return
    armed.current = true
    setN(0)
  }, [reduce])

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, value, { duration, ease: EASE, onUpdate: (v) => setN(v) })
    return () => c.stop()
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// Moves its children vertically against the scroll while they cross the viewport.
export function Parallax({ children, className = "", from = 32, to = -32 }: { children: ReactNode; className?: string; from?: number; to?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, to])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
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

// An SVG group that pops in from nothing, used for map pins.
export function Pop({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {children}
    </motion.g>
  )
}
