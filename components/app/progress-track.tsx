import { Check } from "lucide-react"
import type { Contract } from "@/lib/demo/types"
import { chf } from "@/lib/demo/data"
import { fmtDate } from "@/components/app/format"

// Where one contract stands, read left to right: the five states money passes
// through. Done steps carry their date from the audit chain; the current step is
// ringed; later steps stay hollow. Teal only on the two states that mean "verified".
type Step = { label: string; detail: string; done: boolean; teal?: boolean }

export function contractSteps(c: Contract): Step[] {
  const evaluation = [...c.timeline].reverse().find((e) => e.kind === "evaluation")
  const episodeDone = c.status !== "monitoring"
  const verified = !!c.scores
  const settled = !!c.settlement
  return [
    { label: "Committed", detail: `${chf(c.committedChf)} · held by custody partner`, done: true },
    { label: "Cohort enrolled", detail: `${c.cohortSize} patients from ${fmtDate(c.enrolledFrom)}`, done: true },
    {
      label: "Episode complete",
      detail: episodeDone ? `measured to ${fmtDate(c.asOf)}` : `month ${c.monthsElapsed ?? 0} of 6`,
      done: episodeDone,
    },
    {
      label: "Verified",
      detail: verified && c.scores ? `composite ${c.scores.composite} / ${c.cutoff} · ${fmtDate(evaluation?.at)}` : "awaiting evaluation",
      done: verified,
      teal: verified && (c.scores?.composite ?? 0) >= c.cutoff,
    },
    {
      label: settled ? (c.settlement?.action === "released" ? "Released" : "Returned") : "Settled",
      detail: settled && c.settlement ? `${chf(c.settlement.action === "released" ? c.settlement.payeeAmountChf : c.settlement.returnedToPayerChf)} · ${fmtDate(c.settlement.settledAt)}` : "after verification",
      done: settled,
      teal: settled && c.settlement?.action === "released",
    },
  ]
}

export function ProgressTrack({ contract }: { contract: Contract }) {
  const steps = contractSteps(contract)
  const current = steps.findIndex((s) => !s.done)
  return (
    <ol className="grid gap-4 sm:grid-cols-5 sm:gap-0" aria-label="Contract progress">
      {steps.map((s, i) => {
        const isCurrent = i === current
        const lineDone = i < steps.length - 1 && steps[i + 1].done
        return (
          <li key={s.label} className="relative flex gap-3 sm:block sm:pr-4">
            {/* connector */}
            {i < steps.length - 1 && <span className={`absolute left-[9px] top-5 h-full w-px sm:left-5 sm:top-[9px] sm:h-px sm:w-[calc(100%-1.75rem)] ${lineDone ? "bg-[#1f1a17]" : "bg-[#e6dfd8]"}`} aria-hidden="true" />}
            <span
              className={`relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                s.done ? (s.teal ? "bg-[#14b8a6] text-white" : "bg-[#1f1a17] text-white") : isCurrent ? "border-2 border-[#1f1a17] bg-white" : "border border-[#d9d1ca] bg-white"
              }`}
              aria-hidden="true"
            >
              {s.done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : isCurrent ? <span className="h-1.5 w-1.5 rounded-full bg-[#1f1a17]" /> : null}
            </span>
            <span className="min-w-0 sm:mt-2.5 sm:block">
              <span className={`block text-[13px] ${s.done || isCurrent ? "font-medium text-[#1f1a17]" : "text-[#766d67]"}`}>
                {s.label}
                {isCurrent && <span className="ml-1.5 font-normal text-[#766d67]">· now</span>}
              </span>
              <span className="block font-mono text-[11.5px] leading-snug text-[#766d67]">{s.detail}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}
