"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Système d'animation au scroll — Intersection Observer + Mutation Observer.
 *
 * Le MutationObserver est indispensable : les sections chargées via dynamic()
 * montent APRÈS le premier rendu, donc un simple setTimeout les raterait.
 * Dès qu'un nœud [data-animate] apparaît dans le DOM (quelle que soit l'origine),
 * il est immédiatement observé par l'Intersection Observer.
 */
export function ScrollAnimator() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.setProperty("--animate-delay", `${el.dataset.animateDelay ?? "0"}ms`)
          el.classList.add("in-view")
          io.unobserve(el)
        })
      },
      { threshold: 0.07, rootMargin: "0px 0px -20px 0px" },
    )

    const observe = (node: Element) => {
      if (!(node instanceof HTMLElement)) return
      if (node.classList.contains("in-view")) return
      io.observe(node)
    }

    // Éléments déjà présents dans le DOM (SSR + composants non-dynamiques)
    document.querySelectorAll("[data-animate]").forEach(observe)

    // Éléments ajoutés après montage (dynamic imports, suspense, etc.)
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue
          if (node.matches("[data-animate]")) observe(node)
          node.querySelectorAll("[data-animate]").forEach(observe)
        }
      }
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
