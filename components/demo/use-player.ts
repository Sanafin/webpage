"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { useInView } from "framer-motion"

// The engine behind both players: one progress value t in [0, 1] per act, advanced by
// requestAnimationFrame while playing. Autoplay starts once, when the stage first
// scrolls into view. Under reduced motion t is pinned to 1 and nothing autoplays.
export function usePlayer(
  acts: readonly { seconds: number }[],
  stageRef: RefObject<HTMLElement | null>,
  reduce: boolean,
  { loop = false }: { loop?: boolean } = {},
) {
  const inView = useInView(stageRef, { margin: "-20% 0px -20% 0px" })
  const [act, setAct] = useState(0)
  const [t, setT] = useState(reduce ? 1 : 0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (reduce) return
    // A looping player simply runs while on screen; a one-shot player starts once.
    if (loop) {
      setPlaying(inView)
      return
    }
    if (inView && !started) {
      setStarted(true)
      setPlaying(true)
    }
  }, [inView, started, reduce, loop])

  const frame = useRef<number | null>(null)
  const last = useRef<number | null>(null)
  useEffect(() => {
    if (!playing) {
      last.current = null
      return
    }
    const tick = (now: number) => {
      const dt = last.current === null ? 0 : (now - last.current) / 1000
      last.current = now
      setT((prev) => {
        const next = prev + dt / acts[act].seconds
        if (next < 1) return next
        if (act < acts.length - 1) {
          setAct(act + 1)
          return 0
        }
        if (loop) {
          setAct(0)
          return 0
        }
        setPlaying(false)
        setFinished(true)
        return 1
      })
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [playing, act, acts, loop])

  const goTo = useCallback(
    (i: number, resume?: boolean) => {
      const next = Math.max(0, Math.min(acts.length - 1, i))
      setAct(next)
      setT(reduce ? 1 : 0)
      setFinished(false)
      setStarted(true)
      if (!reduce) setPlaying(resume ?? playing)
    },
    [acts.length, playing, reduce],
  )

  // Open an act at its final frame, paused (deep links).
  const open = useCallback((i: number) => {
    setAct(i)
    setT(1)
    setStarted(true)
    setPlaying(false)
    setFinished(false)
  }, [])

  // Replay the current act from the start without changing play state.
  const restart = useCallback(() => {
    setT(reduce ? 1 : 0)
    setFinished(false)
  }, [reduce])

  const togglePlay = useCallback(() => {
    if (finished) {
      goTo(0, true)
      return
    }
    setStarted(true)
    setPlaying((p) => !p)
  }, [finished, goTo])

  // Arrow keys step only while the frame is on screen, so they never hijack the
  // rest of a page the frame is embedded in.
  useEffect(() => {
    if (!inView) return
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      if (e.key === "ArrowRight") goTo(act + 1)
      if (e.key === "ArrowLeft") goTo(act - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [act, goTo, inView])

  return { act, t: reduce ? 1 : t, playing, finished, goTo, open, restart, togglePlay }
}
