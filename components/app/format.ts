// Display helpers for the app shell. Dates are shown in UTC because the pipeline
// stamps its audit events in UTC.
export function fmtDateTime(iso: string | null | undefined) {
  if (!iso) return "—"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return (
    new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(d) + " UTC"
  )
}

export function fmtDate(iso: string | null | undefined) {
  if (!iso) return "—"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(d)
}

export const pct = (n: number | null | undefined, d = 0) => (n === null || n === undefined ? "—" : `${n.toFixed(d)} %`)
export const num = (n: number | null | undefined, d = 0) =>
  n === null || n === undefined ? "—" : new Intl.NumberFormat("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n)
export const signed = (n: number, d = 2) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(d)}`

// Table header style shared by every ledger in the shell: small mono caps, like the
// column heads of a bank statement. Pass it as the TableHead className prefix.
export const th = "h-11 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-[#766d67] "
