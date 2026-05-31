'use client'

import { useEffect, useRef } from 'react'

export function ReadProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full bg-accent origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
