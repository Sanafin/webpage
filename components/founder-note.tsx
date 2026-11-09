import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FilmBand } from "@/components/film-band"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"

// A face and a voice right after the mechanism: the CEO's own line from the deck over
// the marble-run film, which plays with the scroll on desktop and is a still on phones.
export function FounderNote() {
  return (
    <section id="founders" aria-labelledby="founder-note-title" className="relative !py-0">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <FilmBand>
            <blockquote>
              <p id="founder-note-title" className="font-display text-2xl leading-snug text-[#1f1a17] sm:text-3xl md:text-[2.3rem]">
                “Everyone has seen the demo that always says yes. We built the one that can say no.”
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
        </FilmBand>
      </div>
    </section>
  )
}
