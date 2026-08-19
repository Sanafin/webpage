"use client"

import { useEffect } from "react"

export function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal")
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px"
      }
    )

    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
