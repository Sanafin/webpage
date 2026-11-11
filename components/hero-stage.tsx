import type { ReactNode } from "react"

// The hero copy enters once on load (CSS, .hero-enter) and never moves with the scroll.
// The product frame used to tilt up and settle as the page scrolled; at load that left
// it pushed down and shrunk, so on a laptop the product sat below the first screen.
// It now stands still where it belongs, right under the proof line.

export function HeroCopy({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`hero-enter ${className}`}>{children}</div>
}

export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}
