"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const STATS = [
  { v: 10,  s: " j", l: "Livraison garantie",        d: "De la signature à la mise en ligne, délai inscrit au contrat ou reprise à nos frais." },
  { v: 100, s: " %", l: "Livrés dans les délais",    d: "Tous nos projets livrés dans les délais convenus, sans exception." },
  { v: 3,   s: "",   l: "Experts dédiés",             d: "Stratégie, design et code : un seul interlocuteur pour vous." },
  { v: 24,  s: " h", l: "Réponse garantie",           d: "Sur toute demande urgente, en jours ouvrés." },
]

function ProofNumber({
  value, suffix, label, sub, last,
}: {
  value: number; suffix: string; label: string; sub: string; last: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [trig, setTrig] = useState(false)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver((es) => {
      if (es[0]?.isIntersecting) { setTrig(true); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!trig) return
    let raf: number
    const start = performance.now()
    const duration = 1500
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [trig, value])

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 px-7 py-10",
        !last && "border-r border-inverted-foreground/10",
      )}
    >
      <div
        className="font-extrabold leading-[0.9] tracking-[-0.05em] whitespace-nowrap"
        style={{ fontSize: "clamp(72px, 8vw, 120px)", fontFeatureSettings: '"tnum" 1' }}
      >
        {Math.round(val)}
        <span className="text-accent" style={{ fontSize: "0.55em" }}>{suffix}</span>
      </div>
      <div className="text-[14px] font-semibold tracking-[-0.005em]">{label}</div>
      <div className="text-[12px] leading-[1.5] text-inverted-foreground/55">{sub}</div>
    </div>
  )
}

export function ProofSection() {
  return (
    <section id="chiffres" className="bg-inverted text-inverted-foreground" aria-labelledby="proof-heading">
      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-7 lg:py-9 border-t border-b border-inverted-foreground/10">
        <h2 id="proof-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">Nos engagements</h2>
        {/* <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-inverted-foreground/55">Contractuels — 2026</span> */}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <ProofNumber
            key={i}
            value={s.v}
            suffix={s.s}
            label={s.l}
            sub={s.d}
            last={i === STATS.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
