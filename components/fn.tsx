import { ArrowUpRight } from "lucide-react"
import { getSource, sourceNumber, sources } from "@/lib/sources"

// Footnote superscript. Every figure in copy carries one of these, or an explicit
// "Sanafin estimate" / "illustrative" label.
export function Fn({ id, className = "" }: { id: string; className?: string }) {
  const n = sourceNumber(id)
  const s = getSource(id)
  return (
    <sup className={`ml-0.5 align-super text-[0.42em] font-medium leading-none ${className}`}>
      <a
        href={`#src-${n}`}
        aria-label={`Source ${n}: ${s.label}`}
        className="rounded-sm text-[#c4460f] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14b8a6]"
      >
        {n}
      </a>
    </sup>
  )
}

// The numbered list in the footer. Same array, same order as the superscripts.
export function SourcesList() {
  return (
    <ol className="grid gap-x-10 gap-y-3 text-[12.5px] leading-relaxed text-[#766d67] md:grid-cols-2">
      {sources.map((s, i) => (
        <li key={s.id} id={`src-${i + 1}`} className="flex gap-2.5 scroll-mt-28">
          <span className="w-5 shrink-0 tabular-nums text-[#1f1a17]">{i + 1}.</span>
          <span>
            {s.label}
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1.5 inline-flex items-center gap-0.5 text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-2 hover:decoration-[#1f1a17]"
              >
                Source
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  )
}
