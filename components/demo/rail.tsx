"use client"

import { Pause, Play, RotateCcw } from "lucide-react"

// The player's controls: play/pause/replay, one progress bar per act, step counter.
export function Rail({
  acts,
  act,
  t,
  playing,
  finished,
  onToggle,
  onGoTo,
}: {
  acts: readonly { id: string; number: string; label: string }[]
  act: number
  t: number
  playing: boolean
  finished: boolean
  onToggle: () => void
  onGoTo: (i: number, resume?: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#ece7e2] bg-white/70 px-4 py-3 sm:px-6">
      <button
        type="button"
        onClick={onToggle}
        aria-label={finished ? "Replay" : playing ? "Pause" : "Play"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f1a17] text-white transition-colors hover:bg-[#3a322d]"
      >
        {finished ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : playing ? <Pause className="h-4 w-4 fill-current" aria-hidden="true" /> : <Play className="h-4 w-4 fill-current" aria-hidden="true" />}
      </button>
      <ol className="grid flex-1 grid-cols-4 gap-2" aria-label="Steps">
        {acts.map((a, i) => {
          const done = i < act
          const active = i === act
          const fill = done ? 1 : active ? t : 0
          return (
            <li key={a.id}>
              <button type="button" onClick={() => onGoTo(i, true)} aria-current={active ? "step" : undefined} className="group block w-full text-left">
                <span className={`flex items-baseline gap-1.5 text-[12px] sm:text-[13px] ${active ? "font-medium text-[#1f1a17]" : done ? "text-[#1f1a17]/70 group-hover:text-[#1f1a17]" : "text-[#766d67] group-hover:text-[#1f1a17]"}`}>
                  <span className="hidden font-mono text-[11px] font-normal sm:inline">{a.number}</span>
                  <span className="truncate">{a.label}</span>
                </span>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[#e9e4df]">
                  <span className="block h-full rounded-full bg-[#1f1a17]" style={{ width: `${fill * 100}%` }} />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <span className="hidden shrink-0 font-mono text-[11px] text-[#766d67] lg:inline">
        {act + 1} / {acts.length} · ← → to step
      </span>
    </div>
  )
}
