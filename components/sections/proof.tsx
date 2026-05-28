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
  value, suffix, label, sub, idx,
}: {
  value: number; suffix: string; label: string; sub: string; idx: number
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

  // Borders : right si pas en fin de colonne, bottom si première ligne (mobile 2×2 / tablet)
  const borderRight  = cn(
    idx % 2 === 0 && "border-r border-inverted-foreground/10",          // mobile 2-col
    "lg:border-r-0",
    idx < 3       && "lg:border-r lg:border-inverted-foreground/10"     // desktop 4-col
  )
  const borderBottom = cn(
    idx < 2 && "border-b border-inverted-foreground/10",                // mobile 2-col row 1
    "lg:border-b-0"
  )

  // Padding varié : grande ligne haute, plus compacte en bas sur mobile
  const py = idx < 2 ? "py-7 lg:py-9" : "py-6 lg:py-9"

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-3 px-6 sm:px-7", py, borderRight, borderBottom)}
    >
      <div
        className="font-extrabold leading-[0.9] tracking-[-0.05em] whitespace-nowrap"
        style={{ fontSize: "clamp(60px, 7.5vw, 112px)", fontFeatureSettings: '"tnum" 1' }}
      >
        {Math.round(val)}
        <span className="text-accent" style={{ fontSize: "0.52em" }}>{suffix}</span>
      </div>
      <div className="text-[13px] font-semibold tracking-[-0.005em]">{label}</div>
      <div className="text-[11px] leading-[1.55] text-inverted-foreground/45 max-w-[22ch]">{sub}</div>
    </div>
  )
}

export function ProofSection() {
  return (
    <section id="chiffres" className="bg-inverted text-inverted-foreground" aria-labelledby="proof-heading">
      <h2 id="proof-heading" className="sr-only">Nos engagements</h2>

      {/* Stats grid — 2×2 mobile, 4 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <ProofNumber
            key={i}
            value={s.v}
            suffix={s.s}
            label={s.l}
            sub={s.d}
            idx={i}
          />
        ))}
      </div>
    </section>
  )
}
