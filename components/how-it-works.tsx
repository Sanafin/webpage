"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Pause, Play } from "lucide-react"
import { acts } from "@/lib/examples"
import { Certificate } from "@/components/certificate"
import { media } from "@/lib/media"

// Beats in the marble film, in seconds. The teal marble (patient outcome) is
// weighed at the gate, the gate opens, and the orange marble (payment) rolls out.
const beats = [
  { until: 2.2, label: "Outcome verified", detail: "Checked against the pre-agreed threshold", tone: "teal" },
  { until: 3.1, label: "Threshold met", detail: "WZW-native scoring passes the cut-off", tone: "ink" },
  { until: Infinity, label: "Settlement instructed", detail: "Custody partner releases the funds, with a replayable proof", tone: "orange" },
] as const

const toneClass = {
  teal: "bg-[#14B8A6]",
  ink: "bg-[#1f1a17]",
  orange: "bg-[#f15d22]",
}

const actMedia = {
  refuses: { src: media.actRefuses, alt: "A teal marble stopped against a closed brass gate, with an amber marble held back behind it" },
  pays: { src: media.actPays, alt: "An amber marble rolling out through an open brass gate past a teal marble" },
  tamper: { src: media.actTamper, alt: "Brass calipers measuring a teal marble beside a graduated brass ruler" },
} as const

function Film() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { margin: "-120px" })
  const shouldReduceMotion = useReducedMotion()
  const [beat, setBeat] = useState(shouldReduceMotion ? beats.length - 1 : 0)
  const [paused, setPaused] = useState(false)

  // Only play while on screen; respect reduced motion by showing the poster
  useEffect(() => {
    const video = videoRef.current
    if (!video || shouldReduceMotion || paused) return
    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView, shouldReduceMotion, paused])

  function handleTimeUpdate() {
    const t = videoRef.current?.currentTime ?? 0
    const next = beats.findIndex((b) => t < b.until)
    if (next !== beat) setBeat(next)
  }

  function togglePause() {
    const video = videoRef.current
    if (!video) return
    if (paused) {
      setPaused(false)
      video.play().catch(() => {})
    } else {
      setPaused(true)
      video.pause()
    }
  }

  return (
    <div ref={sectionRef} className="relative overflow-hidden rounded-3xl bg-[#efebe6] shadow-[0_40px_100px_-50px_rgba(47,36,31,0.5)]">
      <video
        ref={videoRef}
        className="block aspect-[4/5] sm:aspect-video max-h-[60vh] w-full object-cover"
        src={media.film}
        poster={media.filmPoster}
        muted
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        aria-label="A teal marble is weighed at a brass gate, which opens and releases an orange marble"
      />

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

      <button
        type="button"
        onClick={togglePause}
        aria-pressed={paused}
        aria-label={paused ? "Play the film" : "Pause the film"}
        className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#1f1a17] backdrop-blur transition-colors hover:bg-white"
      >
        {paused ? <Play className="h-4 w-4 fill-current" aria-hidden="true" /> : <Pause className="h-4 w-4 fill-current" aria-hidden="true" />}
      </button>

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
    </div>
  )
}


export function HowItWorks() {
  const [active, setActive] = useState<(typeof acts)[number]["id"]>("refuses")
  const act = acts.find((a) => a.id === active) ?? acts[0]
  const visual = actMedia[act.id]

  return (
    <section id="how" aria-labelledby="how-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-[13px] text-[#766d67] mb-4">How it works</p>
            <h2 id="how-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17] max-w-3xl">
              First, it refuses to pay.
              <br />
              <span className="text-[#1f1a17]/45">Then it pays. Then it proves it.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#766d67] md:pb-2">
            A funder will only commit money to an outcome if refusal is genuinely automatic. If the system cannot say
            no, its yes is worth nothing. Eight seconds of film, then the three moments that matter.
          </p>
        </motion.div>

        <Film />

        {/* Three acts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-3xl bg-[#f5f1ed] p-3">
            <ol className="flex flex-col gap-1" role="tablist" aria-label="The three acts">
              {acts.map((a) => {
                const selected = a.id === active
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`act-${a.id}`}
                      id={`act-tab-${a.id}`}
                      onClick={() => setActive(a.id)}
                      className={`flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors ${
                        selected ? "bg-white shadow-[0_1px_2px_rgba(47,36,31,0.06)]" : "hover:bg-white/60"
                      }`}
                    >
                      <span className={`mt-1 text-[12px] ${selected ? "text-[#f15d22]" : "text-[#766d67]"}`}>{a.number}</span>
                      <span>
                        <span className="block font-display text-xl text-[#1f1a17]">{a.title}</span>
                        <span className="mt-1 block text-[14px] text-[#766d67]">{a.lead}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div
            id={`act-${act.id}`}
            role="tabpanel"
            aria-labelledby={`act-tab-${act.id}`}
            className="grid overflow-hidden rounded-3xl bg-[#1a1512] text-white md:grid-cols-[1fr_minmax(280px,0.72fr)]"
          >
            {/* Terminal output, as in the live demo */}
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-2 text-[11px] text-white/45">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </span>
                <span className="font-mono">sanafin verify --contract t2d_programme --cohort {act.id === "tamper" ? "b-edited" : act.id === "pays" ? "b" : "a"}</span>
              </div>
              <pre className="overflow-x-auto font-mono text-[12.5px] leading-[1.7] text-white/85">
                <span className="text-white/45">L4  WZW EVALUATION</span>
                {"\n"}
                {act.rows.map(([k, v]) => {
                  const bad = v.includes("false") || v.includes("insufficient") || (act.id === "refuses" && k === "Released to manufacturer")
                  const good = v.includes("meets") || v.includes("true") || (act.id === "pays" && v.includes("CHF 180,000"))
                  return (
                    <span key={k}>
                      {"  "}
                      {k.toLowerCase().padEnd(26, " ")}
                      <span className={bad ? "text-[#ffab8a]" : good ? "text-[#5eead4]" : "text-white"}>{v}</span>
                      {"\n"}
                    </span>
                  )
                })}
                <span className="text-white/45">
                  {act.id === "refuses" ? "L6  SETTLEMENT          returned_to_funder" : act.id === "pays" ? "L6  SETTLEMENT          instruction_issued · 0.9s" : "L6  RE-VERIFY           from exported file · no server"}
                </span>
              </pre>
              <p className="mt-5 text-[14px] leading-relaxed text-white/75">{act.body}</p>
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-5 border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={visual.src ?? media.filmPoster}
                  alt={visual.src ? visual.alt : ""}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <Certificate
                tone="dark"
                verdict={act.id === "refuses" ? "insufficient" : "meets_wzw"}
                composite={act.id === "refuses" ? 29 : 99}
                hash="7aaa8b48615906e0"
                recomputed={act.id === "tamper" ? "d9b10fb1a02ffb63" : "7aaa8b48615906e0"}
              />
              <p className="text-[11.5px] text-white/45">Synthetic cohort · illustrative figures</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
