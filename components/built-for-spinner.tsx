"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const industries = [
  "Precision Medicine",
  "Digital Health",
  "Value-Based Care",
  "Personalized Pathways",
]

export function BuiltForSpinner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length)
    }, 2000) // 2s per word
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-sans text-foreground/90 leading-[1.1] tracking-tighter font-bold flex items-center justify-center gap-x-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
        <span className="whitespace-nowrap">Get paid for</span>
        <span className="relative flex justify-start h-[1.35em] overflow-hidden w-[220px] sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px]">
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
              className="block text-primary font-sans font-semibold whitespace-nowrap italic text-left w-full"
              style={{
                textShadow: "0 2px 30px rgba(233, 131, 67, 0.3)",
              }}
            >
              {industries[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
    </div>
  )
}
