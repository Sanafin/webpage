import Link from "next/link"
import { Activity, ArrowUpRight, FlaskConical, Pill, Smartphone, Stethoscope, Watch } from "lucide-react"
import { example } from "@/lib/examples"

// Sanafin Outcome Studio in five stages. Each tile is a compact micro-UI built from
// the shared example dataset; a real screenshot can replace any tile's body later.

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
    tone === "teal"
      ? "bg-[#14B8A6]/15 text-[#0f766e]"
      : tone === "orange"
        ? "bg-[#f15d22]/15 text-[#c4460f]"
        : "bg-[#1f1a17]/8 text-[#1f1a17]"
  return <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${cls}`}>{children}</span>
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
      <line x1="0" x2={w} y1={y(example.target)} y2={y(example.target)} stroke="#c4460f" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
      <text x={w} y={y(example.target) - 6} textAnchor="end" fill="#c4460f" fontSize="9" fontFamily="ui-monospace, monospace">
        TARGET −0.5 pp ({example.target}%)
      </text>
      <path d={area} fill="url(#studio-trend-fill)" />
      <path d={path} fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(t.length - 1)} cy={y(t[t.length - 1])} r="5" fill="#14B8A6" stroke="#ffffff" strokeWidth="2" />
    </svg>
  )
}

const stages = [
  {
    n: "01",
    name: "Collect",
    title: "The data you already send a payer.",
    body: "FHIR R4 or CSV intake, consent check, baseline capture. No new instrumentation, no new data contract.",
  },
  {
    n: "02",
    name: "Monitor",
    title: "A longitudinal stream, with guardrails.",
    body: "Biomarkers over time, dropout SLAs and evidence gaps surfaced early, before anyone commits to a threshold that cannot be met.",
  },
  {
    n: "03",
    name: "Verify",
    title: "Checked against the contract, WZW-native.",
    body: "Effectiveness, appropriateness and economic efficiency scored under Art. 32 KVG, pass or fail against the pre-agreed threshold.",
  },
  {
    n: "04",
    name: "Finance",
    title: "Funds committed up front, held by a custody partner.",
    body: "Pay-for-performance, shared savings or bundled terms, with the funder's money placed with a licensed custodian. Sanafin never holds funds.",
  },
  {
    n: "05",
    name: "Settle",
    title: "Released when the threshold is met.",
    body: "One settlement instruction, a conformant Swiss invoice and a signed audit record that either side can re-compute.",
  },
]

export function OutcomeStudio() {
  return (
    <section id="product" aria-labelledby="product-title" className="relative scroll-mt-24 bg-[#fbfaf8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[13px] font-medium text-[#c4460f] mb-4">The product</p>
            <h2 id="product-title" className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17]">
              Sanafin Outcome Studio. Five stages, one API.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#766d67] lg:pb-2">
            Whatever a provider already ships to a payer is the input. Example values throughout are illustrative.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* 01 Collect */}
          <article className="lg:col-span-3 flex flex-col rounded-3xl bg-[#f5f1ed] p-6 sm:p-8">
            <StageHead s={stages[0]} />
            <ul className="mt-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
              {sources.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2 rounded-xl border border-[#ece7e2] bg-white px-3 py-2.5 text-xs text-[#1f1a17]">
                  <Icon className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 02 Monitor */}
          <article className="lg:col-span-3 flex flex-col rounded-3xl bg-[#f5f1ed] p-6 sm:p-8">
            <StageHead s={stages[1]} />
            <div className="mt-auto rounded-2xl border border-[#ece7e2] bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] text-[#766d67]">{example.programme} · {example.cohort} patients</span>
                <StatusPill tone="ink">Month 5</StatusPill>
              </div>
              <dl className="grid grid-cols-3 gap-3 text-xs">
                {[
                  ["Enrolled", "100"],
                  ["Active", "94"],
                  ["Evidence gaps", "2"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-[#fbfaf8] px-3 py-2.5">
                    <dt className="text-[#766d67]">{k}</dt>
                    <dd className="mt-0.5 text-[15px] font-medium text-[#1f1a17]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* 03 Verify */}
          <article className="lg:col-span-2 flex flex-col rounded-3xl bg-[#f5f1ed] p-6 sm:p-8">
            <StageHead s={stages[2]} />
            <div className="mt-auto rounded-2xl border border-[#ece7e2] bg-white p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[12px] text-[#766d67]">HbA1c · 6 months</span>
                <StatusPill tone="teal">Pass · {example.delta}</StatusPill>
              </div>
              <TrendChart />
            </div>
          </article>

          {/* 04 Finance */}
          <article className="lg:col-span-2 flex flex-col rounded-3xl bg-[#f5f1ed] p-6 sm:p-8">
            <StageHead s={stages[3]} />
            <pre className="mt-auto overflow-x-auto rounded-2xl border border-[#ece7e2] bg-white p-4 font-mono text-[11px] leading-relaxed text-[#1f1a17]/80">
{`contract `}<span className="text-[#0f766e]">t2d_programme</span>{`
  committed  `}<span className="text-[#c4460f]">CHF 180,000</span>{`
  held_by    licensed_custodian
  when       `}<span className="text-[#6f6660]">hba1c.delta</span>{` <= -0.5
  at         month = 6
  release    `}<span className="text-[#c4460f]">CHF 60,000</span>{`
  else       return_to_funder
`}
            </pre>
          </article>

          {/* 05 Settle */}
          <article className="lg:col-span-2 flex flex-col rounded-3xl bg-[#f5f1ed] p-6 sm:p-8">
            <StageHead s={stages[4]} />
            <div className="mt-auto rounded-2xl border border-[#ece7e2] bg-white divide-y divide-[#f0ebe6]">
              {example.milestones.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="truncate text-[13px] text-[#1f1a17]">{row.label}</span>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-[13px] font-medium text-[#1f1a17]">{row.amount}</span>
                    <StatusPill tone={row.status === "Released" ? "orange" : "ink"}>{row.status}</StatusPill>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-[#ece7e2] bg-white px-6 py-5">
          <p className="text-[14px] text-[#6f6660]">
            One REST API and one audit chain. Every value is hashed on entry and the certificate is re-computable from the exported file alone.
          </p>
          <Link
            href="/demo"
            data-cta="book_call"
            data-location="product"
            className="inline-flex shrink-0 min-h-11 items-center gap-1.5 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
          >
            See it on your data
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function StageHead({ s }: { s: (typeof stages)[number] }) {
  return (
    <div className="mb-6">
      <p className="text-[12px] font-medium text-[#c4460f] mb-3">
        <span className="font-mono">{s.n}</span> · {s.name}
      </p>
      <h3 className="font-display text-xl sm:text-2xl text-[#1f1a17] mb-2">{s.title}</h3>
      <p className="text-[14px] text-[#6f6660] leading-relaxed">{s.body}</p>
    </div>
  )
}
