"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { EASE } from "@/components/fx"

// The 100-person grid. The 46 in remission light up one after another, left to
// right, the first time the band scrolls into view; the other 54 stay muted.
export function DotGrid({ remission, label }: { remission: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const reduce = useReducedMotion()
  const lit = inView || reduce

  return (
    <div ref={ref} className="grid grid-cols-10 gap-x-2.5 gap-y-2 sm:gap-x-3 sm:gap-y-2.5" role="img" aria-label={label}>
      {Array.from({ length: 100 }, (_, i) => {
        const inRemission = i < remission
        if (!inRemission) {
          return (
            <span key={i} className="flex flex-col items-center gap-[3px]" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/25 sm:h-2.5 sm:w-2.5" />
              <span className="h-2.5 w-3 rounded-t-full bg-white/25 sm:h-3 sm:w-3.5" />
            </span>
          )
        }
        return (
          <motion.span
            key={i}
            className="flex flex-col items-center gap-[3px]"
            aria-hidden="true"
            initial={false}
            animate={lit ? { opacity: 1, scale: 1 } : { opacity: 0.25, scale: 0.7 }}
            transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.15 + i * 0.022 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#5eead4] sm:h-2.5 sm:w-2.5" />
            <span className="h-2.5 w-3 rounded-t-full bg-[#5eead4] sm:h-3 sm:w-3.5" />
          </motion.span>
        )
      })}
    </div>
  )
}
