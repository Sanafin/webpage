import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { publications } from "@/lib/research"
import { Words, Zoom } from "@/components/fx"
import { Reveal } from "@/components/reveal"

import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"
import anejProfile from "@/components/ui/profiles/anej_profile.webp"
import djataProfile from "@/components/ui/profiles/djata_profile.webp"
import ajinthaProfile from "@/components/ui/profiles/ajintha_profile.webp"
import niklausProfile from "@/components/ui/profiles/niklaus_profile.webp"

// Why this team: one line of founder-market fit, three people with one checkable
// credential each, advisors as equal rows, and the research the
// product is built on. Institutions are affiliations, not endorsements. Portraits
// ease out of a slight zoom as the row appears; advisors follow one by one.

const team = [
  {
    name: "Dr. Wasu Mekniran",
    title: "CEO",
    credential: "PhD healthcare financing · **ETH Zurich**",
    photo: wasuProfile,
    linkedin: "https://www.linkedin.com/in/wasumekniran/",
  },
  {
    name: "Anej Rozman",
    title: "Quantitative Scientist",
    credential: "MSc Quant Finance · **UZH / ETH**",
    photo: anejProfile,
    linkedin: "https://www.linkedin.com/in/anej-rozman/",
  },
  {
    name: "Djata Sigam",
    title: "Software Engineer",
    credential: "MSc Maths · **Imperial**, **ETH** · 8 yrs fintech",
    photo: djataProfile,
    linkedin: "https://www.linkedin.com/in/djata-s-478631134/",
  },
]

const advisors = [
  {
    name: "Dr. Ajintha Pathmanathan",
    role: "Clinical advisor",
    facts: ["MD, MPH", "20+ years of medical leadership across UK, US and Australian systems"],
    photo: ajinthaProfile,
    linkedin: "https://www.linkedin.com/in/ajintha-p-02177750/",
  },
  {
    name: "Niklaus Neddermann",
    role: "Financial advisor",
    facts: ["CEO of a FINMA-licensed asset manager", "Formerly **Julius Bär** and the **Swiss National Bank**"],
    photo: niklausProfile,
    linkedin: "https://www.linkedin.com/in/nneddermann/",
  },
  {
    name: "Prof. Dr. Thomas Giroux",
    role: "Academic advisor",
    facts: ["Professor for Sustainable Finance, D-MTEC, **ETH Zurich**"],
  },
]

// Institutions in **bold** (Linear pattern), so the credentials scan at a glance.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-medium text-[#1f1a17]">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

// Where the team and advisors trained and worked: set as quiet monotone wordmarks
// (small caps, letter-spaced, one grey), never the institutions' own logos, so
// nothing reads as an endorsement.
const institutions = ["ETH Zurich", "HSG", "UZH", "Imperial College London", "HOCH", "Julius Bär", "Swiss National Bank"]

export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] text-[#6f6660] mb-4">Why this team</p>
            <h2 id="team-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17]">
              <Words text="We researched why payers don't pay for outcomes. Then we built Sanafin." />
            </h2>
          </div>
          <p className="max-w-md text-[15px] sm:text-base leading-relaxed text-[#574e48] lg:pb-2">
            Health economics, medicine and financial engineering from <strong className="font-medium text-[#1f1a17]">ETH Zurich</strong>,{" "}
            <strong className="font-medium text-[#1f1a17]">HSG</strong> and <strong className="font-medium text-[#1f1a17]">Imperial</strong>.{" "}
            <Link href="/eden-framework" className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
              {publications.length} publications
            </Link>{" "}
            stand behind the model.
          </p>
        </div>

        {/* Core team */}
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {team.map((person, i) => (
            <Reveal as="li" key={person.name} delay={i * 0.1} className="flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#ebe4db]">
                <Zoom className="absolute inset-0" delay={i * 0.1}>
                  <Image
                    src={person.photo}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </Zoom>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#1f1a17]/85 text-white backdrop-blur transition-colors hover:bg-[#0a66c2]"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <h3 className="font-display text-lg sm:text-xl text-[#1f1a17] leading-tight">{person.name}</h3>
                <p className="text-[13px] text-[#0f766e] mt-0.5 mb-2">{person.title}</p>
                <p className="text-[13px] leading-snug text-[#6f6660]">
                  <Rich text={person.credential} />
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Advisors */}
        <div className="mt-10">
          <p className="text-[13px] text-[#6f6660] mb-3">Advisory board</p>
          <ul className="divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
            {advisors.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 0.08} className="grid gap-2 py-4 sm:grid-cols-[16rem_1fr_auto] sm:items-center sm:gap-6">
                <div className="flex items-center gap-3">
                  {a.photo ? (
                    <span className="relative h-10 w-10 overflow-hidden rounded-full bg-[#ebe4db]">
                      <Image src={a.photo} alt="" fill sizes="40px" className="object-cover object-top" />
                    </span>
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe4db] text-[13px] font-medium text-[#6f6660]" aria-hidden="true">
                      {a.name.split(" ").slice(-1)[0][0]}
                    </span>
                  )}
                  <div>
                    <p className="text-[15px] font-medium leading-tight text-[#1f1a17]">{a.name}</p>
                    <p className="text-[12px] text-[#0f766e]">{a.role}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-[#6f6660]">
                  {a.facts.map((f) => (
                    <li key={f}>
                      <Rich text={f} />
                    </li>
                  ))}
                </ul>
                {a.linkedin ? (
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e4df] text-[#6f6660] hover:text-[#1f1a17]"
                    aria-label={`${a.name} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="hidden sm:block h-9 w-9" aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Where the team trained and worked */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-[12px] text-[#6f6660]">Team and advisors trained and worked at</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:gap-x-0">
            {institutions.map((name, i) => (
              <li key={name} className="flex items-center">
                {i > 0 && <span className="mx-4 hidden h-4 w-px bg-[#d9d1ca] lg:block" aria-hidden="true" />}
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6f6660] sm:text-[13px]">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
