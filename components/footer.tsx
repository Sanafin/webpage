import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Linkedin } from "lucide-react"
import { SourcesList } from "@/components/fn"
import { UpdatesForm } from "@/components/updates-form"
import { site } from "@/lib/site"

// Footer as a trust ledger: where things are, what is claimed, and who stands
// behind the page. Notes & sources render from the same registry as the footnotes.

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#product", label: "Outcome Studio" },
      { href: "/#examples", label: "Example contracts" },
      { href: "/eden-framework", label: "EDEN framework" },
      { href: "/api-docs", label: "API documentation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#investors", label: "For investors" },
      { href: "/#team", label: "Team" },
      { href: "/#traction", label: "Partners & recognition" },
      { href: "/demo", label: "Book a discovery call" },
      { href: site.careers, label: "Careers", external: true },
    ],
  },
  {
    title: "Data & compliance",
    links: [
      { href: "/terms", label: "Terms & security" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/imprint", label: "Imprint" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative z-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Image
              src="/images/sanafin_logo.png"
              alt="Sanafin"
              width={110}
              height={36}
              className="h-8 w-auto mb-5"
              style={{ height: "32px", width: "auto" }}
            />
            <p className="max-w-sm text-[14px] leading-relaxed text-[#6f6660] mb-6">{site.tagline}</p>
            <p className="text-[13px] text-[#766d67] mb-3">Product updates</p>
            <UpdatesForm />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-[#1f1a17] mb-5">{col.title}</p>
              <ul className="space-y-3 text-[14px] text-[#6f6660]">
                {col.links.map((l) =>
                  "external" in l && l.external ? (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#1f1a17]">
                        {l.label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link href={l.href} className="hover:text-[#1f1a17]">
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <section id="sources" aria-labelledby="sources-title" className="rounded-3xl bg-[#f5f1ed] p-6 sm:p-8 mb-10 scroll-mt-24">
          <h2 id="sources-title" className="text-[13px] font-medium text-[#1f1a17] mb-4">
            Notes &amp; sources
          </h2>
          <SourcesList />
          <p className="mt-6 text-[12.5px] leading-relaxed text-[#766d67]">
            Sanafin is a software provider, not an insurer, bank or payment institution, and does not provide medical
            advice. Funds committed under an outcome-conditional contract are held by a licensed custody partner, never
            by Sanafin. Figures on this site are illustrative unless a source is given. Institutions named as research
            affiliations do not endorse Sanafin.
          </p>
        </section>

        <div className="flex flex-col gap-4 border-t border-black/5 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-[#766d67]">
            &copy; {new Date().getFullYear()} {site.legalLine}
          </p>
          <div className="flex items-center gap-5 text-[13px] text-[#766d67]">
            <Link href="/imprint" className="hover:text-[#1f1a17]">
              Imprint
            </Link>
            <Link href="/privacy" className="hover:text-[#1f1a17]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#1f1a17]">
              Terms
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9e4df] text-[#766d67] hover:text-[#1f1a17]"
              aria-label="Sanafin on LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
