"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

// Beats in the marble film, in seconds. The teal marble (patient outcome) is
// weighed at the gate, the gate opens, and the orange marble (payment) rolls out.
const beats = [
  { until: 2.2, label: "Patient outcome verified", detail: "Sanafin checks it against the contract", tone: "teal" },
  { until: 3.1, label: "Contract rule met", detail: "The agreed target is reached", tone: "ink" },
  { until: Infinity, label: "Payer releases payment", detail: "Automatically, with a full audit trail", tone: "orange" },
] as const

const toneClass = {
  teal: "bg-[#14B8A6]",
  ink: "bg-[#1f1a17]",
  orange: "bg-[#f15d22]",
}

export function OutcomeFilm() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { margin: "-120px" })
  const shouldReduceMotion = useReducedMotion()
  const [beat, setBeat] = useState(shouldReduceMotion ? beats.length - 1 : 0)

  // Only play while on screen; respect reduced motion by showing the poster
  useEffect(() => {
    const video = videoRef.current
    if (!video || shouldReduceMotion) return
    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView, shouldReduceMotion])

  function handleTimeUpdate() {
    const t = videoRef.current?.currentTime ?? 0
    const next = beats.findIndex((b) => t < b.until)
    if (next !== beat) setBeat(next)
  }

  return (
    <section ref={sectionRef} id="film" aria-label="How Sanafin works, in one shot" className="relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] font-medium text-[#1f1a17] max-w-3xl">
            Money moves
            <br />
            <span className="text-[#1f1a17]/40">when outcomes do.</span>
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#6f6660] md:pb-2">
            That is the whole idea. When a patient outcome is verified against the contract, payment follows automatically. No manual claims, no chasing, no consultants.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl bg-[#efebe6] shadow-[0_40px_100px_-50px_rgba(47,36,31,0.5)]"
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={videoRef}
            className="block aspect-[4/5] sm:aspect-video w-full object-cover"
            src="/media/outcome-marbles.mp4"
            poster="/media/outcome-marbles-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            aria-label="A teal marble is weighed at a brass gate, which opens and releases an orange marble"
          />

          {/* Key: what the marbles stand for */}
          <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[12px] font-medium text-[#1f1a17] backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]" aria-hidden="true" />
              Teal marble = patient outcome
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[12px] font-medium text-[#1f1a17] backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f15d22]" aria-hidden="true" />
              Orange marble = payment
            </span>
          </div>

          {/* Legend synced to the film */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent p-4 sm:p-6 pt-20">
            <ol className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {beats.map((b, i) => {
                const active = i === beat
                const done = i < beat
                return (
                  <li
                    key={b.label}
                    className={`${active ? "flex" : "hidden sm:flex"} items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md transition-all duration-500 ${
                      active ? "bg-white text-[#1f1a17] shadow-lg" : "bg-white/15 text-white/80"
                    }`}
                  >
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      {active && !shouldReduceMotion && (
                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${toneClass[b.tone]}`} />
                      )}
                      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${active || done ? toneClass[b.tone] : "bg-white/50"}`} />
                    </span>
                    <span>
                      <span className="block text-[14px] font-medium leading-tight">{b.label}</span>
                      <span className={`block text-[12px] ${active ? "text-[#6f6660]" : "text-white/60"}`}>{b.detail}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
