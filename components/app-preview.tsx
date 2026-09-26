import { Bell, Check, FileCheck2, FileText, Home, Layers, Link2, Plus, Search, ShieldCheck, Wallet } from "lucide-react"
import { SwissCross } from "@/components/ui/swiss-cross"
import { contracts, example } from "@/lib/examples"

// Illustrative product preview, rendered on the server. Every figure is example
// data from lib/examples and the surrounding ScreenFrame says so.

const nav = [
  { label: "Home", icon: Home, active: true },
  { label: "Contracts", icon: FileText, badge: String(contracts.length) },
  { label: "Evidence", icon: ShieldCheck },
  { label: "Settlement", icon: Wallet },
  { label: "Data sources", icon: Link2 },
  { label: "Audit log", icon: Layers },
]

// Outcome-linked funds released over time (CHF thousands)
const series = [0, 0, 0, 0, 0, 60, 60, 60, 60, 60, 60, 60]

function AreaChart() {
  const w = 460
  const h = 120
  const max = 100
  const x = (i: number) => (i / (series.length - 1)) * w
  const y = (v: number) => h - (v / max) * h
  const line = series.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="preview-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f15d22" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f15d22" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#preview-fill)" />
      <path d={line} fill="none" stroke="#f15d22" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function AppPreview() {
  return (
    <div className="relative overflow-hidden bg-white text-left">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-48 shrink-0 flex-col border-r border-[#f0ebe6] bg-[#fcfbfa] p-3">
          <div className="flex items-center gap-2 rounded-lg px-2 py-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f15d22]/10">
              <SwissCross className="h-3 w-3 text-[#f15d22]" />
            </span>
            <span className="text-[13px] font-semibold text-[#1f1a17]">Outcome Studio</span>
          </div>
          <ul className="space-y-0.5">
            {nav.map(({ label, icon: Icon, active, badge }) => (
              <li
                key={label}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] ${
                  active ? "bg-[#f3efeb] font-medium text-[#1f1a17]" : "text-[#766d67]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </span>
                {badge && <span className="rounded-md bg-[#f3efeb] px-1.5 text-[11px] text-[#766d67]">{badge}</span>}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#f0ebe6] bg-[#fcfbfa] px-3 py-1.5 text-[12px] text-[#766d67] max-w-xs">
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">Search contracts, endpoints…</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#e9e4df] px-3 py-1 text-[12px] text-[#1f1a17]">
                <Plus className="h-3 w-3" aria-hidden="true" /> New contract
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3efeb] text-[#766d67]">
                <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>

          <p className="text-[15px] font-medium text-[#1f1a17] mb-4">{example.programme} · contract 1 of {contracts.length}</p>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            {/* Settlement card */}
            <div className="rounded-xl border border-[#f0ebe6] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] text-[#766d67] flex items-center gap-1.5">
                    Released on verified outcomes
                    <Check className="h-3 w-3 text-[#14B8A6]" aria-hidden="true" />
                  </p>
                  <p className="mt-1 text-2xl sm:text-[28px] font-medium tracking-tight text-[#1f1a17]">
                    {example.milestones[0].amount}
                    <span className="text-base text-[#766d67]"> of {example.committed}</span>
                  </p>
                </div>
                <span className="rounded-md bg-[#14B8A6]/10 px-2 py-1 text-[11px] font-medium text-[#0f766e]">Month 6 · threshold met</span>
              </div>
              <AreaChart />
              <div className="flex justify-between text-[10px] text-[#766d67]">
                <span>M1</span>
                <span>M3</span>
                <span>M6</span>
                <span>M9</span>
                <span>M12</span>
              </div>
            </div>

            {/* Contracts card */}
            <div className="rounded-xl border border-[#f0ebe6] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-medium text-[#1f1a17]">Active contracts</p>
                <span className="text-[11px] text-[#766d67]">View all</span>
              </div>
              <ul className="divide-y divide-[#f0ebe6]">
                {contracts.map((c, i) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-medium text-[#1f1a17]">{c.name}</p>
                      <p className="truncate text-[11px] text-[#766d67]">{c.population}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[12px] text-[#1f1a17]">{c.committed}</p>
                      <p className={`text-[10px] font-medium ${i === 0 ? "text-[#0f766e]" : "text-[#766d67]"}`}>
                        {i === 0 ? "Verified" : "Monitoring"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verification row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "WZW composite", value: "99 / 100", icon: FileCheck2 },
              { label: "Release cut-off", value: `${example.cutoff} / 100`, icon: ShieldCheck },
              { label: "Audit hash", value: "7aaa8b48…", icon: Layers },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-[#f0ebe6] px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#766d67]">
                  <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </p>
                <p className="mt-0.5 text-[14px] font-medium text-[#1f1a17]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Compact stand-in for the dashboard on phones: one contract card
export function MobileContractCard() {
  return (
    <div className="bg-white p-4 text-left">
      <p className="text-[11px] text-[#766d67]">{example.programme}</p>
      <p className="mt-1 text-xl font-medium tracking-tight text-[#1f1a17]">
        {example.milestones[0].amount} <span className="text-sm text-[#766d67]">of {example.committed}</span>
      </p>
      <ul className="mt-4 divide-y divide-[#f0ebe6] text-[13px]">
        {example.milestones.map((m) => (
          <li key={m.label} className="flex items-center justify-between gap-3 py-2">
            <span className="text-[#1f1a17]">{m.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                m.status === "Released" ? "bg-[#14B8A6]/15 text-[#0f766e]" : "bg-[#f15d22]/15 text-[#c4460f]"
              }`}
            >
              {m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
