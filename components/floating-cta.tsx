"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, X, Check } from "lucide-react"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Close form when clicking outside
  useEffect(() => {
    if (!isExpanded) return
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        setError("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded])

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
        setEmail("")
        // Auto collapse after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
          setIsExpanded(false)
        }, 3000)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 pointer-events-auto flex flex-col items-end"
          ref={formRef}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-red-600 text-white text-[10px] font-mono px-3 py-1.5 rounded-lg shadow-lg border border-red-500/20 whitespace-nowrap mb-2 mr-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="relative">
            {submitted ? (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-5 py-3.5 bg-[#14B8A6] text-white rounded-full shadow-[0_8px_30px_rgba(20,184,166,0.4)] border border-white/10"
              >
                <Check className="w-4 h-4 text-[#efc2a5]" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">You're on the beta waiting list.</span>
              </motion.div>
            ) : isExpanded ? (
              <motion.form
                layout
                onSubmit={handleSubmit}
                initial={{ width: "200px" }}
                animate={{ width: "fit-content" }}
                className="flex items-center gap-2 p-1.5 bg-gradient-to-r from-[#14B8A6] to-[#0d9488] text-white rounded-full shadow-[0_8px_30px_rgba(20,184,166,0.4)] border border-white/10 w-80 sm:w-96"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 bg-white/15 text-white placeholder-white/60 focus:bg-white/20 border border-white/5 focus:outline-none rounded-full px-4 py-2 text-xs font-sans transition-all"
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#efc2a5] text-[#2f241f] hover:bg-[#efc2a5]/90 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false)
                    setError("")
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            ) : (
              <motion.button
                layout
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#14B8A6] to-[#0d9488] text-white rounded-full shadow-[0_8px_30px_rgba(20,184,166,0.3)] hover:shadow-[0_8px_30px_rgba(20,184,166,0.5)] transition-all duration-300 hover:scale-105 border border-white/10 group font-mono text-[11px] uppercase tracking-widest font-bold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#efc2a5] animate-pulse" />
                <span>Join Waiting List</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
