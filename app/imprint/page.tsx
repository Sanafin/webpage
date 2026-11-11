import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { site } from "@/lib/site"

// Imprint as a plain label / value list (Stripe / Plain legal pattern). The legal
// entity and address come from site.legal; add the UID (CHE-...) row once registered.

const rows: { label: string; value: React.ReactNode }[] = [
  { label: "Company name", value: site.legal.name },
  {
    label: "Address",
    value: (
      <>
        {site.legal.street}
        <br />
        {site.legal.postalCode} {site.legal.city}, {site.legal.country}
      </>
    ),
  },
  { label: "Entity type", value: "Swiss technological platform and software operator" },
  {
    label: "General inquiries",
    value: (
      <>
        For administrative, commercial, or technical operations, contact{" "}
        <a href={`mailto:${site.contactEmail}`} className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
          {site.contactEmail}
        </a>
      </>
    ),
  },
  { label: "Responsible entity", value: "Corporate communications and operational platform management" },
]

export default function ImprintPage() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        <main id="main" className="max-w-4xl mx-auto px-6 pt-36 md:pt-44 pb-24 min-h-[70vh]">
          <p className="text-[13px] text-[#766d67] mb-4">Transparency</p>
          <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] leading-[1.04] text-[#1f1a17]">Imprint</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#6f6660]">Official company registration and regulatory information for Sanafin.</p>

          <dl className="mt-12 divide-y divide-[#ece7e2] border-y border-[#ece7e2]">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="text-[14px] text-[#766d67]">{r.label}</dt>
                <dd className="text-[15.5px] leading-relaxed text-[#1f1a17]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </main>
        <Footer />
      </div>
    </div>
  )
}
