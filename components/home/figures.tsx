"use client"

import { useEffect, useRef, useState } from "react"
import { Building2, Clock, ReceiptText } from "lucide-react"
import { FIGURES } from "@/lib/automation-content"
import { Eyebrow } from "@/components/home/primitives"

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

const ICONS = { building: Building2, receipt: ReceiptText, clock: Clock }

export function FiguresSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-24" aria-labelledby="figures-heading">
      <div className="blue-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="flex justify-center">
          <Eyebrow id="figures-heading">Pourquoi s&apos;y mettre maintenant</Eyebrow>
        </div>
        <ul className="mx-auto mt-8 grid max-w-[420px] gap-6 md:mt-12 md:max-w-none md:grid-cols-3 md:gap-10">
          {FIGURES.map((f) => {
            const Icon = ICONS[f.icon]
            return (
              <li key={f.value} className="group flex items-center gap-5 md:flex-col md:gap-0 md:text-center">
                <span
                  className="hidden h-12 w-12 items-center md:flex justify-center rounded-full bg-blue/10 text-blue transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <p className="figure-number inline-block w-[2.6em] shrink-0 px-[0.06em] text-[48px] md:mt-5 md:w-auto md:text-[76px] font-semibold leading-[1.05] tracking-[-0.04em] lg:text-[92px]">
                  <CountUp from={f.countFrom} to={f.countTo} suffix={f.suffix} />
                </p>
                <p className="max-w-[22ch] text-[16px] md:mt-3 md:text-[17px] font-[550] leading-[1.4] text-graphite">{f.label}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
