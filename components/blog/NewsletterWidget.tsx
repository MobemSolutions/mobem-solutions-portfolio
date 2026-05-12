"use client"

import { useState, useEffect, useRef } from "react"

type FormState = "idle" | "loading" | "success" | "error" | "already-subscribed"

function CheckSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset="0" d="M5 13l4 4L19 7"
        style={{ animation: "draw-check 0.4s ease-out forwards" }}
      />
    </svg>
  )
}

function ArrowSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function SpinnerSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}

export function NewsletterWidget() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<FormState>("idle")
  const [seconds, setSeconds] = useState(10)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/ressources/sounds/mixkit-bubble-pop-up-alert-notification-2357.wav")
    audioRef.current.volume = 0.55
  }, [])

  useEffect(() => {
    if (state !== "success") return
    if (seconds <= 0) {
      setState("idle")
      setEmail("")
      setSeconds(10)
      return
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [state, seconds])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === "loading") return

    setState("loading")

    try {
      audioRef.current!.currentTime = 0
      audioRef.current!.play().catch(() => {})
    } catch {}

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setState("success")
        setSeconds(10)
      } else if (res.status === 409) {
        setState("already-subscribed")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col gap-4">
        {/* Progress bar */}
        <div className="w-full h-[3px] bg-border overflow-hidden">
          <div
            className="h-full bg-accent origin-left"
            style={{ animation: "progress-shrink 10s linear forwards" }}
          />
        </div>

        {/* Confirmation card */}
        <div className="border border-accent/30 bg-accent/5 px-6 py-5 flex items-start gap-5">
          <div className="w-9 h-9 bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckSvg />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[15px] tracking-[-0.01em] mb-1">
              Email de confirmation envoyé !
            </p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Vérifiez votre boîte mail et cliquez sur le lien pour activer votre abonnement.
            </p>
          </div>
          <span className="font-mono text-[13px] text-accent font-bold tabular-nums flex-shrink-0 self-center">
            {seconds}s
          </span>
        </div>
      </div>
    )
  }

  if (state === "already-subscribed") {
    return (
      <div className="border border-border bg-secondary px-6 py-4 flex items-center justify-between gap-4">
        <p className="text-[13px] text-foreground leading-relaxed">
          Cette adresse est déjà abonnée à notre newsletter.
        </p>
        <button
          onClick={() => { setState("idle"); setEmail("") }}
          className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          OK
        </button>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div className="flex flex-col gap-4">
        <div className="border border-destructive/30 bg-destructive/5 px-6 py-4 flex items-center justify-between gap-4">
          <p className="text-[13px] text-destructive leading-relaxed">
            Une erreur est survenue. Réessayez dans quelques instants.
          </p>
          <button
            onClick={() => setState("idle")}
            className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex border border-border" style={{ padding: "4px" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@entreprise.fr"
          required
          disabled={state === "loading"}
          autoComplete="email"
          className="flex-1 bg-transparent border-0 outline-none px-4 py-4 text-[15px] text-foreground placeholder:text-muted-foreground disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          data-cursor="hover"
          className="inline-flex items-center gap-2.5 px-6 py-4 bg-accent text-accent-foreground text-[13px] font-medium whitespace-nowrap cta-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {state === "loading" ? (
            <>
              Envoi…
              <SpinnerSvg />
            </>
          ) : (
            <>
              S&apos;abonner
              <ArrowSvg />
            </>
          )}
        </button>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
        Nouvel article chaque mois · Désabonnement en un clic · Zéro spam
      </p>
    </form>
  )
}
