"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const resources = [
  {
    tag: "Protocol",
    title: "EDEN Protocol Specification",
    description: "Rules for translating clinical metrics into payment contract terms.",
    href: "/eden-framework#specification",
    cta: "Read specification",
    cover: <EdenCover />,
  },
  {
    tag: "Research",
    title: "Clinical & Economic Research",
    description: "Research on health economics, HTA, and stakeholder incentives.",
    href: "/eden-framework#publications",
    cta: "Explore papers",
    cover: <ResearchCover />,
  },
  {
    tag: "Validation",
    title: "EDEN Validation Studies",
    description: "Study materials on adherence, HL7 integration, and actuarial modelling.",
    href: "/eden-framework",
    cta: "Read validation findings",
    cover: <ValidationCover />,
  },
  {
    tag: "API Docs",
    title: "Developer API Reference",
    description: "Reference for biomarker verification and escrow payout configuration.",
    href: "/api-docs",
    cta: "Explore API docs",
    cover: <ApiCover />,
  },
]

function EdenCover() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071e1c 0%, #0d2e2a 100%)" }}
    >
      {/* Subtle teal grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,184,166,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl"
        style={{ background: "rgba(20,184,166,0.35)" }}
      />
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(20,184,166,0.55)" }}>
            Open Specification
          </p>
          <div className="flex gap-0.5">
            {["E", "D", "E", "N"].map((l, i) => (
              <span
                key={i}
                className="font-sans text-4xl font-extrabold leading-none tracking-tighter"
                style={{ color: i % 2 === 0 ? "#14B8A6" : "rgba(255,255,255,0.1)" }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          {["Enforceable", "Deterministic", "Evidence-based", "Neutral"].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: "#14B8A6", opacity: 1 - i * 0.22 }}
              />
              <span className="font-mono text-[8px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {w}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ValidationCover() {
  const steps = [
    { label: "EDEN I: Adherence", done: true },
    { label: "EDEN II: HL7 Integration", done: true },
    { label: "EDEN III: Actuarial Modelling", done: true },
  ]
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0c04 0%, #2a1205 100%)" }}
    >
      <div
        className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-2xl"
        style={{ background: "rgba(233,131,67,0.35)" }}
      />
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(233,131,67,0.55)" }}>
          Study Series
        </p>
        <div className="space-y-2.5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(233,131,67,0.15)",
                  border: "1px solid rgba(233,131,67,0.6)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#e98343" }} />
              </div>
              <span
                className="font-mono text-[8px] leading-tight"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResearchCover() {
  const bars = [0.28, 0.52, 0.38, 0.75, 0.44, 1.0, 0.62, 0.34, 0.68, 0.48]
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0e0c10 0%, #1a1210 100%)" }}
    >
      <div
        className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-2xl"
        style={{ background: "rgba(20,184,166,0.3)" }}
      />
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.22)" }}>
            Research Library
          </p>
          <span
            className="font-mono text-[7px] px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(20,184,166,0.12)", color: "#14B8A6" }}
          >
            Evidence review
          </span>
        </div>
        <div>
          <p className="font-mono text-[8px] mb-2.5" style={{ color: "rgba(255,255,255,0.22)" }}>
            Swiss HTA & Adoption Models
          </p>
          <div className="flex items-end gap-1 h-10">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h * 100}%`,
                  background: h === 1.0 ? "#14B8A6" : `rgba(20,184,166,${0.12 + h * 0.18})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ApiCover() {
  return (
    <div
      className="w-full h-full relative overflow-hidden font-mono"
      style={{ background: "linear-gradient(135deg, #07101a 0%, #0d1824 100%)" }}
    >
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl"
        style={{ background: "rgba(20,184,166,0.3)" }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {/* Window chrome bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(40,201,64,0.7)" }} />
          <span className="ml-2 text-[8px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            POST /v1/contracts
          </span>
        </div>
        {/* Code body */}
        <div className="p-4 space-y-1.5 text-[9px] leading-relaxed">
          <div style={{ color: "rgba(255,255,255,0.2)" }}>{`{`}</div>
          <div className="pl-3">
            <span style={{ color: "#14B8A6" }}>&quot;escrow_amount&quot;</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>: </span>
            <span style={{ color: "#a78bfa" }}>100000</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>,</span>
          </div>
          <div className="pl-3">
            <span style={{ color: "#14B8A6" }}>&quot;currency&quot;</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>: </span>
            <span style={{ color: "#f59e0b" }}>&quot;CHF&quot;</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>,</span>
          </div>
          <div className="pl-3">
            <span style={{ color: "#14B8A6" }}>&quot;payout_timing&quot;</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>: </span>
            <span style={{ color: "#f59e0b" }}>&quot;2_hours&quot;</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.2)" }}>{`}`}</div>
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#14B8A6" }} />
            <span style={{ color: "#14B8A6" }}>200 OK</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1e3830 0%, #342010 100%)" }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(233,131,67,0.12) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="reveal max-w-3xl mx-auto text-left px-6 md:px-20 lg:px-32 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold block">
            Resources
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-[1.1] font-medium tracking-tight">
            Learn about Sanafin and <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">Paying</span> for Health.
          </h2>
          <p className="text-white/60 font-sans text-base sm:text-lg leading-relaxed mb-8">
            Explore the research, protocol, validation work, and API documentation behind Sanafin.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, i) => (
            <motion.article
              key={resource.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="interactive-surface-dark group relative rounded-xl flex flex-col overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.045)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              {/* Hover tint overlay */}
              <div
                className="absolute inset-0 rounded-[10px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "rgba(20,184,166,0.025)" }}
              />

              {/* White-framed thumbnail */}
              <div className="px-3 pt-3 shrink-0">
                <div
                  className="rounded-[10px] overflow-hidden"
                  style={{
                    height: "152px",
                    background: "rgba(255,255,255,0.9)",
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-[10px] overflow-hidden">
                    {resource.cover}
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 flex flex-col flex-1">
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.2em] mb-2.5 block"
                  style={{ color: "rgba(20,184,166,0.75)" }}
                >
                  {resource.tag}
                </span>
                <h3
                  className="font-serif text-base leading-snug mb-2.5 flex-none font-semibold tracking-tight"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  {resource.title}
                </h3>
                <p
                  className="text-xs leading-relaxed flex-1"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {resource.description}
                </p>
                <Link
                  href={resource.href}
                  className="group/link inline-flex w-fit items-center gap-2 rounded-sm font-mono text-[10px] uppercase tracking-wider mt-5 transition-all duration-200"
                  style={{ color: "#14B8A6" }}
                >
                  {resource.cta}
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
