"use client"

import { Certificate } from "@/components/certificate"
import { formatInt, lerp, window } from "@/components/demo/anim"
import { Pill } from "@/components/demo/ledger"
import { Terminal } from "@/components/demo/terminal"
import type { Contract } from "@/lib/demo/types"

export type Scenario = "pass" | "fail"

// Act 03 · Verify. The dark panel types the run's transcript while the three WZW
// pillars fill on the right and the certificate stamps the result. The fail scenario
// is the same cohort scored over a shorter economic horizon.
export function ActVerify({ t, contract, scenario, onScenario, compact = false }: { t: number; contract: Contract; scenario: Scenario; onScenario: (s: Scenario) => void; compact?: boolean }) {
  const scores = contract.scores!
  const full = contract.transcript ?? syntheticTranscript(contract)
  const lines = compact ? shortTranscript(full) : full
  const shown = Math.ceil(window(t, 0.02, 0.85) * lines.length)
  const pillars = [
    { key: "Wirksamkeit", sub: "effectiveness · outcomes met", value: scores.wirksamkeit, at: [0.15, 0.45] },
    { key: "Zweckmässigkeit", sub: "appropriateness · eligibility, adherence", value: scores.zweckmaessigkeit, at: [0.3, 0.6] },
    { key: "Wirtschaftlichkeit", sub: `efficiency · ICER over ${contract.horizonYears} years`, value: scores.wirtschaftlichkeit, at: [0.45, 0.75] },
  ] as const
  const composite = lerp(0, scores.composite, window(t, 0.5, 0.85))
  const stamped = t > 0.88
  const meets = scores.verdict === "meets_wzw"
  const integrity = contract.integrity!

  // Landing-page form: the composite and the transcript's three decisive blocks.
  if (compact) {
    return (
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-[#6f6660]">03 · Verify</p>
          <h3 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">An independent check scores the outcome.</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">Same inputs, same verdict, on any machine. The hash proves it.</p>
          <div className="mt-6 flex items-end gap-4">
            <div>
              <p className="text-[13px] text-[#6f6660]">Composite · cut-off {contract.cutoff}</p>
              <p className="mt-1 font-display text-[3rem] leading-none tracking-tight text-[#1f1a17] tabular-nums">
                {formatInt(composite)}
                <span className="text-[#1f1a17]/35"> / 100</span>
              </p>
            </div>
            <div className={`pb-1 transition-all duration-500 ${stamped ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
              <Pill tone={meets ? "teal" : "orange"}>{meets ? "threshold met" : "insufficient"}</Pill>
            </div>
          </div>
        </div>
        <Terminal lines={lines} shown={shown} className="h-[360px] lg:col-span-7 lg:h-[400px]" />
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-12 lg:items-end [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-[#6f6660]">03 · Verify</p>
          <h2 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">An independent evaluation scores the cohort.</h2>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-[#6f6660] lg:col-span-4">
          The engine applies the Swiss WZW criteria the contract was written against. Same inputs, same verdict, on any machine; the hash proves it.
        </p>
        <div role="radiogroup" aria-label="Scenario" className="inline-flex justify-self-start rounded-full bg-[#f5f1ed] p-1 text-[13px] lg:col-span-3 lg:justify-self-end">
          {(
            [
              ["pass", "Cohort meets the threshold"],
              ["fail", "Cohort falls short"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={scenario === id}
              onClick={() => onScenario(id)}
              className={`rounded-full px-4 py-2 transition-colors ${scenario === id ? "bg-[#1f1a17] text-white" : "text-[#1f1a17] hover:bg-[#ece7e2]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-12 [&>*]:min-w-0">
        {/* From lg the terminal fills the row the right column sets, without adding height of its own. */}
        <div className="relative lg:col-span-7">
          <Terminal lines={lines} shown={shown} className="h-[420px] lg:absolute lg:inset-0 lg:h-auto" />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-3xl border border-[#ece7e2] bg-white p-5">
            <ul className="space-y-3">
              {pillars.map((p) => {
                const v = lerp(0, p.value, window(t, p.at[0], p.at[1]))
                return (
                  <li key={p.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 text-[14px] text-[#1f1a17]">
                        {p.key} <span className="hidden text-[12px] text-[#6f6660] sm:inline">· {p.sub}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[13px] tabular-nums text-[#1f1a17]">{formatInt(v)} / 100</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f0ebe6]">
                      <div className="h-full rounded-full bg-[#1f1a17]" style={{ width: `${v}%` }} />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#ece7e2] pt-4">
              <div>
                <p className="text-[13px] text-[#6f6660]">Composite · cut-off {contract.cutoff}</p>
                <p className="mt-1 font-display text-[2.2rem] leading-none tracking-tight text-[#1f1a17] tabular-nums">{formatInt(composite)}</p>
              </div>
              <div className={`transition-all duration-500 ${stamped ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
                <Pill tone={meets ? "teal" : "orange"}>{meets ? "meets WZW" : "insufficient"}</Pill>
              </div>
            </div>
          </div>

          <div className={`transition-opacity duration-700 ${stamped ? "opacity-100" : "opacity-0"}`}>
            <Certificate
              verdict={scores.verdict}
              composite={scores.composite}
              cutoff={contract.cutoff}
              hash={integrity.auditHash}
              recomputed={integrity.reverify?.recomputedHash ?? integrity.auditHash}
            />
          </div>
          <p className="text-[12px] text-[#6f6660]">
            {scenario === "fail"
              ? `Same ${contract.cohortSize} patients, scored over a ${contract.horizonYears}-year horizon instead of forty. Only the efficiency pillar moves; that is enough.`
              : "Synthetic cohort · verification run of 24 Sep 2026 · example data"}
          </p>
        </div>
      </div>
    </div>
  )
}

// The landing page shows only the evaluation, the settlement and the proof blocks.
function shortTranscript(lines: string[]): string[] {
  const keep = /WZW EVALUATION|L6  SETTLEMENT|PROOF ARTIFACTS/
  const drop = /pass rate|adherence|proof mode|settlement reference/
  const out: string[] = []
  let on = false
  for (const l of lines) {
    if (/^──/.test(l)) {
      on = keep.test(l)
      if (on && out.length) out.push("")
    }
    if (on && l.trim() && !drop.test(l)) out.push(l)
  }
  const last = [...lines].reverse().find((l) => l.trim())
  if (last) out.push("", last)
  return out
}

// The fail run has no saved transcript; render one in the same format from its data.
function syntheticTranscript(c: Contract): string[] {
  const s = c.scores!
  const e = c.economics!
  const st = c.settlement!
  const row = (k: string, v: string) => `  ${k.padEnd(35)}${v}`
  const head = (k: string) => `── ${k} `.padEnd(70, "─")
  const chf = (n: number) => `CHF ${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(n)}`
  return [
    "",
    head("L3  INGESTION"),
    row("source", c.source),
    row("template", c.templateId),
    row("patients", String(c.cohortSize)),
    row("thresholds", c.thresholdsVersion),
    "",
    head("L4  WZW EVALUATION"),
    row("Wirksamkeit (effectiveness)", `${s.wirksamkeit} / 100`),
    row("Zweckmässigkeit (appropriateness)", `${s.zweckmaessigkeit} / 100`),
    row("Wirtschaftlichkeit (efficiency)", `${s.wirtschaftlichkeit} / 100`),
    row("composite", `${s.composite} / 100`),
    row("verdict", s.verdict),
    row("pass rate (completed)", `${c.summary.passRate.toFixed(1)} %`),
    "",
    head("L5  HEALTH ECONOMICS"),
    row("horizon", `${c.horizonYears} years`),
    row("avg HbA1c drop", `${c.summary.avgHba1cChange.toFixed(3)} points`),
    row("QALY gain / patient", e.qalyGain.toFixed(4)),
    row("averted cost NPV / patient", chf(e.avertedCostNpvChf)),
    row("incremental cost / patient", chf(e.incrementalCostChf)),
    row("ICER", `${chf(e.icerChfPerQaly)} / QALY`),
    row("economic verdict", e.verdict),
    "",
    head("L6  SETTLEMENT"),
    row("settlement action", st.action),
    row("release cutoff", `${c.cutoff} / 100  (composite ${s.composite})`),
    row("paid to provider", chf(st.payeeAmountChf)),
    row("returned to payer", chf(st.returnedToPayerChf)),
    row("settlement reference", st.reference),
    "",
    head("L7  PROOF ARTIFACTS"),
    row("audit hash", st.auditHash),
    row("payment order", "none: nothing is paid to the provider"),
    "",
    "  Same inputs, same verdict, same payout - and the hash proves it.",
  ]
}
