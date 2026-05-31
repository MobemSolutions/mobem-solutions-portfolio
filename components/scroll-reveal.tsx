'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollReveal() {
  const pathname = usePathname()
  // Keep a stable ref to the IO so we can call observe() from both
  // the initial effect and the pathname-change effect without re-creating it.
  const ioRef = useRef<IntersectionObserver | null>(null)

  // Create the IO once on mount
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
    ioRef.current = io

    // Targeted MO: only re-observe when new nodes are added to the DOM.
    // Never self-disconnects so it survives SPA navigation.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue
          const el = node as Element
          if (el.matches('[data-animate]:not([data-animate="in"])')) io.observe(el)
          el.querySelectorAll<Element>('[data-animate]:not([data-animate="in"])').forEach((c) => io.observe(c))
        }
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      ioRef.current = null
    }
  }, [])

  // Re-observe all pending elements on every navigation (SPA route change).
  // This handles elements that were already in the DOM before the MO was set up
  // or that became invisible again after a transition.
  useEffect(() => {
    const io = ioRef.current
    if (!io) return
    document
      .querySelectorAll<Element>('[data-animate]:not([data-animate="in"])')
      .forEach((el) => io.observe(el))
  }, [pathname])

  return null
}
