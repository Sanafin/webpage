import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"

export function CTASection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
      <div className="relative flex flex-col-reverse md:block overflow-hidden rounded-3xl bg-[#ebe4db]">
        {/* Still-life in the same world as the marble film */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/media/closing-still.jpg" />
          <img
            src="/media/closing-still-mobile.jpg"
            alt="A teal and an orange glass marble beside a brass balance scale on cream linen"
            className="block w-full aspect-[9/10] object-cover md:absolute md:inset-0 md:h-full md:aspect-auto md:object-[70%_center]"
            loading="lazy"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-r from-[#ebe4db] via-[#ebe4db]/70 to-transparent" aria-hidden="true" />

        <div className="relative px-6 py-10 sm:px-10 md:px-14 md:py-24 max-w-xl">
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.12] text-[#1f1a17] mb-8">
          Sanafin turns verified health outcomes into contracts payers can fund.
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link
            href="/demo"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f15d22] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(241,93,34,0.7)] transition-colors hover:bg-[#d94f18]"
          >
            Book a discovery call
          </Link>
        </div>

        <div className="mt-12 max-w-md">
          {submitted ? (
            <p role="status" className="inline-flex items-center gap-2 text-[14px] text-[#0f8f81]">
              <Check className="h-4 w-4" aria-hidden="true" />
              You&apos;re on the list. We&apos;ll be in touch when beta access opens.
            </p>
          ) : (
            <>
              <p className="text-[13px] text-[#6f6660] mb-3">Or get product updates</p>
              <form onSubmit={handleSubmit} aria-busy={loading} className="flex items-center gap-1 rounded-full bg-white p-1 shadow-[0_1px_2px_rgba(47,36,31,0.06)]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your work email"
                  aria-label="Email address"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "access-request-error" : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[14px] text-[#1f1a17] placeholder:text-[#a39a93] outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 rounded-full bg-[#1f1a17] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#3a322d] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Joining…" : "Join waitlist"}
                </button>
              </form>
              {error && (
                <p id="access-request-error" role="alert" className="mt-3 text-[13px] text-[#d03d00]">
                  {error}
                </p>
              )}
            </>
          )}
        </div>
        </div>
      </div>
      </div>
    </section>
  )
}
