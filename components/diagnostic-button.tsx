"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { CircleCheck, Clock, ShieldCheck, X } from "lucide-react"
import { InlineWidget } from "react-calendly"
import { cn } from "@/lib/utils"
import { CALENDLY_URL } from "@/lib/automation-content"

interface DiagnosticModalProps {
  open: boolean
  onClose: () => void
  email?: string
}

export function DiagnosticModal({ open, onClose, email }: DiagnosticModalProps) {
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current()
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnostic-modal-title"
    >
      <div className="absolute inset-0 bg-studio/70 backdrop-blur-md animate-in fade-in-0 duration-300" onClick={onClose} aria-hidden="true" />
      <div className="relative grid max-h-[94vh] w-full max-w-[1040px] overflow-hidden rounded-[20px] bg-white shadow-card animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-500 md:grid-cols-[300px_1fr]">
        <button ref={closeRef} type="button" onClick={onClose} className="icon-control absolute right-3 top-3 z-20 bg-white/90 backdrop-blur" aria-label="Fermer">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Récapitulatif : ce que la personne réserve et ce qui se passe ensuite */}
        <aside className="blue-field flex flex-col gap-5 p-5 text-white sm:p-7">
          <span className="chip-light self-start">Diagnostic gratuit</span>
          <h2 id="diagnostic-modal-title" className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em]">
            Réservez vos 45 minutes
          </h2>
          <ul className="hidden flex-col gap-3 text-[15px] md:flex">
            {[
              { Icon: Clock, text: "45 minutes, en visio" },
              { Icon: CircleCheck, text: "Sans engagement" },
              { Icon: ShieldCheck, text: "Vos données restent chez vous" },
            ].map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <div className="mt-auto hidden rounded-[14px] bg-black/25 p-4 md:block">
            <p className="text-[13px] font-[550] text-white/70">Ensuite</p>
            <ol className="mt-2 flex flex-col gap-1.5 text-[14px] leading-[1.45] text-white/90">
              <li>1. Vous recevez l&apos;invitation par e-mail</li>
              <li>2. On liste ensemble vos tâches répétitives</li>
              <li>3. Vous repartez avec les heures récupérables</li>
            </ol>
          </div>
        </aside>

        {/* Agenda Calendly, avec un écran d'attente tant qu'il charge */}
        <div className="relative min-h-[560px] overflow-y-auto">
          <InlineWidget
            url={CALENDLY_URL}
            prefill={email ? { email } : undefined}
            styles={{ height: "650px", minWidth: "300px" }}
            pageSettings={{ hideGdprBanner: true, primaryColor: "0d44e8" }}
            iframeTitle="Agenda de réservation du diagnostic gratuit"
            LoadingSpinner={CalendarLoading}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

/** Écran d'attente pendant le chargement de Calendly : marque animée, message explicite, squelette d'agenda. */
function CalendarLoading() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-white px-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 text-center">
        <svg viewBox="0 0 48 48" fill="none" className="h-14 w-14 text-ink" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.15">
            <path d="M33 12.5L9 26.5M9 26.5L28.5 40M28.5 40L33 12.5" />
          </g>
          <circle className="loading-node" cx="33" cy="12.5" r="9" fill="currentColor" />
          <circle className="loading-node [animation-delay:200ms]" cx="9" cy="26.5" r="6.5" fill="currentColor" />
          <circle className="loading-node [animation-delay:400ms]" cx="28.5" cy="40" r="6.5" fill="currentColor" />
        </svg>
        <div>
          <p className="text-[17px] font-[550] text-graphite">Chargement de l&apos;agenda…</p>
          <p className="mt-1 text-[14px] text-charcoal">Les créneaux disponibles s&apos;affichent dans quelques secondes.</p>
        </div>
      </div>
      {/* Squelette d'agenda */}
      <div className="w-full max-w-[420px] rounded-[20px] p-5 shadow-card" aria-hidden="true">
        <div className="loading-shimmer mb-5 h-4 w-32 rounded-full" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className={cn("loading-shimmer aspect-square rounded-full", i % 3 === 1 && "opacity-40")} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface DiagnosticButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: "blue" | "outline"
}

export function DiagnosticButton({
  children = "Réserver mon diagnostic gratuit",
  className,
  variant = "blue",
}: DiagnosticButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(variant === "blue" ? "btn-blue" : "btn-outline", className)}
      >
        {children}
      </button>
      <DiagnosticModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
