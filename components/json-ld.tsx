import { site } from "@/lib/site"

// Organization + WebSite structured data. Address stays at city level until the
// legal entity details are supplied.
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legal.name,
        url: site.url,
        logo: `${site.url}/images/sanafin_logo.png`,
        description: site.description,
        sameAs: [site.linkedin],
        address: { "@type": "PostalAddress", streetAddress: site.legal.street, postalCode: site.legal.postalCode, addressLocality: site.legal.city, addressCountry: "CH" },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
