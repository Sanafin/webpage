"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Activity, ArrowUpRight, FlaskConical, HeartPulse, Pill, Smartphone, Stethoscope, Watch } from "lucide-react"

// Every value in these tiles is an illustrative example, not customer data.

const sources = [
  { label: "CGM", icon: Activity },
  { label: "EHR · FHIR", icon: Stethoscope },
  { label: "Lab results", icon: FlaskConical },
  { label: "Pharmacy", icon: Pill },
  { label: "Wearables", icon: Watch },
  { label: "Care app", icon: Smartphone },
]

// HbA1c (%) over six months, ending below the contract target
const trend = [7.6, 7.5, 7.4, 7.25, 7.15, 7.0, 6.95]
const TARGET = 7.1

const ledger = [
  { event: "Milestone 1 · Enrolment", amount: "CHF 20,000", status: "Released" },
  { event: "Milestone 2 · HbA1c target", amount: "CHF 40,000", status: "Released" },
  { event: "Milestone 3 · Month 12", amount: "CHF 40,000", status: "Held" },
]

function Tile({
  className = "",
  eyebrow,
  title,
  body,
  children,
  delay = 0,
  inView,
}: {
  className?: string
  eyebrow: string
  title: string
  body: string
  children: React.ReactNode
  delay?: number
  inView: boolean
}) {
  return (
    <motion.article
      className={`glow-border group relative flex flex-col overflow-hidden rounded-3xl bg-[#1a1310] p-6 sm:p-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#f15d22] font-bold mb-3">{eyebrow}</p>
        <h3 className="font-serif text-2xl sm:text-[1.7rem] font-semibold tracking-tight text-[#fffaf6] mb-2">{title}</h3>
        <p className="text-sm text-[#fffaf6]/55 leading-relaxed max-w-md">{body}</p>
      </div>
      <div className="relative z-10 mt-auto">{children}</div>
    </motion.article>
  )
}

function TrendChart({ animate }: { animate: boolean }) {
  const w = 320
  const h = 120
  const min = 6.7
  const max = 7.8
  const x = (i: number) => (i / (trend.length - 1)) * w
  const y = (v: number) => h - ((v - min) / (max - min)) * h
  const path = trend.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  const area = `${path} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h + 8}`} className="w-full h-auto overflow-visible" role="img" aria-label="Illustrative HbA1c trend falling below the contract target">
      <defs>
        <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" x2={w} y1={y(TARGET)} y2={y(TARGET)} stroke="#f15d22" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
      <text x={w} y={y(TARGET) - 6} textAnchor="end" className="fill-[#f15d22] font-mono" fontSize="9">TARGET 7.1%</text>
      <motion.path d={area} fill="url(#trend-fill)" initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }} />
      <motion.path
        d={path}
        fill="none"
        stroke="#14B8A6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
      <motion.circle
        cx={x(trend.length - 1)}
        cy={y(trend[trend.length - 1])}
        r="5"
        fill="#14B8A6"
        stroke="#1a1310"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={animate ? { scale: 1 } : {}}
        transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
      />
    </svg>
  )
}

export function ProductBento() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" })
  const shouldReduceMotion = useReducedMotion()
  const animate = isInView || Boolean(shouldReduceMotion)

  return (
    <section ref={sectionRef} id="how" className="relative overflow-hidden bg-[#120d0b] text-[#fffaf6] scroll-mt-24">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#f15d22]/10 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold">The product</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.02] font-medium tracking-tight">
              One workspace, from patient data{" "}
              <span className="italic font-semibold bg-gradient-to-r from-[#ffb08a] via-[#f15d22] to-[#ff6f3b] bg-clip-text text-transparent pr-1">to payout.</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#fffaf6]/40 font-bold lg:text-right">
            Example values · illustrative
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* 01 Connect */}
          <Tile
            className="lg:col-span-4"
            eyebrow="01 · Connect"
            title="Plug in the data you already have."
            body="Apps, devices, labs and clinical systems flow into one evidence model, mapped to contract-ready endpoints."
            inView={isInView}
          >
            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <ul className="grid grid-cols-2 gap-2">
                {sources.map(({ label, icon: Icon }, i) => (
                  <motion.li
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs text-[#fffaf6]/80"
                    initial={{ opacity: 0, x: -12 }}
                    animate={animate ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" aria-hidden="true" />
                    <span className="truncate">{label}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="relative flex h-full w-10 sm:w-16 items-center" aria-hidden="true">
                <div className="h-px w-full bg-gradient-to-r from-[#14B8A6]/10 via-[#14B8A6]/60 to-[#f15d22]/70" />
                {!shouldReduceMotion && (
                  <motion.span
                    className="absolute h-1.5 w-1.5 rounded-full bg-[#fffaf6] shadow-[0_0_12px_#14B8A6]"
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>

              <div className="rounded-2xl border border-[#f15d22]/30 bg-gradient-to-br from-[#f15d22]/15 to-transparent p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-4 w-4 text-[#f15d22]" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#efc2a5] font-bold">Evidence model</span>
                </div>
                <dl className="space-y-2 text-xs">
                  {[
                    ["Endpoints mapped", "12"],
                    ["Evidence gaps", "2"],
                    ["Data freshness", "Live"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-3">
                      <dt className="text-[#fffaf6]/55">{k}</dt>
                      <dd className="font-mono font-bold text-[#fffaf6]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Tile>

          {/* 02 Verify */}
          <Tile
            className="lg:col-span-2"
            eyebrow="02 · Verify"
            title="Outcomes, not claims."
            body="Every endpoint is checked against the contract target, with the audit trail built in."
            delay={0.1}
            inView={isInView}
          >
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#fffaf6]/50 font-bold">HbA1c · 6 months</span>
                <span className="font-mono text-xs font-bold text-[#14B8A6]">−0.65 pts</span>
              </div>
              <TrendChart animate={animate} />
            </div>
          </Tile>

          {/* 03 Contract */}
          <Tile
            className="lg:col-span-2"
            eyebrow="03 · Contract"
            title="Payment rules payers can read."
            body="Outcome thresholds, milestones and fallbacks, written once and reused."
            delay={0.15}
            inView={isInView}
          >
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-[11px] leading-relaxed text-[#fffaf6]/80">
{`rule `}<span className="text-[#14B8A6]">milestone_2</span>{` {
  when  `}<span className="text-[#efc2a5]">hba1c.delta</span>{` <= `}<span className="text-[#f15d22]">-0.5</span>{`
  at    `}<span className="text-[#efc2a5]">month</span>{` = `}<span className="text-[#f15d22]">6</span>{`
  pay   `}<span className="text-[#f15d22]">CHF 40,000</span>{`
  else  hold → clinical review
}`}
            </pre>
          </Tile>

          {/* 04 Settle */}
          <Tile
            className="lg:col-span-4"
            eyebrow="04 · Settle"
            title="Money moves when outcomes do."
            body="Funds are released automatically when a rule is met, and held for review when it isn't."
            delay={0.2}
            inView={isInView}
          >
            <div className="rounded-2xl border border-white/10 bg-black/20 divide-y divide-white/10">
              {ledger.map((row, i) => (
                <motion.div
                  key={row.event}
                  className="flex items-center justify-between gap-4 px-4 py-3.5"
                  initial={{ opacity: 0 }}
                  animate={animate ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  <span className="text-sm text-[#fffaf6]/80 truncate">{row.event}</span>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-xs font-bold text-[#fffaf6]">{row.amount}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider font-bold ${
                        row.status === "Released"
                          ? "bg-[#14B8A6]/15 text-[#14B8A6]"
                          : "bg-[#f15d22]/15 text-[#f15d22]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Tile>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/demo"
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-white/20 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#fffaf6] transition-colors hover:border-white/40 hover:bg-white/[0.06]"
          >
            See it on your data
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
