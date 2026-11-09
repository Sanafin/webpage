// Builds lib/demo/fixtures.json from a real run of the Sanafin verification pipeline
// (sibling repo, out/demo/*) and its synthetic cohorts (data/synth/*). Run by hand:
//   npm run build:fixtures          (SANAFIN_DIR overrides ../sanafin)
// The output is committed, so builds never depend on the sibling repo. Every string
// is passed through the vocabulary map below and the result is checked against the
// forbidden-word list the site enforces; the script exits 1 on any hit.
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join, resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { findForbidden } from "./forbidden.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, "..")
const SRC = process.env.SANAFIN_DIR ?? resolve(repo, "../sanafin")
const OUT = join(repo, "lib/demo/fixtures.json")
const SIZE_LIMIT = 80 * 1024

function must(p) {
  const full = join(SRC, p)
  if (!existsSync(full)) {
    console.error(`build-demo-fixtures: missing ${full}\nSet SANAFIN_DIR to the pipeline checkout.`)
    process.exit(1)
  }
  return full
}
const readJson = (p) => JSON.parse(readFileSync(must(p), "utf8"))
const readText = (p) => readFileSync(must(p), "utf8")
const readCsv = (p) => {
  const [head, ...rows] = readText(p).trim().split("\n")
  const cols = head.split(",")
  return rows.map((r) => Object.fromEntries(r.split(",").map((v, i) => [cols[i], v])))
}
const r = (x, d = 3) => (x === null || x === undefined || Number.isNaN(+x) ? null : Math.round(+x * 10 ** d) / 10 ** d)
const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

// Pipeline vocabulary → site vocabulary. Applied to every string value.
const VOCAB = [
  [/escrow action/gi, "settlement action"],
  [/escrow settlement/gi, "settlement"],
  [/\bescrow\b/gi, "settlement"],
  [/guaranteed base/gi, "base payment"],
  [/guarantee/gi, "base"],
  [/smart contract/gi, "settlement rule"],
  [/blockchain/gi, "ledger"],
  [/\bon-?chain\b/gi, "attested"],
  [/transaction hash/gi, "settlement reference"],
  [/real-time/gi, "immediate"],
  [/ \(ILLUSTRATIVE\)/g, ""],
]
const clean = (s) => VOCAB.reduce((acc, [re, to]) => acc.replace(re, to), s)
function sanitize(v) {
  if (typeof v === "string") return clean(v)
  if (Array.isArray(v)) return v.map(sanitize)
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, sanitize(x)]))
  return v
}

// ---------------------------------------------------------------- sources
const summary = readJson("out/demo/summary.json")
const horizons = readJson("out/demo/horizons.json")
const fhir = readJson("out/demo/demo-t2d-high-fhir/audit_export.json")
const csv = readJson("out/demo/demo-t2d-high-csv/audit_export.json")
const reverify = readJson("out/demo/demo-t2d-high-fhir/reverify.json")
const reconciliation = readJson("out/demo/demo-t2d-high-fhir/reconciliation.json")
const cli = readText("out/demo/demo-t2d-high-fhir.cli.txt")
const pain = readText("out/demo/demo-t2d-high-fhir/pain001.xml")
const longitudinal = readCsv("data/synth/t2d-high/longitudinal.csv")

const th = fhir.thresholds_snapshot
const template = {
  id: fhir.template.id,
  name: fhir.template.name,
  episodeMonths: fhir.template.episode_months,
  plannedSessions: fhir.template.planned_sessions,
  eligibility: { metric: fhir.template.eligibility.metric, min: fhir.template.eligibility.min, max: fhir.template.eligibility.max },
}
const RULE_META = {
  hba1c_reduction: { label: "HbA1c reduction", metric: "hba1cChange", unit: "points" },
  cgm_time_in_range: { label: "CGM time in range", metric: "tir", unit: "%" },
  weight_loss: { label: "Weight loss", metric: "weightLossPct", unit: "%" },
}
const rules = th.outcome_rules
  .filter((rule) => rule.enabled !== false)
  .map((rule) => ({
    id: rule.id,
    label: RULE_META[rule.id]?.label ?? rule.label,
    metric: RULE_META[rule.id]?.metric ?? rule.metric,
    operator: rule.operator,
    target: rule.value,
    unit: rule.unit,
    weight: th.contract.rule_weights[rule.id],
  }))
