export function StatTile({ label, value, meta, tone = "ink" }: { label: string; value: string; meta?: string; tone?: "ink" | "teal" }) {
  return (
    <div className="rounded-2xl border border-[#ece7e2] bg-white px-5 py-4">
      <p className="text-[12.5px] text-[#766d67]">{label}</p>
      <p className={`mt-1.5 font-mono text-[26px] leading-none tabular-nums tracking-tight ${tone === "teal" ? "text-[#0f766e]" : "text-[#1f1a17]"}`}>{value}</p>
      {meta && <p className="mt-2 text-[12px] text-[#766d67]">{meta}</p>}
    </div>
  )
}

// Definition list in the ledger style: muted label, mono value.
export function KV({ rows, className = "" }: { rows: Array<[string, React.ReactNode]>; className?: string }) {
  return (
    <dl className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 text-[13px] ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-[#766d67]">{k}</dt>
          <dd className="text-right font-mono tabular-nums text-[#1f1a17]">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
