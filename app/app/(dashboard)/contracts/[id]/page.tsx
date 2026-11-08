import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { requireSession } from "@/lib/app-auth"
import { fetchContract, fetchHorizons, fetchPatients } from "@/lib/app/data"
import { chf, shortHash, verdictLabel, getRules } from "@/lib/demo/data"
import { Certificate } from "@/components/certificate"
import { PageHeader } from "@/components/app/shell"
import { KV } from "@/components/app/stat-tile"
import { Pill, StatusPill } from "@/components/app/status-pill"
import { Pillars } from "@/components/app/pillars"
import { ProgressTrack } from "@/components/app/progress-track"
import { fmtDate, fmtDateTime, num, pct, signed, th } from "@/components/app/format"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const c = await fetchContract(id)
  return { title: c?.name ?? "Contract" }
}

const tabTrigger =
  "rounded-full px-3.5 py-1.5 text-[13px] text-[#766d67] data-[state=active]:bg-[#1f1a17] data-[state=active]:text-white data-[state=active]:shadow-none"

export default async function ContractPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession()
  const { id } = await params
  const c = await fetchContract(id)
  if (!c) notFound()
  const [horizons, patients] = await Promise.all([fetchHorizons(id), fetchPatients(id)])
  const rules = getRules()
  const s = c.settlement

  return (
    <>
      <p className="mb-4 text-[12.5px] text-[#766d67]">
        <Link href="/app/contracts" className="hover:text-[#1f1a17]">
          Contracts
        </Link>{" "}
        / <span className="font-mono">{c.id}</span>
      </p>
      <PageHeader
        title={c.name}
        lead={
          <>
            {c.programme} · {c.cohortSize} patients · {c.source === "fhir" ? "FHIR R4 intake" : "CSV intake"} · thresholds <span className="font-mono text-[12.5px] whitespace-nowrap">{c.thresholdsVersion.replace(/\+override\(economics\.horizon_years=(\d+)\)/, " · $1-year horizon")}</span>
          </>
        }
        action={<StatusPill status={c.status} className="text-[12.5px]" />}
      />

      {/* Where the contract stands, then the terms it was written under */}
      <section aria-label="Contract progress" className="mb-6 rounded-[24px] border border-[#ece7e2] bg-white px-5 py-5 sm:px-6">
        <ProgressTrack contract={c} />
      </section>

      {/* Terms: the plate group for this screen */}
      <section aria-label="Contract terms" className="grid gap-px overflow-hidden rounded-[24px] bg-[#ece7e2] sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Committed", chf(c.committedChf), `${chf(c.perPatientChf)} per patient`],
          ["Base / outcome-linked", `${Math.round(c.baseShare * 100)} / ${Math.round((1 - c.baseShare) * 100)} %`, "of the per-patient amount"],
          ["Release cut-off", `${c.cutoff} / 100`, "WZW composite"],
          ["Payer → provider", c.payer, c.provider],
        ].map(([k, v, m]) => (
          <div key={k} className="bg-[#f5f1ed] px-5 py-4">
            <p className="text-[12px] text-[#766d67]">{k}</p>
            <p className="mt-1 truncate font-mono text-[15px] tabular-nums text-[#1f1a17]">{v}</p>
            <p className="mt-0.5 truncate text-[12px] text-[#766d67]">{m}</p>
          </div>
        ))}
      </section>

      <Tabs defaultValue="verification" className="mt-8">
        <TabsList className="h-auto flex-wrap gap-1 rounded-full bg-transparent p-0">
          <TabsTrigger value="verification" className={tabTrigger}>
            Verification
          </TabsTrigger>
          <TabsTrigger value="patients" className={tabTrigger}>
            Patients
          </TabsTrigger>
          <TabsTrigger value="settlement" className={tabTrigger}>
            Settlement
          </TabsTrigger>
          <TabsTrigger value="audit" className={tabTrigger}>
            Audit log
          </TabsTrigger>
        </TabsList>

        {/* ---------------------------------------------------------------- Verification */}
        <TabsContent value="verification" className="mt-6">
          {c.scores ? (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
              <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
                <h2 className="mb-5 text-[15px] font-medium">WZW evaluation</h2>
                <Pillars scores={c.scores} cutoff={c.cutoff} />
                <p className="mt-4 text-[12px] text-[#766d67]">
                  Economics scored over {c.horizonYears} years. Synthetic cohort; example data.
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
                  <h2 className="mb-4 text-[15px] font-medium">Outcome rules</h2>
                  <ul className="divide-y divide-[#f0ebe6]">
                    {c.rulePerformance.map((r) => {
                      const rule = rules.find((x) => x.id === r.ruleId)
                      return (
                        <li key={r.ruleId} className="flex items-center justify-between gap-4 py-2.5 text-[13px]">
                          <div className="min-w-0">
                            <p className="text-[#1f1a17]">{r.label}</p>
                            {rule && (
                              <p className="font-mono text-[11.5px] text-[#766d67]">
                                {rule.operator} {rule.target} {rule.unit} · weight {rule.weight}
                              </p>
                            )}
                          </div>
                          <p className="shrink-0 font-mono text-[13px] tabular-nums">
                            {r.passed} <span className="text-[#766d67]">/ {r.passed + r.failed}</span>
                          </p>
                        </li>
                      )
                    })}
                    <li className="flex items-center justify-between gap-4 py-2.5 text-[13px]">
                      <p className="text-[#1f1a17]">All rules met</p>
                      <p className="font-mono tabular-nums">
                        {c.summary.passed} <span className="text-[#766d67]">/ {c.summary.total}</span>
                      </p>
                    </li>
                  </ul>
                </div>
                {c.integrity && (
                  <Certificate
                    verdict={c.scores.verdict}
                    composite={c.scores.composite}
                    cutoff={c.cutoff}
                    hash={c.integrity.auditHash}
                    recomputed={c.integrity.reverify?.recomputedHash ?? c.integrity.auditHash}
                  />
                )}
              </div>
              {c.economics && (
                <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6 lg:col-span-2">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-[15px] font-medium">Health economics</h2>
                    <Pill tone={c.economics.verdict === "REIMBURSABLE" ? "teal" : "ink"}>{c.economics.verdict.toLowerCase()}</Pill>
                  </div>
                  <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] [&>*]:min-w-0">
                    <KV
                      rows={[
                        ["ICER", `${c.economics.icerNote === "dominant" ? "dominant · " : ""}${chf(c.economics.icerChfPerQaly)} / QALY`],
                        ["QALY gain per patient", num(c.economics.qalyGain, 4)],
                        ["Averted cost NPV per patient", chf(c.economics.avertedCostNpvChf)],
                        ["Incremental cost per patient", chf(c.economics.incrementalCostChf)],
                        ["Relative risk reduction", pct(c.economics.relativeRiskReduction * 100, 1)],
                        ["Net budget impact · cohort", chf(c.economics.netBudgetImpactChf)],
                        ["Discount rate", pct(c.economics.discountRate * 100, 0)],
                      ]}
                    />
                    <div>
                      <p className="mb-2 text-[12.5px] text-[#766d67]">The horizon decides the Wirtschaftlichkeit pillar</p>
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className={`${th}`}>Horizon</TableHead>
                            <TableHead className={`text-right ${th}`}>ICER CHF / QALY</TableHead>
                            <TableHead className={`text-right ${th}`}>Efficiency</TableHead>
                            <TableHead className={`text-right ${th}`}>Verdict</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {horizons.map((h) => (
                            <TableRow key={h.years} className={`border-[#f0ebe6] ${h.years === c.horizonYears ? "bg-[#fcfbfa] font-medium" : ""}`}>
                              <TableCell className="font-mono text-[13px] tabular-nums">{h.years} y</TableCell>
                              <TableCell className="text-right font-mono text-[13px] tabular-nums">{num(h.icerChfPerQaly)}</TableCell>
                              <TableCell className="text-right font-mono text-[13px] tabular-nums">{h.efficiencyScore}</TableCell>
                              <TableCell className={`text-right font-mono text-[12px] ${h.verdict === "REIMBURSABLE" ? "text-[#0f766e]" : "text-[#766d67]"}`}>{h.verdict.toLowerCase()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  {c.economics.illustrative.length > 0 && (
                    <p className="mt-4 text-[12px] text-[#766d67]">Illustrative coefficients without a source: {c.economics.illustrative.join(", ").replace(/_/g, " ")}.</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] [&>*]:min-w-0">
              <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
                <h2 className="mb-1 text-[15px] font-medium">Verification pending</h2>
                <p className="mb-5 text-[13px] text-[#6f6660]">
                  Episode complete at month {c.monthsElapsed} of 6, measured to {fmtDate(c.asOf)}. The WZW score is computed when the payer and provider release the cohort for evaluation.
                </p>
                <KV
                  rows={[
                    ["Patients", `${c.summary.total}`],
                    ["Completed · dropped out", `${c.summary.completed} · ${c.summary.droppedOut}`],
                    ["Mean HbA1c change", `${signed(-c.summary.avgHba1cChange)} pp`],
                    ["Mean time in range", pct(c.summary.avgTir, 1)],
                    ["Mean weight loss", pct(c.summary.avgWeightLossPct, 1)],
                    ["Mean adherence", pct(c.summary.avgAdherencePct, 0)],
                    ["Cost below benchmark", chf(c.summary.savingsChf)],
                  ]}
                />
              </div>
              <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
                <h2 className="mb-4 text-[15px] font-medium">Outcome rules to date</h2>
                <ul className="divide-y divide-[#f0ebe6]">
                  {c.rulePerformance.map((r) => (
                    <li key={r.ruleId} className="flex items-center justify-between gap-4 py-2.5 text-[13px]">
                      <span>{r.label}</span>
                      <span className="font-mono tabular-nums">
                        {r.passed} <span className="text-[#766d67]">/ {r.passed + r.failed}</span>
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between gap-4 py-2.5 text-[13px]">
                    <span>All rules met</span>
                    <span className="font-mono tabular-nums">
                      {c.summary.passed} <span className="text-[#766d67]">/ {c.summary.total}</span>
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-[12px] text-[#766d67]">Synthetic cohort; example data.</p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ---------------------------------------------------------------- Patients */}
        <TabsContent value="patients" className="mt-6">
          {patients.length ? (
            <div className="overflow-hidden rounded-[24px] border border-[#ece7e2] bg-white">
              <div className="max-h-[640px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className={`pl-5 ${th}`}>Patient</TableHead>
                      <TableHead className={`text-right ${th}`}>HbA1c Δ</TableHead>
                      <TableHead className={`text-right ${th}`}>TIR</TableHead>
                      <TableHead className={`text-right ${th}`}>Weight Δ</TableHead>
                      <TableHead className={`text-right ${th}`}>Adherence</TableHead>
                      <TableHead className={`${th}`}>Rules</TableHead>
                      <TableHead className={`pr-5 text-right ${th}`}>Payout</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((p) => (
                      <TableRow key={p.id} className="border-[#f0ebe6]">
                        <TableCell className="pl-5 font-mono text-[12.5px]">{p.id}</TableCell>
                        <TableCell className="text-right font-mono text-[12.5px] tabular-nums">{signed(-p.hba1cChange)} pp</TableCell>
                        <TableCell className="text-right font-mono text-[12.5px] tabular-nums">{p.tir} %</TableCell>
                        <TableCell className="text-right font-mono text-[12.5px] tabular-nums">{signed(-p.weightLossPct, 1)} %</TableCell>
                        <TableCell className="text-right font-mono text-[12.5px] tabular-nums">{p.adherencePct.toFixed(0)} %</TableCell>
                        <TableCell>
                          <span className="inline-flex gap-1" aria-label={`${p.rulesPassed.filter(Boolean).length} of ${p.rulesPassed.length} rules met`}>
                            {p.rulesPassed.map((ok, i) => (
                              <i key={i} className={`inline-block h-2 w-2 rounded-full ${ok ? "bg-[#14b8a6]" : "bg-[#e6dfd8]"}`} />
                            ))}
                          </span>
                        </TableCell>
                        <TableCell className={`pr-5 text-right font-mono text-[12.5px] tabular-nums ${p.passed ? "text-[#0f766e]" : "text-[#766d67]"}`}>{chf(p.payoutChf)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="border-t border-[#f0ebe6] px-5 py-3 text-[12px] text-[#766d67]">
                {patients.length} synthetic patients · {c.summary.passed} meet all three rules · per-patient payout is the base plus the outcome-linked share earned. Example data.
              </p>
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#e6dfd8] bg-white px-6 py-12 text-center">
              <p className="text-[14px] text-[#1f1a17]">Patient-level rows are shown once a cohort has been evaluated.</p>
              <p className="mt-1 text-[12.5px] text-[#766d67]">
                {c.summary.total} patients enrolled · {c.summary.completed} completed · {c.summary.droppedOut} dropped out.
              </p>
            </div>
          )}
        </TabsContent>

        {/* ---------------------------------------------------------------- Settlement */}
        <TabsContent value="settlement" className="mt-6">
          {s ? (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
              <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
                <div className="mb-5 flex items-baseline justify-between">
                  <h2 className="text-[15px] font-medium">Settlement ledger</h2>
                  <Pill tone={s.action === "released" ? "teal" : "ink"}>{s.action}</Pill>
                </div>
                <ol className="divide-y divide-[#f0ebe6] text-[13px]">
                  <li className="flex justify-between gap-4 py-2.5">
                    <span className="text-[#6f6660]">Committed by payer, held by custody partner</span>
                    <span className="font-mono tabular-nums">{chf(s.amountChf)}</span>
                  </li>
                  <li className="flex justify-between gap-4 py-2.5">
                    <span className="text-[#6f6660]">
                      Verified · composite {s.action === "released" ? "≥" : "<"} {c.cutoff}
                    </span>
                    <span className="font-mono tabular-nums">{c.scores?.composite} / 100</span>
                  </li>
                  <li className="flex justify-between gap-4 py-2.5">
                    <span className={s.action === "released" ? "text-[#0f766e]" : "text-[#6f6660]"}>Released to provider</span>
                    <span className={`font-mono tabular-nums ${s.action === "released" ? "text-[#0f766e]" : ""}`}>{chf(s.payeeAmountChf)}</span>
                  </li>
                  <li className="flex justify-between gap-4 py-2.5">
                    <span className="text-[#6f6660]">Returned to payer</span>
                    <span className="font-mono tabular-nums">{chf(s.returnedToPayerChf)}</span>
                  </li>
                </ol>
                {c.payout && s.action === "released" && (
                  <KV
                    className="mt-5 border-t border-[#ece7e2] pt-4"
                    rows={[
                      ["Base payment", chf(c.payout.fixedBaseChf)],
                      ["Outcome-linked earned · pool", `${chf(c.payout.bonusEarnedChf)} · ${chf(c.payout.bonusPoolChf)}`],
                      ["Pool utilisation", pct(c.payout.bonusPoolUtilisationPct, 1)],
                    ]}
                  />
                )}
                <KV
                  className="mt-5 border-t border-[#ece7e2] pt-4"
                  rows={[
                    ["Settled", fmtDateTime(s.settledAt)],
                    ["Settlement reference", <span title={s.reference}>{shortHash(s.reference, 16)}</span>],
                    ["Audit hash", <span title={s.auditHash}>{shortHash(s.auditHash, 16)}</span>],
                    ["Reconciliation", c.reconciliation ? `${c.reconciliation.checks - c.reconciliation.failed} / ${c.reconciliation.checks} checks ok` : "—"],
                  ]}
                />
              </div>
              <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
                <h2 className="mb-1 text-[15px] font-medium">Payment order</h2>
                {c.paymentOrder ? (
                  <>
                    <p className="mb-4 text-[12.5px] text-[#766d67]">{c.paymentOrder.standard}</p>
                    <KV
                      rows={[
                        ["Message id", c.paymentOrder.messageId],
                        ["End-to-end id", c.paymentOrder.endToEndId],
                        ["Instructed amount", chf(c.paymentOrder.instructedAmountChf)],
                        ["Execution date", fmtDate(c.paymentOrder.executionDate)],
                        ["Debtor", c.paymentOrder.debtorName],
                        ["Debtor IBAN", c.paymentOrder.debtorIban.replace(/(.{4})/g, "$1 ").trim()],
                        ["Creditor", c.paymentOrder.creditorName],
                        ["Creditor IBAN", c.paymentOrder.creditorIban.replace(/(.{4})/g, "$1 ").trim()],
                      ]}
                    />
                    <p className="mt-4 text-[12px] text-[#766d67]">Illustrative counterparties and accounts. Example data.</p>
                  </>
                ) : (
                  <p className="text-[13px] text-[#6f6660]">No payment order produced: the composite fell below the cut-off, so nothing is paid to the provider and the committed amount returns to the payer.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#e6dfd8] bg-white px-6 py-12 text-center">
              <p className="text-[14px] text-[#1f1a17]">Nothing to settle yet.</p>
              <p className="mt-1 text-[12.5px] text-[#766d67]">{chf(c.committedChf)} stays with the custody partner until the cohort is verified.</p>
            </div>
          )}
        </TabsContent>

        {/* ---------------------------------------------------------------- Audit log */}
        <TabsContent value="audit" className="mt-6">
          <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[15px] font-medium">Audit chain</h2>
              {c.integrity && (
                <p className="font-mono text-[12px] text-[#766d67]">
                  {c.integrity.events} events · head {shortHash(c.integrity.head, 12)}
                  {c.integrity.reverify?.chainValid ? <span className="text-[#0f766e]"> · valid</span> : null}
                </p>
              )}
            </div>
            <ol className="divide-y divide-[#f0ebe6]">
              {c.timeline.map((e) => (
                <li key={e.seq} className="grid gap-1 py-3 text-[13px] sm:grid-cols-[32px_150px_100px_1fr] sm:gap-4">
                  <span className="font-mono text-[12px] text-[#766d67]">#{e.seq}</span>
                  <span className="font-mono text-[12px] tabular-nums text-[#766d67]">{fmtDateTime(e.at)}</span>
                  <span>{e.kind}</span>
                  <span className="min-w-0">
                    <span className="block text-[#6f6660]">{e.text}</span>
                    {e.hash && (
                      <span className="mt-1 block font-mono text-[11.5px] text-[#766d67]">
                        prev {shortHash(e.prevHash, 10)} → {shortHash(e.hash, 10)}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
            {c.integrity?.reverify && (
              <p className="mt-4 text-[12px] text-[#766d67]">
                Re-verification from the exported file alone: verdict {c.integrity.reverify.verdictMatches ? "matches" : "differs"}, composite {c.integrity.reverify.compositeMatches ? "matches" : "differs"}, audit hash{" "}
                {c.integrity.reverify.auditHashMatches ? "matches" : "differs"}. Verdict: {verdictLabel(c.scores?.verdict ?? "")}.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
