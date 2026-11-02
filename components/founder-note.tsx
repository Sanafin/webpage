import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"

// A face and a voice right after the mechanism: the CEO's own line from the deck on the
// linen still, so the world stays consistent.
export function FounderNote() {
  return (
    <section id="founders" aria-labelledby="founder-note-title" className="relative !py-0">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-[#f5f1ed] px-6 py-14 md:px-14 md:py-20">
          <img
            src="/media/closing-still.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[80%_center] opacity-90"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f5f1ed_0%,rgba(245,241,237,0.96)_45%,rgba(245,241,237,0.55)_100%)]" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <blockquote>
              <p id="founder-note-title" className="font-display text-2xl leading-snug text-[#1f1a17] sm:text-3xl md:text-[2.3rem]">
                “If the system cannot say no, its yes is worth nothing. Every buyer in this market has already seen a demo that
                only ever says yes.”
              </p>
              <footer className="mt-6 flex items-center gap-3 text-[14px] text-[#766d67]">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#ebe4db]">
                  <Image src={wasuProfile} alt="" fill sizes="40px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="text-[#1f1a17]">{site.ceo.name}</span>, {site.ceo.title} · PhD in healthcare financing, ETH Zurich
                </span>
              </footer>
            </blockquote>
            <Link
              href="#team"
              className="mt-7 inline-flex items-center gap-1.5 text-[14px] text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"
            >
              Meet the team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
