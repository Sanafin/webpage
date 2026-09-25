"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Database, ShieldCheck, FileCheck2, Banknote, Check } from "lucide-react"

// Illustrative walk-through of one outcome contract. Figures are example values,
// not customer data — the card is labelled as such.
const stages = [
  {
    icon: Database,
    label: "Data connected",
    detail: "CGM, lab HbA1c & pharmacy feeds",
    status: "Synced",
  },
  {
    icon: ShieldCheck,
    label: "Outcome verified",
    detail: "HbA1c −0.6 pts vs. baseline",
    status: "Verified",
  },
  {
    icon: FileCheck2,
    label: "Contract rule met",
    detail: "Target: ≥ 0.5 pt reduction at month 6",
    status: "Met",
  },
  {
    icon: Banknote,
    label: "Payment released",
    detail: "Milestone 2 of 3 · CHF 40,000",
    status: "Released",
  },
]

const STEP_MS = 1400
// Extra ticks at the end so the completed state rests before the loop restarts
const HOLD_TICKS = 3

export function HeroFlow() {
  const shouldReduceMotion = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(() => {
      setTick((prev) => (prev + 1) % (stages.length + HOLD_TICKS))
    }, STEP_MS)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const active = shouldReduceMotion ? stages.length : Math.min(tick, stages.length)
  const progress = active / stages.length

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(ellipse_at_30%_20%,rgba(241,93,34,0.14),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(20,184,166,0.14),transparent_60%)] blur-2xl pointer-events-none" />

      <div className="relative rounded-[24px] border border-[#efc2a5]/40 bg-white/85 backdrop-blur-md shadow-[0_32px_70px_-28px_rgba(47,36,31,0.35)] overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#efc2a5]/30 bg-[#fffaf6]/70">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8c6a59] font-bold">
              Outcome contract
            </p>
            <p className="font-serif text-base sm:text-lg font-semibold text-[#2f241f] truncate">
              Type 2 diabetes programme
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-[#8c6a59]/25 bg-white px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#8c6a59] font-bold">
            Illustrative
          </span>
        </div>

        {/* Stages */}
        <ol className="relative px-5 sm:px-6 py-5 space-y-3">
          {/* Rail */}
          <div className="absolute left-[2.35rem] sm:left-[2.6rem] top-9 bottom-9 w-px bg-[#efc2a5]/40" aria-hidden="true" />
          <motion.div
            className="absolute left-[2.35rem] sm:left-[2.6rem] top-9 w-px bg-gradient-to-b from-[#14B8A6] to-[#f15d22] origin-top"
            style={{ height: "calc(100% - 4.5rem)" }}
            animate={{ scaleY: Math.max(0, (active - 1) / (stages.length - 1)) }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          {stages.map((stage, i) => {
            const done = i < active
            const current = i === active - 1
            const Icon = stage.icon
            return (
              <li key={stage.label} className="relative flex items-center gap-4">
                <motion.div
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                  animate={{
                    backgroundColor: done ? (i === stages.length - 1 ? "#f15d22" : "#14B8A6") : "#ffffff",
                    borderColor: done ? "rgba(255,255,255,0)" : "rgba(239,194,165,0.6)",
                    scale: current && !shouldReduceMotion ? [1, 1.12, 1] : 1,
                  }}
                  transition={{ duration: 0.45 }}
                >
                  <Icon className={`h-4 w-4 ${done ? "text-white" : "text-[#8c6a59]/60"}`} aria-hidden="true" />
                </motion.div>

                <motion.div
                  className="flex-1 min-w-0 rounded-xl border px-4 py-3 flex items-center justify-between gap-3"
                  animate={{
                    backgroundColor: current ? "rgba(255,250,246,1)" : "rgba(255,255,255,0)",
                    borderColor: current ? "rgba(20,184,166,0.35)" : "rgba(239,194,165,0.25)",
                    opacity: done ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#2f241f] leading-tight">{stage.label}</p>
                    <p className="text-[11px] sm:text-xs text-[#8c6a59] mt-0.5 truncate">{stage.detail}</p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold transition-colors duration-300 ${
                      done ? (i === stages.length - 1 ? "text-[#d03d00]" : "text-[#0f8f81]") : "text-[#8c6a59]/50"
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" aria-hidden="true" /> : null}
                    {done ? stage.status : "Pending"}
                  </span>
                </motion.div>
              </li>
            )
          })}
        </ol>

        {/* Footer: audit trail */}
        <div className="px-5 sm:px-6 py-4 border-t border-[#efc2a5]/30 bg-[#fffaf6]/70">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#8c6a59] font-bold mb-2">
            <span>Audit trail</span>
            <span>{active} / {stages.length} events signed</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#efc2a5]/25 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] via-[#14B8A6] to-[#f15d22]"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
