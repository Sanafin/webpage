import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JoinRolesAndForm } from "@/components/join-form"
import { thesisTopics } from "@/lib/join"

export const metadata: Metadata = {
  title: "Work with us",
  description:
    "Thesis projects, internships and founding-team roles at Sanafin, where health gets paid for results instead of bills. For students at ETH, HSG and beyond.",
  alternates: { canonical: "/join" },
}

// One calm column, read top to bottom: who we are, roles, thesis topics, how we pay, the form.
// Picking a role scrolls to the form with that role preselected.
// No cards, no chips; hairlines and whitespace do the grouping.
export default function JoinPage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <Header minimal />
      <main id="main" className="landing-page flex-grow pt-32 md:pt-40 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <section aria-labelledby="join-title">
            <h1 id="join-title" className="font-display text-4xl sm:text-5xl leading-[1.08] text-[#1f1a17]">
              Work with us. <span className="text-[rgba(31,26,23,.45)]">Help health get paid for results, not bills.</span>
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-[#766d67]">
              Sanafin lets health payers and providers agree on a result and pay only when it is reached. We are a small, early
              team looking for students who want real responsibility.
            </p>
          </section>

          <JoinRolesAndForm>
            <section aria-labelledby="thesis-title" className="mt-20">
              <h2 id="thesis-title" className="text-[13px] text-[#766d67]">
                Thesis topics
              </h2>
              <ol className="mt-3 border-t border-[#ece7e2]">
                {thesisTopics.map((t) => (
                  <li key={t.title} className="flex items-baseline justify-between gap-6 border-b border-[#ece7e2] py-4">
                    <span className="text-[16px] text-[#1f1a17]">{t.title}</span>
                    <span className="hidden shrink-0 text-right text-[13px] text-[#766d67] sm:block">{t.fields}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[14px] leading-relaxed text-[#766d67]">
                Bachelor&apos;s or Master&apos;s, built on our founder&apos;s ETH doctorate in financing prevention. Bring your own angle,
                and pick &ldquo;Thesis project&rdquo; in the form.
              </p>
            </section>

            <section aria-labelledby="pay-title" className="mt-20">
              <h2 id="pay-title" className="text-[13px] text-[#766d67]">
                How we work
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[#1f1a17]">
                We are lean and grant-funded, so we are open about pay. Thesis work is unpaid. Short research projects are paid by the
                hour. Internships get a modest stipend where funds allow. Founding roles come with shares. Mostly remote, based at the
                HSG ETH Student Project House in St. Gallen.
              </p>
            </section>
          </JoinRolesAndForm>
        </div>
      </main>
      <Footer />
    </div>
  )
}
