"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { v: 10, s: " j",  l: "Délai moyen de livraison",     d: "Pour les sites essentiels — de la signature à la mise en ligne." },
  { v: 90, s: "+",   l: "Score Lighthouse garanti",      d: "Performance contractualisée. Mesurée à chaque livraison." },
  { v: 3,  s: "",    l: "Associés complémentaires",      d: "Stratégie · Design · Ingénierie. Un seul point de contact." },
  { v: 24, s: " h",  l: "Délai de réponse support",      d: "SLA réponse inclus dès l'offre Expert." },
]

function ProofNumber({
  value, suffix, label, sub, idx, last,
}: {
  value: number; suffix: string; label: string; sub: string; idx: number; last: boolean
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
      className="flex flex-col gap-3 px-7 py-10"
      style={{ borderRight: last ? "none" : "1px solid #1f1f1f" }}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.06em]" style={{ color: "#888" }}>
        0{idx + 1}
      </span>
      <div
        className="font-extrabold leading-[0.9] tracking-[-0.05em]"
        style={{ fontSize: "clamp(72px, 8vw, 120px)", fontFeatureSettings: '"tnum" 1' }}
      >
        {Math.round(val)}
        <span style={{ color: "var(--color-accent)" }}>{suffix}</span>
      </div>
      <div className="text-[14px] font-semibold tracking-[-0.005em]">{label}</div>
      <div className="text-[12px] leading-[1.5]" style={{ color: "#888" }}>{sub}</div>
    </div>
  )
}

export function ProofSection() {
  return (
    <section
      id="chiffres"
      style={{ background: "var(--color-foreground)", color: "var(--color-background)" }}
    >
      {/* Section head */}
      <div
        className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5"
        style={{ borderTop: "1px solid #1f1f1f", borderBottom: "1px solid #1f1f1f" }}
      >
        <h2 className="text-[13px] font-medium uppercase tracking-[0.02em]">Témoignage</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.06em]" style={{ color: "#888" }}>Client — 2025</span>
      </div>

      {/* Quote band */}
      <div
        className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
        style={{ borderBottom: "1px solid #1f1f1f" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-1 font-mono text-[11px]" style={{ color: "#888" }}>—</div>
          <blockquote
            className="lg:col-span-8 font-serif font-normal italic leading-[1.05] tracking-[-0.018em]"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)", margin: 0 }}
          >
            «&nbsp;Mobem ne nous a pas vendu un site. Ils nous ont vendu un{" "}
            <em style={{ color: "var(--color-accent)" }}>plan</em>. Six mois plus tard,
            on a triplé nos demandes entrantes.&nbsp;»
          </blockquote>
          <div className="lg:col-span-3 flex flex-col gap-1 font-mono text-[11px]">
            <span style={{ color: "#888" }}>— Témoignage</span>
            <span className="mt-2 text-[13px] font-medium not-mono" style={{ fontFamily: "var(--font-sans)" }}>
              Directrice marketing
            </span>
            <span style={{ color: "#888" }}>PME industrielle · 80 collab.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
