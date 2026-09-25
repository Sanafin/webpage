"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/#problem", label: "Problem" },
  { href: "/#why-now", label: "Why Now" },
  { href: "/#how", label: "Product" },
  { href: "/#team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
]

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      <div 
        className={`transition-all duration-300 ${
          isScrolled
            ? dark
              ? "bg-[#120d0b]/92 backdrop-blur-md border-b border-white/10 py-3"
              : "bg-white/80 backdrop-blur-md border-b border-[#ece7e2] py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center rounded-sm transition-opacity hover:opacity-80">
            <Image
              src="/images/sanafin_logo.png"
              alt="Sanafin"
              width={110}
              height={36}
              className={`h-7 w-auto ${dark ? "brightness-0 invert" : ""}`}
              style={{ height: "28px", width: "auto" }}
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link text-[14px] ${dark ? "text-[#fffaf6]/65 hover:text-[#fffaf6]" : "text-[#1f1a17]/65 hover:text-[#1f1a17]"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/demo" 
              className={`px-4 py-2 text-white rounded-full text-[14px] font-medium cursor-pointer transition-colors duration-200 ${dark ? "bg-[#f15d22] hover:bg-[#d03d00]" : "bg-[#f15d22] hover:bg-[#d94f18]"}`}
            >
              Book a call
            </Link>
          </div>
          
          <button
            type="button"
            className={`icon-action md:hidden -m-2.5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2.5 ${dark ? "text-[#fffaf6] hover:bg-white/10" : "text-[#2f241f] hover:bg-[#f2e8e1]"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">{mobileMenuOpen ? "Close main menu" : "Open main menu"}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile-navigation"
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#ece7e2] overflow-hidden shadow-lg"
            >
              <div className="space-y-1 px-6 pb-6 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-[15px] text-[#1f1a17]/75 hover:text-[#1f1a17] hover:bg-[#f3efeb] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link 
                    href="/demo" 
                    className="inline-flex min-h-11 items-center justify-center w-full px-4 py-2.5 bg-[#f15d22] text-white hover:bg-[#d94f18] rounded-full text-[15px] font-medium text-center cursor-pointer transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book a call
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
