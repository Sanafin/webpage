import type { Metadata } from "next"

// Private preview. Indexing is refused here, by X-Robots-Tag in next.config.mjs and by
// robots.txt. The session check lives one level down so /app/login stays reachable.
export const metadata: Metadata = {
  title: { default: "Outcome Studio", template: "%s · Outcome Studio" },
  robots: { index: false, follow: false },
}

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
