"use client"

import { chfInt, formatInt, lerp, window } from "@/components/demo/anim"
import { Pill } from "@/components/demo/ledger"
import type { Walkthrough } from "@/lib/demo/types"

// Act 01 · Commit. Split: the terms on the left, the commitment call on the right.
// The amount counts up, then the custody status flips from pending to held.
export function ActCommit({ t, data, compact = false }: { t: number; data: Walkthrough["commitment"]; compact?: boolean }) {
  const amount = lerp(0, data.committedChf, window(t, 0.05, 0.55))
  const held = t > 0.6
  const terms = [
    ["Programme", "Type 2 diabetes reversal · 6-month episode"],
    ["Cohort", `${data.cohortSize} patients, enrolled before any payment`],
    ["Per patient", `${chfInt(data.perPatientChf)} · ${Math.round(data.baseShare * 100)} % base, ${Math.round((1 - data.baseShare) * 100)} % outcome-linked`],
    ["Release cut-off", `WZW composite ≥ ${data.cutoff} / 100`],
    ["Outcome rules", "HbA1c −0.5 pp · CGM time in range ≥ 70 % · weight −5 %"],
    ["Funds", "Held by a licensed custody partner, never by Sanafin"],
  ]
  const shownTerms = Math.ceil(window(t, 0.15, 0.9) * terms.length)

  // Landing-page form: three terms and the response the custodian call returns.
  if (compact) {
    const few = [terms[1], terms[3], terms[5]]
    const shownFew = Math.ceil(window(t, 0.15, 0.9) * few.length)
    return (
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-[#766d67]">01 · Commit</p>
          <h3 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">The payer commits first.</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">The whole budget is set aside before the first patient enrols. The terms cannot change after that.</p>
          <dl className="mt-6 divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
            {few.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[110px_1fr] gap-4 py-3 text-[14px] transition-opacity duration-500 ${i < shownFew ? "opacity-100" : "opacity-0"}`}>
                <dt className="text-[#766d67]">{k}</dt>
                <dd className="text-[#1f1a17]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[#ece7e2] bg-white p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[13px] text-[#766d67]">Committed</p>
                <p className="mt-1 font-display text-[2.6rem] sm:text-[3.2rem] leading-none tracking-tight text-[#1f1a17] tabular-nums">CHF {formatInt(amount)}</p>
              </div>
              <Pill tone={held ? "teal" : "muted"}>{held ? "held by custodian" : "pending"}</Pill>
            </div>
            <div className={`mt-6 overflow-hidden rounded-2xl border border-[#ece7e2] bg-[#fbfaf8] transition-opacity duration-500 ${held ? "opacity-100" : "opacity-40"}`}>
              <div className="flex items-center justify-between border-b border-[#f0ebe6] px-4 py-2 font-mono text-[11px] text-[#766d67]">
                <span className="flex items-center gap-2">
                  <span className="rounded bg-[#14b8a6]/15 px-1.5 py-0.5 font-semibold text-[#0f766e]">POST</span>
                  /v1/commitments
                </span>
                <span className={held ? "text-[#0f766e]" : ""}>{held ? "201 Created" : "…"}</span>
              </div>
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-[1.65] text-[#1f1a17]">{`{
  "status": "${held ? "held_by_custodian" : "pending"}",
  "committed_amount": ${held ? data.committedChf : 0},
  "custodian": "licensed custody partner",
  "release_rule": "composite >= ${data.cutoff}",
  "else": "return_to_funder"
}`}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start [&>*]:min-w-0">
      <div className="lg:col-span-5">
        <p className="text-[13px] text-[#766d67]">01 · Commit</p>
        <h2 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">The payer commits first.</h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">
          A health insurer sets aside the whole budget before the first patient enrols. The terms are written once and cannot change after that.
        </p>
        <dl className="mt-8 divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
          {terms.map(([k, v], i) => (
            <div key={k} className={`grid grid-cols-[120px_1fr] gap-4 py-3 text-[14px] transition-opacity duration-500 ${i < shownTerms ? "opacity-100" : "opacity-0"}`}>
              <dt className="text-[#766d67]">{k}</dt>
              <dd className="text-[#1f1a17]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-3xl border border-[#ece7e2] bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#766d67]">Committed</p>
              <p className="mt-1 font-display text-[2.6rem] sm:text-[3.4rem] leading-none tracking-tight text-[#1f1a17] tabular-nums">
                CHF {formatInt(amount)}
              </p>
            </div>
            <Pill tone={held ? "teal" : "muted"}>{held ? "held by custodian" : "pending"}</Pill>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
            <div className="overflow-hidden rounded-2xl border border-[#ece7e2] bg-[#fbfaf8]">
              <div className="flex items-center gap-2 border-b border-[#f0ebe6] px-4 py-2 font-mono text-[11px] text-[#766d67]">
                <span className="rounded bg-[#14b8a6]/15 px-1.5 py-0.5 font-semibold text-[#0f766e]">POST</span>
                /v1/commitments
              </div>
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-[1.65] text-[#1f1a17]">{`{
  "contract_id": "con_t2d_reversal_2024",
  "committed_amount": ${data.committedChf},
  "currency": "CHF",
  "funder_id": "fnd_demo_insurer",
  "provider_id": "prv_demo_programme",
  "rules": {
    "composite_cutoff": ${data.cutoff},
    "episode_months": ${data.episodeMonths},
    "cohort_size": ${data.cohortSize}
  }
}`}</pre>
            </div>
            <div className={`overflow-hidden rounded-2xl border border-[#ece7e2] bg-[#fbfaf8] transition-opacity duration-500 ${held ? "opacity-100" : "opacity-40"}`}>
              <div className="flex items-center justify-between border-b border-[#f0ebe6] px-4 py-2 font-mono text-[11px] text-[#766d67]">
                <span>response</span>
                <span className={held ? "text-[#0f766e]" : ""}>{held ? "201 Created" : "…"}</span>
              </div>
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-[1.65] text-[#1f1a17]">{`{
  "id": "cmt_8f3a1c",
  "status": "${held ? "held_by_custodian" : "pending"}",
  "committed_amount": ${held ? data.committedChf : 0},
  "custodian": "licensed custody partner",
  "release_rule": "composite >= ${data.cutoff}",
  "else": "return_to_funder"
}`}</pre>
            </div>
          </div>
          <p className="mt-4 text-[12px] text-[#766d67]">Synthetic cohort · example data · identifiers are fictional</p>
        </div>
      </div>
    </div>
  )
}
