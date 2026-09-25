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
    <section id="contact" className="relative z-10 bg-[#efebe6] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.15] font-medium text-[#1f1a17] mb-8">
          Sanafin turns verified health outcomes into contracts payers can fund.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/demo"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f15d22] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(241,93,34,0.7)] transition-colors hover:bg-[#d94f18]"
          >
            Book a discovery call
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-md">
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
    </section>
  )
}
