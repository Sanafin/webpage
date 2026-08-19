"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SwissCross } from "@/components/ui/swiss-cross"
import { motion } from "framer-motion"
import { 
  Database, 
  Coins, 
  ArrowRight, 
  Code2, 
  Key, 
  CheckCircle2, 
  Activity 
} from "lucide-react"

export default function ApiDocsPage() {
  useScrollReveal()
  const [activeWorkflow, setActiveWorkflow] = useState<"ingest" | "escrow">("ingest")
  const [activeLang, setActiveLang] = useState<"curl" | "node">("curl")

  const ingestCode = {
    curl: `curl -X POST https://api.sanafin.tech/v1/evidence/ingest \\
  -H "Authorization: Bearer sf_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract_id": "con_892f3a8b9",
    "patient_id": "pat_swiss_4091",
    "data_source": "lab_feed",
    "evidence_type": "biomarker_reading",
    "timestamp": "2026-06-22T08:12:00Z",
    "payload": {
      "biomarker": "HbA1c",
      "value": 5.6,
      "unit": "percent",
      "verified_by": "lab_synlab_geneva",
      "fhir_reference": "Observation/obs-9921-hba1c"
    }
  }'`,
    node: `const axios = require('axios');

const response = await axios.post(
  'https://api.sanafin.tech/v1/evidence/ingest',
  {
    contract_id: 'con_892f3a8b9',
    patient_id: 'pat_swiss_4091',
    data_source: 'lab_feed',
    evidence_type: 'biomarker_reading',
    timestamp: new Date().toISOString(),
    payload: {
      biomarker: 'HbA1c',
      value: 5.6,
      unit: 'percent',
      verified_by: 'lab_synlab_geneva',
      fhir_reference: 'Observation/obs-9921-hba1c'
    }
  },
  {
    headers: {
      'Authorization': 'Bearer sf_live_...',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);`
  }

  const escrowCode = {
    curl: `curl -X POST https://api.sanafin.tech/v1/escrow/pools \\
  -H "Authorization: Bearer sf_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract_id": "con_892f3a8b9",
    "escrow_amount": 1250.00,
    "currency": "CHF",
    "funder_id": "pyr_helsana_0921",
    "provider_id": "prov_oviva_732a",
    "rules": {
      "target_metric": "HbA1c",
      "target_threshold": 5.7,
      "evaluation_window_days": 180
    }
  }'`,
    node: `const axios = require('axios');

const response = await axios.post(
  'https://api.sanafin.tech/v1/escrow/pools',
  {
    contract_id: 'con_892f3a8b9',
    escrow_amount: 1250.00,
    currency: 'CHF',
    funder_id: 'pyr_helsana_0921',
    provider_id: 'prov_oviva_732a',
    rules: {
      target_metric: 'HbA1c',
      target_threshold: 5.7,
      evaluation_window_days: 180
    }
  },
  {
    headers: {
      'Authorization': 'Bearer sf_live_...',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);`
  }

  const responses = {
    ingest: `{
  "status": "received",
  "evidence_id": "ev_091f27a3c",
  "received_at": "2026-06-22T08:12:01Z",
  "validation": {
    "schema_check": "passed",
    "provider_check": "synlab_verified"
  },
  "contract_impact": {
    "action": "contract_updated",
    "state": "pending_payout_evaluation"
  }
}`,
    escrow: `{
  "pool_id": "pool_892f3a8b9",
  "status": "initialized",
  "escrow_address": "CH93_0000_1234_5678_9012_3",
  "locked_amount": 1250.00,
  "currency": "CHF",
  "verification_requirements": {
    "evaluation_date": "2026-12-19T08:00:00Z",
    "target_threshold": 5.7
  }
}`
  }

  return (
    <div className="page-wrapper bg-[#fffaf6]">
      <div className="page-content text-[#2f241f]">
        <Header />
        
        <main className="max-w-7xl mx-auto px-6 py-32">
          {/* Page Intro */}
          <div className="reveal max-w-3xl mb-16 pt-12">
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-[#2f241f] mb-6">
              API Reference & Overview
            </h1>
            <p className="text-[#8c6a59] text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              Sanafin APIs bridge the gap between healthcare data streams and financial settlement. Securely ingest clinical evidence and orchestrate programmatic escrows to execute value-based contracts automatically.
            </p>
          </div>

          {/* Core Concepts Banner */}
          <div className="reveal grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Authentication",
                icon: <Key className="w-4 h-4 text-[#14B8A6]" />,
                desc: "Secure requests using live and sandbox API keys passed in request authorization headers."
              },
              {
                title: "Standard Formats",
                icon: <Database className="w-4 h-4 text-[#14B8A6]" />,
                desc: "Full support for standard JSON payloads, mapping easily to HL7 FHIR Observation schemas."
              },
              {
                title: "Idempotency",
                icon: <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />,
                desc: "All contract and escrow creations support idempotency keys to ensure zero double-funding errors."
              }
            ].map((concept) => (
              <div key={concept.title} className="p-6 bg-white border border-[#efc2a5]/30 rounded-[10px] shadow-[0_4px_20px_rgba(47,36,31,0.01)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#14B8A6]/10 rounded-[6px]">
                    {concept.icon}
                  </div>
                  <h3 className="font-serif text-sm text-[#2f241f] font-semibold">{concept.title}</h3>
                </div>
                <p className="text-[#8c6a59] text-xs leading-relaxed font-sans">{concept.desc}</p>
              </div>
            ))}
          </div>

          {/* Split Developer Portal View */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start relative z-10 border border-[#efc2a5]/30 rounded-[16px] overflow-hidden bg-white/40 backdrop-blur-sm shadow-[0_8px_30px_rgba(47,36,31,0.02)]">
            
            {/* Left Column: API Documentation / Guides */}
            <div className="p-8 md:p-10 space-y-12">
              
              {/* Workflow Navigation */}
              <div className="flex border-b border-[#efc2a5]/20 pb-1 gap-6">
                <button
                  onClick={() => setActiveWorkflow("ingest")}
                  className={`pb-4 text-xs font-mono uppercase tracking-wider font-bold transition-all relative ${
                    activeWorkflow === "ingest" ? "text-[#14B8A6]" : "text-[#8c6a59] hover:text-[#2f241f]"
                  }`}
                >
                  1. Ingest Health Data
                  {activeWorkflow === "ingest" && (
                    <motion.div layoutId="workflowUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14B8A6]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveWorkflow("escrow")}
                  className={`pb-4 text-xs font-mono uppercase tracking-wider font-bold transition-all relative ${
                    activeWorkflow === "escrow" ? "text-[#14B8A6]" : "text-[#8c6a59] hover:text-[#2f241f]"
                  }`}
                >
                  2. Escrow & Payouts
                  {activeWorkflow === "escrow" && (
                    <motion.div layoutId="workflowUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14B8A6]" />
                  )}
                </button>
              </div>

              {activeWorkflow === "ingest" ? (
                // INGEST DOCUMENTATION
                <div className="space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-white bg-[#14B8A6] px-2.5 py-0.5 rounded-[4px] mb-3">
                      POST
                    </span>
                    <span className="font-mono text-xs text-[#2f241f] ml-3 bg-black/5 px-2 py-0.5 rounded-[4px]">
                      /v1/evidence/ingest
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-[#2f241f]">
                    Connecting real-world health evidence
                  </h3>
                  
                  <p className="text-[#8c6a59] text-sm leading-relaxed font-sans">
                    Use this endpoint to feed patient health indicators and biomarkers directly into Sanafin to verify active contracts. Sanafin parses digital biomarkers and lab reports (e.g., HbA1c tests) to assess outcome target success.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-[#efc2a5]/10">
                    <h4 className="font-serif text-xs font-bold text-[#2f241f] uppercase tracking-wider">Payload Parameters</h4>
                    
                    <div className="space-y-3.5 text-xs font-sans text-[#8c6a59]">
                      <div className="flex justify-between border-b border-[#efc2a5]/10 pb-2">
                        <div>
                          <code className="text-[#2f241f] font-semibold font-mono">contract_id</code>
                          <span className="text-[10px] text-red-500 font-mono ml-2">required</span>
                        </div>
                        <span className="font-mono text-[10px]">string</span>
                      </div>
                      <p className="leading-normal pl-2 border-l border-[#14B8A6]/20">Unique identifier of the target value-based contract.</p>

                      <div className="flex justify-between border-b border-[#efc2a5]/10 pb-2 pt-2">
                        <div>
                          <code className="text-[#2f241f] font-semibold font-mono">data_source</code>
                          <span className="text-[10px] text-red-500 font-mono ml-2">required</span>
                        </div>
                        <span className="font-mono text-[10px]">string (enum)</span>
                      </div>
                      <p className="leading-normal pl-2 border-l border-[#14B8A6]/20">The origin of the health evidence. Must be <code className="font-mono text-[10px] bg-black/5 px-1 py-0.2 rounded">lab_feed</code>, <code className="font-mono text-[10px] bg-black/5 px-1 py-0.2 rounded">wearable</code>, or <code className="font-mono text-[10px] bg-black/5 px-1 py-0.2 rounded">ehr_record</code>.</p>

                      <div className="flex justify-between border-b border-[#efc2a5]/10 pb-2 pt-2">
                        <div>
                          <code className="text-[#2f241f] font-semibold font-mono">payload.biomarker</code>
                          <span className="text-[10px] text-red-500 font-mono ml-2">required</span>
                        </div>
                        <span className="font-mono text-[10px]">string</span>
                      </div>
                      <p className="leading-normal pl-2 border-l border-[#14B8A6]/20">The clinical code/name of the metric being verified (e.g. <code className="font-mono">HbA1c</code> or <code className="font-mono">Steps</code>).</p>
                    </div>
                  </div>
                </div>
              ) : (
                // ESCROW DOCUMENTATION
                <div className="space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-white bg-[#14B8A6] px-2.5 py-0.5 rounded-[4px] mb-3">
                      POST
                    </span>
                    <span className="font-mono text-xs text-[#2f241f] ml-3 bg-black/5 px-2 py-0.5 rounded-[4px]">
                      /v1/escrow/pools
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-[#2f241f]">
                    Creating programmatic escrow contracts
                  </h3>
                  
                  <p className="text-[#8c6a59] text-sm leading-relaxed font-sans">
                    Use this endpoint to initialize and fund conditional contract pools. Escrow values are locked programmatically in compliance with Swiss digital health execution regulations and are only disbursed once targeted outcomes are verified.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-[#efc2a5]/10">
                    <h4 className="font-serif text-xs font-bold text-[#2f241f] uppercase tracking-wider">Payload Parameters</h4>
                    
                    <div className="space-y-3.5 text-xs font-sans text-[#8c6a59]">
                      <div className="flex justify-between border-b border-[#efc2a5]/10 pb-2">
                        <div>
                          <code className="text-[#2f241f] font-semibold font-mono">escrow_amount</code>
                          <span className="text-[10px] text-red-500 font-mono ml-2">required</span>
                        </div>
                        <span className="font-mono text-[10px]">decimal</span>
                      </div>
                      <p className="leading-normal pl-2 border-l border-[#14B8A6]/20">The total financial value locked at risk in the escrow pool.</p>

                      <div className="flex justify-between border-b border-[#efc2a5]/10 pb-2 pt-2">
                        <div>
                          <code className="text-[#2f241f] font-semibold font-mono">provider_id</code>
                          <span className="text-[10px] text-red-500 font-mono ml-2">required</span>
                        </div>
                        <span className="font-mono text-[10px]">string</span>
                      </div>
                      <p className="leading-normal pl-2 border-l border-[#14B8A6]/20">The target recipient provider ID (e.g. Oviva, digital clinic) paid upon outcome success.</p>

                      <div className="flex justify-between border-b border-[#efc2a5]/10 pb-2 pt-2">
                        <div>
                          <code className="text-[#2f241f] font-semibold font-mono">rules.target_threshold</code>
                          <span className="text-[10px] text-red-500 font-mono ml-2">required</span>
                        </div>
                        <span className="font-mono text-[10px]">decimal</span>
                      </div>
                      <p className="leading-normal pl-2 border-l border-[#14B8A6]/20">The exact outcome target value threshold to evaluate (e.g. <code className="font-mono">5.7</code> for HbA1c Hb level).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sleek Code Terminal */}
            <div className="bg-[#0f172a] text-zinc-100 min-h-full font-mono flex flex-col justify-between border-l border-[#efc2a5]/10 lg:h-[700px]">
              
              <div>
                {/* Code Terminal Tabs */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#090d16] shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  
                  {/* Language Selector */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveLang("curl")}
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                        activeLang === "curl" ? "text-[#14B8A6]" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setActiveLang("node")}
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                        activeLang === "node" ? "text-[#14B8A6]" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Node.js
                    </button>
                  </div>
                </div>

                {/* Request Code Block */}
                <div className="p-6 overflow-x-auto border-b border-white/5">
                  <span className="text-[10px] font-bold text-zinc-500 block mb-3 uppercase tracking-wider">REQUEST PAYLOAD</span>
                  <pre className="text-[11px] leading-relaxed text-zinc-300 whitespace-pre">
                    {activeWorkflow === "ingest" ? ingestCode[activeLang] : escrowCode[activeLang]}
                  </pre>
                </div>
              </div>

              {/* Response Code Block */}
              <div className="p-6 bg-[#090d16] overflow-x-auto mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">EXPECTED RESPONSE</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#14B8A6] font-bold font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" /> 200 OK
                  </span>
                </div>
                <pre className="text-[11px] leading-relaxed text-[#14B8A6]/90 whitespace-pre">
                  {activeWorkflow === "ingest" ? responses.ingest : responses.escrow}
                </pre>
              </div>

            </div>

          </div>

          {/* Sandbox Info */}
          <section className="reveal border-t border-[#efc2a5]/20 mt-16 pt-16 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#2f241f] mb-4">Request Sandbox Access</h2>
            <p className="text-[#8c6a59] leading-relaxed text-sm mb-6">
              Establish value-based clinical contracts inside our developer sandbox. Contact us for mock evidence scripts, HL7 validator keys, and staging endpoints.
            </p>
            <a
              className="px-6 py-3 bg-white border border-[#efc2a5]/50 text-[#2f241f] font-mono text-xs uppercase tracking-wider font-bold rounded-[8px] hover:bg-[#efc2a5]/10 inline-block transition-all"
              href="mailto:hello@sanafin.tech?subject=Sanafin%20Sandbox%20API%20Access"
            >
              Get Sandbox Credentials
            </a>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
