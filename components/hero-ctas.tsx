"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Play } from "lucide-react"
import { CTA, studio } from "@/lib/site"

// The CTA trio. `?for=investors` (used in founder outreach links) swaps the
// secondary pill to the deck request so investors see their path first.
function Ctas() {
  const params = useSearchParams()
  const investorFirst = params.get("for") === "investors"

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <Link
          href="/call"
          data-cta="book_call"
          data-location="hero"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d1480f] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(209,72,15,0.55)] transition-colors hover:bg-[#b23d0c]"
        >
          {CTA.buyer}
        </Link>
        {investorFirst ? (
          <Link
            href="#investors"
            data-cta="request_deck"
            data-location="hero"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
          >
            {CTA.investor}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <a
            href={studio.start}
            data-cta="try_studio"
            data-location="hero"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
          >
            {CTA.studio}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
      <Link
        href="#how"
        data-cta="watch_film"
        data-location="hero"
        className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#6f6660] underline decoration-[#d9d1ca] underline-offset-4 hover:text-[#1f1a17]"
      >
        <Play className="h-3 w-3 fill-current" aria-hidden="true" />
        See how it works · 32 s
      </Link>
    </>
  )
}

export function HeroCtas() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <span className="inline-flex min-h-11 items-center rounded-full bg-[#d1480f] px-6 py-2.5 text-[15px] font-medium text-white">{CTA.buyer}</span>
        </div>
      }
    >
      <Ctas />
    </Suspense>
  )
}
