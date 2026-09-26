import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Linkedin } from "lucide-react"
import { media } from "@/lib/media"
import { milestones, publications } from "@/lib/research"

import wasuProfile from "@/components/ui/profiles/wasu_profile.webp"
import susanProfile from "@/components/ui/profiles/susan_profile.webp"
import anejProfile from "@/components/ui/profiles/anej_profile.webp"
import djataProfile from "@/components/ui/profiles/djata_profile.webp"
import ajinthaProfile from "@/components/ui/profiles/ajintha_profile.webp"
import niklausProfile from "@/components/ui/profiles/niklaus_profile.webp"

// Why this team: one line of founder-market fit, four people with what they own
// and one checkable credential each, advisors as equal rows, and the research the
// product is built on. Institutions are affiliations, not endorsements.

const team = [
  {
    name: "Wasu Mekniran",
    title: "CEO",
    owns: "Owns the verification model and the payer conversations.",
    credential: "PhD in healthcare financing, ETH Zurich · MBA · researcher at HSG · first author on the EDEN papers",
    photo: wasuProfile,
    linkedin: "https://www.linkedin.com/in/wasumekniran/",
  },
  {
    name: "Djata Sigam",
    title: "CTO",
    owns: "Owns Outcome Studio, the audit chain and settlement.",
    credential: "MSc Mathematics, Imperial College London & ETH Zurich · 8+ years building fintech software",
    photo: djataProfile,
    linkedin: "https://www.linkedin.com/in/djata-s-478631134/",
  },
  {
    name: "Susanne Oudbier",
    title: "Medical Officer",
    owns: "Owns outcome definitions and clinical sign-off.",
    credential: "MD PhD · resident physician at HOCH Ostschweiz",
    photo: susanProfile,
    linkedin: "https://www.linkedin.com/in/susanoudbier/",
  },
  {
    name: "Anej Rozman",
    title: "Quantitative Scientist",
    owns: "Owns the risk and health-economic models.",
    credential: "MSc Quantitative Finance, UZH/ETH",
    photo: anejProfile,
    linkedin: "https://www.linkedin.com/in/anej-rozman/",
  },
]

const advisors = [
  {
    name: "Ajintha Pathmanathan",
    role: "Clinical advisor",
    facts: ["Dr. med., MPH", "20+ years of medical leadership across UK, US and Australian systems"],
    photo: ajinthaProfile,
    linkedin: "https://www.linkedin.com/in/ajintha-p-02177750/",
  },
  {
    name: "Niklaus Neddermann",
    role: "Financial advisor",
    facts: ["CEO of a FINMA-licensed asset manager", "Formerly Julius Bär and the Swiss National Bank"],
    photo: niklausProfile,
    linkedin: "https://www.linkedin.com/in/nneddermann/",
  },
  {
    name: "Prof. Dr. Thomas Giroux",
    role: "Academic advisor",
    facts: ["Professor for Sustainable Finance, D-MTEC, ETH Zurich"],
  },
]

export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <p className="text-[13px] font-medium text-[#c4460f] mb-4">Why this team</p>
            <h2 id="team-title" className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-[#1f1a17]">
              Four years researching why outcome-based payment stalls. Then we built the tool.
            </h2>
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#766d67] lg:pb-2">
            Health economics, clinical outcomes and financial engineering in one team, with eight publications behind
            the incentive model, the risk structures and the health economics.
          </p>
        </div>

        {/* Core team */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((person) => (
            <li key={person.name} className="flex flex-col rounded-3xl bg-[#f5f1ed] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#ebe4db]">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top"
                />
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f1a17]/85 text-white backdrop-blur transition-colors hover:bg-[#0a66c2]"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                <h3 className="font-display text-lg sm:text-xl text-[#1f1a17] leading-tight">{person.name}</h3>
                <p className="text-[13px] text-[#0f766e] mt-0.5 mb-3">{person.title}</p>
                <p className="text-[14px] leading-snug text-[#1f1a17] mb-2">{person.owns}</p>
                <p className="text-[12.5px] leading-snug text-[#766d67]">{person.credential}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Advisors */}
        <div className="mt-10">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#766d67] mb-3">Advisory board</p>
          <ul className="divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
            {advisors.map((a) => (
              <li key={a.name} className="grid gap-2 py-4 sm:grid-cols-[16rem_1fr_auto] sm:items-center sm:gap-6">
                <div className="flex items-center gap-3">
                  {a.photo ? (
                    <span className="relative h-10 w-10 overflow-hidden rounded-full bg-[#ebe4db]">
                      <Image src={a.photo} alt="" fill sizes="40px" className="object-cover object-top" />
                    </span>
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe4db] text-[13px] font-medium text-[#766d67]" aria-hidden="true">
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
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {a.linkedin ? (
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e4df] text-[#766d67] hover:text-[#1f1a17]"
                    aria-label={`${a.name} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="hidden sm:block h-9 w-9" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Research + milestones */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-[#ece7e2] bg-white p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#766d67] mb-1">Selected research</p>
                <p className="font-display text-2xl text-[#1f1a17]">{publications.length} publications, CEO first author</p>
              </div>
              <Link href="/eden-framework" className="hidden sm:inline-flex items-center gap-1 text-[13px] text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
                EDEN framework
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <ol className="divide-y divide-[#f0ebe6]">
              {publications.slice(0, 5).map((p) => (
                <li key={p.doi} className="grid gap-1 py-3 sm:grid-cols-[3.5rem_1fr_auto] sm:items-baseline sm:gap-4">
                  <span className="font-mono text-[12px] text-[#766d67]">{p.year}</span>
                  <span>
                    <span className="block text-[14px] leading-snug text-[#1f1a17]">{p.title}</span>
                    <span className="block text-[12px] text-[#766d67]">
                      {p.authors}
                      {p.venue ? ` · ${p.venue}` : ""}
                    </span>
                  </span>
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-mono text-[11px] text-[#766d67] hover:text-[#1f1a17]"
                    aria-label={`DOI ${p.doi}`}
                  >
                    DOI
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[12px] leading-relaxed text-[#766d67]">
              Research carried out by the founding team at ETH Zurich, the University of St. Gallen and HOCH Ostschweiz.
              Institutions do not endorse Sanafin.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#1f1a17] p-7 text-white">
            {media.researchStill && (
              <img src={media.researchStill} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
            )}
            <div className="relative">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/60 mb-5">Milestones</p>
              <ol className="space-y-4">
                {milestones.map((m) => (
                  <li key={m.date + m.label} className="grid grid-cols-[6rem_1fr] gap-3">
                    <span className="font-mono text-[12px] text-white/60">{m.date}</span>
                    <span className="text-[14px] leading-snug">{m.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
