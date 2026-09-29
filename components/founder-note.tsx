import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"
import stagePhoto from "@/public/media/stage-sic.webp"

// A face and a voice right after the mechanism: a real photo of the CEO on stage and
// his own line from the deck.
export function FounderNote() {
  return (
    <section id="founders" aria-labelledby="founder-note-title" className="relative !py-0">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-[#f5f1ed] px-6 py-14 md:px-14 md:py-20">
          <Image
            src={stagePhoto}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="pointer-events-none object-cover object-[60%_45%] opacity-[0.3] saturate-[0.6]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f5f1ed_0%,rgba(245,241,237,0.92)_40%,rgba(245,241,237,0.2)_100%)]" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <blockquote>
              <p id="founder-note-title" className="font-serif text-2xl italic leading-snug text-[#1f1a17] sm:text-3xl md:text-[2.3rem]">
                “If the system cannot say no, its yes is worth nothing. Every buyer in this market has already seen a demo that
                only ever says yes.”
              </p>
              <footer className="mt-6 flex items-center gap-3 text-[14px] text-[#766d67]">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#ebe4db]">
                  <Image src={wasuProfile} alt="" fill sizes="40px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="text-[#1f1a17]">{site.ceo.name}</span>, {site.ceo.title} · on stage at the Swiss Innovation Challenge
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
