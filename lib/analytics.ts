// Tiny event helper. With no analytics provider configured it is a no-op, so the
// page never ships a tracking script it was not asked to.

type Props = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    plausible?: (name: string, options?: { props?: Props }) => void
  }
}

export function track(name: string, props?: Props) {
  if (typeof window === "undefined") return
  window.plausible?.(name, props ? { props } : undefined)
}
