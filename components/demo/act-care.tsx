"use client"

import { formatInt, lerp, window } from "@/components/demo/anim"
import { Ledger } from "@/components/demo/ledger"
import type { MonthlyPoint, PatientRow, Rule } from "@/lib/demo/types"

// Act 02 · Care is delivered. Stat row over a chart and a measurement ledger: six
// months of synthetic visits stream in, and the three outcome rules fill up.
export function ActCare({ t, monthly, patients, rules, compact = false }: { t: number; monthly: MonthlyPoint[]; patients: PatientRow[]; rules: Rule[]; compact?: boolean }) {
  const months = monthly.length - 1
  const pos = window(t, 0.05, 0.9) * months // fractional month 0..6
  const m = Math.min(months, Math.floor(pos))
  const cur = monthly[m]
  const measured = Math.round(lerp(0, patients.length, window(t, 0.05, 0.9)))
  const recent = patients.slice(Math.max(0, measured - 7), measured).reverse()

  const stats = [
    { label: "Mean HbA1c change", value: `−${cur.meanHba1cChange.toFixed(2)} pp`, note: `threshold −${rules[0].target} pp` },
    { label: "Passing all three rules", value: `${cur.passing.all} / ${cur.n}`, note: `month ${m} of ${months}` },
    { label: "Mean adherence", value: `${cur.meanAdherencePct.toFixed(0)} %`, note: `${cur.completed} completed · ${cur.droppedOut} dropped out` },
  ]

  // Landing-page form: two figures and the chart, no ledger.
  if (compact) {
    return (
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-[#766d67]">02 · Care is delivered</p>
          <h3 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">Six months of evidence arrive.</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">Lab results, CGM data and weight come in from the clinic as usual. Nobody is paid yet.</p>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            {stats.slice(0, 2).map((s) => (
              <div key={s.label}>
                <dt className="text-[13px] text-[#766d67]">{s.label}</dt>
                <dd className="mt-1 font-display text-[2rem] leading-none tracking-tight text-[#1f1a17] tabular-nums">{s.value}</dd>
                <dd className="mt-1.5 font-mono text-[11.5px] text-[#766d67]">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl border border-[#ece7e2] bg-white p-5 sm:p-6 lg:col-span-7">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] text-[#1f1a17]">Cohort mean HbA1c</p>
            <p className="shrink-0 text-right font-mono text-[11.5px] text-[#766d67]">
              {formatInt(cur.n)} measured · M{m}
            </p>
          </div>
          <Hba1cChart monthly={monthly} progress={pos / months} threshold={rules[0].target} />
          <div className="mt-2 flex justify-between font-mono text-[10.5px] text-[#766d67]">
            {monthly.map((p) => (
              <span key={p.month}>M{p.month}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-[#766d67]">02 · Care is delivered</p>
          <h2 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">Six months of evidence arrive.</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">
            Lab HbA1c, CGM time in range, weight and session logs come in as FHIR resources. Nobody is paid yet; every value is stamped on entry.
          </p>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[13px] text-[#766d67]">{s.label}</dt>
              <dd className="mt-1 font-display text-[2rem] sm:text-[2.4rem] leading-none tracking-tight text-[#1f1a17] tabular-nums">{s.value}</dd>
              <dd className="mt-1.5 font-mono text-[11.5px] text-[#766d67]">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-12 [&>*]:min-w-0">
        <div className="rounded-3xl border border-[#ece7e2] bg-white p-5 sm:p-6 lg:col-span-7">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] text-[#1f1a17]">Cohort mean HbA1c</p>
            <p className="shrink-0 text-right font-mono text-[11.5px] text-[#766d67]">
              {formatInt(cur.n)} measured · M{m}
            </p>
          </div>
          <Hba1cChart monthly={monthly} progress={pos / months} threshold={rules[0].target} />
          <div className="mt-2 flex justify-between font-mono text-[10.5px] text-[#766d67]">
            {monthly.map((p) => (
              <span key={p.month}>M{p.month}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Ledger
            columns={["Patient", "HbA1c", "TIR", "Weight", "Rules"]}
            align={["left", "right", "right", "right", "right"]}
            dense
            caption="Most recent synthetic measurements"
            rows={recent.map((p) => ({
              key: p.id,
              cells: [
                p.id,
                `${p.baselineHba1c.toFixed(1)}→${p.latestHba1c.toFixed(1)}`,
                `${p.tir} %`,
                `−${p.weightLossPct.toFixed(1)} %`,
                <span key="r" className="inline-flex gap-1" aria-label={`${p.rulesPassed.filter(Boolean).length} of ${p.rulesPassed.length} rules met`}>
                  {p.rulesPassed.map((ok, i) => (
                    <span key={i} className={`h-2 w-2 rounded-full ${ok ? "bg-[#14b8a6]" : "bg-[#e6dfd8]"}`} aria-hidden="true" />
                  ))}
                </span>,
              ],
            }))}
          />
          <p className="mt-3 flex items-center justify-between text-[12px] text-[#766d67]">
            <span>
              {measured} of {patients.length} final measurements received
            </span>
            <span>source · fhir</span>
          </p>
          <p className="mt-1 text-[12px] text-[#766d67]">Synthetic cohort · example data</p>
        </div>
      </div>
    </div>
  )
}

export function Hba1cChart({ monthly, progress, threshold }: { monthly: MonthlyPoint[]; progress: number; threshold: number }) {
  const w = 560
  const h = 180
  const padT = 14
  const vals = monthly.map((p) => p.meanHba1c)
  const baseline = vals[0]
  const target = baseline - threshold
  const min = Math.min(...vals, target) - 0.25
  const max = Math.max(...vals) + 0.25
  const x = (i: number) => (i / (monthly.length - 1)) * w
  const y = (v: number) => padT + (h - padT) - ((v - min) / (max - min)) * (h - padT)
  const path = vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  const area = `${path} L${w},${h} L0,${h} Z`
  const clipW = Math.max(0, progress * w)
  const idx = Math.min(monthly.length - 1, Math.floor(progress * (monthly.length - 1)))
  const below = vals[idx] <= target

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-auto w-full overflow-visible" role="img" aria-label="Cohort mean HbA1c falling past the contract threshold over six months">
      <defs>
        <clipPath id="care-clip">
          <rect x="0" y="0" width={clipW} height={h} />
        </clipPath>
        <linearGradient id="care-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" x2={w} y1={y(baseline)} y2={y(baseline)} stroke="#1f1a17" strokeOpacity="0.15" strokeWidth="1" />
      <text x="0" y={y(baseline) - 5} fill="#766d67" fontSize="10" fontFamily="var(--font-mono, ui-monospace, monospace)">
        baseline {baseline.toFixed(2)} %
      </text>
      <line x1="0" x2={w} y1={y(target)} y2={y(target)} stroke="#f15d22" strokeWidth="1" strokeDasharray="4 4" opacity="0.85" />
      <text x={w} y={y(target) - 5} textAnchor="end" fill="#c4460f" fontSize="10" fontFamily="var(--font-mono, ui-monospace, monospace)">
        threshold −{threshold} pp ({target.toFixed(2)} %)
      </text>
      <g clipPath="url(#care-clip)">
        <path d={area} fill="url(#care-fill)" />
        <path d={path} fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {vals.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#14b8a6" stroke="#fff" strokeWidth="1.5" />
        ))}
      </g>
      {progress > 0 && (
        <g>
          <circle cx={x(idx)} cy={y(vals[idx])} r="6" fill={below ? "#14b8a6" : "#1f1a17"} stroke="#fff" strokeWidth="2" />
          <text x={x(idx) + (idx > 3 ? -10 : 10)} y={y(vals[idx]) - 12} textAnchor={idx > 3 ? "end" : "start"} fill="#1f1a17" fontSize="11" fontFamily="var(--font-mono, ui-monospace, monospace)">
            {vals[idx].toFixed(2)} %
          </text>
        </g>
      )}
    </svg>
  )
}
