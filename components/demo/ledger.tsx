import type { ReactNode } from "react"

// A hairline ledger with tabular mono figures: the artefact that says "fintech" on a
// screen that would otherwise be prose. Rows are plain data; the caller decides how
// many are visible so progressive reveal is a slice, not an animation library.
export type LedgerRow = { key: string; cells: ReactNode[]; tone?: "teal" | "orange" | "ink" | "muted" }

export function Ledger({
  columns,
  rows,
  align = [],
  dense = false,
  className = "",
  caption,
}: {
  columns: string[]
  rows: LedgerRow[]
  align?: ("left" | "right")[]
  dense?: boolean
  className?: string
  caption?: string
}) {
  const pad = dense ? "py-1.5" : "py-2.5"
  return (
    <div className={`overflow-x-auto rounded-2xl border border-[#ece7e2] bg-white ${className}`}>
      <table className="w-full border-collapse whitespace-nowrap text-[12.5px]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-[#f0ebe6] text-[12px] uppercase tracking-wider text-[#6f6660]">
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`px-4 ${pad} font-medium ${align[i] === "right" ? "text-right" : "text-left"}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0ebe6]">
          {rows.map((r) => {
            const tone =
              r.tone === "teal" ? "text-[#0f766e]" : r.tone === "orange" ? "text-[#c4460f]" : r.tone === "muted" ? "text-[#6f6660]" : "text-[#1f1a17]"
            return (
              <tr key={r.key} className={tone}>
                {r.cells.map((c, i) => (
                  <td key={i} className={`px-4 ${pad} font-mono tabular-nums ${align[i] === "right" ? "text-right" : "text-left"} ${i === 0 ? "font-sans" : ""}`}>
                    {c}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function Pill({ tone, children }: { tone: "teal" | "orange" | "ink" | "muted"; children: ReactNode }) {
  const cls =
    tone === "teal"
      ? "bg-[#14b8a6]/15 text-[#0f766e]"
      : tone === "orange"
        ? "bg-[#f15d22]/15 text-[#c4460f]"
        : tone === "muted"
          ? "bg-[#f5f1ed] text-[#6f6660]"
          : "bg-[#1f1a17]/8 text-[#1f1a17]"
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${cls}`}>{children}</span>
}
