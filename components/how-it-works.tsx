"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { Words } from "@/components/fx"
import Link from "next/link"
import { Walkthrough } from "@/components/demo/walkthrough"

// Four steps, one picture each (Wise / Blue Apron pattern). Each glyph is drawn in
// the brand's ink with one accent, on a 120 × 80 canvas, so the row reads as one set.
function Glyph({ step }: { step: 0 | 1 | 2 | 3 }) {
  const ink = "#1f1a17"
  return (
    <svg viewBox="0 0 120 80" className="h-auto w-full" aria-hidden="true">
      {step === 0 && (
        <g>
          {/* A budget filled to a dashed cap */}
          <rect x="40" y="14" width="40" height="56" rx="8" fill="#fff" stroke={ink} strokeOpacity="0.2" />
          <rect x="44" y="34" width="32" height="32" rx="5" fill="#f15d22" fillOpacity="0.85" />
          <line x1="30" x2="90" y1="26" y2="26" stroke={ink} strokeWidth="1" strokeDasharray="3 3" />
          <text x="92" y="29" fontSize="7" fill="#6f6660" fontFamily="var(--font-mono, monospace)">cap</text>
        </g>
      )}
      {step === 1 && (
        <g>
          {/* A biomarker falling over the months of care */}
          <line x1="16" x2="104" y1="66" y2="66" stroke={ink} strokeOpacity="0.15" />
          <path d="M18 22 C 36 24, 44 34, 58 40 S 86 52, 102 54" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          {[18, 40, 62, 84, 102].map((x, i) => (
            <circle key={x} cx={x} cy={[22, 30, 42, 50, 54][i]} r="2.6" fill="#fff" stroke={ink} strokeWidth="1.2" />
          ))}
          <text x="18" y="76" fontSize="7" fill="#6f6660" fontFamily="var(--font-mono, monospace)">HbA1c · 12 months</text>
        </g>
      )}
      {step === 2 && (
        <g>
          {/* The result crosses a threshold fixed in advance */}
          <line x1="14" x2="106" y1="44" y2="44" stroke="#0f766e" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M16 26 C 40 28, 54 40, 70 52" fill="none" stroke={ink} strokeOpacity="0.3" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="82" cy="40" r="15" fill="#14b8a6" />
          <path d="M75 40.5 l5 5 l9.5 -10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="14" y="58" fontSize="7" fill="#0f766e" fontFamily="var(--font-mono, monospace)">threshold</text>
        </g>
      )}
      {step === 3 && (
        <g>
          {/* A barrier lifts, and the payment rolls through */}
          <line x1="12" x2="108" y1="64" y2="64" stroke={ink} strokeOpacity="0.15" />
          <rect x="34" y="34" width="6" height="30" rx="2" fill={ink} fillOpacity="0.85" />
          <line x1="37" y1="36" x2="62" y2="10" stroke={ink} strokeOpacity="0.85" strokeWidth="4" strokeLinecap="round" />
          <circle cx="37" cy="36" r="3.2" fill="#fbfaf8" stroke={ink} strokeWidth="1.2" />
          <circle cx="66" cy="56" r="8" fill="#f15d22" />
          <path d="M80 56 h16 m-5 -5 l5 5 l-5 5" fill="none" stroke={ink} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  )
}

const steps = [
  { title: "Payer commits", body: "A fixed budget, held by a licensed custodian." },
  { title: "Care is delivered", body: "Any provider, any treatment. Results are measured as usual." },
  { title: "Outcome verified", body: "An independent check compares the result to a target agreed up front." },
  { title: "Payment released", body: "Pass: the provider is paid. Miss: the money goes back to the payer." },
] as const

// One step on the rail (Runway / Linear pattern): picture, a hairline that draws itself as
// the scroll passes, then number, title and one line. No plates, so the row reads as a
// timeline and not as a second card grid after the problem section.
function Step({ s, i, progress }: { s: (typeof steps)[number]; i: number; progress: MotionValue<number> }) {
  const start = i / steps.length
  const fill = useTransform(progress, [start, start + 0.25], [0, 1])
  return (
    <li className="relative flex flex-col">
      <div className="h-[78px] w-[118px] -ml-2 sm:h-[96px] sm:w-[144px]">
        <Glyph step={i as 0 | 1 | 2 | 3} />
      </div>
      <div className={`relative mt-4 h-px bg-[#e6dfd8] ${i < steps.length - 1 ? "lg:-mr-8" : ""}`} aria-hidden="true">
        <motion.div style={{ scaleX: fill, transformOrigin: "0 50%" }} className={`h-full w-full ${i === 2 ? "bg-[#14b8a6]" : "bg-[#1f1a17]"}`} />
        <span className="absolute -top-[4px] left-0 h-[9px] w-[9px] rounded-full border border-[#1f1a17] bg-[#fbfaf8]" />
      </div>
      <p className="mt-5 font-mono text-[12px] text-[#6f6660]">0{i + 1}</p>
      <h3 className="mt-1 text-lg font-medium text-[#1f1a17]">{s.title}</h3>
      <p className="mt-1.5 max-w-[16rem] text-[15px] leading-snug text-[#574e48]">{s.body}</p>
    </li>
  )
}

export function HowItWorks() {
  const railRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  // The rail fills, and the steps light up, as the row crosses the middle of the viewport
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 92%", "end 55%"] })
  const sprung = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 })
  const progress = useTransform(sprung, (v) => (reduce ? 1 : v))

  return (
    <section id="how" aria-labelledby="how-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-[13px] text-[#6f6660] mb-4">How it works</p>
          <h2 id="how-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
            <Words text="No result, no payment." />
          </h2>
        </div>

        <ol ref={railRef} className="relative mb-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {steps.map((s, i) => (
            <Step key={s.title} s={s} i={i} progress={progress} />
          ))}
        </ol>

        <Walkthrough compact />
        <p className="mt-4 text-center text-[13px] text-[#6f6660]">
          Figures from one verification run on a synthetic cohort.{" "}
          <Link href="/demo" className="text-link">
            See the full walkthrough
          </Link>
        </p>
      </div>
    </section>
  )
}
