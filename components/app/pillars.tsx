import type { Scores } from "@/lib/demo/types"
import { verdictLabel } from "@/lib/demo/data"

const pillars: Array<{ key: keyof Omit<Scores, "composite" | "verdict">; label: string; sub: string }> = [
  { key: "wirksamkeit", label: "Wirksamkeit", sub: "effectiveness" },
  { key: "zweckmaessigkeit", label: "Zweckmässigkeit", sub: "appropriateness" },
  { key: "wirtschaftlichkeit", label: "Wirtschaftlichkeit", sub: "efficiency" },
]

// The three WZW pillars and the composite against the release cut-off.
export function Pillars({ scores, cutoff }: { scores: Scores; cutoff: number }) {
  const meets = scores.composite >= cutoff
  return (
    <div>
      <ul className="space-y-3">
        {pillars.map((p) => (
          <li key={p.key}>
            <div className="flex items-baseline justify-between text-[13px]">
              <span className="text-[#1f1a17]">
                {p.label} <span className="text-[#766d67]">· {p.sub}</span>
              </span>
              <span className="font-mono tabular-nums text-[#1f1a17]">{scores[p.key]} / 100</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#f5f1ed]">
              <span className="block h-full rounded-full bg-[#1f1a17]" style={{ width: `${scores[p.key]}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#ece7e2] pt-4">
        <div>
          <p className="text-[12.5px] text-[#766d67]">Composite · cut-off {cutoff}</p>
          <p className={`mt-1 font-mono text-[30px] leading-none tabular-nums ${meets ? "text-[#0f766e]" : "text-[#1f1a17]"}`}>
            {scores.composite}
            <span className="text-[16px] text-[#766d67]"> / 100</span>
          </p>
        </div>
        <p className={`font-mono text-[13px] ${meets ? "text-[#0f766e]" : "text-[#766d67]"}`}>{verdictLabel(scores.verdict)}</p>
      </div>
    </div>
  )
}
