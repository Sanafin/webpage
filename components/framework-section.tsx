"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { lois } from "@/lib/traction"

const stats = [
  { value: "4 years", label: "of academic research behind the product" },
  { value: "5+", label: "validated models from the research programme" },
  { value: String(lois.length), label: "signed letters of intent" },
  { value: "Open", label: "scientific framework, publicly documented" },
]

const institutions = ["ETH Zurich", "University of St. Gallen (HSG)", "HOCH Ostschweiz"]

export function FrameworkSection() {
  return (
    <section id="research" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[13px] font-medium text-[#f15d22] mb-4">Foundation</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17] mb-6">
              Built on research,
              <br />
              <span className="text-[#1f1a17]/40">not guesswork.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#6f6660] mb-8 max-w-lg">
              Sanafin productizes four years of research into reimbursement science: guideline automation, outcome-based payment logic and live evidence workflows, published as the open EDEN framework.
            </p>

            <p className="text-[13px] text-[#a39a93] mb-3">Research roots</p>
            <ul className="mb-10 divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
              {institutions.map((name) => (
                <li key={name} className="py-3.5 text-[15px] text-[#1f1a17]">
                  {name}
                </li>
              ))}
            </ul>

            <Link
              href="/eden-framework"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
            >
              Read the EDEN framework
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex min-h-[200px] flex-col justify-between rounded-3xl bg-[#f5f1ed] p-7"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-5xl sm:text-6xl text-[#1f1a17]">{s.value}</p>
                <p className="text-[15px] leading-snug text-[#6f6660] max-w-[16rem]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
