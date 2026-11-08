// Small deterministic helpers for progress-driven animation. Every act receives a
// progress value t in [0, 1] and derives its state from it, so scrubbing, autoplay and
// reduced motion (t = 1) all render the same final frame.

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

// Progress of a sub-window [from, to] of the act, eased.
export function window(t: number, from: number, to: number) {
  return easeOut(clamp01((t - from) / (to - from)))
}

export function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

export const lerp = (a: number, b: number, x: number) => a + (b - a) * x

export const formatInt = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(n))

export const chfInt = (n: number) => `CHF ${formatInt(n)}`

export const iban = (s: string) => s.replace(/(.{4})/g, "$1 ").trim()
