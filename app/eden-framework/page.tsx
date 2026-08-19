"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, ArrowRight, Coins, ExternalLink, TrendingUp } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const pillars = [
  {
    title: "Clinical Validation",
    icon: Activity,
    detail:
      "Interventions fail without patient compliance. We ingest digital biomarker streams directly to verify real-world adherence and clinical benefit.",
  },
  {
    title: "Economic Alignment",
    icon: TrendingUp,
    detail:
      "Conflicting budget timelines stall preventive care. We synchronize payout structures to match clinical benefit timelines with payer ROI.",
  },
  {
    title: "Programmatic Trust",
    icon: Coins,
    detail:
      "Manual verification delays payouts and raises overhead. We deploy automated escrow structures to release funds instantly upon verified clinical thresholds.",
  },
]

const protocolPhases = [
  {
    r: "Reach",
    def: "Time-to-Screen",
    desc: "Identifying clinical risk profiles using digital and lab metrics.",
  },
  {
    r: "Retain",
    def: "Time-to-Habit",
    desc: "Securing patient compliance and behavioral habits over critical thresholds.",
  },
  {
    r: "Report",
    def: "Time-to-Evidence",
    desc: "Aggregating clinical data feeds for automated programmatic audits.",
  },
  {
    r: "Reimburse",
    def: "Time-to-Return",
    desc: "Triggering payouts exactly when economic benefit and ROI are unlocked.",
  },
]

const studies = [
  {
    id: 1,
    title: "EDEN I: Behavioral Adherence",
    desc: "Simulating gamified behavioral incentives to establish viable clinical contract thresholds and avoid unviable outcome targets.",
  },
  {
    id: 2,
    title: "EDEN II: System Integration",
    desc: "Connecting digital biomarkers and HL7 laboratory data directly to verify outcomes, eliminating physician administration overhead.",
  },
  {
    id: 3,
    title: "EDEN III: Actuarial Viability",
    desc: "Simulating payer discounted cash flow models to demonstrate accelerated break-even points and clear financial ROI.",
  },
]

const publications = [
  {
    category: "Adoption",
    papers: [
      {
        title: "The Longevity Landscape: Mapping Stakeholder Priorities",
        authors: "Mekniran W, Giger O, Fleisch E, Kowatsch T, Jovanova M",
        year: "2025",
        doi: "10.1186/s12889-025-25498-8",
      },
      {
        title: "Digital health incentives in type-2 diabetes prevention",
        authors: "Mekniran W, Diethelm W, Stalder V, Fleisch E, Kowatsch T, Jovanova M",
        year: "2026",
        doi: "10.1177/20552076261425402",
      },
      {
        title: "EDEN: A Computational Framework to Align Incentives in Aging",
        authors: "Mekniran W and Kowatsch T",
        year: "2025",
        doi: "10.5220/0013359800003911",
      },
    ],
  },
  {
    category: "Integration",
    papers: [
      {
        title: "Health Technology Assessment of Swiss Digital Diabetes Screening",
        authors: "Mekniran W et al.",
        year: "2026",
        doi: "10.64898/2026.02.10.26345992",
      },
      {
        title: "Reimagining Preventive Care and Digital Health",
        authors: "Mekniran W, Kramer J-N., Kowatsch T",
        year: "2024",
        doi: "10.5220/0012400300003657",
      },
      {
        title: "A Prevention-First Framework for Noncommunicable Diseases",
        authors: "Mekniran W, Fleisch E, Kowatsch T, Jovanova M",
        year: "2026",
        doi: "10.2139/ssrn.6256938",
      },
    ],
  },
  {
    category: "Investment",
    papers: [
      {
        title: "Assessment of B2C Model for Digital Diabetes Screening",
        authors: "Mekniran W and Kowatsch T",
        year: "2026",
        doi: "10.1186/s12913-026-14075-3",
      },
      {
        title: "Scalable Business Models in Digital Healthy Longevity",
        authors: "Mekniran W and Kowatsch T",
        year: "2023",
        doi: "10.5220/0011778400003414",
      },
    ],
  },
]

