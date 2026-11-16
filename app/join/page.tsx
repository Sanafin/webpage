import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JoinForm } from "@/components/join-form"
import { joinOffer, joinRoles, thesisTopics } from "@/lib/join"
import { site, studio } from "@/lib/site"

export const metadata: Metadata = {
  title: "Work with us",
  description:
    "Thesis projects, internships and founding-team roles at Sanafin, where health gets paid for results instead of bills. For students at ETH, HSG and beyond.",
  alternates: { canonical: "/join" },
}

const link = "text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]"

export default function JoinPage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <Header />
      <main id="main" className="landing-page flex-grow pt-32 md:pt-40 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Editorial: what we do and why it matters, in two sentences */}
          <section aria-labelledby="join-title" className="max-w-3xl">
            <h1 id="join-title" className="font-display text-4xl sm:text-6xl leading-[1.04] text-[#1f1a17]">
              Help health get paid
              <span className="block text-[rgba(31,26,23,.45)]">for results, not bills.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-[17px] leading-relaxed text-[#6f6660]">
              Prevention pays off years later, often for someone else, so it rarely gets funded. Sanafin lets health payers and
              providers agree on a result and pay only when it is reached. We are a small, early team and we are looking for
              students who want real responsibility.
            </p>
            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
              <li className="w-full sm:w-auto">
                <a
                  href="#interest"
                  data-cta="join_jump"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#1f1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3a322d] sm:w-auto"
                >
                  Send your interest (1 minute)
                </a>
              </li>
              <li>
                <a href="#roles" className={link}>
                  Open roles
                </a>
              </li>
              <li>
                <a href="#thesis" className={link}>
                  Thesis topics
                </a>
              </li>
            </ul>
          </section>

          {/* List: roles on hairlines, no cards */}
          <section id="roles" aria-labelledby="roles-title" className="mt-24 scroll-mt-28">
            <h2 id="roles-title" className="font-display text-3xl sm:text-4xl text-[#1f1a17]">
              Open roles
            </h2>
            <ul className="mt-8 border-t border-[#ece7e2]">
              {joinRoles.map((r) => (
                <li key={r.id} className="grid gap-2 border-b border-[#ece7e2] py-6 md:grid-cols-12 md:gap-6">
                  <div className="md:col-span-4">
                    <p className="text-[17px] font-medium text-[#1f1a17]">{r.title}</p>
                    <p className="mt-1 text-[13px] text-[#6f6660]">{r.format}</p>
                  </div>
                  <p className="md:col-span-5 max-w-md text-[15px] leading-relaxed text-[#1f1a17]">{r.what}</p>
                  <p className="md:col-span-3 text-[13px] leading-relaxed text-[#6f6660]">{r.fit}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-[#6f6660]">
              Also listed on{" "}
              <a href={site.careers} target="_blank" rel="noopener noreferrer" className={link}>
                Wellfound
              </a>
              .
            </p>
          </section>

          {/* Numbered two-column grid: thesis topics */}
          <section id="thesis" aria-labelledby="thesis-title" className="mt-24 scroll-mt-28">
            <h2 id="thesis-title" className="font-display text-3xl sm:text-4xl text-[#1f1a17]">
              Bachelor&apos;s and Master&apos;s thesis topics
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6f6660]">
              Built on our founder&apos;s ETH doctorate and published work on financing digital prevention. Bring your own angle.
            </p>
            <ol className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {thesisTopics.map((t, i) => (
                <li key={t.title} className="flex gap-4">
                  <span className="font-mono text-[13px] text-[#0f766e] tabular-nums pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[17px] font-medium text-[#1f1a17]">{t.title}</p>
                    <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-[#1f1a17]">{t.q}</p>
                    <p className="mt-1.5 text-[13px] text-[#6f6660]">{t.fields}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Split: the honest offer beside the interest form */}
          <section id="interest" aria-labelledby="interest-title" className="mt-24 scroll-mt-28 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="interest-title" className="font-display text-3xl sm:text-4xl text-[#1f1a17]">
                What we offer
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6f6660]">
                We are lean and grant-funded, so we are open about pay from the start.
              </p>
              <dl className="mt-8 border-t border-[#ece7e2]">
                {joinOffer.map((o) => (
                  <div key={o.format} className="grid grid-cols-3 gap-4 border-b border-[#ece7e2] py-4">
                    <dt className="text-[15px] font-medium text-[#1f1a17]">{o.format}</dt>
                    <dd className="col-span-2 text-[14px] leading-relaxed text-[#1f1a17]">{o.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[13px] leading-relaxed text-[#6f6660]">
                Mostly remote. Based at the HSG ETH Student Project House in St. Gallen; we meet in Zurich as needed. Curious about
                the product?{" "}
                <a href={studio.start} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-0.5`}>
                  Try Outcome Studio <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </p>
            </div>
            <div className="lg:col-span-7">
              <JoinForm />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
