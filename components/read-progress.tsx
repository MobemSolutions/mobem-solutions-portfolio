"use client"

import { useEffect, useState } from "react"

export function ReadProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollY   = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? scrollY / maxScroll : 0)
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
    >
      <div
        className="h-full bg-accent origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
