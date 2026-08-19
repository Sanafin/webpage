"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight, Zap, Coins, Activity } from "lucide-react"

interface LedgerItem {
  id: string
  timestamp: string
  metric: string
  amount: number
  status: "verified" | "settled"
}

export function SettlementSimulator() {
  const [hba1c, setHba1c] = useState<number>(7.4)
  const [adherence, setAdherence] = useState<number>(82)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [step, setStep] = useState<"idle" | "telemetry" | "verifying" | "settling" | "completed">("idle")
  const [ledger, setLedger] = useState<LedgerItem[]>([
    { id: "TX-902", timestamp: "10 mins ago", metric: "Active Telemetry Established", amount: 0, status: "verified" },
    { id: "TX-901", timestamp: "1 hour ago", metric: "Enrollment Escrow Deposit", amount: 5000, status: "settled" },
  ])
  const [escrowBalance, setEscrowBalance] = useState<number>(4500)

  // Auto trigger check when values cross target thresholds
  const isTargetMet = hba1c <= 7.0 && adherence >= 90

  const handleSimulate = async () => {
    if (isVerifying) return
    setIsVerifying(true)
    setStep("telemetry")

    // Stage 1: Data Telemetry Stream
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStep("verifying")

    // Stage 2: Verification Engine Calculations
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStep("settling")

    // Stage 3: Instant Escrow Release
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    if (isTargetMet) {
      const payoutAmount = 250
      const newTx: LedgerItem = {
        id: `TX-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: "Just now",
        metric: `Outcomes Met (HbA1c ${hba1c}%, Adherence ${adherence}%)`,
        amount: payoutAmount,
        status: "settled"
      }
      setLedger((prev) => [newTx, ...prev])
      setEscrowBalance((prev) => Math.max(0, prev - payoutAmount))
      setStep("completed")
    } else {
      setStep("idle")
    }
    
    setIsVerifying(false)
  }

  const handleReset = () => {
    setHba1c(7.4)
    setAdherence(82)
    setStep("idle")
    setIsVerifying(false)
    setEscrowBalance(4500)
    setLedger([
      { id: "TX-902", timestamp: "10 mins ago", metric: "Active Telemetry Established", amount: 0, status: "verified" },
      { id: "TX-901", timestamp: "1 hour ago", metric: "Enrollment Escrow Deposit", amount: 5000, status: "settled" },
    ])
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[10px] bg-white border border-[#edc4aa]/30 shadow-2xl overflow-hidden text-left relative z-10 flex flex-col">
      {/* Simulator Top bar */}
      <div className="bg-[#fcfaf7] border-b border-[#edc4aa]/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[#8c6a59] font-bold">
            Sanafin Live Settlement Engine v2.4
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-[#8c6a59]/60 font-mono">Vault Escrow Balance</span>
            <span className="font-mono text-sm font-bold text-[#f15d22]">${escrowBalance.toLocaleString()}.00 USDC</span>
          </div>
          <button 
            onClick={handleReset}
            className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors text-[#8c6a59] hover:text-foreground cursor-pointer"
            title="Reset Simulator"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Main Body */}
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#edc4aa]/20">
        
        {/* Panel 1: Telemetry Inputs */}
        <div className="p-6 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-teal-600" />
              <h4 className="font-serif font-semibold text-[#2f241f] text-base">1. Clinical Telemetry</h4>
            </div>
            <p className="text-xs text-[#8c6a59] leading-relaxed mb-6">
              Adjust patient telemetry parameters to reach target clinical benchmarks (HbA1c &le; 7.0%, Adherence &ge; 90%).
            </p>

            <div className="space-y-6">
              {/* HbA1c Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8c6a59] font-semibold">HbA1c Levels</span>
                  <span className={`font-bold ${hba1c <= 7.0 ? 'text-teal-600' : 'text-[#f15d22]'}`}>
                    {hba1c.toFixed(1)}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="5.5" 
                  max="9.0" 
                  step="0.1"
                  value={hba1c}
                  disabled={isVerifying}
                  onChange={(e) => setHba1c(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-teal-600 disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] text-[#8c6a59]/60 font-mono">
                  <span>Baseline: 7.4%</span>
                  <span>Target: &le; 7.0%</span>
                </div>
              </div>

              {/* Adherence Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8c6a59] font-semibold">Treatment Adherence</span>
                  <span className={`font-bold ${adherence >= 90 ? 'text-teal-600' : 'text-[#f15d22]'}`}>
                    {adherence}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="60" 
                  max="100" 
                  step="1"
                  value={adherence}
                  disabled={isVerifying}
                  onChange={(e) => setAdherence(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-teal-600 disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] text-[#8c6a59]/60 font-mono">
                  <span>Baseline: 82%</span>
                  <span>Target: &ge; 90%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#edc4aa]/10">
            <button
              onClick={handleSimulate}
              disabled={isVerifying}
              className={`w-full py-3 px-4 rounded-[10px] font-mono text-xs uppercase tracking-wider font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                isVerifying
                  ? 'bg-neutral-300 cursor-not-allowed text-neutral-500'
                  : isTargetMet
                    ? 'bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-700/10'
                    : 'bg-[#f15d22] hover:bg-[#d03d00] shadow-md shadow-[#f15d22]/10'
              }`}
            >
              {isVerifying ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Settlement Pending
                </>
              ) : isTargetMet ? (
                <>
                  <Zap className="w-4 h-4" /> Trigger Payout
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Verify Contract
                </>
              )}
            </button>
          </div>
        </div>

        {/* Panel 2: Verification Engine */}
        <div className="p-6 flex flex-col justify-between min-h-[360px] bg-[#fffbf9]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#f15d22]" />
              <h4 className="font-serif font-semibold text-[#2f241f] text-base">2. Automated Oracle</h4>
            </div>
            <p className="text-xs text-[#8c6a59] leading-relaxed mb-6">
              Sanafin calculates contract execution status instantly upon evaluation of outcomes data.
            </p>

            <div className="rounded-[10px] bg-neutral-900 text-neutral-300 p-4 font-mono text-[10px] leading-relaxed border border-neutral-800 relative overflow-hidden shadow-inner">
              <div className="text-teal-400">// Evaluate Contract Target VBC-2894</div>
              <div>contract OutcomesVerifier &#123;</div>
              <div className="pl-4">
                <span className="text-orange-400">uint8</span> targetHbA1c = 70; // 7.0%
              </div>
              <div className="pl-4">
                <span className="text-orange-400">uint8</span> targetAdherence = 90; // 90%
              </div>
              <div className="pl-4 mt-2">
                <span className="text-orange-400">function</span> evaluate(
                <span className="text-neutral-400">hba1c, adherence</span>) &#123;
              </div>
              <div className="pl-8">
                <span className="text-purple-400">if</span> (hba1c &lt;= targetHbA1c && adherence &gt;= targetAdherence) &#125;
              </div>
              <div className="pl-12 text-teal-400">
                emit PayoutTriggered(provider_id, 250);
              </div>
              <div className="pl-8">&#125;</div>
              <div className="pl-4">&#125;</div>
              
              {/* Scanline animated effect */}
              {isVerifying && (
                <motion.div 
                  className="absolute inset-x-0 h-0.5 bg-teal-500/50 shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </div>

          {/* Verification Status Feedback */}
          <div className="border border-[#edc4aa]/20 rounded-[10px] p-4 bg-white flex flex-col gap-3 justify-center min-h-[90px]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8c6a59]">Oracle State</span>
              <span className={`font-bold uppercase ${
                step === "completed" ? "text-teal-600" : isVerifying ? "text-orange-500" : "text-[#8c6a59]"
              }`}>
                {step === "completed" ? "Settled" : step === "settling" ? "Settling" : step === "verifying" ? "Evaluating" : step === "telemetry" ? "Syncing" : "Active"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  className={`h-full ${isTargetMet ? "bg-teal-500" : "bg-[#f15d22]"}`}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: 
                      step === "telemetry" ? "33%" : 
                      step === "verifying" ? "66%" : 
                      step === "settling" || step === "completed" ? "100%" : 
                      "0%" 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold">
                {step === "telemetry" ? "33%" : step === "verifying" ? "66%" : step === "settling" || step === "completed" ? "100%" : "0%"}
              </span>
            </div>

            <div className="text-[10px] text-[#8c6a59] font-medium flex items-center gap-1.5">
              {step === "completed" ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="text-teal-700 font-semibold">Success: Conditions verified and settled.</span>
                </>
              ) : isVerifying ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
                  <span>Processing outcomes verification telemetry...</span>
                </>
              ) : isTargetMet ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse shrink-0"></span>
                  <span>Target achieved. Click 'Trigger Payout'.</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-neutral-300 shrink-0"></span>
                  <span>Telemetry inputs are below active contract targets.</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Panel 3: Escrow / Payout Ledger */}
        <div className="p-6 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5 text-amber-500" />
              <h4 className="font-serif font-semibold text-[#2f241f] text-base">3. Settlement Ledger</h4>
            </div>
            <p className="text-xs text-[#8c6a59] leading-relaxed mb-4">
              Auditable, real-time transaction ledger. Outcomes trigger immediate escrow validation.
            </p>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {ledger.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 border border-neutral-100 rounded-[10px] bg-neutral-50 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-[#2f241f]">{item.id}</span>
                      <span className="text-[10px] text-[#8c6a59] line-clamp-1">{item.metric}</span>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      {item.amount > 0 ? (
                        <span className="font-bold text-teal-600">+${item.amount.toFixed(2)} USDC</span>
                      ) : (
                        <span className="text-[#8c6a59]/60">Telemetry Setup</span>
                      )}
                      <span className={`text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                        item.status === "settled" ? "bg-teal-50 text-teal-700" : "bg-neutral-200 text-neutral-700"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 border-t border-[#edc4aa]/10 text-center">
            <span className="text-[9px] text-[#8c6a59]/60 font-mono flex items-center justify-center gap-1">
              Secured by cryptographically signed multi-party oracles
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
