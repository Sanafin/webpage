"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Bell,
  Check,
  FileCheck2,
  FileText,
  Home,
  Layers,
  Link2,
  Plus,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react"
import { SwissCross } from "@/components/ui/swiss-cross"

// Illustrative product preview. Every figure below is example data and the
// preview carries a visible "example data" note.

const nav = [
  { label: "Home", icon: Home, active: true },
  { label: "Contracts", icon: FileText, badge: "3" },
  { label: "Evidence", icon: ShieldCheck },
  { label: "Payouts", icon: Wallet },
  { label: "Data sources", icon: Link2 },
  { label: "Audit log", icon: Layers },
]

const contracts = [
  { name: "Type 2 diabetes programme", payer: "Health insurer", status: "On track", value: "CHF 100,000" },
  { name: "GLP-1 weight management", payer: "Health insurer", status: "Evidence gap", value: "CHF 120,000" },
  { name: "Prediabetes prevention", payer: "Employer plan", status: "On track", value: "CHF 60,000" },
]

// Outcome-linked funds released over time (CHF thousands)
const series = [8, 12, 11, 18, 24, 23, 31, 38, 36, 45, 52, 60]

function AreaChart() {
  const shouldReduceMotion = useReducedMotion()
  const w = 460
  const h = 120
  const max = 64
  const x = (i: number) => (i / (series.length - 1)) * w
  const y = (v: number) => h - (v / max) * h
  const line = series.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="preview-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f15d22" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f15d22" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#preview-fill)" />
      <motion.path
        d={line}
        fill="none"
        stroke="#f15d22"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

export function AppPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e9e4df] bg-white shadow-[0_40px_100px_-40px_rgba(47,36,31,0.35),0_0_0_1px_rgba(47,36,31,0.02)] text-left">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-[#f0ebe6] bg-[#fcfbfa] p-3">
          <div className="flex items-center gap-2 rounded-lg px-2 py-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f15d22]/10">
              <SwissCross className="h-3 w-3 text-[#f15d22]" />
            </span>
            <span className="text-[13px] font-semibold text-[#1f1a17]">Demo workspace</span>
          </div>
          <ul className="space-y-0.5">
            {nav.map(({ label, icon: Icon, active, badge }) => (
              <li
                key={label}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] ${
                  active ? "bg-[#f3efeb] font-medium text-[#1f1a17]" : "text-[#6f6660]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </span>
                {badge && <span className="rounded-md bg-[#f3efeb] px-1.5 text-[11px] text-[#6f6660]">{badge}</span>}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-4 pb-16 sm:p-5 sm:pb-16">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#f0ebe6] bg-[#fcfbfa] px-3 py-1.5 text-[12px] text-[#a39a93] max-w-xs">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">Search contracts, endpoints…</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#e9e4df] px-3 py-1 text-[12px] text-[#1f1a17]">
                <Plus className="h-3 w-3" aria-hidden="true" /> New contract
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3efeb] text-[#6f6660]">
                <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>

          <p className="text-[15px] font-medium text-[#1f1a17] mb-4">Good morning, Anna</p>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            {/* Funds card */}
            <div className="rounded-xl border border-[#f0ebe6] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] text-[#6f6660] flex items-center gap-1.5">
                    Outcome-linked funds released
                    <Check className="h-3 w-3 text-[#14B8A6]" aria-hidden="true" />
                  </p>
                  <p className="mt-1 text-2xl sm:text-[28px] font-medium tracking-tight text-[#1f1a17]">
                    CHF 60,000<span className="text-base text-[#a39a93]">.00</span>
                  </p>
                </div>
                <span className="rounded-md bg-[#14B8A6]/10 px-2 py-1 text-[11px] font-medium text-[#0f8f81]">+ CHF 8k this month</span>
              </div>
              <AreaChart />
              <div className="flex justify-between text-[10px] text-[#a39a93]">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
                <span>Dec</span>
              </div>
            </div>

            {/* Contracts card */}
            <div className="rounded-xl border border-[#f0ebe6] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-medium text-[#1f1a17]">Active contracts</p>
                <span className="text-[11px] text-[#a39a93]">View all</span>
              </div>
              <ul className="divide-y divide-[#f0ebe6]">
                {contracts.map((c) => (
                  <li key={c.name} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-medium text-[#1f1a17]">{c.name}</p>
                      <p className="text-[11px] text-[#a39a93]">{c.payer}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[12px] text-[#1f1a17]">{c.value}</p>
                      <p className={`text-[10px] font-medium ${c.status === "On track" ? "text-[#0f8f81]" : "text-[#d03d00]"}`}>
                        {c.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verification row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Endpoints verified", value: "11 / 12", icon: FileCheck2 },
              { label: "Evidence freshness", value: "Live", icon: ShieldCheck },
              { label: "Audit events signed", value: "1,284", icon: Layers },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-[#f0ebe6] px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#6f6660]">
                  <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </p>
                <p className="mt-0.5 text-[14px] font-medium text-[#1f1a17]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclosure, in the spirit of Mercury's "not a bank" note */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center px-3">
        <p className="rounded-full bg-[#1f1a17]/90 px-4 py-1.5 text-center text-[11px] text-white/85 backdrop-blur">
          Illustrative product preview with example data. Not a real customer.
        </p>
      </div>
    </div>
  )
}
