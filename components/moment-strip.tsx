"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Activity, Check, Landmark } from "lucide-react"
import { example } from "@/lib/examples"

// Sanafin's moment in three connected cards: a clinical value arrives, it is
// verified against the contract, a settlement instruction goes out. The dotted
// connector carries a pulse from teal to orange. Example data throughout.
const steps = [
  {
    icon: Activity,
    label: "Lab HbA1c received",
    value: "6.95 %",
    meta: "baseline 7.6 % · month 6",
    tone: "ink",
  },
  {
    icon: Check,
    label: "Verified against contract",
    value: example.delta,
    meta: `threshold ${example.threshold.value} · WZW ${99}/100`,
    tone: "teal",
  },
  {
    icon: Landmark,
    label: "Settlement instruction issued",
    value: example.milestones[0].amount,
    meta: "custody partner → manufacturer",
    tone: "orange",
  },
] as const

export function MomentStrip() {
  const reduce = useReducedMotion()
  return (
    <ol className="relative grid gap-3 sm:grid-cols-3 sm:gap-0" aria-label="How one verification becomes a payment, example data">
      {steps.map((s, i) => {
        const Icon = s.icon
        const accent = s.tone === "teal" ? "text-[#0f766e]" : s.tone === "orange" ? "text-[#c4460f]" : "text-[#1f1a17]"
        const dot = s.tone === "teal" ? "bg-[#14b8a6]" : s.tone === "orange" ? "bg-[#f15d22]" : "bg-[#1f1a17]"
        return (
          <li key={s.label} className="relative flex items-stretch">
            <div className="relative z-10 flex w-full items-start gap-3 rounded-2xl border border-[#e6dfd8] bg-white/95 px-4 py-3.5 shadow-[0_12px_32px_-18px_rgba(47,36,31,0.35)] backdrop-blur">
              <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f1ed] ${accent}`}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] text-[#766d67]">{s.label}</p>
                <p className={`font-mono text-[15px] tabular-nums ${accent}`}>{s.value}</p>
                <p className="truncate font-mono text-[10.5px] text-[#766d67]">{s.meta}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="relative hidden w-10 shrink-0 items-center sm:flex" aria-hidden="true">
                <div className="h-px w-full border-t border-dashed border-[#c9bfb5]" />
                {!reduce && (
                  <motion.span
                    className={`absolute h-1.5 w-1.5 rounded-full ${dot}`}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                  />
                )}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
