import type { ReactNode } from "react"

// Light browser chrome around product imagery. The caption is mandatory so an
// illustrative preview can never be mistaken for a customer screen: it is rendered
// in the frame's top bar and repeated as a visible figcaption.

type Kind = "product" | "illustrative"

const barLabel: Record<Kind, string> = {
  product: "Sanafin Outcome Studio · test workspace · synthetic data",
  illustrative: "Demo workspace · example data, not a customer",
}

const captionLabel: Record<Kind, string> = {
  product: "Product screenshot with synthetic test data.",
  illustrative: "Illustrative preview with example data.",
}

export function ScreenFrame({
  kind,
  children,
  caption,
  className = "",
  frameClassName = "",
  tilt = false,
  hideCaption = false,
}: {
  kind: Kind
  children: ReactNode
  caption?: string
  className?: string
  frameClassName?: string
  tilt?: boolean
  hideCaption?: boolean
}) {
  return (
    <figure className={className}>
      <div
        className={`overflow-hidden rounded-[18px] border border-[#e6dfd8] bg-white shadow-[0_40px_100px_-40px_rgba(47,36,31,0.35),0_0_0_1px_rgba(47,36,31,0.02)] ${
          tilt ? "[transform:perspective(1800px)_rotateY(-6deg)] origin-left" : ""
        } ${frameClassName}`}
      >
        <div className="flex items-center gap-3 border-b border-[#f0ebe6] bg-[#fcfbfa] px-3.5 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e9e4df]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e9e4df]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e9e4df]" />
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white px-2 py-0.5 text-[11px] text-[#766d67] ring-1 ring-[#ece7e2]">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${kind === "product" ? "bg-[#14b8a6]" : "bg-[#f15d22]"}`} aria-hidden="true" />
            <span className="truncate">{barLabel[kind]}</span>
          </span>
        </div>
        {children}
      </div>
      <figcaption className={`mt-3 text-[12px] text-[#766d67] ${hideCaption ? "sr-only" : ""}`}>
        {caption ?? captionLabel[kind]}
      </figcaption>
    </figure>
  )
}
