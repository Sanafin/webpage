"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Linkedin } from "lucide-react"
import Image from "next/image"

import wasuProfile from "@/components/ui/profiles/wasu_profile.png"
import susanProfile from "@/components/ui/profiles/susan_profile.png"
import anejProfile from "@/components/ui/profiles/anej_profile.png"
import djataProfile from "@/components/ui/profiles/djata_profile.png"
import ajinthaProfile from "@/components/ui/profiles/ajintha_profile.png"
import niklausProfile from "@/components/ui/profiles/niklaus_profile.png"

const team = [
  {
    name: "Wasu Mekniran",
    tags: ["PhD · ETH Zurich", "MBA"],
    title: "CEO",
    bio: "MBA & MSc in Computation. PhD in Financing for MedTech at ETH Zurich. Built Sanafin's reimbursement science.",
    photo: wasuProfile,
    linkedin: "https://www.linkedin.com/in/wasumekniran/",
  },
  {
    name: "Djata Sigam",
    tags: ["Imperial · ETH Zurich", "8+ yrs fintech"],
    title: "CTO",
    bio: "MSc in Mathematics, Imperial College London & ETH Zurich. 8+ years in fintech engineering, trust, and cybersecurity.",
    photo: djataProfile,
    linkedin: "https://www.linkedin.com/in/djata-s-478631134/",
  },
  {
    name: "Susanne Oudbier",
    tags: ["Dr. med.", "PhD Medicine"],
    title: "Medical Officer",
    bio: "Dr. med. at HOCH Ostschweiz. PhD in Medicine. Clinical outcomes expert.",
    photo: susanProfile,
    linkedin: "https://www.linkedin.com/in/susanoudbier/",
  },
  {
    name: "Anej Rozman",
    tags: ["ETH Zurich · UZH", "Quant finance"],
    title: "Quant Lead",
    bio: "Co-Founder at ETH Blockchain Club. MSc in Quantitative Finance at ETH Zurich/UZH. Built Sanafin's risk and prediction models.",
    photo: anejProfile,
    linkedin: "https://www.linkedin.com/in/anej-rozman/",
  },
  {
    name: "Ajintha Pathmanathan",
    tags: ["Dr. med., MPH"],
    title: "Advisor",
    bio: "Dr. med., MPH, 20+ years of global medical leadership across UK, US & AU systems, CEO of medical tech ventures.",
    photo: ajinthaProfile,
    linkedin: "https://www.linkedin.com/in/ajintha-p-02177750/",
  },
  {
    name: "Niklaus Neddermann",
    tags: ["ex-Julius Bär · SNB"],
    title: "Advisor",
    bio: "CEO of a FINMA-licensed asset manager, 20+ years in finance, Former executive at Julius Bär and Swiss National Bank.",
    photo: niklausProfile,
    linkedin: "https://www.linkedin.com/in/nneddermann/",
  },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const core = team.filter((person) => person.title !== "Advisor")
  const advisors = team.filter((person) => person.title === "Advisor")

  return (
    <section ref={sectionRef} id="team" className="relative scroll-mt-24">
      {/* Scattered Swiss cross pattern (vivid teal stroke for light background) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-medium text-[#f15d22] mb-4 font-bold block">
            The team
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2f241f] max-w-xl leading-[1.1] font-medium tracking-tight mb-6">
            Clinical, financial and engineering depth.<br /><span className="text-[#1f1a17]/40">In one team.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {core.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-3xl bg-[#f5f1ed] p-3 transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(47,36,31,0.35)]"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-[#f0ece8]">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top grayscale-[35%] transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#120d0b]/85 text-white backdrop-blur transition-colors hover:bg-[#0a66c2]"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                <p className="font-display text-xl font-semibold tracking-tight text-[#2f241f]">{person.name}</p>
                <p className="text-[13px] text-[#0f8f81] mt-0.5 mb-3">{person.title}</p>
                <p className="text-[#6f5346] text-sm leading-relaxed mb-4">{person.bio}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {person.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-white px-2.5 py-1 text-[12px] text-[#6f6660]">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14">
          <p className="text-[13px] font-medium text-[#8c6a59] font-bold mb-4">Advisors</p>
          <ul className="divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
            {advisors.map((person) => (
              <li key={person.name} className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5">
                <div className="flex items-center gap-4 sm:w-72 shrink-0">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#f0ece8]">
                    <Image src={person.photo} alt={person.name} fill sizes="48px" className="object-cover object-top grayscale-[70%] transition group-hover:grayscale-0" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-[#2f241f] leading-tight">{person.name}</p>
                    <p className="text-[12px] text-[#0f8f81]">{person.tags[0]}</p>
                  </div>
                </div>
                <p className="flex-1 text-sm text-[#6f5346] leading-relaxed">{person.bio}</p>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-action hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e9e4df] text-[#6f6660]"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hiring */}
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-[#f5f1ed] px-7 py-6">
          <p className="text-[15px] text-[#1f1a17]">
            We&apos;re hiring ambitious engineers and operators.
          </p>
          <a
            href="https://wellfound.com/company/sanafin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[14px] font-medium text-[#1f1a17] transition-colors hover:bg-[#faf8f6]"
          >
            Open roles
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
