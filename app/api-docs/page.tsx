"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { site } from "@/lib/site"

// API reference (AirOps / Stripe docs pattern): a preview note, one tab per endpoint,
// the endpoint chip and a bordered parameter list on the left, the site's dark code
// panel on the right. Every identifier is fictional; no real insurer, provider or
// lab is named, and keys are test keys.

type Workflow = "ingest" | "commit"
type Lang = "curl" | "node"

const endpoints: Record<
  Workflow,
  {
    tab: string
    method: string
    path: string
    title: string
    body: string
    params: { name: string; type: string; desc: string }[]
    code: Record<Lang, string>
    response: string
  }
> = {
  ingest: {
    tab: "Ingest evidence",
    method: "POST",
    path: "/v1/evidence/ingest",
    title: "Send a clinical measurement",
    body: "Attach a lab value or device reading to a contract. Sanafin validates it against the contract's data rules and updates the contract state.",
    params: [
      { name: "contract_id", type: "string", desc: "The contract the evidence belongs to." },
      { name: "data_source", type: "enum", desc: "lab_feed, device or ehr." },
      { name: "payload.biomarker", type: "string", desc: "The measured value, e.g. HbA1c." },
      { name: "payload.fhir_reference", type: "string", desc: "Optional FHIR Observation reference." },
    ],
    code: {
      curl: `curl -X POST https://api.sanafin.tech/v1/evidence/ingest \\
  -H "Authorization: Bearer sf_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract_id": "con_example_t2d",
    "patient_id": "pat_example_001",
    "data_source": "lab_feed",
    "payload": {
      "biomarker": "HbA1c",
      "value": 6.9,
      "unit": "percent",
      "verified_by": "lab_example"
    }
  }'`,
      node: `const res = await fetch("https://api.sanafin.tech/v1/evidence/ingest", {
  method: "POST",
  headers: {
    Authorization: "Bearer sf_test_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contract_id: "con_example_t2d",
    patient_id: "pat_example_001",
    data_source: "lab_feed",
    payload: { biomarker: "HbA1c", value: 6.9, unit: "percent", verified_by: "lab_example" },
  }),
})
console.log(await res.json())`,
    },
    response: `{
  "status": "received",
  "evidence_id": "ev_example_01",
  "validation": { "schema_check": "passed" },
  "contract_state": "pending_evaluation"
}`,
  },
  commit: {
    tab: "Create a commitment",
    method: "POST",
    path: "/v1/commitments",
    title: "Commit a budget to an outcome",
    body: "Register the amount a payer commits against a contract. The licensed custody partner holds it; Sanafin only issues the payment instruction on a verified pass.",
    params: [
      { name: "committed_amount", type: "decimal", desc: "The cap the payer commits." },
      { name: "funder_id", type: "string", desc: "The payer funding the contract." },
      { name: "provider_id", type: "string", desc: "The provider paid on a verified pass." },
      { name: "rules.target_threshold", type: "decimal", desc: "The outcome threshold, agreed up front." },
    ],
    code: {
      curl: `curl -X POST https://api.sanafin.tech/v1/commitments \\
  -H "Authorization: Bearer sf_test_..." \\
  -H "Idempotency-Key: 4c1f..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract_id": "con_example_t2d",
    "committed_amount": 180000.00,
    "currency": "CHF",
    "funder_id": "fnd_example_insurer",
    "provider_id": "prv_example_clinic",
    "rules": {
      "target_metric": "HbA1c",
      "target_threshold": 0.5,
      "evaluation_window_days": 180
    }
  }'`,
      node: `const res = await fetch("https://api.sanafin.tech/v1/commitments", {
  method: "POST",
  headers: {
    Authorization: "Bearer sf_test_...",
    "Idempotency-Key": "4c1f...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contract_id: "con_example_t2d",
    committed_amount: 180000.0,
    currency: "CHF",
    funder_id: "fnd_example_insurer",
    provider_id: "prv_example_clinic",
    rules: { target_metric: "HbA1c", target_threshold: 0.5, evaluation_window_days: 180 },
  }),
})
console.log(await res.json())`,
    },
    response: `{
  "commitment_id": "cmt_example_01",
  "status": "held_by_custodian",
  "amount": 180000.00,
  "currency": "CHF",
  "evaluation_date": "2027-04-01"
}`,
  },
}

