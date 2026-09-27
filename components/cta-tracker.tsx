"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

// One listener for the whole page: clicks on [data-cta], first view of each
// [id] section, and custom events dispatched by forms.
export function CtaTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]")
      if (!el) return
      track("cta_click", {
        cta: el.dataset.cta,
        location: el.dataset.location,
        audience: el.dataset.audience,
      })
    }
    function onCustom(e: Event) {
      const { name, props } = (e as CustomEvent<{ name: string; props?: Record<string, string> }>).detail ?? {}
      if (name) track(name, props)
    }
    document.addEventListener("click", onClick)
    window.addEventListener("sanafin:track", onCustom)

    const seen = new Set<string>()
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id)
            track("section_view", { section: id })
          }
        }
      },
      { threshold: 0.4 },
    )
    sections.forEach((s) => io.observe(s))

    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("sanafin:track", onCustom)
      io.disconnect()
    }
  }, [])
  return null
}
