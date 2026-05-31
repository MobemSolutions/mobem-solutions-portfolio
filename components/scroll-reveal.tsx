'use client'
import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-animate', 'in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const observe = () =>
      document
        .querySelectorAll<Element>('[data-animate]:not([data-animate="in"])')
        .forEach((el) => io.observe(el))

    observe()

    // Capture elements added dynamically (lazy-loaded sections)
    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.addedNodes.length > 0)) observe()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