const basics = [
  ["Authentication", "Bearer keys in the Authorization header; test and live keys are separate."],
  ["Formats", "JSON in and out; clinical values map to HL7 FHIR Observations."],
  ["Idempotency", "Send an Idempotency-Key on writes so a retry never commits twice."],
]

export default function ApiDocsPage() {
  const [active, setActive] = useState<Workflow>("ingest")
  const [lang, setLang] = useState<Lang>("curl")
  const ep = endpoints[active]

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />

        <main id="main" className="landing-page">
          <section className="!pt-36 md:!pt-44">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-2xl">
                <p className="text-[13px] text-[#766d67] mb-4">API reference</p>
                <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-[3.6rem] text-[#1f1a17]">Send evidence. Release payment.</h1>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#6f6660]">Two endpoints connect your data to an outcome contract.</p>
              </div>

              <p className="mt-8 max-w-2xl rounded-2xl border border-[#f15d22]/20 bg-[#f15d22]/[0.06] px-5 py-3.5 text-[14px] text-[#1f1a17]">
                <span className="font-medium">Preview.</span> Endpoints and fields may change. Sandbox keys on request.
              </p>

              <dl className="mt-10 grid gap-4 md:grid-cols-3">
                {basics.map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-[#f5f1ed] px-5 py-4">
                    <dt className="text-[14px] font-medium text-[#1f1a17]">{k}</dt>
                    <dd className="mt-1 text-[13.5px] leading-snug text-[#6f6660]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div role="tablist" aria-label="Endpoints" className="mt-14 flex flex-wrap gap-2">
                {(Object.keys(endpoints) as Workflow[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active === key}
                    onClick={() => setActive(key)}
                    className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                      active === key ? "bg-[#1f1a17] text-white" : "bg-[#f5f1ed] text-[#1f1a17] hover:bg-[#ece7e2]"
                    }`}
                  >
                    {endpoints[key].tab}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid overflow-hidden rounded-3xl border border-[#ece7e2] bg-white lg:grid-cols-2">
                {/* Reference */}
                <div className="p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-[#ece7e2] bg-[#fbfaf8] px-2.5 py-1.5 font-mono text-[12.5px]">
                    <span className="rounded bg-[#14b8a6]/15 px-1.5 py-0.5 text-[11px] font-semibold text-[#0f766e]">{ep.method}</span>
                    <span className="text-[#1f1a17]">{ep.path}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-medium text-[#1f1a17]">{ep.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6f6660]">{ep.body}</p>

                  <p className="mt-8 text-[13px] text-[#766d67]">Request parameters</p>
                  <ul className="mt-2 divide-y divide-[#f0ebe6] rounded-2xl border border-[#ece7e2]">
                    {ep.params.map((p) => (
                      <li key={p.name} className="px-4 py-3">
                        <p className="font-mono text-[13px] text-[#1f1a17]">{p.name}</p>
                        <p className="mt-0.5 text-[13px] text-[#766d67]">
                          <span className="font-mono text-[12px]">{p.type}</span> · {p.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code */}
                <div className="flex min-w-0 flex-col bg-[#1a1512] text-white">
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
                    <span className="font-mono text-[11px] text-white/45">Example request · test mode</span>
                    <div className="flex gap-1" role="tablist" aria-label="Language">
                      {(["curl", "node"] as Lang[]).map((l) => (
                        <button
                          key={l}
                          type="button"
                          role="tab"
                          aria-selected={lang === l}
                          onClick={() => setLang(l)}
                          className={`rounded-md px-2.5 py-1 font-mono text-[11.5px] ${lang === l ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
                        >
                          {l === "curl" ? "cURL" : "Node.js"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <pre className="overflow-x-auto px-6 py-5 font-mono text-[12px] leading-[1.7] text-white/85">{ep.code[lang]}</pre>
                  <div className="mt-auto border-t border-white/10 px-6 py-5">
                    <p className="mb-2 flex items-center gap-2 font-mono text-[11px] text-white/45">
                      Response <span className="text-[#5eead4]">200 OK</span>
                    </p>
                    <pre className="overflow-x-auto font-mono text-[12px] leading-[1.7] text-[#5eead4]">{ep.response}</pre>
                  </div>
                </div>
              </div>

              <p className="mt-10 text-center text-[15px] text-[#6f6660]">
                Want sandbox keys? Email{" "}
                <a
                  href={`mailto:${site.contactEmail}?subject=Sanafin%20sandbox%20access`}
                  className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"
                >
                  {site.contactEmail}
                </a>
                .
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
