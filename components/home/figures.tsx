"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { FIGURES } from "@/lib/automation-content"

/** Compte jusqu'à `to` quand l'élément entre à l'écran (valeur finale directe si moins d'animations). */
function CountUp({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setValue(from)
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 1600
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 4)
          setValue(Math.round(from + (to - from) * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [from, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export function FiguresSection() {
  return (
    <section className="relative py-16 lg:py-24" aria-labelledby="figures-heading">
      <div className="blue-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <p id="figures-heading" className="text-center type-meta text-charcoal">
          Pourquoi s&apos;y mettre maintenant
        </p>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-0">
          {FIGURES.map((f, i) => (
            <div
              key={f.value}
              className={cn("flex flex-col items-center px-6 text-center md:px-10", i > 0 && "md:border-l md:border-border")}
            >
              <p className="figure-number text-[72px] font-semibold leading-none tracking-[-0.05em] sm:text-[88px]">
                <CountUp from={f.countFrom} to={f.countTo} suffix={f.suffix} />
              </p>
              <p className="mt-5 max-w-[26ch] text-[17px] leading-[1.5] text-graphite">{f.label}</p>
              <p className="mt-4 type-caption text-charcoal">Source : {f.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
