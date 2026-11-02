import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Legal pages as a readable document (Copilot / Devin / Plain pattern): a sticky
// table of contents on the left, one text column on the right, hairlines between
// sections. Content is passed in as data so the wording stays with each page.

export type LegalSection = {
  id: string
  title: string
  body?: string[]
  items?: { term: string; desc: string }[]
  email?: string
}

export function LegalDoc({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Header />
        <main id="main" className="max-w-6xl mx-auto px-6 pt-36 md:pt-44 pb-24">
          <div className="max-w-2xl">
            <p className="text-[13px] text-[#766d67] mb-4">{eyebrow}</p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] leading-[1.04] text-[#1f1a17]">{title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-[#6f6660]">{intro}</p>
          </div>

          <div className="mt-14 grid gap-10 border-t border-[#ece7e2] pt-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <ol className="sticky top-28 space-y-2 border-l border-[#ece7e2]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-[13.5px] text-[#766d67] transition-colors hover:border-[#1f1a17] hover:text-[#1f1a17]">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="max-w-[65ch] divide-y divide-[#ece7e2]">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 py-8 first:pt-0">
                  <h2 className="text-xl font-medium text-[#1f1a17]">{s.title}</h2>
                  {s.body?.map((p) => (
                    <p key={p} className="mt-3 text-[15.5px] leading-relaxed text-[#4a423d]">
                      {p}
                    </p>
                  ))}
                  {s.items && (
                    <dl className="mt-4 space-y-4">
                      {s.items.map((it) => (
                        <div key={it.term}>
                          <dt className="text-[15px] font-medium text-[#1f1a17]">{it.term}</dt>
                          <dd className="mt-0.5 text-[15px] leading-relaxed text-[#4a423d]">{it.desc}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {s.email && (
                    <a href={`mailto:${s.email}`} className="mt-3 inline-block text-[15.5px] text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
                      {s.email}
                    </a>
                  )}
                </section>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
