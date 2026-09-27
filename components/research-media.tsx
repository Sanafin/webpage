"use client"

import { useEffect, useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { media } from "@/lib/media"

// Faint backdrop of the milestones card: the 6-second research loop when it exists,
// otherwise the still. Decorative, plays only in view, never with reduced motion.
export function ResearchMedia() {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  const useLoop = Boolean(media.researchLoop) && !reduce

  useEffect(() => {
    const v = ref.current
    if (!v || !useLoop) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView, useLoop])

  if (!media.researchStill && !media.researchLoop) return null

  const cls = "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
  if (!useLoop) return <img src={media.researchStill ?? undefined} alt="" className={cls} loading="lazy" />
  return (
    <video ref={ref} className={cls} src={media.researchLoop ?? undefined} poster={media.researchStill ?? undefined} muted loop playsInline preload="none" aria-hidden="true" />
  )
}
