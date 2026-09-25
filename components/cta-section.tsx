import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

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
    <section id="contact" className="py-16 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="reveal bg-gradient-to-br from-[#f06634] via-[#e2531e] to-[#b83305] rounded-[32px] py-16 px-6 md:px-12 relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(226,83,30,0.12)] border border-white/10 text-center text-white">
          {/* Scattered Swiss cross pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cpath d='M34,32 h12 v12 h-12 v-12 h-12 v-12 h12 z' fill='none' stroke='rgba(255,255,255,0.14)' stroke-width='1.2'/%3E%3Cpath d='M126,23 h8 v8 h8 v8 h-8 v-8 h-8 v-8 h8 z' fill='none' stroke='rgba(255,255,255,0.11)' stroke-width='1'/%3E%3Cpath d='M82,126 h6 v6 h6 v6 h-6 v-6 h-6 v-6 h6 z' fill='none' stroke='rgba(255,255,255,0.10)' stroke-width='0.9'/%3E%3Cpath d='M153,99 h4 v4 h4 v4 h-4 v-4 h-4 v-4 h4 z' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='0.8'/%3E%3Cpath d='M24,116 h2 v3 h3 v2 h-3 v-3 h-2 v-3 h-3 v-2 h3 z' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='0.8'/%3E%3Cpath d='M33,14 h4 v4 h4 v4 h-4 v-4 h-4 v-4 h4 z' fill='none' stroke='rgba(255,255,255,0.10)' stroke-width='0.9'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
            }}
          />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {submitted ? (
              <div role="status" className="py-8 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/35 flex items-center justify-center mb-6 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.15)]">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-mono text-xs uppercase tracking-wider text-teal-200 mb-2 font-semibold">
                  Beta Waitlist Request Received
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-[1.1] font-medium tracking-tight">
                  Your request is in.
                </h2>
                <p className="text-orange-50/85 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  You’re on the waiting list. We’ll contact you when beta access opens.
                </p>
              </div>
            ) : (
              <>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-200 mb-4 font-bold block">
                  Get in touch
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-[1.1] font-medium tracking-tight">
                  Turn better outcomes into <br className="hidden sm:block" />{" "}
                  <span className="text-orange-100 italic font-semibold">reimbursable care</span>
                </h2>
                <p className="text-orange-50/80 font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
                  Building a digital health product, funding outcomes, or investing in the category? Let&apos;s talk.
                </p>
                <Link
                  href="/demo"
                  className="action-inverse inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-[#b83305] shadow-md hover:bg-orange-50 hover:shadow-lg"
                >
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <div className="mt-12 pt-8 border-t border-white/15 max-w-md mx-auto">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-100/80 mb-4 font-bold">
                    Or get product updates
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    aria-busy={loading}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "access-request-error" : undefined}
                      className="form-field flex-1 rounded-[10px] px-4 py-3 font-mono text-sm placeholder:text-white/60 bg-white/10 border border-white/25 text-white outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="action-secondary rounded-[10px] border border-white/40 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                    >
                      {loading ? "Joining..." : "Join beta waitlist"}
                    </button>
                  </form>
                  {error && (
                    <p id="access-request-error" role="alert" className="mt-3 text-xs font-mono text-red-100">
                      {error}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
