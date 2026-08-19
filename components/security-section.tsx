"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Lock, Share2, Wallet, User, ShieldCheck, Activity } from "lucide-react"

const ecosystemPillars = [
  {
    icon: Zap,
    title: "Instant Verification",
    description: "Real-time outcome validation from clinical or claims data."
  },
  {
    icon: Share2,
    title: "Multi-Party Governance",
    description: "Rules-based workflows shared between payers and providers."
  },
  {
    icon: Shield,
    title: "Institutional Security",
    description: "Swiss-hosted, GDPR-compliant with immutable audit trails."
  }
]

export function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="ecosystem" className="py-32 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 blueprint-grid-light opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-6">
                Ecosystem Integration
              </p>
              
              <h2 className="font-serif font-medium tracking-tight text-4xl md:text-5xl text-[#2f241f] mb-6 leading-[1.15]">
                The infrastructure for <span className="text-primary italic">verifiable</span> healthcare operations.
              </h2>
              
              <p className="text-[#8c6a59] text-lg leading-relaxed mb-10">
                Sanafin verifies health outcomes, calculates cost performance, and triggers payments automatically.
              </p>
            </motion.div>

            <div className="space-y-6">
              {ecosystemPillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="p-2 bg-[#f0f9f8] rounded-[10px] transition-all duration-300 group-hover:bg-[#14B8A6]/10">
                    <pillar.icon className="w-4 h-4 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-[#2f241f] mb-1 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#8c6a59] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Institutional Flow Visual */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="bg-[#fffaf6] p-1 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="glass-morphism-light blueprint-grid-light p-12 min-h-[520px] relative flex items-center justify-center overflow-hidden">
                
                {/* Central Node (Sanafin Escrow) */}
                <div className="z-20 relative">
                  <div className="absolute inset-0 bg-[#14B8A6] blur-3xl opacity-10 scale-150 animate-pulse-soft" />
                  <div className="relative bg-white border border-[#14B8A6]/30 p-8 rounded-2xl shadow-[0_4px_30px_rgba(20,184,166,0.08)] flex flex-col items-center">
                    <div className="mb-4 p-2 bg-[#14B8A6]/5 border border-[#14B8A6]/10">
                      <Lock className="w-6 h-6 text-[#14B8A6]" />
                    </div>
                    <p className="font-serif font-semibold text-xl text-[#2f241f] mb-1 tracking-tight">Sanafin</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#14B8A6]">Escrow Vault</p>
                    <div className="mt-4 flex gap-1.5">
                       <div className="w-1 h-1 bg-[#14B8A6] rounded-full" />
                       <div className="w-1 h-1 bg-[#14B8A6] rounded-full opacity-40" />
                       <div className="w-1 h-1 bg-[#14B8A6] rounded-full opacity-20" />
                    </div>
                  </div>
                </div>

                {/* SVG Blueprint Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 500">
                  <defs>
                    <linearGradient id="blueprintGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#efc2a5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal Main Axis */}
                  <line x1="100" y1="250" x2="500" y2="250" stroke="url(#blueprintGradLight)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="100" y1="250" x2="100" y2="230" stroke="#efc2a5" strokeOpacity="0.5" strokeWidth="1" />
                  <line x1="500" y1="250" x2="500" y2="230" stroke="#efc2a5" strokeOpacity="0.5" strokeWidth="1" />
                  
                  {/* Vertical Trigger Axis */}
                  <line x1="300" y1="120" x2="300" y2="250" stroke="url(#blueprintGradLight)" strokeWidth="1" strokeDasharray="2 2" />
                </svg>

                {/* High-Fidelity Data Packets */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Money Packet (Left -> Center) */}
                  <div className="animate-packet-money absolute flex items-center gap-2" 
                       style={{ offsetPath: "path('M 120 250 L 300 250')" }}>
                     <div className="w-12 h-[2px] bg-[#efc2a5] shadow-[0_0_10px_#efc2a5]" />
                     <span className="font-serif text-2xl text-[#8c6a59] font-bold tracking-tighter leading-none">$</span>
                  </div>
                  
                  {/* Signal Packet (Top -> Center) */}
                  <div className="animate-packet-signal absolute flex flex-col items-center gap-1"
                       style={{ offsetPath: "path('M 300 120 L 300 250')" }}>
                    <Zap className="w-5 h-5 text-[#14B8A6] fill-[#14B8A6] shadow-[0_0_15px_rgba(20,184,166,0.3)]" />
                    <div className="w-[2px] h-10 bg-[#14B8A6]/40 shadow-[0_0_8px_#14B8A6]" />
                  </div>

                  {/* Payout Packet (Center -> Right) */}
                  <div className="animate-packet-payout absolute flex items-center gap-2"
                       style={{ offsetPath: "path('M 300 250 L 480 250')" }}>
                     <span className="font-serif text-lg text-[#14B8A6] font-bold leading-none">$</span>
                     <div className="w-8 h-[2px] bg-[#14B8A6]/40 shadow-[0_0_10px_#14B8A6]" />
                  </div>
                </div>

                {/* Node: Payer (Left) */}
                <div className="absolute left-10 flex flex-col items-center">
                  <div className="p-4 border border-[#efc2a5]/40 bg-white/80 backdrop-blur-md mb-4 relative group shadow-sm rounded-[10px]">
                    <Wallet className="w-6 h-6 text-[#8c6a59]" />
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2f241f]">Payer / CFO</p>
                  <p className="font-mono text-[8px] text-[#8c6a59] mt-2 uppercase font-semibold">Initial Deposit</p>
                </div>

                {/* Node: Provider (Right) */}
                <div className="absolute right-10 flex flex-col items-center">
                  <div className="p-4 border border-[#efc2a5]/40 bg-white/80 backdrop-blur-md mb-4 relative group shadow-sm rounded-[10px]">
                    <Activity className="w-6 h-6 text-[#8c6a59]" />
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2f241f]">Provider</p>
                  <p className="font-mono text-[8px] text-[#8c6a59] mt-2 uppercase font-semibold">Payout Liquidity</p>
                </div>

                {/* Node: User / Patient (Top) */}
                <div className="absolute top-10 flex flex-col items-center">
                  <div className="p-4 border border-[#efc2a5]/40 bg-white/80 backdrop-blur-md mb-4 relative group shadow-sm rounded-[10px]">
                    <User className="w-6 h-6 text-[#8c6a59]" />
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2f241f]">User / Patient</p>
                  <p className="font-mono text-[8px] text-[#14B8A6] mt-2 uppercase tracking-widest font-bold">Outcome Evidence</p>
                </div>

                {/* Visual Status Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-3 px-6 border border-[#efc2a5]/30 bg-white/60 backdrop-blur-xl shadow-sm rounded-[10px]">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                     <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#2f241f]">ISO 27001 Certified Environment</span>
                  </div>
                  <div className="w-px h-3 bg-[#efc2a5]/40" />
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-[#14B8A6] rounded-full animate-ping" />
                     <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#2f241f] font-bold">Verified Node</span>
                  </div>
                </div>
              </div>

              {/* Data Security Footer */}
              <div className="p-4 bg-[#fffaf6] border-t border-[#efc2a5]/40 flex justify-between items-center px-8">
                 <p className="font-mono text-[8px] text-[#8c6a59] uppercase tracking-[0.2em]">Transaction Latency: &lt; 200ms</p>
                 <p className="font-mono text-[8px] text-[#8c6a59] uppercase tracking-[0.2em]">Sanafin Institutional Framework</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
