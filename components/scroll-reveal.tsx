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

    const observe = () => {
      const pending = document.querySelectorAll<Element>('[data-animate]:not([data-animate="in"])')
      pending.forEach((el) => io.observe(el))
      return pending.length
    }

    observe()

    // Watch for dynamically added elements (lazy-loaded sections).
    // Disconnects itself once no pending elements remain, or after 8s max.
    const mo = new MutationObserver(() => {
      const remaining = observe()
      if (remaining === 0) mo.disconnect()
    })

    mo.observe(document.body, { childList: true, subtree: true })

    const fallback = setTimeout(() => mo.disconnect(), 8_000)

    return () => {
      clearTimeout(fallback)
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
