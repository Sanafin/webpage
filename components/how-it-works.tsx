"use client"

import { motion } from "framer-motion"
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
          <text x="92" y="29" fontSize="7" fill="#766d67" fontFamily="var(--font-mono, monospace)">cap</text>
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
          <text x="18" y="76" fontSize="7" fill="#766d67" fontFamily="var(--font-mono, monospace)">HbA1c · 12 months</text>
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

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[13px] text-[#766d67] mb-4">How it works</p>
          <h2 id="how-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
            No result, no payment.
          </h2>
        </motion.div>

        <ol className="relative mb-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex flex-col items-center text-center">
              <div className="relative w-full max-w-[220px] rounded-3xl bg-[#f5f1ed] px-5 py-4">
                <Glyph step={i as 0 | 1 | 2 | 3} />
              </div>
              {i < steps.length - 1 && (
                <span className="absolute -right-[18px] top-[76px] hidden -translate-y-1/2 text-[#b5aaa0] lg:block" aria-hidden="true">
                  →
                </span>
              )}
              <p className="mt-5 font-mono text-[11px] text-[#766d67]">0{i + 1}</p>
              <h3 className="mt-1 text-lg font-medium text-[#1f1a17]">{s.title}</h3>
              <p className="mt-1 max-w-[15rem] text-[14px] leading-snug text-[#6f6660]">{s.body}</p>
            </li>
          ))}
        </ol>

        <Walkthrough compact />
        <p className="mt-4 text-center text-[13px] text-[#766d67]">
          Figures from one verification run on a synthetic cohort.{" "}
          <Link href="/demo" className="text-link">
            See the full walkthrough
          </Link>
        </p>
      </div>
    </section>
  )
}
