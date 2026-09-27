import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"

// A face and a voice right after the mechanism: the CEO's own line from the deck.
export function FounderNote() {
  return (
    <section id="founders" aria-labelledby="founder-note-title" className="relative !py-0">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="grid items-center gap-8 border-y border-[#ece7e2] py-12 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-16">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#ebe4db] md:h-32 md:w-32">
            <Image src={wasuProfile} alt={site.ceo.name} fill sizes="128px" className="object-cover object-top" />
          </div>
          <blockquote>
            <p id="founder-note-title" className="font-serif text-2xl italic leading-snug text-[#1f1a17] sm:text-3xl md:text-[2.1rem]">
              “If the system cannot say no, its yes is worth nothing. Every buyer in this market has already seen a demo that
              only ever says yes.”
            </p>
            <footer className="mt-4 text-[14px] text-[#766d67]">
              <span className="text-[#1f1a17]">{site.ceo.name}</span>, {site.ceo.title} · PhD in healthcare financing, ETH Zurich
            </footer>
          </blockquote>
          <Link
            href="#team"
            className="inline-flex shrink-0 items-center gap-1.5 text-[14px] text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"
          >
            Meet the team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
