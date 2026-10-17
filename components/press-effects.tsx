"use client"

import { useEffect } from "react"

const TARGETS = ".btn-blue, .btn-outline, .icon-control, a.card-lift, [data-ripple]"

/** Ajoute une onde au point de clic sur les éléments interactifs (désactivé si moins d'animations). */
export function PressEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onDown = (e: PointerEvent) => {
      if (reduce.matches) return
      const el = (e.target as Element | null)?.closest<HTMLElement>(TARGETS)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const ripple = document.createElement("span")
      ripple.className = "press-ripple"
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
      el.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove())
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [])
  return null
}