const ruleIds = rules.map((x) => x.id)
const target = Object.fromEntries(rules.map((x) => [x.id, x.target]))

const release = {
  cutoff: th.escrow?.release_cutoff ?? summary.escrow.release_cutoff,
  borderline: th.wzw.verdict.borderline,
  passPolicy: th.pass_policy,
  pillarWeights: {
    wirksamkeit: r(th.wzw.weights.wirksamkeit, 4),
    zweckmaessigkeit: r(th.wzw.weights.zweckmaessigkeit, 4),
    wirtschaftlichkeit: r(th.wzw.weights.wirtschaftlichkeit, 4),
  },
  zweckmaessigkeit: { eligibleShareWeight: th.wzw.zweckmaessigkeit.eligible_share_weight, adherenceWeight: th.wzw.zweckmaessigkeit.adherence_weight },
}

// ---------------------------------------------------------------- patients (shared by both runs)
const evalById = Object.fromEntries(fhir.evaluation.map((e) => [e.patient_id, e]))
const payoutById = Object.fromEntries(fhir.payout.results.map((p) => [p.patient_id, p]))
const patients = fhir.patients.map((p) => {
  const e = evalById[p.patient_id]
  const pay = payoutById[p.patient_id]
  return {
    id: p.patient_id,
    status: p.program_status,
    enrolled: p.enrollment_date,
    lastMeasured: p.last_measurement_date,
    baselineHba1c: p.baseline_hba1c,
    latestHba1c: p.latest_hba1c,
    hba1cChange: r(e.metrics.hba1c_change, 2),
    tir: p.cgm_time_in_range,
    baselineWeightKg: p.baseline_weight_kg,
    latestWeightKg: p.latest_weight_kg,
    weightLossPct: r(e.metrics.weight_loss_pct, 2),
    sessions: p.sessions_attended,
    sessionsTotal: p.sessions_total,
    adherencePct: r(e.metrics.adherence_pct, 1),
    complications: p.complications,
    benchmarkCostChf: p.benchmark_cost_chf,
    actualCostChf: p.actual_cost_chf,
    rulesPassed: ruleIds.map((id) => e.rule_results.find((x) => x.rule_id === id)?.passed ?? false),
    passed: e.passed,
    payoutChf: pay?.payout_chf ?? 0,
    achievement: r(pay?.achievement ?? 0, 3),
  }
})
if (patients.length !== 100) throw new Error(`expected 100 patients, got ${patients.length}`)
const passedCount = patients.filter((p) => p.passed).length
if (passedCount !== fhir.wzw.summary.passed) throw new Error(`passed mismatch ${passedCount} vs ${fhir.wzw.summary.passed}`)

// ---------------------------------------------------------------- monthly aggregates (t2d-high)
const baseline = {}
for (const row of longitudinal) if (row.month === "0") baseline[row.patient_id] = { hba1c: +row.hba1c, weight: +row.weight_kg }
const byMonth = new Map()
for (const row of longitudinal) {
  const m = +row.month
  if (!byMonth.has(m)) byMonth.set(m, [])
  byMonth.get(m).push(row)
}
const monthly = [...byMonth.keys()]
  .sort((a, b) => a - b)
  .map((m) => {
    const rows = byMonth.get(m)
    const derived = rows.map((row) => {
      const b = baseline[row.patient_id]
      const hba1cChange = b.hba1c - +row.hba1c
      const weightLossPct = ((b.weight - +row.weight_kg) / b.weight) * 100
      const expected = (template.plannedSessions * m) / template.episodeMonths
      const adherencePct = m === 0 ? 0 : Math.min(100, (+row.sessions_attended_cum / expected) * 100)
      return {
        hba1c: +row.hba1c,
        hba1cChange,
        tir: +row.cgm_time_in_range,
        weightLossPct,
        adherencePct,
        status: row.visit_status,
        pass: {
          hba1c_reduction: hba1cChange >= target.hba1c_reduction,
          cgm_time_in_range: +row.cgm_time_in_range >= target.cgm_time_in_range,
          weight_loss: weightLossPct >= target.weight_loss,
        },
      }
    })
    const count = (f) => derived.filter(f).length
    const date = rows.map((x) => x.visit_date).sort()[Math.floor(rows.length / 2)]
    return {
      month: m,
      visitDate: date,
      n: rows.length,
      active: count((d) => d.status === "active" || d.status === "enrolled"),
      completed: count((d) => d.status === "completed"),
      droppedOut: count((d) => d.status === "dropped_out"),
      meanHba1c: r(mean(derived.map((d) => d.hba1c)), 2),
      meanHba1cChange: r(mean(derived.map((d) => d.hba1cChange)), 2),
      meanTir: r(mean(derived.map((d) => d.tir)), 1),
      meanWeightLossPct: r(mean(derived.map((d) => d.weightLossPct)), 2),
      meanAdherencePct: r(mean(derived.map((d) => d.adherencePct)), 1),
      passing: {
        hba1c: count((d) => d.pass.hba1c_reduction),
        tir: count((d) => d.pass.cgm_time_in_range),
        weight: count((d) => d.pass.weight_loss),
        all: count((d) => ruleIds.every((id) => d.pass[id])),
        any: count((d) => ruleIds.some((id) => d.pass[id])),
      },
    }
  })
