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
    } catch (err: any) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="relative my-12 overflow-hidden rounded-2xl bg-gradient-to-br from-accent/90 to-accent px-8 py-10 text-white shadow-lg">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/5" />

      {status === 'success' ? (
        /* ── Success ── */
        <div className="relative flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          {/* Animated checkmark */}
          <div className="relative flex items-center justify-center">
            <span
              className="absolute w-14 h-14 rounded-full bg-white/20"
              style={{ animation: "ring-pulse 1.2s ease-out 0.3s forwards" }}
              aria-hidden="true"
            />
            <div className="relative w-14 h-14 rounded-full bg-white/20 ring-4 ring-white/10 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  style={{
                    strokeDasharray: "30",
                    strokeDashoffset: "30",
                    animation: "draw-check 0.6s ease-out 0.4s forwards",
                  }}
                />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-lg font-bold">Vérifiez votre boîte mail !</p>
            <p className="mt-1 text-sm text-white/80 max-w-xs">
              Un email de confirmation vous attend. Cliquez sur le lien pour activer votre accès.
            </p>
          </div>
          <p className="text-xs text-white/50">
            Le formulaire se réinitialise dans{" "}
            <span className="font-semibold tabular-nums">{countdown}s</span>
          </p>
        </div>
      ) : (
        /* ── Form ── */
        <div className="relative flex flex-col sm:flex-row items-center gap-8">
          {/* Left copy */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">Newsletter</p>
            <p className="text-xl font-bold leading-snug mb-1">
              Les analyses qui font la différence
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              Stratégie digitale, design et performance web — directement dans votre boîte mail.
            </p>
          </div>

          {/* Right form */}
          <div className="w-full sm:w-auto sm:min-w-[280px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-accent shadow hover:bg-white/90 active:scale-[0.97] transition-all disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Envoi…</>
                ) : (
                  <>S&apos;abonner gratuitement →</>
                )}
              </button>
              {status === 'error' && (
                <p className="text-xs text-white/80 bg-white/10 rounded-lg px-3 py-2">{error}</p>
              )}
            </form>
            <p className="mt-2 text-center text-[11px] text-white/50">
              Désabonnement en un clic · Aucun spam
            </p>
          </div>
        </div>
      )}

      {/* Depleting progress bar — visible only on success */}
      {status === 'success' && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-b-2xl"
          style={{ width: '100%', animation: 'progress-shrink 10s linear forwards' }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
