"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Linkedin } from "lucide-react"
import Image from "next/image"

import wasuProfile from "@/components/ui/profiles/wasu_profile.png"
import susanProfile from "@/components/ui/profiles/susan_profile.png"
import anejProfile from "@/components/ui/profiles/anej_profile.png"
import djataProfile from "@/components/ui/profiles/djata_profile.png"
import ajinthaProfile from "@/components/ui/profiles/ajintha_profile.png"
import niklausProfile from "@/components/ui/profiles/niklaus_profile.png"
import wellfoundLogo from "@/components/ui/logo/Wellfound_logo.png"

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
    <section ref={sectionRef} id="team" className="py-16 relative overflow-hidden">
      {/* Scattered Swiss cross pattern (vivid teal stroke for light background) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cpath d='M34,32 h12 v12 h12 v12 h-12 v-12 h-12 v-12 h12 z' fill='none' stroke='rgba(20,184,166,0.15)' stroke-width='1.2'/%3E%3Cpath d='M126,23 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 z' fill='none' stroke='rgba(20,184,166,0.12)' stroke-width='1'/%3E%3Cpath d='M82,126 h6 v6 h6 v6 h-6 v6 h-6 v-6 h-6 v-6 h6 z' fill='none' stroke='rgba(20,184,166,0.11)' stroke-width='0.9'/%3E%3Cpath d='M153,99 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 v-4 h4 z' fill='none' stroke='rgba(20,184,166,0.08)' stroke-width='0.8'/%3E%3Cpath d='M24,116 h2 v3 h3 v2 h-3 v3 h-2 v-3 h-3 v-2 h3 z' fill='none' stroke='rgba(20,184,166,0.08)' stroke-width='0.8'/%3E%3Cpath d='M33,14 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 v-4 h4 z' fill='none' stroke='rgba(20,184,166,0.11)' stroke-width='0.9'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] mb-4 font-bold block">
            The team
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2f241f] max-w-xl leading-[1.1] font-medium tracking-tight mb-6">
            Built by <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">domain experts</span>. Shipped with <span className="text-primary italic font-semibold bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pr-1">care</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {core.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-3xl border border-[#efc2a5]/40 bg-white/70 p-3 transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(47,36,31,0.35)]"
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
                <p className="font-serif text-xl font-semibold tracking-tight text-[#2f241f]">{person.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#0f8f81] font-bold mt-1 mb-3">{person.title}</p>
                <p className="text-[#6f5346] text-sm leading-relaxed mb-4">{person.bio}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {person.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-[#efc2a5]/60 bg-[#fffaf6] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#8c6a59] font-bold">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8c6a59] font-bold mb-4">Advisors</p>
          <ul className="divide-y divide-[#efc2a5]/40 border-y border-[#efc2a5]/40">
            {advisors.map((person) => (
              <li key={person.name} className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5">
                <div className="flex items-center gap-4 sm:w-72 shrink-0">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#f0ece8]">
                    <Image src={person.photo} alt={person.name} fill sizes="48px" className="object-cover object-top grayscale-[70%] transition group-hover:grayscale-0" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold text-[#2f241f] leading-tight">{person.name}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#0f8f81] font-bold">{person.tags[0]}</p>
                  </div>
                </div>
                <p className="flex-1 text-sm text-[#6f5346] leading-relaxed">{person.bio}</p>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-action hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#efc2a5]/60 text-[#8c6a59]"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Recruitment CTA */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="font-serif text-2xl md:text-3xl text-[#2f241f] mb-4 font-semibold tracking-tight">
            Build the reimbursement stack with us.
          </h3>
          <p className="text-[#8c6a59] text-base mb-10 leading-relaxed">
            We’re hiring ambitious engineers and operators.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a
              href="https://wellfound.com/company/sanafin"
              target="_blank"
              rel="noopener noreferrer"
              className="action-secondary flex min-h-12 items-center justify-center py-3 px-6 border border-[#efc2a5]/40 rounded-xl hover:bg-[#efc2a5]/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div className="relative w-32 h-8">
                <Image
                  src={wellfoundLogo}
                  alt="Apply on Wellfound"
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
