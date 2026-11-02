import Image, { type StaticImageData } from "next/image"
import stamp from "@/components/ui/logo/ibsdf-stamp.png"
import ventureKick from "@/components/ui/logo/venturekick-claim.png"
import ventureKickWhite from "@/components/ui/logo/venturekick-claim-white.png"

// The wins as award emblems (G2 / Wellfound pattern): a shield with the programme's
// own mark, a ribbon in the programme's colour and the award name. Drawn in SVG,
// text in HTML on top so it stays crisp. 140 × 196 at zoom 1. Placed upright and in
// the flow, grouped with the recognition row (Wellfound / Rivian pattern).

type Award = {
  href: string
  ariaLabel: string
  // Ribbon colours: band, tails, fold shadow
  ribbon: string
  ribbonDark: string
  ribbonFold: string
  // The programme's mark inside the shield
  mark: StaticImageData
  markClass: string
  // Ribbon text and the two lines below it
  ribbonText: string
  title: [string, string]
}

const awards = {
  // Sustainable Digital Finance green (#2bb157, sampled from the official wordmark)
  innovationBooster: {
    href: "https://ibsdf.ch/",
    ariaLabel: "Winner of the Innovation Booster Sustainable Digital Finance, powered by Innosuisse",
    ribbon: "#2bb157",
    ribbonDark: "#1e8a43",
    ribbonFold: "#14532d",
    mark: stamp,
    markClass: "h-[64px] w-[64px]",
    ribbonText: "Winner",
    title: ["Sustainable", "Digital Finance"],
  },
  // Venture Kick red (#dc3b3e, sampled from the official logo)
  ventureKick: {
    href: "https://www.venturekick.ch/",
    ariaLabel: "Winner of Venture Kick stage 1, a Kick Foundation initiative",
    ribbon: "#dc3b3e",
    ribbonDark: "#b12a2d",
    ribbonFold: "#7a1b1d",
    mark: ventureKick,
    markClass: "mt-[14px] h-auto w-[104px]",
    ribbonText: "Winner",
    title: ["Venture Kick", "Stage 1"],
  },
} satisfies Record<string, Award>

export type AwardKey = keyof typeof awards

// `zoom` scales the whole emblem and its layout box together (unlike a transform).
export function AwardBadge({
  award = "innovationBooster",
  className = "",
  zoom = 1,
}: {
  award?: AwardKey
  className?: string
  zoom?: number
}) {
  const a: Award = awards[award]
  return (
    <a
      href={a.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={a.ariaLabel}
      style={{ zoom }}
      className={`group relative block h-[196px] w-[140px] transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <svg viewBox="0 0 140 196" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_14px_24px_rgba(47,36,31,0.22)]" aria-hidden="true">
        {/* Shield: straight sides past the text, then the point */}
        <path d="M12 2 H128 a8 8 0 0 1 8 8 V148 L70 194 L4 148 V10 a8 8 0 0 1 8 -8 Z" fill="#fff" stroke="#e3dcd5" strokeWidth="1" />
        <path d="M14 7 H126 a5 5 0 0 1 5 5 V145.6 L70 187.8 L9 145.6 V12 a5 5 0 0 1 5 -5 Z" fill="none" stroke={a.ribbon} strokeOpacity="0.3" strokeWidth="0.8" />
        {/* Banner across the middle: tails behind, folds, band in front */}
        <path d="M-10 92 H12 V114 H-10 L-3 103 Z" fill={a.ribbonDark} />
        <path d="M150 92 H128 V114 H150 L143 103 Z" fill={a.ribbonDark} />
        <path d="M0 108 L12 114 V108 Z M140 108 L128 114 V108 Z" fill={a.ribbonFold} fillOpacity="0.7" />
        <path d="M0 86 H140 V108 H0 Z" fill={a.ribbon} />
      </svg>

      <span className="absolute inset-x-0 top-[14px] flex h-[64px] items-center justify-center">
        <Image src={a.mark} alt="" className={`object-contain ${a.markClass}`} />
      </span>
      <span className="absolute inset-x-0 top-[86px] flex h-[22px] items-center justify-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
        {a.ribbonText}
      </span>
      <span className="absolute inset-x-4 top-[118px] text-center text-[11px] font-semibold leading-[1.2] text-[#1f1a17]">
        {a.title[0]}
        <br />
        {a.title[1]}
      </span>
    </a>
  )
}

// The wins as an announcement bar across the top of the page (Wellfound pattern):
// one dark line above the header, both marks, one sentence, one link.
export function AwardBar() {
  return (
    <a
      href="/#recognition"
      className="group flex h-10 items-center justify-center gap-2.5 bg-[#1f1a17] px-4 text-[12.5px] text-white/75 transition-colors hover:text-white sm:text-[13px]"
    >
      <span className="flex shrink-0 items-center gap-2">
        <Image src={ventureKickWhite} alt="" className="h-[18px] w-auto" />
        <Image src={stamp} alt="" className="h-5 w-5" />
      </span>
      <span className="truncate">
        <span className="font-medium text-white">Winner</span>
        <span className="hidden sm:inline"> of Venture Kick and Innovation Booster Sustainable Digital Finance</span>
        <span className="sm:hidden"> · Venture Kick & Innovation Booster</span>
      </span>
      <span className="hidden shrink-0 items-center gap-1 rounded-full border border-white/20 px-2.5 py-0.5 text-[12px] text-white transition-colors group-hover:border-white/40 sm:inline-flex">
        Learn more
        <span aria-hidden="true">→</span>
      </span>
    </a>
  )
}