const edenPrinciples = [
  { letter: "E", label: "Enforceable" },
  { letter: "D", label: "Deterministic" },
  { letter: "E", label: "Evidence-based" },
  { letter: "N", label: "Neutral" },
]

export default function EdenFrameworkPage() {
  useScrollReveal()

  return (
    <div className="page-wrapper">
      <div className="page-content text-[#2f241f]">
        <Header />

        <main className="landing-page">
          <section id="platform" className="relative overflow-hidden pb-16 pt-40 sm:pb-20 sm:pt-44">
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(210,205,200,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(210,205,200,0.18) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage: "radial-gradient(ellipse 78% 68% at 50% 30%, black 20%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(ellipse 78% 68% at 50% 30%, black 20%, transparent 72%)",
              }}
            />

            <motion.div
              className="relative z-10 mx-auto max-w-4xl px-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#14B8A6]">
                EDEN Framework
              </p>
              <h1 className="mx-auto mb-6 max-w-3xl font-serif text-3xl font-medium leading-[1.08] tracking-tight text-[#2f241f] sm:text-5xl md:text-6xl">
                Scientific infrastructure for <span className="bg-gradient-to-r from-[#ff824c] via-[#f15d22] to-[#d03d00] bg-clip-text font-semibold italic text-transparent">value-based healthcare</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#8c6a59] sm:text-lg">
                Translating clinical validation into secure financial infrastructure. The EDEN Framework aligns incentives between payers, providers, and patients to scale outcome-based care.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#specification"
                  className="action-primary inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#14B8A6] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0f8f81]"
                >
                  View Specification
                </a>
                <a
                  href="#publications"
                  className="action-secondary inline-flex min-h-12 items-center justify-center rounded-[10px] border border-[#2f241f]/20 bg-transparent px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#2f241f] hover:border-[#2f241f]/40 hover:bg-[#2f241f]/5"
                >
                  Publications
                </a>
              </div>
            </motion.div>

            <div className="reveal relative z-10 mx-auto mt-16 grid max-w-5xl grid-cols-2 border-y border-[#efc2a5]/30 px-6 md:grid-cols-4">
              {edenPrinciples.map((principle, index) => (
                <div
                  key={`${principle.letter}-${principle.label}`}
                  className={`px-4 py-7 text-center sm:px-6 ${
                    index === 0
                      ? ""
                      : index === 2
                        ? "md:border-l md:border-[#efc2a5]/30"
                        : "border-l border-[#efc2a5]/30"
                  }`}
                >
                  <span className="mb-2 block font-serif text-3xl font-semibold text-[#d9480f]">{principle.letter}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8c6a59]">{principle.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[#efc2a5]/20 bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
              <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#14B8A6]">
                  Underlying Research
                </p>
                <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-[#2f241f] sm:text-4xl md:text-5xl">
                  Built at the intersection of medicine and finance
                </h2>
              </div>

              <div className="reveal grid border-y border-[#efc2a5]/30 md:grid-cols-3">
                {pillars.map((pillar, index) => {
                  const Icon = pillar.icon
                  return (
                    <article
                      key={pillar.title}
                      className={`group py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-[#efc2a5]/30 md:border-l md:border-t-0" : ""}`}
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <Icon className={`h-5 w-5 ${index === 1 ? "text-[#d9480f]" : "text-[#14B8A6]"}`} />
                        <span className="font-mono text-[9px] text-[#b7791f]">0{index + 1}</span>
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-semibold tracking-tight text-[#2f241f]">{pillar.title}</h3>
                      <p className="text-sm leading-relaxed text-[#8c6a59]">{pillar.detail}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section id="specification" className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#072520] via-[#0a352e] to-[#041613] text-white scroll-mt-24">
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(20,184,166,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,0.12) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
              }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
              <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#2dd4bf]">
                  Operational Standard
                </p>
                <h2 className="mb-5 font-serif text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">The EDEN Protocol</h2>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-teal-100/60">
                  An open standard that converts clinical evidence and economic timelines into code-executable payment contracts.
                </p>
              </div>

              <div className="reveal grid border-y border-white/12 sm:grid-cols-2 lg:grid-cols-4">
                {protocolPhases.map((phase, index) => (
                  <article
                    key={phase.r}
                    className={`group min-h-64 py-8 sm:px-7 ${
                      index > 0 ? "border-t border-white/12 sm:border-l sm:border-t-0" : ""
                    } ${index >= 2 ? "sm:border-t lg:border-t-0" : ""}`}
                  >
                    <div className="mb-10 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2dd4bf]">0{index + 1}</span>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-white/30">Phase 0{index + 1}</span>
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold tracking-tight">{phase.r}</h3>
                    <p className="mb-6 font-mono text-[9px] uppercase tracking-wider text-[#2dd4bf]">{phase.def}</p>
                    <p className="text-sm leading-relaxed text-teal-100/55">{phase.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-[#efc2a5]/20 bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
              <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9480f]">
                  Empirical Evidence
                </p>
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[#2f241f] sm:text-4xl md:text-5xl">
                  Validated by the EDEN studies
                </h2>
              </div>

              <div className="reveal grid border-y border-[#efc2a5]/30 md:grid-cols-3">
                {studies.map((study, index) => (
                  <article
                    key={study.id}
                    className={`py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-[#efc2a5]/30 md:border-l md:border-t-0" : ""}`}
                  >
                    <span className="mb-7 block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#b7791f]">
                      Cohort Testing · 0{study.id}
                    </span>
                    <h3 className="mb-4 font-serif text-lg font-semibold leading-snug tracking-tight text-[#2f241f]">{study.title}</h3>
                    <p className="text-sm leading-relaxed text-[#8c6a59]">{study.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="publications" className="bg-white/25 scroll-mt-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#14B8A6]">
                  Research Library
                </p>
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[#2f241f] sm:text-4xl md:text-5xl">
                  Scientific Publications
                </h2>
              </div>

              <div className="reveal grid gap-12 lg:grid-cols-3 lg:gap-10">
                {publications.map((group) => (
                  <section key={group.category} className="!p-0">
                    <h3 className="mb-5 border-b border-[#efc2a5]/30 pb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#d9480f]">
                      {group.category}
                    </h3>
                    <div className="divide-y divide-[#efc2a5]/20">
                      {group.papers.map((publication) => (
                        <article key={publication.doi} className="group py-5 first:pt-0">
                          <h4 className="mb-2 font-serif text-base font-semibold leading-snug tracking-tight text-[#2f241f] transition-colors group-hover:text-[#0f8f81]">
                            {publication.title}
                          </h4>
                          <p className="mb-3 text-[11px] leading-relaxed text-[#8c6a59]">
                            {publication.authors} ({publication.year})
                          </p>
                          <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1.5 rounded-sm font-mono text-[9px] text-[#0f8f81] hover:text-[#0b6f67]"
                          >
                            DOI: {publication.doi}
                            <ExternalLink className="h-2.5 w-2.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </a>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-transparent">
            <div className="mx-auto max-w-4xl px-6">
              <div className="reveal relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#f06634] via-[#e2531e] to-[#b83305] px-6 py-14 text-center text-white shadow-[0_32px_64px_-12px_rgba(226,83,30,0.12)] sm:px-12 sm:py-16">
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-2xl">
                  <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-orange-100/80">
                    Practitioner Infrastructure
                  </p>
                  <h2 className="mb-5 font-serif text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                    From research to operational infrastructure
                  </h2>
                  <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-orange-50/80">
                    Bridge the gap between clinical evidence and financial execution. Start designing secure, automated value-based healthcare contracts.
                  </p>
                  <Link
                    href="/#contact"
                    className="action-inverse inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-white px-7 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#b83305] hover:bg-orange-50"
                  >
                    Join waiting list
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
