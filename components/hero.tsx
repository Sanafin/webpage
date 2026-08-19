"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import Link from "next/link"
import { WhoIsThisFor } from "@/components/who-is-this-for"
import { Check } from "lucide-react"

const industries = [
  "Health Outcomes",
  "Clinical Evidence",
  "Patient Progress",
  "Real-World Data"
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })
  const shouldReduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Form states
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

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <section ref={sectionRef} id="platform" className="pt-32 pb-16 relative overflow-hidden">
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(210, 205, 200, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 205, 200, 0.18) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            className="pt-0 flex flex-col items-start text-left mx-auto w-fit max-w-4xl pr-4 pl-8 sm:pl-16 md:pl-24 lg:pl-32"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-serif text-foreground/90 font-medium tracking-tight leading-[1.1] text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-left mb-6">
                Turn{" "}
                <span className="relative inline-flex justify-start h-[1.3em] overflow-hidden w-[260px] xs:w-[320px] sm:w-[380px] md:w-[490px] lg:w-[610px] xl:w-[610px] align-bottom">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={currentIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block text-primary font-serif font-semibold italic whitespace-nowrap text-left w-full bg-gradient-to-r from-[#ff824c] via-primary to-[#d03d00] bg-clip-text text-transparent pt-1 pb-2 pl-0 pr-4 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                      style={{
                        textShadow: "0 2px 30px rgba(233, 131, 67, 0.2)",
                      }}
                    >
                      {industries[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                <br />
                into Reimbursable Contracts.
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-foreground/80 mb-8 leading-relaxed text-base sm:text-lg font-sans text-left max-w-2xl pl-4 border-l-2 border-[#efc2a5]">
                Sanafin turns reimbursement into software. Connect data, build evidence, and launch value-based contracts in weeks.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full max-w-lg pl-4 mb-10">
              {submitted ? (
                <div className="flex items-center gap-2 text-[#14B8A6] font-mono text-sm uppercase tracking-wider font-bold">
                  <Check className="w-4 h-4" />
                  <span>You're on the beta waiting list.</span>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 min-h-12 px-4 py-3 bg-[#fffaf6] border border-[#2f241f]/15 hover:border-[#14B8A6]/40 focus:border-[#14B8A6] focus:outline-none rounded-[10px] font-sans text-sm text-[#2f241f]"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      className="action-primary inline-flex min-h-12 items-center justify-center px-6 py-3 bg-[#14B8A6] text-white hover:bg-[#0f8f81] font-mono uppercase tracking-widest text-xs font-bold rounded-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Join Beta Waitlist"}
                    </button>
                  </form>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-[#8c6a59] font-mono pl-1 uppercase tracking-wider">
                    <span>Built for digital health</span>
                    <span className="text-[#8c6a59]/40">&bull;</span>
                    <span>No card required</span>
                    <span className="text-[#8c6a59]/40">&bull;</span>
                    <Link href="/demo" className="text-[#f15d22] hover:text-[#d03d00] font-bold underline transition-colors cursor-pointer">
                      or Book a Discovery Call
                    </Link>
                  </div>
                </>
              )}
              {error && (
                <p className="mt-2 text-xs text-red-500 font-mono pl-1">{error}</p>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Who is this for - full width row */}
        <motion.div
          className="mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <WhoIsThisFor />
        </motion.div>

        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full mt-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
      </div>
    </section>
  )
}
