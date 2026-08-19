import Image from "next/image"
import { ShieldCheck, ClipboardCheck, Zap } from "lucide-react"
import innoboosterLogo from "@/components/ui/logo/innobooster.png"
import kickfoundationLogo from "@/components/ui/logo/kickfoundation_pos_farbe.png"
import sftaLogo from "@/components/ui/logo/sfta_logo.png"
import sicLogo from "@/components/ui/logo/SIC-logo.png"

export function TrustBar() {
  const proofItems = [
    { text: "Swiss-designed contract operations baseline", icon: ShieldCheck },
    { text: "Audit-ready event logging and role-based controls", icon: ClipboardCheck },
    { text: "Pilot scoping for active healthcare opportunities", icon: Zap },
  ]

  const logos = [
    { name: "InnoBooster", src: innoboosterLogo },
    { name: "Kick Foundation", src: kickfoundationLogo },
    { name: "SFTA", src: sftaLogo },
    { name: "SIC", src: sicLogo },
  ]

  return (
    <div className="py-12 md:py-16 reveal border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Features Row */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {proofItems.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Logos Section */}
        <div className="space-y-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 text-center">
            Supported by ecosystem programs
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center">
                <Image 
                  src={logo.src} 
                  alt={logo.name} 
                  className="h-7 md:h-8 w-auto object-contain" 
                  style={{ width: "auto" }}
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Status Card - Refined */}
        <div className="mt-16 p-8 border border-border/60 bg-card/50 backdrop-blur-[2px] rounded-[10px] relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-16 h-16 text-primary" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Live Proof Snapshot</p>
              <h4 className="font-serif font-semibold text-xl text-foreground tracking-tight">Diabetes DTx Reimbursement Pilot</h4>
            </div>
            
            <div className="grid grid-cols-2 md:flex md:items-center gap-x-8 gap-y-4">
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-chart-2 rounded-full animate-pulse" />
                  <p className="text-xs font-medium">Verification Active</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Escrowed</p>
                <p className="text-xs font-medium font-mono text-primary">CHF 85,000.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
