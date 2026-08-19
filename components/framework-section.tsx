"use client"

import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

function SwissCross({ className = "w-2.5 h-2.5 text-[#f15d22] shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <path d="M4,1 H6 V4 H9 V6 H6 V9 H4 V6 H1 V4 H4 Z" />
    </svg>
  )
}

function AnimatedMetric({
  target,
  suffix = "",
  isInView,
}: {
  target: number
  suffix?: string
  isInView: boolean
}) {
  const shouldReduceMotion = useReducedMotion()
  const value = useMotionValue(shouldReduceMotion ? target : 0)
  const displayValue = useTransform(value, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (!isInView) return

    if (shouldReduceMotion) {
      value.set(target)
      return
    }

    const controls = animate(value, target, {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1],
    })

    return controls.stop
  }, [isInView, shouldReduceMotion, target, value])

  return (
    <span aria-label={`${target}${suffix}`}>
      <motion.span aria-hidden="true">{displayValue}</motion.span>
    </span>
  )
}

// Visual Sub-components (High-Contrast Professional Dark Console - Brand Color Scheme)
function ReportVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #fffaf6 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="flex justify-between items-center relative z-20">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#efc2a5]/60 font-bold">Evidence Router v1.0</span>
        <span className="text-[9px] font-mono text-[#14B8A6] flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
          VERIFIED
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center my-2 font-mono text-[8px] text-[#fffaf6]/90 bg-[#251b18] border-l border-[#14B8A6] p-3 overflow-hidden relative z-20">
        <div className="text-[#14B8A6] font-bold mb-0.5">// FHIR Observation Payload</div>
        <div className="text-[#fffaf6]/85 whitespace-pre leading-relaxed font-mono">
          {`{
  "resourceType": "Observation",
  "status": "final",
  "code": { "text": "HbA1c" },
  "valueQuantity": {
    "value": 5.8,
    "unit": "%"
  },
  "verifiedBy": "HL7_GATEWAY_ZH"
}`}
        </div>
      </div>

      <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[9px] text-[#efc2a5]/50 relative z-20">
        <div>DATA SOURCE: <span className="text-[#fffaf6] font-semibold">HL7 FHIR API</span></div>
        <div>VERIFICATION: <span className="text-[#14B8A6] font-semibold">SECURE GATEWAY</span></div>
      </div>
    </div>
  )
}

function ReimburseVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between relative overflow-hidden bg-transparent">
      <div className="flex justify-between items-center relative z-20">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#efc2a5]/60 font-bold">Escrow Settlement Ledger</span>
        <span className="text-[9px] font-mono text-[#f15d22] flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f15d22]" />
          PARTIAL SETTLEMENT
        </span>
      </div>

      <div className="flex-1 flex items-center justify-around my-4 relative z-20">
        <div className="text-center pl-2">
          <div className="text-[8px] font-mono text-[#efc2a5]/60 uppercase tracking-wider">Escrow Pool</div>
          <div className="font-mono text-xs text-slate-200 font-bold mt-1">
            CHF 120,000.00
          </div>
          <div className="text-[7px] font-mono text-[#efc2a5]/50 mt-0.5 uppercase tracking-wide">
            CHF 30,000.00 Held
          </div>
        </div>

        <div className="relative w-16 flex flex-col items-center justify-center">
          <span className="font-mono text-[7px] text-[#14B8A6] font-bold mb-1">CHF 90,000</span>
          <svg className="w-full h-2 text-slate-600" viewBox="0 0 60 8" fill="none">
            <path d="M0 4H56M56 4L52 1M56 4L52 7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="text-center pr-2">
          <div className="text-[8px] font-mono text-[#14B8A6] uppercase tracking-wider">Paid Out</div>
          <div className="font-mono text-xs text-[#14B8A6] font-bold mt-1">
            CHF 90,000.00
          </div>
          <div className="text-[7px] font-mono text-[#14B8A6] mt-0.5 font-bold">RELEASED</div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[9px] text-[#efc2a5]/50 relative z-20">
        <div>ESCROW CONTRACT: <span className="text-[#fffaf6] font-semibold">ACTIVE</span></div>
        <div>PAYOUT SYSTEM: <span className="text-emerald-400 font-semibold">200 OK (ISO 20022)</span></div>
      </div>
    </div>
  )
}

