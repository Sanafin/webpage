"use client"

import { useEffect, useRef } from "react"

// The product's voice: a verification run's transcript, typed line by line. This is
// the one dark technical panel on the page. `shown` is how many lines are visible.
export function Terminal({ lines, shown, title = "sanafin verify · transcript", className = "" }: { lines: string[]; shown: number; title?: string; className?: string }) {
  const bodyRef = useRef<HTMLPreElement>(null)
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [shown])
  const visible = lines.slice(0, Math.max(0, Math.min(lines.length, shown)))
  const live = shown < lines.length
  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-3xl bg-[#1a1512] text-white shadow-[0_40px_100px_-50px_rgba(47,36,31,0.6)] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="font-mono text-[12px] text-white/45">{title}</span>
        <span className="flex items-center gap-2 font-mono text-[12px] text-white/45">
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#f15d22]" : "bg-[#5eead4]"}`} aria-hidden="true" />
          {live ? "running" : "complete"}
        </span>
      </div>
      <pre ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-auto px-5 py-4 font-mono text-[12px] leading-[1.65] text-white/85 [scrollbar-width:thin]" aria-live="off">
        {visible.map((l, i) => (
          <Line key={i} text={l} />
        ))}
        {live && <span className="inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] animate-pulse bg-[#5eead4]/80" aria-hidden="true" />}
      </pre>
    </div>
  )
}

function Line({ text }: { text: string }) {
  if (/^──/.test(text)) return <span className="block text-white/40">{text}</span>
  const kv = text.match(/^(\s{2}\S.*?\s{2,})(\S.*)$/)
  if (!kv) return <span className="block">{text || " "}</span>
  const [, label, value] = kv
  const tone = /meets_wzw|REIMBURSABLE|released|True|ok/.test(value)
    ? "text-[#5eead4]"
    : /insufficient|REJECTED|returned|False/.test(value)
      ? "text-[#ffab8a]"
      : "text-white/90"
  return (
    <span className="block">
      <span className="text-white/50">{label}</span>
      <span className={tone}>{value}</span>
    </span>
  )
}
