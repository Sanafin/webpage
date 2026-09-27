import { ShieldCheck } from "lucide-react"

// Sanafin's signature artefact: the verification certificate a payer can re-compute
// from the exported file. Synthetic values; every surface that shows it says so.
export function Certificate({
  verdict = "meets_wzw",
  composite = 99,
  cutoff = 75,
  hash = "7aaa8b48615906e0",
  recomputed = "7aaa8b48615906e0",
  tone = "light",
  className = "",
}: {
  verdict?: string
  composite?: number
  cutoff?: number
  hash?: string
  recomputed?: string
  tone?: "light" | "dark"
  className?: string
}) {
  const matches = hash === recomputed
  const dark = tone === "dark"
  return (
    <div
      className={`rounded-2xl border font-mono text-[12px] leading-relaxed ${
        dark ? "border-white/10 bg-white/[0.04] text-white/85" : "border-[#ece7e2] bg-white text-[#1f1a17]"
      } ${className}`}
    >
      <div className={`flex items-center justify-between gap-3 border-b px-4 py-2.5 ${dark ? "border-white/10" : "border-[#f0ebe6]"}`}>
        <span className="inline-flex items-center gap-2 font-sans text-[12px] font-medium">
          <ShieldCheck className={`h-3.5 w-3.5 ${dark ? "text-[#5eead4]" : "text-[#0f766e]"}`} aria-hidden="true" />
          Verification certificate
        </span>
        <span className={`shrink-0 text-[10.5px] uppercase tracking-wider ${dark ? "text-white/45" : "text-[#766d67]"}`}>synthetic</span>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-3">
        <dt className={dark ? "text-white/45" : "text-[#766d67]"}>verdict</dt>
        <dd className={dark ? "text-[#5eead4]" : "text-[#0f766e]"}>{verdict}</dd>
        <dt className={dark ? "text-white/45" : "text-[#766d67]"}>composite</dt>
        <dd className="tabular-nums">
          {composite} / 100 <span className={dark ? "text-white/45" : "text-[#766d67]"}>cutoff {cutoff}</span>
        </dd>
        <dt className={dark ? "text-white/45" : "text-[#766d67]"}>certificate</dt>
        <dd className="truncate">{hash.slice(0, 12)}…</dd>
        <dt className={dark ? "text-white/45" : "text-[#766d67]"}>recomputed</dt>
        <dd className={`truncate ${matches ? "" : dark ? "text-[#ffab8a]" : "text-[#c4460f]"}`}>
          {recomputed.slice(0, 12)}… {matches ? "· match" : "· mismatch"}
        </dd>
      </dl>
    </div>
  )
}
