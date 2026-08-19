"use client"

import { Activity, ShieldCheck, HeartPulse } from "lucide-react"

const pillars = [
  {
    title: "Lower evidence costs",
    description: "Replace CHF 50k–150k consulting projects with software.",
    icon: <Activity className="w-6 h-6 text-[#14B8A6]" />
  },
  {
    title: "Avoid custom registries",
    description: "Skip CHF 100k–250k custom evidence builds.",
    icon: <ShieldCheck className="w-6 h-6 text-[#f15d22]" />
  },
  {
    title: "Launch in weeks",
    description: "Go from 12–18 months to under two weeks.",
    icon: <HeartPulse className="w-6 h-6 text-[#14B8A6]" />
  }
]

export function PrecisionMedicineFitStrip() {
  const pattern1 = (
    <svg
      className="absolute -bottom-6 -right-6 w-36 h-36 text-teal-300/10 group-hover:text-teal-300/25 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-6 pointer-events-none z-0"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M 0 100 L 30 100 L 40 50 L 55 150 L 65 70 L 75 120 L 85 100 L 200 100" />
      <path d="M 0 130 L 50 130 L 60 90 L 72 160 L 82 110 L 92 140 L 102 130 L 200 130" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="55" cy="150" r="3" fill="#14B8A6" className="animate-pulse" />
      <circle cx="40" cy="50" r="3" fill="#f15d22" className="animate-pulse" />
    </svg>
  )

  const pattern2 = (
    <svg
      className="absolute -bottom-6 -right-6 w-36 h-36 text-teal-300/10 group-hover:text-teal-300/25 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6 pointer-events-none z-0"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="120" cy="120" r="30" />
      <circle cx="120" cy="120" r="50" strokeDasharray="5 5" />
      <circle cx="120" cy="120" r="70" />
      <line x1="20" y1="120" x2="220" y2="120" strokeDasharray="2 2" />
      <line x1="120" y1="20" x2="120" y2="220" strokeDasharray="2 2" />
    </svg>
  )

  const pattern3 = (
    <svg
      className="absolute -bottom-6 -right-6 w-36 h-36 text-teal-300/10 group-hover:text-teal-300/25 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-12 pointer-events-none z-0"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M 20 160 Q 80 120 120 70 T 180 30" />
      <path d="M 20 180 Q 90 140 130 90 T 190 50" opacity="0.3" strokeDasharray="4 4" />
      <line x1="40" y1="160" x2="40" y2="200" opacity="0.5" />
      <line x1="80" y1="120" x2="80" y2="200" opacity="0.5" />
      <line x1="120" y1="80" x2="120" y2="200" opacity="0.5" />
      <line x1="160" y1="40" x2="160" y2="200" opacity="0.5" />
    </svg>
  )

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-[#072520] via-[#0a352e] to-[#041613] border-t border-white/10 scroll-mt-24 text-white">
      {/* Subtle blueprint grid pattern optimized for dark green */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(20, 184, 166, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 184, 166, 0.12) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)"
        }}
      />
      {/* Soft teal ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#14B8A6]/6 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold block">
            Built for digital value-based care
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-[1.1] font-medium tracking-tight">
            Spend less. <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff9e79] via-[#f15d22] to-[#ff6f3b] bg-clip-text text-transparent pr-1">Launch faster.</span>
          </h2>
          <div className="h-1 w-12 bg-[#14B8A6]/60 mx-auto rounded-full mt-4" />
        </div>

        {/* 3-Column Glassmorphic Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => {
            const patterns = [pattern1, pattern2, pattern3]
            return (
              <div
                key={idx}
                className="interactive-surface-dark group bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-lg"
              >
                {/* Radial glow on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Upgraded SVG pattern */}
                {patterns[idx]}

                {/* Index marker */}
                <div className="absolute top-6 right-8 font-mono text-[10px] text-teal-300/30 font-bold select-none group-hover:text-teal-300/60 transition-colors duration-300 z-10">
                  0{idx + 1}
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Pillar Title */}
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold tracking-tight mb-3">
                      {pillar.title}
                    </h3>

                    {/* Pillar Description */}
                    <p className="text-sm text-teal-100/70 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
