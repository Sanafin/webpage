"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Play } from "lucide-react"
import { CTA } from "@/lib/site"

// The CTA trio. `?for=investors` (used in founder outreach links) swaps the
// secondary pill to the deck request so investors see their path first.
function Ctas() {
  const params = useSearchParams()
  const investorFirst = params.get("for") === "investors"

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <Link
          href="/demo"
          data-cta="book_call"
          data-location="hero"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f15d22] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(241,93,34,0.7)] transition-colors hover:bg-[#d94f18]"
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
          <Link
            href="#how"
            data-cta="watch_film"
            data-location="hero"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f1ece7] px-6 py-2.5 text-[15px] font-medium text-[#1f1a17] transition-colors hover:bg-[#e9e2db]"
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            See how it works · 8 s
          </Link>
        )}
      </div>
      <p className="mt-4 text-[13px] text-[#766d67]">
        {investorFirst ? (
          <Link href="#how" className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
            See how it works in 8 seconds →
          </Link>
        ) : (
          <>
            Investor?{" "}
            <Link
              href="#investors"
              data-cta="request_deck"
              data-location="hero-tertiary"
              className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"
            >
              {CTA.investor} →
            </Link>
          </>
        )}
      </p>
    </>
  )
}

export function HeroCtas() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <span className="inline-flex min-h-11 items-center rounded-full bg-[#f15d22] px-6 py-2.5 text-[15px] font-medium text-white">{CTA.buyer}</span>
        </div>
      }
    >
      <Ctas />
    </Suspense>
  )
}
