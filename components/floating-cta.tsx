"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function FloatingCTA() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the button after scrolling past the hero
    const toggleVisibility = () => setIsVisible(window.scrollY > 600)
    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (pathname === "/demo") return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            href="/demo"
            className="group flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#f15d22] to-[#d03d00] text-white rounded-full shadow-[0_8px_30px_rgba(241,93,34,0.35)] hover:shadow-[0_8px_30px_rgba(241,93,34,0.55)] transition-all duration-300 hover:scale-105 text-[15px] font-medium"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
