"use client"

import { useState } from "react"
import { Target, Link2, Coins, ArrowRight, Sparkles, TrendingUp } from "lucide-react"

function SwissCross({ className = "w-2.5 h-2.5 text-[#14B8A6] shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <path d="M4,1 H6 V4 H9 V6 H6 V9 H4 V6 H1 V4 H4 Z" />
    </svg>
  )
}

interface TargetData {
  label: string
  threshold: string
  progress: number
}

interface EvidenceData {
  name: string
  frequency: string
}

interface MilestoneData {
  text: string
  amount: string
}

interface BenefitData {
  label: string
  iconType: "savings" | "cost" | "outcome"
}

interface ProgramData {
  id: string
  name: string
  population: string
  duration: string
  budget: number
  providers: string
  targets: TargetData[]
  evidence: EvidenceData[]
  milestones: MilestoneData[]
  checklist: string[]
  savingsMetric: string
  savingsLabel: string
  costMetric: string
  costLabel: string
  benefits: BenefitData[]
}

const programs: ProgramData[] = [
  {
    id: "weight-management",
    name: "Weight Management",
    population: "800 patients on GLP-1 therapy",
    duration: "12 weeks",
    budget: 120000,
    providers: "GLP-1 Companion App + Scales",
    targets: [
      { label: "Weight Loss Target", threshold: "≥ 7%", progress: 70 },
      { label: "GLP-1 Adherence", threshold: "≥ 85%", progress: 85 },
      { label: "Cost Reduction", threshold: "Sustained", progress: 100 }
    ],
    evidence: [
      { name: "Smart Scales", frequency: "Daily Sync" },
      { name: "Adherence tracker", frequency: "Weekly" },
      { name: "Telehealth platform", frequency: "Real-time" }
    ],
    milestones: [
      { text: "Week 6 Milestone", amount: "CHF 30,000" },
      { text: "Week 12 Milestone", amount: "CHF 60,000" },
      { text: "Adherence Bonus", amount: "CHF 30,000" }
    ],
    checklist: [
      "800 patients enrolled",
      "Scale & medication APIs connected",
      "Telemetry verification active",
      "Payout triggers enabled"
    ],
    savingsMetric: "70%",
    savingsLabel: "Admin Savings",
    costMetric: "14%",
    costLabel: "Spend Reduction",
    benefits: [
      {
        label: "Automated Audits",
        iconType: "savings"
      },
      {
        label: "Risk-Sharing Payouts",
        iconType: "cost"
      },
      {
        label: "Instant Settlement",
        iconType: "outcome"
      }
    ]
  },
  {
    id: "diabetes-prevention",
    name: "Diabetes Prevention",
    population: "1,000 patients (HbA1c 5.7–6.4)",
    duration: "6 months",
    budget: 250000,
    providers: "Digital Health + Coaching + Labs",
    targets: [
      { label: "HbA1c Reduction", threshold: "≥ 0.5%", progress: 60 },
      { label: "Weight Loss", threshold: "≥ 5%", progress: 50 },
      { label: "Weekly Adherence", threshold: "≥ 70%", progress: 70 }
    ],
    evidence: [
      { name: "Lab Reports", frequency: "Monthly" },
      { name: "Wearable activity", frequency: "Daily Sync" },
      { name: "Coaching sessions", frequency: "Real-time" }
    ],
    milestones: [
      { text: "Month 3 Milestone", amount: "CHF 80,000" },
      { text: "Month 6 Milestone", amount: "CHF 120,000" },
      { text: "Weight Loss Bonus", amount: "CHF 50,000" }
    ],
    checklist: [
      "1,000 patients enrolled",
      "3 data sources connected",
      "Verification rules active",
      "Payout triggers enabled"
    ],
    savingsMetric: "75%",
    savingsLabel: "Admin Savings",
    costMetric: "18%",
    costLabel: "Care Cost Cut",
    benefits: [
      {
        label: "Zero-Touch Tracking",
        iconType: "savings"
      },
      {
        label: "Preventative Alignment",
        iconType: "cost"
      },
      {
        label: "Multi-Source Ingestion",
        iconType: "outcome"
      }
    ]
  },
  {
    id: "diabetes-reversal",
    name: "Diabetes Reversal",
    population: "500 patients (Type 2 Diabetes)",
    duration: "12–18 months",
    budget: 225000,
    providers: "CGM + Specialists + Reversal Coach",
    targets: [
      { label: "HbA1c Remission", threshold: "< 5.6%", progress: 80 },
      { label: "Dosage Reduction", threshold: "≥ 30%", progress: 30 },
      { label: "CGM Logs Sync", threshold: "≥ 80%", progress: 80 }
    ],
    evidence: [
      { name: "CGM logs", frequency: "Hourly Sync" },
      { name: "Pharmacy sync", frequency: "Monthly" },
      { name: "Lab HbA1c data", frequency: "Quarterly" }
    ],
    milestones: [
      { text: "Month 6 Milestone", amount: "CHF 75,000" },
      { text: "Month 12 Milestone", amount: "CHF 100,000" },
      { text: "Glycemic Control Bonus", amount: "CHF 50,000" }
    ],
    checklist: [
      "500 patients enrolled",
      "CGM & Pharmacy APIs connected",
      "Clinical rules active",
      "Payout triggers enabled"
    ],
    savingsMetric: "72%",
    savingsLabel: "Admin Savings",
    costMetric: "32%",
    costLabel: "Medication Cut",
    benefits: [
      {
        label: "Automated Escrow",
        iconType: "savings"
      },
      {
        label: "Medication Rollback",
        iconType: "cost"
      },
      {
        label: "Real-time Compliance",
        iconType: "outcome"
      }
    ]
  }
]

