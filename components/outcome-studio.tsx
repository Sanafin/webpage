import Link from "next/link"
import { Activity, ArrowUpRight, FlaskConical, Pill, Smartphone, Stethoscope, Watch } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { example } from "@/lib/examples"

// Sanafin Outcome Studio as a four-tile bento (the layout the previous version
// used), covering all five stages: Monitor lives inside Collect as a status strip.
// Every value is from the shared example dataset and labelled illustrative.

const sources = [
  { label: "Care app", icon: Smartphone },
  { label: "EHR · FHIR R4", icon: Stethoscope },
  { label: "Lab results", icon: FlaskConical },
  { label: "CGM", icon: Activity },
  { label: "Pharmacy", icon: Pill },
  { label: "Wearables", icon: Watch },
]

function StatusPill({ tone, children }: { tone: "teal" | "orange" | "ink"; children: React.ReactNode }) {
  const cls =
    tone === "teal" ? "bg-[#14B8A6]/15 text-[#0f766e]" : tone === "orange" ? "bg-[#f15d22]/15 text-[#f15d22]" : "bg-[#1f1a17]/8 text-[#1f1a17]"
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${cls}`}>{children}</span>
}

function TrendChart() {
  const w = 320
  const h = 110
  const min = 6.7
  const max = 7.8
  const t = example.trend
  const x = (i: number) => (i / (t.length - 1)) * w
  const y = (v: number) => h - ((v - min) / (max - min)) * h
  const path = t.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  const area = `${path} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h + 8}`} className="w-full h-auto overflow-visible" role="img" aria-label="Illustrative HbA1c trend falling below the contract target">
      <defs>
        <linearGradient id="studio-trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" x2={w} y1={y(example.target)} y2={y(example.target)} stroke="#f15d22" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
      <text x={w} y={y(example.target) - 6} textAnchor="end" fill="#f15d22" fontSize="9" fontFamily="ui-monospace, monospace">
        TARGET −0.5 pp ({example.target}%)
      </text>
      <path d={area} fill="url(#studio-trend-fill)" />
      <path d={path} fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(t.length - 1)} cy={y(t[t.length - 1])} r="5" fill="#14B8A6" stroke="#ffffff" strokeWidth="2" />
    </svg>
  )
}

function Tile({
  className = "",
  eyebrow,
  title,
  body,
  children,
  delay = 0,
}: {
  className?: string
  eyebrow: string
  title: string
  body: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <Reveal as="article" delay={delay} className={`flex flex-col rounded-3xl bg-[#f5f1ed] p-6 sm:p-8 ${className}`}>
      <div className="mb-8">
        <p className="text-[13px] text-[#766d67] mb-3">{eyebrow}</p>
        <h3 className="font-display text-2xl sm:text-[1.7rem] text-[#1f1a17] mb-2">{title}</h3>
        <p className="text-[15px] text-[#6f6660] leading-relaxed max-w-md">{body}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </Reveal>
  )
}

