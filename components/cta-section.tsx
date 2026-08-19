import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

function SwissCross({ className = "w-2.5 h-2.5 text-[#14B8A6] shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <path d="M4,1 H6 V4 H9 V6 H6 V9 H4 V6 H1 V4 H4 Z" />
    </svg>
  )
}

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
                  Beta access
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-[1.1] font-medium tracking-tight">
                  Turn better outcomes into <br className="hidden sm:block" />{" "}
                  <span className="text-orange-100 italic font-semibold">reimbursable care</span>
                </h2>
                <p className="text-orange-50/80 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  Join the beta waitlist and be among the first to turn health outcomes into reimbursable contracts.
                </p>
                <form
                  onSubmit={handleSubmit}
                  aria-busy={loading}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
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
                    className="form-field flex-1 rounded-[10px] px-5 py-4 font-mono text-sm placeholder:text-[#8c6a59]/60 bg-white border border-white/20 text-[#2f241f] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="action-inverse bg-white text-[#b83305] disabled:bg-[#f2e8e1]/80 disabled:text-[#8c6a59] font-semibold px-8 py-4 font-mono text-sm uppercase tracking-wider hover:bg-orange-50 disabled:opacity-85 disabled:cursor-not-allowed rounded-[10px] whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 min-w-[200px]"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#8c6a59]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing</span>
                      </>
                    ) : (
                      "Join Beta Waitlist"
                    )}
                  </button>
                </form>
                {error && (
                  <div id="access-request-error" role="alert" className="mb-8 p-4 rounded-[10px] bg-red-500/10 border border-red-500/25 text-red-200 text-xs font-mono text-left max-w-md mx-auto flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <Link
                  href="/demo"
                  className="mb-8 inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-orange-100 transition-colors hover:text-white"
                >
                  Book a demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                 <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/70">
                  <span className="font-mono text-xs flex items-center gap-2">
                    <SwissCross className="w-2 h-2 text-[#f15d22] shrink-0 animate-pulse" />
                    Beta access
                  </span>
                  <span className="font-mono text-xs flex items-center gap-2">
                    <SwissCross className="w-2 h-2 text-[#f15d22] shrink-0 animate-pulse" />
                    Product previews
                  </span>
                  <span className="font-mono text-xs flex items-center gap-2">
                    <SwissCross className="w-2 h-2 text-[#f15d22] shrink-0 animate-pulse" />
                    Launch updates
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
