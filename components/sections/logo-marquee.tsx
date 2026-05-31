"use client"

import { useEffect, useRef } from "react"

const STACK = [
  { name: "Next.js",              src: "/ressources/caroussel-logos/technos/icons8-next.js.svg" },
  { name: "TypeScript",           src: "/ressources/caroussel-logos/technos/typescript.svg" },
  { name: "Tailwind CSS",         src: "/ressources/caroussel-logos/technos/icons8-tailwind-css.svg" },
  { name: "Node.js",              src: "/ressources/caroussel-logos/technos/icons8-nodejs.svg" },
  { name: "Supabase",             src: "/ressources/caroussel-logos/technos/icons8-supabase.svg" },
  { name: "PostgreSQL",           src: "/ressources/caroussel-logos/technos/icons8-postgresql.svg" },
  { name: "Claude AI",            src: "/ressources/caroussel-logos/technos/icons8-claude.svg" },
  { name: "Vercel",               src: "/ressources/caroussel-logos/technos/vercel-icon-svgrepo-com.svg" },
  { name: "Docker",               src: "/ressources/caroussel-logos/technos/icons8-docker.svg" },
  { name: "GitHub",               src: "/ressources/caroussel-logos/technos/icons8-github.svg" },
  { name: "Google Search Console",src: "/ressources/caroussel-logos/technos/icons8-google-web-search.svg" },
  { name: "W3C",                  src: "/ressources/caroussel-logos/technos/w3c-ar21.svg" },
]

const SPEED = 0.12 // px/ms ≈ 120px/s

function StackItem({ name, src }: { name: string; src: string }) {
  return (
    <div
      className="inline-flex flex-col items-center justify-center shrink-0 gap-3 py-7 px-12"
    >
      <div
        className="bg-foreground/50 transition-colors"
        style={{
          width: "32px",
          height: "32px",
          mask: `url(${src}) center / contain no-repeat`,
          WebkitMask: `url(${src}) center / contain no-repeat`,
        }}
        aria-hidden="true"
      />
      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function LogoMarquee() {
  const trackRef   = useRef<HTMLDivElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const pausedRef  = useRef(false)
  const visibleRef = useRef(true) // start optimistic — IO fires immediately

  useEffect(() => {
    const track = trackRef.current
    const wrap  = wrapRef.current
    if (!track || !wrap) return

    let x = 0
    let setWidth = 0
    let rafId: number
    let lastTime: number | null = null

    const measure = () => { setWidth = track.scrollWidth / 2 }

    const tick = (now: number) => {
      // Skip animation when out of viewport (saves 60fps rAF work)
      if (visibleRef.current && lastTime !== null && !pausedRef.current) {
        const dt = now - lastTime
        x -= SPEED * dt
        if (setWidth > 0 && x <= -setWidth) x += setWidth
        track.style.transform = `translateX(${x}px)`
      }
      lastTime = now
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(() => {
      measure()
      rafId = requestAnimationFrame(tick)
    })

    // Pause when scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    io.observe(wrap)

    const pause  = () => { pausedRef.current = true }
    const resume = () => { pausedRef.current = false }
    wrap.addEventListener("mouseenter", pause)
    wrap.addEventListener("focusin",    pause)
    wrap.addEventListener("mouseleave", resume)
    wrap.addEventListener("focusout",   resume)

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      wrap.removeEventListener("mouseenter", pause)
      wrap.removeEventListener("focusin",    pause)
      wrap.removeEventListener("mouseleave", resume)
      wrap.removeEventListener("focusout",   resume)
    }
  }, [])

  const items = [...STACK, ...STACK]

  return (
    <div
      ref={wrapRef}
      role="region"
      aria-label="Stack technique"
      className="overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {items.map((s, i) => (
          <StackItem key={`${s.name}-${i}`} name={s.name} src={s.src} />
        ))}
      </div>
    </div>
  )
}
