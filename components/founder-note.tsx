import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site } from "@/lib/site"
import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"

// A face and a voice right after the mechanism (Maze / HubSpot pattern): the CEO's portrait
// beside his own line from the deck. A plain plate, so the linen still stays the closing
// band's alone. The whole block pulls up into place as it scrolls into view.
export function FounderNote() {
  return (
    <section id="founders" aria-labelledby="founder-note-title" className="relative !py-0">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Reveal y={56} className="relative overflow-hidden rounded-[32px] bg-[#f5f1ed] p-6 sm:p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-14 lg:grid-cols-[minmax(0,320px)_1fr]">
            <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-[24px] bg-[#fbfaf8] sm:w-48 md:w-full">
              <Image
                src={wasuProfile}
                alt={`${site.ceo.name}, ${site.ceo.title} of Sanafin`}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 192px"
                className="object-cover object-top"
              />
            </div>
            <div className="max-w-2xl md:py-6">
              <blockquote>
                <p id="founder-note-title" className="font-display text-2xl leading-snug text-balance text-[#1f1a17] sm:text-3xl md:text-[2.2rem] md:leading-[1.2]">
                  “Everyone has seen the demo that always says yes. We built the one that can say no.”
                </p>
                <footer className="mt-7 text-[15px] leading-relaxed text-[#574e48]">
                  <span className="block font-medium text-[#1f1a17]">{site.ceo.name}</span>
                  {site.ceo.title} · PhD in healthcare financing, ETH Zurich
                </footer>
              </blockquote>
              <Link
                href="#team"
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-[15px] text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"
              >
                Meet the team
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