export function OutcomeStudio() {
  return (
    <section id="product" aria-labelledby="product-title" className="relative scroll-mt-24 bg-[#fbfaf8]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[13px] text-[#766d67] mb-4">The product</p>
            <h2 id="product-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              Sanafin Outcome Studio.
              <br />
              <span className="text-[#1f1a17]/45">Five stages, one API.</span>
            </h2>
          </div>
          <div className="flex items-end gap-6 lg:flex-col lg:items-end">
            <img src="/media/sanafin-cube.webp" alt="" className="h-24 w-auto sm:h-32 lg:h-40 drop-shadow-[0_18px_30px_rgba(241,93,34,0.18)]" loading="lazy" />
            <p className="text-[13px] text-[#766d67] lg:text-right">Example values · illustrative</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* 01 Collect + 02 Monitor */}
          <Tile
            className="lg:col-span-4"
            eyebrow="01 · Collect  ·  02 · Monitor"
            title="The data you already send a payer, watched over time."
            body="FHIR R4 or CSV intake, consent check, baseline. Then a biomarker stream with dropout guardrails, so evidence gaps show before anyone commits to a threshold."
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <ul className="grid grid-cols-2 gap-2">
                {sources.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-2 rounded-xl border border-[#ece7e2] bg-white px-3 py-2.5 text-xs text-[#1f1a17]">
                    <Icon className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" aria-hidden="true" />
                    <span className="truncate">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-[#14B8A6]/10 via-[#14B8A6]/60 to-[#f15d22]/70" aria-hidden="true" />
              <div className="rounded-2xl border border-[#f15d22]/30 bg-white p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium text-[#1f1a17]">{example.programme}</span>
                  <StatusPill tone="ink">Month 5</StatusPill>
                </div>
                <dl className="space-y-2 text-xs">
                  {[
                    ["Enrolled", String(example.cohort)],
                    ["Active", "94"],
                    ["Evidence gaps", "2"],
                    ["Data freshness", "Live"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-3">
                      <dt className="text-[#6f6660]">{k}</dt>
                      <dd className="font-medium text-[#1f1a17]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Tile>

          {/* 03 Verify */}
          <Tile className="lg:col-span-2" eyebrow="03 · Verify" title="Checked against the contract." body="WZW-native scoring under Art. 32 KVG, pass or fail against the pre-agreed threshold." delay={0.1}>
            <div className="rounded-2xl border border-[#ece7e2] bg-white p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[12px] text-[#6f6660]">HbA1c · 6 months</span>
                <StatusPill tone="teal">Pass · {example.delta}</StatusPill>
              </div>
              <TrendChart />
            </div>
          </Tile>

          {/* 04 Finance */}
          <Tile
            className="lg:col-span-2"
            eyebrow="04 · Finance"
            title="Committed up front, held by a custodian."
            body="Pay-for-performance, shared savings or bundled terms. Funds sit with a licensed custody partner, never with Sanafin."
            delay={0.15}
          >
            <pre className="overflow-x-auto rounded-2xl border border-[#ece7e2] bg-white p-4 font-mono text-[11px] leading-relaxed text-[#1f1a17]/80">
{`contract `}<span className="text-[#0f766e]">t2d_programme</span>{`
  committed  `}<span className="text-[#f15d22]">CHF 180,000</span>{`
  held_by    licensed_custodian
  when       `}<span className="text-[#6f6660]">hba1c.delta</span>{` <= -0.5
  at         month = 6
  release    `}<span className="text-[#f15d22]">CHF 60,000</span>{`
  else       return_to_funder`}
            </pre>
          </Tile>

          {/* 05 Settle */}
          <Tile
            className="lg:col-span-4"
            eyebrow="05 · Settle"
            title="Released when the threshold is met."
            body="One settlement instruction, a Swiss-conformant invoice, a signed audit record. Unmet milestones return to the funder."
            delay={0.2}
          >
            <div className="rounded-2xl border border-[#ece7e2] bg-white divide-y divide-[#f0ebe6]">
              {example.milestones.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="truncate text-sm text-[#1f1a17]">{row.label}</span>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="font-mono text-sm tabular-nums text-[#1f1a17]">{row.amount}</span>
                    <StatusPill tone={row.status === "Released" ? "orange" : "ink"}>{row.status}</StatusPill>
                  </div>
                </div>
              ))}
            </div>
          </Tile>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-[#ece7e2] bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[14px] text-[#6f6660]">One REST API, one audit chain. Every value hashed on entry; the certificate re-computable from the exported file.</p>
          <pre className="max-w-full whitespace-pre-wrap rounded-xl bg-[#1a1512] px-4 py-2.5 font-mono text-[11.5px] leading-relaxed text-white/85 lg:shrink-0">
            <span className="text-[#5eead4]">POST</span> /v1/verifications <span className="text-white/40">→</span> {`{ "verdict": "meets_wzw", "certificate": "7aaa8b48…" }`}
          </pre>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/demo"
            data-cta="book_call"
            data-location="product"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
          >
            See it on your data
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
