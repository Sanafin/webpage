import Script from "next/script"

// Cookieless analytics, only when a domain is configured.
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  if (!domain) return null
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.tagged-events.outbound-links.js"
      strategy="afterInteractive"
    />
  )
}