function BenefitIcon({ type }: { type: "savings" | "cost" | "outcome" }) {
  switch (type) {
    case "savings":
      return <TrendingUp className="w-4 h-4 text-[#14B8A6]" />
    case "cost":
      return <Coins className="w-4 h-4 text-[#f15d22]" />
    case "outcome":
      return <Sparkles className="w-4 h-4 text-amber-500" />
  }
}

export function PilotWorksSection() {
  const [activeTab, setActiveTab] = useState<string>("weight-management")
  const currentProgram = programs.find(p => p.id === activeTab) || programs[0]

  return (
    <section id="usecases" className="py-16 relative overflow-hidden bg-transparent scroll-mt-24">
      {/* Light Checker Pattern Background with smooth fading */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.32) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.32) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        }}
      />

      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#14B8A6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold block">
            Initial clinical usecases
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] mb-6 leading-[1.1] font-medium tracking-tight">
            Start with metabolic health. <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">Scale longevity.</span>
          </h2>
          <p className="text-[#8c6a59] font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Start with European metabolic health. Expand across digital therapeutics, medical devices, and value-based care.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8 relative z-20">
          <div className="bg-[#fffaf6]/14 backdrop-blur-[6px] p-1 border border-[#efc2a5]/35 rounded-[10px] flex gap-1 shadow-sm">
            {programs.map((prog) => (
              <button
                type="button"
                key={prog.id}
                onClick={() => setActiveTab(prog.id)}
                aria-pressed={activeTab === prog.id}
                className={`min-h-10 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${activeTab === prog.id
                  ? "bg-[#14B8A6] text-white shadow-sm font-bold"
                  : "text-[#8c6a59] hover:text-[#2f241f] hover:bg-white/60"
                  }`}
              >
                {prog.name}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Dashboard Preview Card */}
        <div className="media-surface glass-morphism-light rounded-xl shadow-[0_12px_40px_-12px_rgba(47,36,31,0.06)] overflow-hidden border border-[#efc2a5]/30">

          {/* Header row */}
          <div className="px-8 py-6 border-b border-[#efc2a5]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#2f241f] tracking-tight">
                {currentProgram.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#8c6a59]">
                Active Cycle: <span className="font-semibold text-[#2f241f]">{currentProgram.duration}</span> • {currentProgram.population}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-[#8c6a59] font-bold">
                  Escrow Balance Locked
                </span>
                <span className="text-xl sm:text-2xl font-serif font-semibold text-[#f15d22]">
                  CHF {currentProgram.budget.toLocaleString('en-US')}
                </span>
              </div>
              <div className="h-8 w-px bg-[#efc2a5]/20 hidden sm:block" />
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] bg-emerald-500/10 backdrop-blur-[4px] text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold tracking-wider shrink-0 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>ACTIVE SECURE</span>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="p-8 md:p-12">

            {/* How It Works Divider */}
            <div className="pt-0 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3.5 bg-[#14B8A6] rounded-full" />
                  <h4 className="font-serif text-base font-semibold text-[#2f241f] tracking-tight">
                    Contract Mechanics
                  </h4>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8c6a59] font-bold">
                  Verification Protocol
                </span>
              </div>
            </div>

            {/* 3 Steps / How it works */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

              {/* Step 1: Connect Evidence */}
              <div className="interactive-surface w-full rounded-xl border border-[#efc2a5]/20 shadow-md bg-white/20 backdrop-blur-[12px] p-5 flex flex-col space-y-5 group">
                <div className="flex items-center gap-2.5 border-b border-[#efc2a5]/15 pb-3">
                  <span className="px-2.5 py-1 rounded-full font-mono text-[8px] font-bold text-[#14B8A6] bg-[#14B8A6]/8 backdrop-blur-[2px] border border-[#14B8A6]/20 shadow-sm uppercase tracking-wider">
                    Step 01
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#2f241f] tracking-tight flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-[#14B8A6] group-hover:rotate-12 transition-transform duration-300" />
                    Connect Data
                  </h4>
                </div>
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  {currentProgram.evidence.map((ev, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-[4px] border border-[#efc2a5]/10 rounded-[8px] shadow-[0_2px_8px_rgba(47,36,31,0.01)] hover:bg-white/20 transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#2f241f]">
                        <SwissCross className="w-2.5 h-2.5 text-[#14B8A6] shrink-0" />
                        <span>{ev.name}</span>
                      </div>
                      <span className="font-mono text-[8px] text-[#8c6a59] bg-[#fffaf6]/30 backdrop-blur-[2px] px-2 py-0.5 border border-[#efc2a5]/15 rounded-[4px] uppercase tracking-wider font-semibold shadow-2xs">
                        {ev.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Define Targets */}
              <div className="interactive-surface w-full rounded-xl border border-[#efc2a5]/20 shadow-md bg-white/20 backdrop-blur-[12px] p-5 flex flex-col space-y-5 group">
                <div className="flex items-center gap-2.5 border-b border-[#efc2a5]/15 pb-3">
                  <span className="px-2.5 py-1 rounded-full font-mono text-[8px] font-bold text-[#14B8A6] bg-[#14B8A6]/8 backdrop-blur-[2px] border border-[#14B8A6]/20 shadow-sm uppercase tracking-wider">
                    Step 02
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#2f241f] tracking-tight flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#14B8A6] group-hover:rotate-12 transition-transform duration-300" />
                    Verify Evidence
                  </h4>
                </div>
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  {currentProgram.targets.map((tgt, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-sans font-medium text-[#2f241f]">
                        <span>{tgt.label}</span>
                        <span className="font-mono text-[#f15d22] font-semibold">{tgt.threshold}</span>
                      </div>
                      <div className="h-2.5 w-full bg-white/10 backdrop-blur-[4px] border border-[#efc2a5]/10 rounded-full overflow-hidden p-[1px]">
                        <div
                          className="h-full bg-gradient-to-r from-[#ff824c] via-[#f15d22] to-[#b83305] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(241,93,34,0.3)]"
                          style={{ width: `${tgt.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Automate Settlement */}
              <div className="interactive-surface w-full rounded-xl border border-[#efc2a5]/20 shadow-md bg-white/20 backdrop-blur-[12px] p-5 flex flex-col space-y-5 group">
                <div className="flex items-center gap-2.5 border-b border-[#efc2a5]/15 pb-3">
                  <span className="px-2.5 py-1 rounded-full font-mono text-[8px] font-bold text-[#14B8A6] bg-[#14B8A6]/8 backdrop-blur-[2px] border border-[#14B8A6]/20 shadow-sm uppercase tracking-wider">
                    Step 03
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#2f241f] tracking-tight flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#14B8A6] group-hover:rotate-12 transition-transform duration-300" />
                    Automate Payment
                  </h4>
                </div>
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  {currentProgram.milestones.map((ms, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#f15d22]/4 backdrop-blur-[4px] border border-[#f15d22]/10 rounded-[8px] shadow-[0_2px_8px_rgba(47,36,31,0.01)] hover:bg-[#f15d22]/8 transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#2f241f]">
                        <SwissCross className="w-2.5 h-2.5 text-[#f15d22] shrink-0" />
                        <span>{ms.text}</span>
                      </div>
                      <span className="font-mono text-[9px] text-[#f15d22] font-semibold bg-[#f15d22]/10 backdrop-blur-[2px] px-2 py-0.5 border border-[#f15d22]/15 rounded-[4px]">
                        {ms.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
