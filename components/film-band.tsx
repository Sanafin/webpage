"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { media } from "@/lib/media"

// A pinned band whose film plays forward and back with the visitor's scroll. The
// quote sits on the linen at the left while the marble run resolves on the right.
// Phones and reduced-motion visitors get the poster frame and the same copy, so
// nothing is lost without the film.
export function FilmBand({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [desktop, setDesktop] = useState(false)
  const [ready, setReady] = useState(false)
  const pending = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const scrub = Boolean(media.filmScrub) && desktop && !reduce
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Seeks are coalesced to one per animation frame so fast scrolling never queues
  // more seeks than the decoder can serve.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current
    if (!scrub || !v || !Number.isFinite(v.duration)) return
    if (pending.current !== null) return
    pending.current = requestAnimationFrame(() => {
      pending.current = null
      const t = Math.min(v.duration - 0.05, Math.max(0, p * v.duration))
      if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t
    })
  })

  useEffect(() => () => { if (pending.current !== null) cancelAnimationFrame(pending.current) }, [])

  // Copy fades in over the opening frames and holds.
  const copyOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.18], [24, 0])

  // The scroll target must be mounted in both branches, or useScroll has nothing to
  // measure before the viewport check resolves.
  if (!scrub) {
    return (
      <div ref={ref} className="relative overflow-hidden rounded-[32px] bg-[#f5f1ed] px-6 py-14 md:px-14 md:py-20">
        <img
          src={media.filmScrubPoster ?? media.closingStill ?? undefined}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[80%_center] opacity-90"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f5f1ed_0%,rgba(245,241,237,0.96)_45%,rgba(245,241,237,0.55)_100%)]" aria-hidden="true" />
        <div className="relative max-w-3xl">{children}</div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="relative h-[min(78vh,760px)] overflow-hidden rounded-[32px] bg-[#f5f1ed]">
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover object-[88%_center] transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
              src={media.filmScrub ?? undefined}
              poster={media.filmScrubPoster ?? undefined}
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setReady(true)}
              aria-label="A marble run on cream linen: a teal marble is checked at a brass gate, then an amber marble rolls to the front"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f5f1ed_0%,rgba(245,241,237,0.94)_34%,rgba(245,241,237,0.5)_56%,rgba(245,241,237,0)_82%)]" aria-hidden="true" />
            <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative flex h-full max-w-[36rem] flex-col justify-center px-10 lg:max-w-[40rem] lg:px-14">
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
