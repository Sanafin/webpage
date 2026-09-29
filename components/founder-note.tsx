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
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="grid items-center gap-8 border-y border-[#ece7e2] py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:py-16">
          <figure className="relative overflow-hidden rounded-3xl bg-[#ebe4db]">
            <Image
              src={stagePhoto}
              alt={`${site.ceo.name} presenting Sanafin on stage at the Swiss Innovation Challenge`}
              width={1400}
              height={1575}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover object-[60%_center] md:aspect-[5/4]"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-[#1f1a17] backdrop-blur">
              Swiss Innovation Challenge, on stage
            </figcaption>
          </figure>
          <div>
            <blockquote>
              <p id="founder-note-title" className="font-serif text-2xl italic leading-snug text-[#1f1a17] sm:text-3xl md:text-[2.1rem]">
                “If the system cannot say no, its yes is worth nothing. Every buyer in this market has already seen a demo that
                only ever says yes.”
              </p>
              <footer className="mt-5 flex items-center gap-3 text-[14px] text-[#766d67]">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#ebe4db]">
                  <Image src={wasuProfile} alt="" fill sizes="36px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="text-[#1f1a17]">{site.ceo.name}</span>, {site.ceo.title} · PhD in healthcare financing, ETH Zurich
                </span>
              </footer>
            </blockquote>
            <Link
              href="#team"
              className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"
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