// The monthly visits and the evaluated export are generated separately, so the last
// month is replaced by the export's final values: the walkthrough's month 6 must equal
// what the evaluation in the next act scores. Intermediate months keep the visit data.
const last = monthly[monthly.length - 1]
if (Math.abs(last.meanHba1cChange - fhir.wzw.summary.avg_hba1c_change) > 0.05)
  console.warn(`warn: month-${last.month} mean HbA1c change ${last.meanHba1cChange} vs export ${r(fhir.wzw.summary.avg_hba1c_change, 3)} (separately generated)`)
{
  const w = fhir.wzw
  const perf = Object.fromEntries(w.rule_performance.map((x) => [x.rule_id, x.passed_count]))
  const anyRule = patients.filter((p) => p.rulesPassed.some(Boolean)).length
  Object.assign(last, {
    n: w.summary.total,
    active: w.active_count,
    completed: w.completed_count,
    droppedOut: 0,
    meanHba1c: r(monthly[0].meanHba1c - w.summary.avg_hba1c_change, 2),
    meanHba1cChange: r(w.summary.avg_hba1c_change, 2),
    meanTir: r(w.summary.avg_cgm_time_in_range, 1),
    meanWeightLossPct: r(w.summary.avg_weight_loss_pct, 2),
    meanAdherencePct: r(w.avg_adherence_pct, 1),
    passing: { hba1c: perf.hba1c_reduction, tir: perf.cgm_time_in_range, weight: perf.weight_loss, all: w.summary.passed, any: anyRule },
  })
}

// ---------------------------------------------------------------- settled contracts (two runs, same cohort)
const horizonRows = horizons.horizons.rows.map((h) => ({
  years: h.horizon_years,
  icerChfPerQaly: r(h.icer_chf_per_qaly, 2),
  icerNote: h.icer_note ?? null,
  qalyGain: r(h.qaly_gain, 5),
  avertedCostNpvChf: r(h.averted_cost_npv_chf, 2),
  incrementalCostChf: r(h.incremental_cost_chf, 2),
  efficiencyScore: r(h.efficiency_score, 1),
  verdict: h.verdict,
}))