export function FrameworkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="framework" className="py-16 relative overflow-hidden scroll-mt-24 border-y border-[#efc2a5]/20 bg-[linear-gradient(180deg,rgba(255,250,246,0.72),rgba(248,244,239,0.42))]">
      {/* Subtle background grid pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 88% 74% at 50% 45%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 88% 74% at 50% 45%, black 20%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          {/* Foundation narrative */}
          <motion.div
            className="flex flex-col justify-center py-4"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-5 flex items-center gap-2 font-bold">
              <span className="inline-block w-6 h-px bg-[#14B8A6]" />
              Foundation
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-7 leading-[1.06] font-medium tracking-tight">
              A de-risked engine built on <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">research</span>
            </h2>

            <p className="text-[#8c6a59] font-sans text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
              3.5 years of research, productized: guideline automation, reimbursement logic, and live evidence workflows.
            </p>

            <div className="grid gap-2.5 text-sm text-[#6f5346]">
              {[
                "ETH Zurich",
                "University of St. Gallen (HSG)",
                "HOCH Ostschweiz",
              ].map((institution) => (
                <div
                  key={institution}
                  className="interactive-row flex min-h-12 items-center gap-3 border-[#efc2a5]/25 bg-white/55 px-4 py-3 shadow-[0_1px_2px_rgba(47,36,31,0.03)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f15d22]/8">
                    <SwissCross className="w-2.5 h-2.5 text-[#f15d22]" />
                  </span>
                  <span className="font-medium">{institution}</span>
                </div>
              ))}
            </div>

            <Link
              href="/eden-framework"
              className="text-link group mt-7 inline-flex w-fit items-center gap-1.5 rounded-sm font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0f8f81] hover:text-[#0b6f67]"
            >
              <span>Explore the EDEN Framework</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
            </Link>
          </motion.div>

          {/* Evidence-to-payment console */}
          <motion.div
            className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#251b18] p-3 shadow-[0_32px_70px_-28px_rgba(47,36,31,0.55)] sm:p-4"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.985 }}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#14B8A6]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#f15d22]/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col gap-3">
              <div className="min-h-[285px] flex-1 rounded-2xl border border-white/8 bg-black/20 p-5 backdrop-blur-sm sm:p-6">
                <ReportVisual />
              </div>

              <div className="relative flex h-8 items-center justify-center" aria-hidden="true">
                <div className="h-full w-px bg-gradient-to-b from-[#14B8A6]/70 to-[#f15d22]/70" />
                <div className="absolute h-2 w-2 rounded-full bg-[#14B8A6] shadow-[0_0_14px_rgba(20,184,166,0.75)]" />
              </div>

              <div className="min-h-[180px] flex-1 rounded-2xl border border-white/8 bg-black/20 p-5 backdrop-blur-sm sm:p-6">
                <ReimburseVisual />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Foundation metrics */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 mt-12 mb-10 border-y border-[#efc2a5]/30"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.28, duration: 0.8 }}
        >
          {[
            { metric: "5+", target: 5, suffix: "+", label: "Validated Models", color: "text-[#d9480f]" },
            { metric: "4 Yrs", target: 4, suffix: " Yrs", label: "Academic Research", color: "text-[#b45309]" },
            { metric: "3", target: 3, suffix: "", label: "Design Partners", color: "text-[#9f3f2f]" },
            { metric: "Public", label: "Open Scientific Framework", color: "text-[#6f5346]" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`group min-h-32 px-4 py-8 sm:px-7 ${
                idx === 0
                  ? ""
                  : idx === 2
                    ? "lg:border-l lg:border-[#efc2a5]/30"
                    : "border-l border-[#efc2a5]/30"
              }`}
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <span className={`font-serif text-3xl sm:text-4xl font-bold ${stat.color} tracking-tight group-hover:text-[#2f241f] transition-colors duration-300 inline-block`}>
                  {stat.target !== undefined ? (
                    <AnimatedMetric target={stat.target} suffix={stat.suffix} isInView={isInView} />
                  ) : (
                    <span className="inline-block overflow-hidden align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                        transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {stat.metric}
                      </motion.span>
                    </span>
                  )}
                </span>
                <h4 className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#6f5346] font-bold">
                  {stat.label}
                </h4>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
