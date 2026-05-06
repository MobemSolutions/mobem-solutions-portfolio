"use client"
import { useEffect, useRef } from "react"

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return

    let x = 0, y = 0, tx = 0, ty = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }
    const tick = () => {
      tx += (x - tx) * 0.22
      ty += (y - ty) * 0.22
      cursor.style.left = tx + "px"
      cursor.style.top = ty + "px"
      label.style.left = x + "px"
      label.style.top = y + "px"
      rafId = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      label.style.opacity = "0"
    }
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest("[data-cursor]")
      if (t) {
        cursor.setAttribute("data-mode", t.getAttribute("data-cursor") || "")
        const txt = t.getAttribute("data-cursor-label")
        if (txt) { label.textContent = txt; label.style.opacity = "1" }
        else label.style.opacity = "0"
      } else {
        cursor.removeAttribute("data-mode")
        label.style.opacity = "0"
      }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseover", onOver)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} id="mobem-cursor" aria-hidden="true" />
      <div ref={labelRef} id="mobem-cursor-label" aria-hidden="true" />
    </>
  )
}