const painField = (tag) => pain.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`))?.[1] ?? null
const paymentOrder = {
  standard: "ISO 20022 pain.001.001.09 · Swiss Payment Standards",
  messageId: painField("MsgId"),
  endToEndId: painField("EndToEndId"),
  instructedAmountChf: +painField("InstdAmt"),
  currency: "CHF",
  executionDate: painField("Dt"),
  debtorName: pain.match(/<Dbtr>\s*<Nm>([^<]*)<\/Nm>/)?.[1] ?? null,
  debtorIban: pain.match(/<DbtrAcct>[\s\S]*?<IBAN>([^<]*)<\/IBAN>/)?.[1] ?? null,
  creditorName: pain.match(/<Cdtr>\s*<Nm>([^<]*)<\/Nm>/)?.[1] ?? null,
  creditorIban: pain.match(/<CdtrAcct>[\s\S]*?<IBAN>([^<]*)<\/IBAN>/)?.[1] ?? null,
}

function timelineOf(chain) {
  return chain.map((ev) => {
    const p = ev.payload ?? {}
    let text
    if (ev.kind === "ingestion") text = `${p.source} · ${p.patients} patients · ${p.observations} observations`
    else if (ev.kind === "evaluation") text = `composite ${p.composite} · ${p.verdict} · economics ${p.economic_verdict}`
    else
      text = Object.entries(p)
        .filter(([k, v]) => !/hash|address|chain|wei|notes|tx|block|contract/i.test(k) && (typeof v === "string" || typeof v === "number"))
        .map(([k, v]) => `${k.replace(/_/g, " ")} ${v}`)
        .join(" · ")
    return { seq: ev.seq, at: ev.at, actor: ev.actor, kind: ev.kind, text, hash: ev.hash, prevHash: ev.prev_hash }
  })
}

function settledContract(exp, id, meta) {
  const s = exp.settlement
  const w = exp.wzw
  const econ = exp.economics
  const pay = exp.payout
  const action = s.escrow_action === "released" ? "released" : "returned"
  const settledAt = exp.audit_chain[exp.audit_chain.length - 1]?.at ?? null
  return {
    id,
    name: meta.name,
    programme: template.name,
    templateId: template.id,
    payer: paymentOrder.debtorName,
    provider: paymentOrder.creditorName,
    source: meta.source,
    cohortSize: w.summary.total,
    committedChf: s.amount_chf,
    perPatientChf: th.contract.total_payout_per_patient_chf,
    baseShare: 1 - th.contract.bonus_fraction,
    cutoff: s.release_cutoff,
    horizonYears: econ.horizon_years,
    thresholdsVersion: exp.thresholds_version,
    status: action === "released" ? "settled" : "returned",
    enrolledFrom: patients.map((p) => p.enrolled).sort()[0],
    asOf: w.as_of,
    scores: {
      wirksamkeit: w.wirksamkeit,
      zweckmaessigkeit: w.zweckmaessigkeit,
      wirtschaftlichkeit: w.wirtschaftlichkeit,
      composite: w.composite,
      verdict: w.verdict,
    },
    summary: {
      total: w.summary.total,
      completed: w.completed_count,
      active: w.active_count,
      droppedOut: 0,
      passed: w.summary.passed,
      failed: w.summary.failed,
      passRate: r(w.summary.pass_rate, 1),
      avgHba1cChange: r(w.summary.avg_hba1c_change, 3),
      avgTir: r(w.summary.avg_cgm_time_in_range, 2),
      avgWeightLossPct: r(w.summary.avg_weight_loss_pct, 2),
      avgAdherencePct: r(w.avg_adherence_pct, 1),
      eligibleSharePct: r(w.eligible_share_pct, 1),
      savingsChf: w.savings_chf,
      savingsPct: r(w.savings_pct, 1),
    },
    rulePerformance: w.rule_performance.map((x) => ({
      ruleId: x.rule_id,
      label: RULE_META[x.rule_id]?.label ?? x.label,
      passed: x.passed_count,
      failed: x.failed_count,
      passRate: r(x.pass_rate, 1),
    })),
    economics: {
      icerChfPerQaly: r(econ.icer_chf_per_qaly, 2),
      icerNote: econ.icer_note ?? null,
      qalyGain: r(econ.qaly_gain, 5),
      avertedCostNpvChf: r(econ.averted_cost_npv_chf, 2),
      incrementalCostChf: r(econ.incremental_cost_chf, 2),
      relativeRiskReduction: r(econ.relative_risk_reduction, 3),
      verdict: econ.verdict,
      efficiencyScore: r(econ.efficiency_score, 1),
      netBudgetImpactChf: r(econ.net_budget_impact_chf, 2),
      discountRate: econ.discount_rate,
      illustrative: econ.illustrative ?? [],
    },
    horizons: horizonRows,
    payout: {
      type: pay.contract_type,
      totalChf: pay.total_payout_chf,
      fixedBaseChf: pay.total_guarantee_chf,
      bonusEarnedChf: pay.total_bonus_earned_chf,
      bonusPoolChf: pay.bonus_pool_total_chf,
      bonusPoolUtilisationPct: r(pay.bonus_pool_utilization_pct, 1),
    },
    settlement: {
      action,
      amountChf: s.amount_chf,
      payeeAmountChf: s.payee_amount_chf,
      returnedToPayerChf: s.returned_to_payer_chf,
      auditHash: s.audit_hash,
      reference: s.transaction_hash,
      sequence: s.block_number,
      settledAt,
    },
    integrity: {
      auditHash: exp.audit_hash,
      events: exp.audit_chain.length,
      head: exp.audit_chain[exp.audit_chain.length - 1]?.hash ?? null,
      reverify: meta.reverify ?? null,
    },
    reconciliation: meta.reconciliation ?? null,
    paymentOrder: action === "released" ? paymentOrder : null,
    timeline: timelineOf(exp.audit_chain),
    transcript: meta.transcript ?? null,
  }
}

// Terminal transcript: drop the file-path and chain-identity lines, keep the rest.
// Labels change length after the vocabulary map, so key/value rows are re-padded to
// the transcript's 35-character label column and section rules are re-drawn.
const transcript = cli
  .split("\n")
  .filter((l) => !/\/app\/out\//.test(l) && !/block \/ contract/.test(l) && !/base_url|downloads/.test(l))
  .map((l) => clean(l.replace(/\s+$/, "")))
  .map((l) => {
    const kv = l.match(/^  (\S.*?)\s{2,}(\S.*)$/)
    if (kv) return `  ${kv[1].padEnd(35)}${kv[2]}`
    const head = l.match(/^── (.+?) ─+$/)
    if (head) return `── ${head[1].toUpperCase()} `.padEnd(70, "─")
    return l
  })
  .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))

const fhirContract = settledContract(fhir, "demo-t2d-high-fhir", {
  name: "Type 2 diabetes reversal · FHIR cohort",
  source: "fhir",
  transcript,
  reverify: {
    verdictMatches: reverify.verdict_matches,
    compositeMatches: reverify.composite_matches,
    auditHashMatches: reverify.audit_hash_matches,
    chainValid: reverify.chain_valid,
    recomputedHash: reverify.recomputed.audit_hash,
  },
  reconciliation: { ok: reconciliation.ok, checks: reconciliation.checks.length, failed: (reconciliation.failed ?? []).length },
})
const csvContract = settledContract(csv, "demo-t2d-high-csv", {
  name: "Type 2 diabetes reversal · CSV cohort",
  source: "csv",
  reconciliation: { ok: true, checks: +(summary.cohorts["demo-t2d-high-csv"].reconcile.match(/^(\d+)/)?.[1] ?? 0), failed: 0 },
})

// ---------------------------------------------------------------- monitoring cohorts (aggregates only)
function monitoringContract(id, name, templateId, programme) {
  const rows = readCsv(`data/synth/${id}/cohort.csv`)
  const d = rows.map((x) => {
    const hba1cChange = +x.baseline_hba1c - +x.latest_hba1c
    const weightLossPct = ((+x.baseline_weight_kg - +x.latest_weight_kg) / +x.baseline_weight_kg) * 100
    const tir = +x.cgm_time_in_range
    return {
      status: x.program_status,
      hba1cChange,
      weightLossPct,
      tir,
      adherencePct: Math.min(100, (+x.sessions_attended / template.plannedSessions) * 100),
      pass: { hba1c_reduction: hba1cChange >= target.hba1c_reduction, cgm_time_in_range: tir >= target.cgm_time_in_range, weight_loss: weightLossPct >= target.weight_loss },
      enrolled: x.enrollment_date,
      last: x.last_measurement_date,
    }
  })
  const count = (f) => d.filter(f).length
  const enrolledFrom = d.map((x) => x.enrolled).sort()[0]
  const asOf = d.map((x) => x.last).sort().at(-1)
  const monthsElapsed = Math.round((new Date(asOf) - new Date(enrolledFrom)) / (30.44 * 86400e3))
  return {
    id,
    name,
    programme,
    templateId,
    payer: paymentOrder.debtorName,
    provider: paymentOrder.creditorName,
    source: "synthetic",
    cohortSize: rows.length,
    committedChf: rows.length * th.contract.total_payout_per_patient_chf,
    perPatientChf: th.contract.total_payout_per_patient_chf,
    baseShare: 1 - th.contract.bonus_fraction,
    cutoff: release.cutoff,
    horizonYears: null,
    thresholdsVersion: csv.thresholds_version,
    // Episode complete but not yet scored → verifying; still enrolling → monitoring.
    status: monthsElapsed >= template.episodeMonths ? "verifying" : "monitoring",
    enrolledFrom,
    asOf,
    monthsElapsed: Math.min(monthsElapsed, template.episodeMonths),
    scores: null,
    summary: {
      total: rows.length,
      completed: count((x) => x.status === "completed"),
      active: count((x) => x.status === "active"),
      droppedOut: count((x) => x.status === "dropped_out"),
      passed: count((x) => ruleIds.every((id) => x.pass[id])),
      failed: count((x) => !ruleIds.every((id) => x.pass[id])),
      passRate: r((count((x) => ruleIds.every((id) => x.pass[id])) / rows.length) * 100, 1),
      avgHba1cChange: r(mean(d.map((x) => x.hba1cChange)), 3),
      avgTir: r(mean(d.map((x) => x.tir)), 2),
      avgWeightLossPct: r(mean(d.map((x) => x.weightLossPct)), 2),
      avgAdherencePct: r(mean(d.map((x) => x.adherencePct)), 1),
      eligibleSharePct: null,
      savingsChf: rows.reduce((a, x) => a + (+x.benchmark_cost_chf - +x.actual_cost_chf), 0),
      savingsPct: null,
    },
    rulePerformance: ruleIds.map((rid) => {
      const passed = count((x) => x.pass[rid])
      return { ruleId: rid, label: RULE_META[rid].label, passed, failed: rows.length - passed, passRate: r((passed / rows.length) * 100, 1) }
    }),
    economics: null,
    horizons: null,
    payout: null,
    settlement: null,
    integrity: null,
    reconciliation: null,
    paymentOrder: null,
    timeline: [{ seq: 0, at: `${enrolledFrom}T08:00:00Z`, actor: "sanafin-engine", kind: "ingestion", text: `csv · ${rows.length} patients enrolled`, hash: null, prevHash: null }],
    transcript: null,
  }
}
const mixed = monitoringContract("t2d-mixed", "Type 2 diabetes reversal · mixed-response cohort", "t2d-reversal", template.name)
const obesity = monitoringContract("obesity-low", "Weight management · low-adherence cohort", "weight-management", "Weight management")

// ---------------------------------------------------------------- assemble
const fixtures = sanitize({
  meta: {
    generatedAt: new Date().toISOString().slice(0, 10),
    sourceRun: summary.started_at,
    synthetic: true,
    thresholdsVersion: fhir.thresholds_version,
    note: "Synthetic cohorts from a real verification run. No real person is represented; coefficients marked illustrative have no source.",
  },
  template,
  rules,
  release,
  monthly,
  patients,
  contracts: [fhirContract, csvContract, mixed, obesity],
  walkthrough: {
    passContractId: "demo-t2d-high-fhir",
    failContractId: "demo-t2d-high-csv",
    commitment: {
      committedChf: fhirContract.committedChf,
      cohortSize: fhirContract.cohortSize,
      perPatientChf: fhirContract.perPatientChf,
      baseShare: fhirContract.baseShare,
      cutoff: fhirContract.cutoff,
      episodeMonths: template.episodeMonths,
      payer: fhirContract.payer,
      provider: fhirContract.provider,
    },
  },
})

// Keys and values must both be clean.
function walkStrings(v, path, out) {
  if (typeof v === "string") out.push([path, v])
  else if (Array.isArray(v)) v.forEach((x, i) => walkStrings(x, `${path}[${i}]`, out))
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) {
      out.push([`${path}.${k}`, k])
      walkStrings(x, `${path}.${k}`, out)
    }
}
const strings = []
walkStrings(fixtures, "$", strings)
const bad = strings.map(([p, s]) => [p, s, findForbidden(s)]).filter((x) => x[2])
if (bad.length) {
  console.error("build-demo-fixtures: forbidden vocabulary in output:\n" + bad.map(([p, s, h]) => `${p}: "${h.match}" in ${JSON.stringify(s).slice(0, 120)}`).join("\n"))
  process.exit(1)
}

const json = JSON.stringify(fixtures)
writeFileSync(OUT, json + "\n")
const size = statSync(OUT).size
if (size > SIZE_LIMIT) {
  console.error(`build-demo-fixtures: ${OUT} is ${size} bytes, over the ${SIZE_LIMIT} limit`)
  process.exit(1)
}
console.log(`build-demo-fixtures: wrote ${OUT} (${(size / 1024).toFixed(1)} KB, ${fixtures.contracts.length} contracts, ${patients.length} patients, ${monthly.length} months)`)
