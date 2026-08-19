"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function EconomicRealitiesTable() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const tableData = [
    {
      legacy: {
        metric: "CHF 50k – 150k",
        title: "Legacy HTA consultants",
      },
      sanafin: {
        metric: "Repeatable workflow",
        title: "Software replaces the consulting layer",
      },
    },
    {
      legacy: {
        metric: "CHF 100k – 250k",
        title: "Custom registries and evidence infrastructure",
      },
      sanafin: {
        metric: "Built-in pipeline",
        title: "Built-in real-world evidence pipeline",
      },
    },
    {
      legacy: {
        metric: "12 – 18 months",
        title: "To prepare one reimbursement pilot",
      },
      sanafin: {
        metric: "< 2 weeks",
        title: "To prototype and deploy a pilot",
      },
    },
  ]

  const roiRow = {
    legacy: {
      metric: "CHF 150k – 400k",
      title: "Total traditional cost",
      desc: "Burned before testing a single contract.",
    },
    sanafin: {
      metric: "Continuous evidence",
      title: "Sanafin Outcome Studio",
      desc: "Live gap visibility and an audit-ready package that improves continuously.",
    },
  }

  return (
    <section
      ref={sectionRef}
      id="why-now"
      className="py-24 sm:py-28 relative overflow-hidden bg-transparent border-t border-[#efc2a5]/20 scroll-mt-24"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.16) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <motion.div
          className="mb-16 sm:mb-20 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#f15d22] mb-4 font-bold block">
            The bottleneck
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2f241f] mb-6 leading-[1.1] font-medium tracking-tight">
            Reimbursement shouldn&apos;t cost more than your product.
          </h2>
          <p className="text-[#8c6a59] font-sans text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Before the first reimbursed franc, teams burn up to CHF 400k and lose 18 months to manual work.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="media-surface w-full overflow-x-auto rounded-2xl border border-[#efc2a5]/25 bg-white/45 backdrop-blur-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(47,36,31,0.03)]">
            <table className="w-full border-collapse text-left min-w-[600px]">
              {/* Column Headers */}
              <thead>
                <tr className="border-b border-[#efc2a5]/30">
                  <th className="py-4 px-6 sm:px-8 w-1/2 border-r border-[#efc2a5]/15 bg-[#fffaf6]/40">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b83305]/70 font-bold">
                      Traditional Workflow
                    </span>
                  </th>
                  <th className="py-4 px-6 sm:px-8 w-1/2 bg-[#f0f9f8]/20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#14B8A6] font-bold">
                      Sanafin Outcome Studio
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Data Rows */}
                {tableData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#efc2a5]/15 last:border-b-0 group transition-colors duration-200"
                  >
                    {/* Legacy Cell */}
                    <td className="py-7 sm:py-8 px-6 sm:px-8 border-r border-[#efc2a5]/15 align-top bg-transparent group-hover:bg-[#fffaf6]/30 transition-colors duration-200">
                      <div className="flex items-start gap-3.5">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#b83305]/[0.05] shrink-0 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 text-[#b83305]/45" />
                        </div>
                        <div>
                          <div className="font-serif text-xl sm:text-2xl font-bold text-[#b83305] tracking-tight leading-tight">
                            {row.legacy.metric}
                          </div>
                          <div className="text-[#8c6a59] text-[13px] mt-2 font-sans leading-relaxed">
                            {row.legacy.title}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Sanafin Cell */}
                    <td className="py-7 sm:py-8 px-6 sm:px-8 align-top bg-[#f0f9f8]/[0.04] group-hover:bg-[#f0f9f8]/20 transition-colors duration-200">
                      <div className="flex items-start gap-3.5">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/[0.07] shrink-0 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6]" />
                        </div>
                        <div>
                          <div className="font-serif text-xl sm:text-2xl font-bold text-teal-950 tracking-tight leading-tight">
                            {row.sanafin.metric}
                          </div>
                          <div className="text-[#8c6a59] text-[13px] mt-2 font-sans leading-relaxed">
                            {row.sanafin.title}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* ROI Summary Row */}
                <tr className="border-t border-[#efc2a5]/30">
                  {/* Legacy ROI */}
                  <td className="py-8 sm:py-10 px-6 sm:px-8 border-r border-[#efc2a5]/15 align-top bg-[#b83305]/[0.02] relative">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#b83305]/30 via-[#b83305]/10 to-transparent" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b83305]/55 block font-bold mb-2.5">
                      {roiRow.legacy.title}
                    </span>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#b83305] tracking-tight leading-tight">
                      {roiRow.legacy.metric}
                    </div>
                    <p className="text-[#8c6a59] text-[13px] leading-relaxed font-sans mt-3 max-w-[280px]">
                      {roiRow.legacy.desc}
                    </p>
                  </td>

                  {/* Sanafin ROI */}
                  <td className="py-8 sm:py-10 px-6 sm:px-8 align-top bg-[#14B8A6]/[0.04] relative">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#14B8A6]/50 via-[#14B8A6]/20 to-transparent" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#14B8A6] block font-bold mb-2.5">
                      {roiRow.sanafin.title}
                    </span>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#14B8A6] tracking-tight leading-tight">
                      {roiRow.sanafin.metric}
                    </div>
                    <p className="text-teal-950/65 text-[13px] leading-relaxed font-sans mt-3 max-w-[280px]">
                      {roiRow.sanafin.desc}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Typographic Callout */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block" />
            <div className="pl-0 md:pl-1">
              <div className="border-l-2 border-[#14B8A6]/25 pl-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2f241f] font-semibold tracking-tight leading-snug">
                  Ship your product.
                  <br />
                  <span className="text-[#14B8A6]">
                    Let evidence run itself.
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
