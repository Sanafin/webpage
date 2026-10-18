import Image from "next/image"
import stamp from "@/components/ui/logo/ibsdf-stamp.png"

// The Innovation Booster win as an award emblem (G2 / Wellfound pattern): a shield
// with the programme's own stamp, a ribbon in the Sustainable Digital Finance green
// (#2bb157, sampled from the official wordmark) and the award name. Drawn in SVG,
// text in HTML on top so it stays crisp. 140 × 196 at zoom 1. Placed upright and in
// the flow, centred above the hero headline (Wellfound / Rivian pattern).

const GREEN = "#2bb157"
const GREEN_DARK = "#1e8a43"

// `zoom` scales the whole emblem and its layout box together (unlike a transform).
export function AwardBadge({ className = "", zoom = 1 }: { className?: string; zoom?: number }) {
  return (
    <a
      href="https://ibsdf.ch/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Winner of the Innovation Booster Sustainable Digital Finance, powered by Innosuisse"
      style={{ zoom }}
      className={`group relative block h-[196px] w-[140px] transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <svg viewBox="0 0 140 196" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_14px_24px_rgba(47,36,31,0.22)]" aria-hidden="true">
        {/* Shield: straight sides past the text, then the point */}
        <path d="M12 2 H128 a8 8 0 0 1 8 8 V148 L70 194 L4 148 V10 a8 8 0 0 1 8 -8 Z" fill="#fff" stroke="#e3dcd5" strokeWidth="1" />
        <path d="M14 7 H126 a5 5 0 0 1 5 5 V145.6 L70 187.8 L9 145.6 V12 a5 5 0 0 1 5 -5 Z" fill="none" stroke={GREEN} strokeOpacity="0.3" strokeWidth="0.8" />
        {/* Banner across the middle: tails behind, folds, band in front */}
        <path d="M-10 92 H12 V114 H-10 L-3 103 Z" fill={GREEN_DARK} />
        <path d="M150 92 H128 V114 H150 L143 103 Z" fill={GREEN_DARK} />
        <path d="M0 108 L12 114 V108 Z M140 108 L128 114 V108 Z" fill="#14532d" fillOpacity="0.7" />
        <path d="M0 86 H140 V108 H0 Z" fill={GREEN} />
      </svg>

      <span className="absolute inset-x-0 top-[14px] flex justify-center">
        <Image src={stamp} alt="" className="h-[64px] w-[64px]" />
      </span>
      <span className="absolute inset-x-0 top-[86px] flex h-[22px] items-center justify-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
        Winner
      </span>
      <span className="absolute inset-x-4 top-[118px] text-center text-[11px] font-semibold leading-[1.2] text-[#1f1a17]">
        Sustainable
        <br />
        Digital Finance
      </span>
    </a>
  )
}

// The win as an announcement bar across the top of the page (Wellfound pattern):
// one dark line above the header, the stamp, one sentence, one link.
export function AwardBar() {
  return (
    <a
      href="/#recognition"
      className="group flex h-10 items-center justify-center gap-2.5 bg-[#1f1a17] px-4 text-[12.5px] text-white/75 transition-colors hover:text-white sm:text-[13px]"
    >
      <Image src={stamp} alt="" className="h-5 w-5 shrink-0" />
      <span className="truncate">
        <span className="font-medium text-white">Winner</span>
        <span className="hidden sm:inline"> of the Innovation Booster Sustainable Digital Finance, powered by Innosuisse</span>
        <span className="sm:hidden"> · Innovation Booster</span>
      </span>
      <span className="hidden shrink-0 items-center gap-1 rounded-full border border-white/20 px-2.5 py-0.5 text-[12px] text-white transition-colors group-hover:border-white/40 sm:inline-flex">
        Learn more
        <span aria-hidden="true">→</span>
      </span>
    </a>
  )
}
