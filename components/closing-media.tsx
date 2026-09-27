"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { Pause, Play } from "lucide-react"
import { media } from "@/lib/media"

// Background of the closing band: the 6-second still-life loop when it exists,
// otherwise the still. Plays only in view, never with reduced motion.
export function ClosingMedia() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: "-80px" })
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const useLoop = Boolean(media.closingLoop) && !reduce

  useEffect(() => {
    const v = videoRef.current
    if (!v || !useLoop || paused) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView, useLoop, paused])

  return (
    <div ref={ref} className="md:absolute md:inset-0" aria-hidden={useLoop ? undefined : true}>
      {useLoop ? (
        <>
          <video
            ref={videoRef}
            className="hidden md:block h-full w-full object-cover object-[70%_center]"
            src={media.closingLoop ?? undefined}
            poster={media.closingStill ?? undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-label="A brass balance scale with a teal marble in one pan, on cream linen, in soft daylight"
          />
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current
              if (!v) return
              if (paused) {
                setPaused(false)
                v.play().catch(() => {})
              } else {
                setPaused(true)
                v.pause()
              }
            }}
            aria-pressed={paused}
            aria-label={paused ? "Play background" : "Pause background"}
            className="absolute right-4 top-4 z-10 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#1f1a17] backdrop-blur hover:bg-white"
          >
            {paused ? <Play className="h-4 w-4 fill-current" aria-hidden="true" /> : <Pause className="h-4 w-4 fill-current" aria-hidden="true" />}
          </button>
        </>
      ) : media.closingStill ? (
        <img
          src={media.closingStill}
          alt=""
          className="hidden md:block h-full w-full object-cover object-[70%_center]"
          loading="lazy"
        />
      ) : (
        <div className="hidden md:block h-full w-full bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,#ffd9c4_0%,#f5f1ed_55%,#fbfaf8_100%)]" />
      )}
      {media.closingStillMobile && (
        <img
          src={media.closingStillMobile}
          alt=""
          className="block w-full aspect-[16/10] object-cover md:hidden"
          loading="lazy"
        />
      )}
    </div>
  )
}
