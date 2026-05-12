'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useSuccessSound } from '@/hooks/useSuccessSound'
import { useCountdown } from '@/hooks/useCountdown'

export function NewsletterInline() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const playSuccess = useSuccessSound()
  const countdown = useCountdown(10, status === 'success')

  useEffect(() => {
    if (status !== 'success') return
    const t = setTimeout(() => {
      setStatus('idle')
      setEmail('')
    }, 10000)
    return () => clearTimeout(t)
  }, [status])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')
      setStatus('success')
      playSuccess()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      setStatus('error')
    }
  }

  return (
    <div className="relative my-16 bg-inverted text-inverted-foreground border border-inverted-foreground/10">
      {/* Header strip */}
      <div className="flex items-baseline justify-between px-6 py-4 border-b border-inverted-foreground/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
          Newsletter · 1×/mois
        </span>
        <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.08em] text-inverted-foreground/55">
          Aucun spam · désabonnement 1-clic
        </span>
      </div>

      {status === 'success' ? (
        <div className="px-6 py-12 lg:py-16 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent mb-3">
              01 · Confirmation
            </p>
            <p className="text-[28px] sm:text-[32px] font-bold tracking-[-0.025em] leading-[1.05] mb-2">
              Vérifiez votre boîte mail.
            </p>
            <p className="text-[14px] text-inverted-foreground/65 leading-relaxed max-w-md">
              Un email de confirmation vous attend. Cliquez sur le lien pour activer votre accès.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-inverted-foreground/45">
            Réinit. dans <span className="text-accent tabular-nums">{countdown}s</span>
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.1fr_1fr] items-stretch">
          {/* Copy column */}
          <div className="px-6 py-10 lg:py-12 lg:pr-12 lg:border-r lg:border-inverted-foreground/10">
            <p className="font-serif italic text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-[-0.018em]">
              Les analyses qui font la{" "}
              <em className="text-accent not-italic font-serif italic">différence.</em>
            </p>
            <p className="mt-4 text-[14px] leading-[1.6] text-inverted-foreground/70 max-w-[34ch]">
              Stratégie digitale, design et performance web, par l&apos;équipe Mobem. Trois constats,
              deux outils, une question, directement dans votre boîte mail.
            </p>
          </div>

          {/* Form column */}
          <div className="px-6 py-10 lg:py-12 flex flex-col justify-center gap-3">
            <label className="font-mono text-[10px] uppercase tracking-[0.08em] text-inverted-foreground/65" htmlFor="newsletter-inline-email">
              Email professionnel
            </label>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                id="newsletter-inline-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@entreprise.fr"
                required
                className="w-full h-11 bg-inverted-foreground/[0.08] border border-inverted-foreground/20 px-4 text-[14px] text-inverted-foreground placeholder:text-inverted-foreground/45 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 h-11 bg-accent text-accent-foreground px-5 text-[14px] font-semibold cta-hover transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Envoi…</>
                ) : (
                  <>S&apos;abonner →</>
                )}
              </button>
              {status === 'error' && (
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Depleting bar — visible only on success */}
      {status === 'success' && (
        <div
          className="absolute bottom-0 left-0 h-px bg-accent"
          style={{ width: '100%', animation: 'progress-shrink 10s linear forwards' }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
