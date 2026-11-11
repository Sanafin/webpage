"use client"

import { chfInt, iban, window } from "@/components/demo/anim"
import { Ledger, Pill, type LedgerRow } from "@/components/demo/ledger"
import { shortHash } from "@/lib/demo/data"
import type { Contract } from "@/lib/demo/types"

// Act 04 · Settle. A three-state strip, then the ledger of what moved where, then the
// payment instruction the custodian receives. In the fail case nothing is paid.
export function ActSettle({ t, contract, compact = false }: { t: number; contract: Contract; compact?: boolean }) {
  const s = contract.settlement!
  const pay = contract.payout!
  const released = s.action === "released"
  const states = [
    { label: "Held", detail: `${chfInt(s.amountChf)} with the custody partner`, tone: "ink" as const },
    { label: "Verified", detail: `composite ${contract.scores!.composite} against cut-off ${contract.cutoff}`, tone: "teal" as const },
    released
      ? { label: "Released", detail: `${chfInt(s.payeeAmountChf)} to the provider`, tone: "orange" as const }
      : { label: "Returned", detail: `${chfInt(s.returnedToPayerChf)} to the payer`, tone: "ink" as const },
  ]
  const reached = Math.min(states.length, Math.floor(window(t, 0.02, 0.4) * states.length + 0.999))

  const rows: LedgerRow[] = released
    ? [
        { key: "c", cells: ["Committed by payer", "held", chfInt(s.amountChf)], tone: "muted" },
        { key: "b", cells: [`Base payment · ${Math.round(contract.baseShare * 100)} %`, "released", chfInt(pay.fixedBaseChf)] },
        { key: "o", cells: [`Outcome-linked · ${pay.bonusPoolUtilisationPct} % of pool earned`, "released", chfInt(pay.bonusEarnedChf)] },
        { key: "r", cells: ["Not earned", "returned to payer", chfInt(s.returnedToPayerChf)], tone: "muted" },
        { key: "t", cells: ["Paid to provider", "", chfInt(s.payeeAmountChf)], tone: "teal" },
      ]
    : [
        { key: "c", cells: ["Committed by payer", "held", chfInt(s.amountChf)], tone: "muted" },
        { key: "b", cells: ["Base payment", "not released", chfInt(0)] },
        { key: "o", cells: ["Outcome-linked", "not released", chfInt(0)] },
        { key: "r", cells: ["Returned to payer", "returned", chfInt(s.returnedToPayerChf)], tone: "teal" },
        { key: "t", cells: ["Paid to provider", "", chfInt(0)], tone: "muted" },
      ]
  const shownRows = Math.ceil(window(t, 0.35, 0.75) * rows.length)
  const showOrder = t > 0.8
  const po = contract.paymentOrder
  const settledAt = s.settledAt ? new Date(s.settledAt) : null

  // Landing-page form: the three states and the ledger, nothing else.
  if (compact) {
    return (
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center [&>*]:min-w-0">
        <div className="lg:col-span-5">
          <p className="text-[13px] text-[#6f6660]">04 · Settle</p>
          <h3 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">
            {released ? "Payment is released, in one block." : "Nothing is released. The money goes back."}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">
            {released ? "What was earned goes to the provider. What was not goes back to the payer. Both hold the same receipt." : "The custody partner returns the full amount to the payer. One receipt, no dispute."}
          </p>
          <ol className="mt-6 space-y-2.5" aria-label="Settlement states">
            {states.map((st, i) => {
              const on = i < reached
              const dot = st.tone === "teal" ? "bg-[#14b8a6]" : st.tone === "orange" ? "bg-[#f15d22]" : "bg-[#1f1a17]"
              return (
                <li key={st.label} className={`flex items-baseline gap-3 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-40"}`}>
                  <span className={`h-2.5 w-2.5 shrink-0 translate-y-px rounded-full ${on ? dot : "bg-[#d9d1ca]"}`} aria-hidden="true" />
                  <span className="text-[14px] font-medium text-[#1f1a17]">{st.label}</span>
                  <span className="font-mono text-[12px] text-[#6f6660]">{st.detail}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="lg:col-span-7">
          <Ledger columns={["Line", "Status", "Amount"]} align={["left", "left", "right"]} caption="Settlement ledger" rows={rows.slice(0, shownRows)} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-xl">
        <p className="text-[13px] text-[#6f6660]">04 · Settle</p>
        <h2 className="mt-3 font-display text-[1.75rem] sm:text-[2.2rem] leading-[1.06] text-[#1f1a17]">
          {released ? "Payment is released, in one block." : "Nothing is released. The money goes back."}
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#6f6660]">
          {released
            ? "The custody partner receives one instruction. What was earned goes to the provider; what was not goes back to the payer. Both sides hold the same receipt."
            : "The composite stayed below the cut-off, so the custody partner returns the full amount to the payer. No invoice, no dispute, one receipt."}
        </p>
      </div>

      <ol className="mt-7 grid gap-3 sm:grid-cols-3" aria-label="Settlement states">
        {states.map((st, i) => {
          const on = i < reached
          const dot = st.tone === "teal" ? "bg-[#14b8a6]" : st.tone === "orange" ? "bg-[#f15d22]" : "bg-[#1f1a17]"
          return (
            <li key={st.label} className={`relative rounded-2xl border px-4 py-3.5 transition-all duration-500 ${on ? "border-[#e6dfd8] bg-white" : "border-transparent bg-[#f5f1ed]/60 opacity-60"}`}>
              <div className="flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${on ? dot : "bg-[#d9d1ca]"}`} aria-hidden="true" />
                <span className="text-[14px] font-medium text-[#1f1a17]">{st.label}</span>
              </div>
              <p className="mt-1 pl-5 font-mono text-[12px] text-[#6f6660]">{st.detail}</p>
              {i < states.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-3 bg-[#c9bfb5] sm:block" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>

      <div className="mt-5 grid gap-5 lg:grid-cols-12 [&>*]:min-w-0">
        <div className="lg:col-span-7">
          <Ledger columns={["Line", "Status", "Amount"]} align={["left", "left", "right"]} caption="Settlement ledger" rows={rows.slice(0, shownRows)} />
          <dl className="mt-4 grid gap-x-6 gap-y-2 text-[12.5px] sm:grid-cols-2 [&>*]:min-w-0">
            <div className="flex justify-between gap-3 border-b border-[#ece7e2] py-1.5">
              <dt className="text-[#6f6660]">Settlement reference</dt>
              <dd className="font-mono text-[#1f1a17]">{shortHash(s.reference, 14)}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-[#ece7e2] py-1.5">
              <dt className="text-[#6f6660]">Ledger sequence</dt>
              <dd className="font-mono text-[#1f1a17]">#{s.sequence}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-[#ece7e2] py-1.5">
              <dt className="text-[#6f6660]">Audit hash</dt>
              <dd className="font-mono text-[#1f1a17]">{shortHash(s.auditHash, 14)}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-[#ece7e2] py-1.5">
              <dt className="text-[#6f6660]">Reconciliation</dt>
              <dd className="font-mono text-[#0f766e]">
                {contract.reconciliation ? `${contract.reconciliation.checks - contract.reconciliation.failed} of ${contract.reconciliation.checks} checks agree` : "—"}
              </dd>
            </div>
            {settledAt && (
              <div className="flex justify-between gap-3 border-b border-[#ece7e2] py-1.5">
                <dt className="text-[#6f6660]">Settled</dt>
                <dd className="font-mono text-[#1f1a17]">{settledAt.toISOString().replace("T", " ").slice(0, 16)} UTC</dd>
              </div>
            )}
          </dl>
        </div>

        <div className={`lg:col-span-5 transition-all duration-700 ${showOrder ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          {released && po ? (
            <div className="rounded-3xl border border-[#ece7e2] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] text-[#6f6660]">Payment instruction</p>
                  <p className="mt-0.5 text-[14px] text-[#1f1a17]">{po.standard}</p>
                </div>
                <Pill tone="teal">ready</Pill>
              </div>
              <dl className="mt-4 space-y-2 font-mono text-[12px]">
                <Row k="message id" v={po.messageId} />
                <Row k="end-to-end id" v={po.endToEndId} />
                <Row k="instructed amount" v={`${po.currency} ${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(po.instructedAmountChf)}`} strong />
                <Row k="debtor" v={`${po.debtorName}`} />
                <Row k="" v={iban(po.debtorIban)} />
                <Row k="creditor" v={`${po.creditorName}`} />
                <Row k="" v={iban(po.creditorIban)} />
                <Row k="execution date" v={po.executionDate} />
              </dl>
              <p className="mt-4 text-[12px] text-[#6f6660]">Debtor and creditor are fictional. Synthetic cohort · example data</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d9d1ca] p-6">
              <p className="text-[13px] text-[#6f6660]">Payment instruction</p>
              <p className="mt-2 text-[16px] leading-snug text-[#1f1a17]">No payment order is produced.</p>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#6f6660]">
                Nothing is paid to the provider. The custody partner returns {chfInt(s.returnedToPayerChf)} to the payer against the same audit hash.
              </p>
              <p className="mt-5 text-[12px] text-[#6f6660]">Synthetic cohort · example data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ k, v, strong = false }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-[#6f6660]">{k}</dt>
      <dd className={`truncate text-right ${strong ? "text-[#1f1a17]" : "text-[#1f1a17]/85"}`}>{v}</dd>
    </div>
  )
}
