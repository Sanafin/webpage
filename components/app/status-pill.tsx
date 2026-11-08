import type { ContractStatus } from "@/lib/demo/types"

// Teal is reserved for verified / released. Everything else stays ink or muted.
const styles: Record<ContractStatus, { label: string; className: string }> = {
  settled: { label: "Released", className: "bg-[#14b8a6]/12 text-[#0f766e]" },
  returned: { label: "Returned", className: "bg-[#1f1a17]/8 text-[#1f1a17]" },
  verifying: { label: "Verification pending", className: "bg-[#f5f1ed] text-[#766d67]" },
  monitoring: { label: "Monitoring", className: "bg-[#f5f1ed] text-[#766d67]" },
}

export function StatusPill({ status, className = "" }: { status: ContractStatus; className?: string }) {
  const s = styles[status]
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap ${s.className} ${className}`}>{s.label}</span>
}

export function Pill({ tone = "ink", children }: { tone?: "teal" | "ink" | "muted" | "orange"; children: React.ReactNode }) {
  const cls =
    tone === "teal" ? "bg-[#14b8a6]/12 text-[#0f766e]" : tone === "orange" ? "bg-[#f15d22]/12 text-[#c4460f]" : tone === "muted" ? "bg-[#f5f1ed] text-[#766d67]" : "bg-[#1f1a17]/8 text-[#1f1a17]"
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-medium whitespace-nowrap ${cls}`}>{children}</span>
}
