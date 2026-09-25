"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AnnouncementBar } from "./announcement-bar"

const navLinks = [
  { href: "/#problem", label: "Problem" },
  { href: "/#why-now", label: "Why Now" },
  { href: "/#how", label: "Product" },
  { href: "/#team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
]

export function Header() {
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
      <AnnouncementBar />
      
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? "bg-[#fffaf6]/80 backdrop-blur-md border-b border-[#efc2a5]/30 py-3" 
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
              className="h-7 w-auto"
              style={{ height: "28px", width: "auto" }}
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-[#2f241f]/70 hover:text-[#2f241f] uppercase tracking-widest text-[10px] font-bold">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/demo" 
              className="px-4 py-2 bg-[#14B8A6] hover:bg-[#0f8f81] text-white rounded-[10px] font-mono uppercase tracking-widest text-[10px] font-bold cursor-pointer transition-all duration-200 shadow-sm hover:shadow"
            >
              book a call
            </Link>
          </div>
          
          <button
            type="button"
            className="icon-action md:hidden -m-2.5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2.5 text-[#2f241f] hover:bg-[#f2e8e1]"
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
              className="md:hidden bg-[#fffaf6]/95 backdrop-blur-xl border-t border-[#efc2a5]/30 overflow-hidden shadow-lg"
            >
              <div className="space-y-1 px-6 pb-6 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-sm text-[#2f241f]/70 hover:text-[#2f241f] hover:bg-[#f2e8e1]/70 transition-colors font-mono uppercase tracking-widest text-[10px] font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link 
                    href="/demo" 
                    className="inline-flex min-h-11 items-center justify-center w-full px-4 py-2.5 bg-[#14B8A6] text-white hover:bg-[#0f8f81] rounded-[10px] font-mono uppercase tracking-widest text-[10px] font-bold text-center cursor-pointer transition-all duration-200 shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    book a call
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
