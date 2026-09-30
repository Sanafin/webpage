import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ClosingMedia } from "@/components/closing-media"
import { CTA } from "@/lib/site"

// Closing band: two equal cards, one per audience, on the still-life world.
export function CTASection() {
  return (
    <section id="contact" aria-labelledby="closing-title" className="relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#ebe4db]">
          <ClosingMedia />
          <div className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-r from-[#ebe4db] via-[#ebe4db]/80 to-[#ebe4db]/20" aria-hidden="true" />

          <div className="relative px-5 py-8 sm:px-8 md:px-12 md:py-16">
            <h2 id="closing-title" className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-[#1f1a17] mb-8 max-w-2xl">
              Fund the outcome, not the promise.
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:max-w-3xl">
              <div className="flex flex-col rounded-3xl bg-white/90 p-6 backdrop-blur">
                <p className="text-[13px] text-[#766d67] mb-2">Manufacturers, insurers, hospitals</p>
                <p className="flex-1 text-[17px] leading-snug text-[#1f1a17] mb-5">Design your first outcome-conditional contract in a 25-minute call.</p>
                <Link
                  href="/demo"
                  data-cta="book_call"
                  data-location="closing"
                  className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-[#f15d22] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(241,93,34,0.7)] transition-colors hover:bg-[#d94f18]"
                >
                  {CTA.buyer}
                </Link>
                <p className="mt-3 text-center text-[12px] text-[#766d67]">Reply within one working day · NDA on request</p>
              </div>

              <div className="flex flex-col rounded-3xl bg-white/90 p-6 backdrop-blur">
                <p className="text-[13px] text-[#766d67] mb-2">Investors</p>
                <p className="flex-1 text-[17px] leading-snug text-[#1f1a17] mb-5">Investing in Swiss digital health or fintech infrastructure?</p>
                <Link
                  href="#investors"
                  data-cta="request_deck"
                  data-location="closing"
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d]"
                >
                  {CTA.investor}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="mt-3 text-center text-[12px] text-[#766d67]">Sent personally by the CEO · view-only link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
