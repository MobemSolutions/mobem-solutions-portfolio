"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { v: 10,  s: " j", l: "Livraison garantie",        d: "De la signature à la mise en ligne, délai inscrit au contrat ou reprise à nos frais." },
  { v: 100, s: " %", l: "Livrés dans les délais",    d: "Tous nos projets livrés dans les délais convenus, sans exception." },
  { v: 3,   s: "",   l: "Experts dédiés",             d: "Stratégie, design et code : un seul interlocuteur pour vous." },
  { v: 24,  s: " h", l: "Réponse garantie",           d: "Sur toute demande urgente, en jours ouvrés." },
]

function ProofNumber({
  value, suffix, label, sub,
}: {
  value: number; suffix: string; label: string; sub: string
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
      className="flex flex-col items-center text-center gap-3 px-6 sm:px-7 py-14 lg:py-20"
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
          />
        ))}
      </div>
    </section>
  )
}
