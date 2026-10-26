"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowLeft, ArrowRight, Check, Loader2, Mail, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { SentIllustration } from "@/components/ui/sent-illustration"
import { BookingModal } from "@/components/booking-button"
import {
  HOURS,
  SECTORS,
  TASKS,
  TEAM_SIZES,
  TIMINGS,
  TOOLS,
  type ContactPayload,
} from "@/lib/contact-options"

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  company: "",
  phone: "",
  sector: "",
  teamSize: "",
  tasks: [],
  hours: "",
  tools: [],
  message: "",
  timing: "",
  website: false,
  consent: false,
  url: "",
}

const STEPS = [
  { title: "Faisons connaissance", hint: "Pour savoir à qui nous parlons." },
  { title: "Ce qui vous prend du temps", hint: "Cochez tout ce qui s'applique, même approximativement." },
  { title: "Votre projet", hint: "Quelques détails pour préparer notre réponse." },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ─── Petits éléments de formulaire ─────────────────── */
function Field({ label, htmlFor, optional, error, children }: {
  label: string
  htmlFor?: string
  optional?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[14px] font-[550] text-graphite">
        {label}
        {optional && <span className="ml-1.5 font-normal text-charcoal">(facultatif)</span>}
      </label>
      {children}
      {error && (
        <p className="text-[13px] text-[#c62828]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const INPUT =
  "min-h-[46px] w-full rounded-[14px] border border-input bg-white px-4 text-[15px] text-graphite placeholder:text-charcoal/70 transition-[border-color,box-shadow] focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10"

/** Groupe de puces : choix unique (radio) ou multiple (cases). */
function ChipGroup<T extends string>({ label, options, value, onChange, multiple, error }: {
  label: string
  options: readonly T[]
  value: T | "" | T[]
  onChange: (v: T | T[]) => void
  multiple?: boolean
  error?: string
}) {
  const selected = (o: T) => (multiple ? (value as T[]).includes(o) : value === o)
  const toggle = (o: T) => {
    if (!multiple) return onChange(o)
    const arr = value as T[]
    onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o])
  }
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-[14px] font-[550] text-graphite">{label}</legend>
      <div className="flex flex-wrap gap-2" role={multiple ? "group" : "radiogroup"}>
        {options.map((o) => {
          const on = selected(o)
          return (
            <button
              key={o}
              type="button"
              role={multiple ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => toggle(o)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[12px] border px-3.5 py-2 text-[14px] font-[550] transition-all duration-200 active:scale-95",
                on
                  ? "border-blue bg-blue text-white shadow-[0_6px_16px_-8px_rgba(13,68,232,0.7)]"
                  : "border-input bg-white text-graphite hover:border-graphite/40 hover:bg-black/[0.02]"
              )}
            >
              {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
              {o}
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-[13px] text-[#c62828]" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

/* ─── Fenêtre de contact ────────────────────────────── */
export function ContactModal({ open, onClose, onBook }: { open: boolean; onClose: () => void; onBook?: (email: string) => void }) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ContactPayload>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [serverError, setServerError] = useState("")
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    dialogRef.current?.querySelector<HTMLElement>("input, button")?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current()
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Remet le formulaire à zéro une fois la demande envoyée et la fenêtre fermée.
  useEffect(() => {
    if (open || status !== "sent") return
    setData(EMPTY)
    setStep(0)
    setStatus("idle")
  }, [open, status])

  const set = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: "" }))
  }

  const validate = (s: number) => {
    const e: Record<string, string> = {}
    if (s === 0) {
      if (!data.name.trim()) e.name = "Indiquez votre nom."
      if (!EMAIL_RE.test(data.email.trim())) e.email = "Indiquez une adresse e-mail valide."
      if (!data.sector) e.sector = "Choisissez votre métier."
    }
    if (s === 1 && data.tasks.length === 0) e.tasks = "Choisissez au moins une tâche."
    if (s === 2 && !data.consent) e.consent = "Votre accord est nécessaire pour que nous puissions vous répondre."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => validate(step) && setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    if (!validate(2)) return
    setStatus("sending")
    setServerError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || "L'envoi a échoué.")
      setStatus("sent")
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "L'envoi a échoué.")
      setStatus("error")
    }
  }

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div className="absolute inset-0 bg-studio/70 backdrop-blur-md animate-in fade-in-0 duration-300" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className="relative flex max-h-[94vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[20px] bg-white shadow-card animate-in fade-in-0 slide-in-from-bottom-6 duration-500 sm:rounded-[20px] sm:zoom-in-95"
      >
        {/* En-tête */}
        <div className="border-b border-border px-5 pb-5 pt-5 sm:px-8 sm:pt-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 type-meta text-blue">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Nous écrire
              </p>
              <h2 id="contact-title" className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[28px]">
                {status === "sent" ? "C'est bien reçu." : STEPS[step].title}
              </h2>
              {status !== "sent" && <p className="mt-1 text-[15px] text-charcoal">{STEPS[step].hint}</p>}
            </div>
            <button type="button" onClick={onClose} className="icon-control shrink-0" aria-label="Fermer">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {status !== "sent" && (
            <div
              className="mt-5 flex gap-2"
              role="progressbar"
              aria-label="Progression du formulaire"
              aria-valuemin={1}
              aria-valuemax={STEPS.length}
              aria-valuenow={step + 1}
              aria-valuetext={`Étape ${step + 1} sur ${STEPS.length}`}
            >
              {STEPS.map((s, i) => (
                <span key={s.title} className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]" aria-hidden="true">
                  <span className={cn("block h-full rounded-full bg-blue transition-[width] duration-500 ease-out", i <= step ? "w-full" : "w-0")} />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {status === "sent" ? (
            <div className="flex flex-col items-center py-2 text-center">
              <SentIllustration className="h-36 w-44 animate-in fade-in-0 zoom-in-90 duration-700" />
              <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.65] text-charcoal">
                Nous étudions vos réponses et revenons vers vous <strong className="text-ink">sous 24 heures ouvrées</strong>.
                Un e-mail de confirmation vient de partir à <strong className="text-ink">{data.email}</strong>.
              </p>
              {/* Encadré : aller plus vite, comme dans l'e-mail de confirmation */}
              <div className="hairline mt-7 w-full max-w-[520px] p-5 text-left">
                <p className="flex items-center gap-2.5 text-[15px] font-[650] text-ink">
                  <Info className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  Envie d&apos;aller plus vite ?
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-charcoal">
                  Choisissez directement un créneau pour un échange de 20 minutes, gratuit et sans engagement.
                </p>
                <button
                  type="button"
                  onClick={() => { onClose(); onBook?.(data.email) }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e6edff] px-4 py-2 text-[14px] font-[600] text-blue transition-colors hover:bg-[#d8e3ff]"
                >
                  Réserver un échange
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-6 text-[14px] text-charcoal">
                Pas d&apos;e-mail reçu ? Regardez dans vos spams, ou écrivez-nous à{" "}
                <a href="mailto:contact@mobem-solutions.com" className="font-[600] text-blue">contact@mobem-solutions.com</a>
              </p>
            </div>
          ) : (
            <form
              key={step}
              onSubmit={(e) => {
                e.preventDefault()
                if (step < STEPS.length - 1) next()
                else submit()
              }}
              noValidate
              className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-right-4 duration-300"
              id="contact-form"
            >
              {/* Champ piège anti-spam, invisible pour les humains */}
              <input type="text" name="url" tabIndex={-1} autoComplete="off" value={data.url} onChange={(e) => set("url", e.target.value)} className="hidden" aria-hidden="true" />

              {step === 0 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nom et prénom" htmlFor="c-name" error={errors.name}>
                      <input id="c-name" className={INPUT} value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Camille Martin" aria-invalid={!!errors.name} />
                    </Field>
                    <Field label="E-mail professionnel" htmlFor="c-email" error={errors.email}>
                      <input id="c-email" type="email" className={INPUT} value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="camille@entreprise.fr" aria-invalid={!!errors.email} />
                    </Field>
                    <Field label="Entreprise" htmlFor="c-company" optional>
                      <input id="c-company" className={INPUT} value={data.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" placeholder="Nom de votre structure" />
                    </Field>
                    <Field label="Téléphone" htmlFor="c-phone" optional>
                      <input id="c-phone" type="tel" className={INPUT} value={data.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="06 12 34 56 78" />
                    </Field>
                  </div>
                  <ChipGroup label="Votre métier" options={SECTORS} value={data.sector} onChange={(v) => set("sector", v as ContactPayload["sector"])} error={errors.sector} />
                  <ChipGroup label="Taille de l'équipe" options={TEAM_SIZES} value={data.teamSize} onChange={(v) => set("teamSize", v as ContactPayload["teamSize"])} />
                </>
              )}

              {step === 1 && (
                <>
                  <ChipGroup label="Les tâches qui reviennent sans cesse" options={TASKS} value={data.tasks} multiple onChange={(v) => set("tasks", v as ContactPayload["tasks"])} error={errors.tasks} />
                  <ChipGroup label="Temps passé dessus chaque semaine (environ)" options={HOURS} value={data.hours} onChange={(v) => set("hours", v as ContactPayload["hours"])} />
                  <ChipGroup label="Les outils que vous utilisez" options={TOOLS} value={data.tools} multiple onChange={(v) => set("tools", v as ContactPayload["tools"])} />
                </>
              )}

              {step === 2 && (
                <>
                  <Field label="Décrivez la tâche qui vous fait perdre le plus de temps" htmlFor="c-message" optional>
                    <textarea
                      id="c-message"
                      rows={4}
                      maxLength={5000}
                      className={cn(INPUT, "min-h-[120px] resize-y py-3 leading-[1.6]")}
                      value={data.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Ex. : chaque fin de mois, nous relançons à la main une trentaine de clients pour récupérer leurs justificatifs…"
                    />
                  </Field>
                  <ChipGroup label="Quand aimeriez-vous démarrer ?" options={TIMINGS} value={data.timing} onChange={(v) => set("timing", v as ContactPayload["timing"])} />
                  <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-input p-4 transition-colors hover:bg-black/[0.02]">
                    <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#0d44e8]" checked={data.website} onChange={(e) => set("website", e.target.checked)} />
                    <span className="text-[14px] leading-[1.5] text-graphite">
                      J&apos;ai aussi besoin d&apos;un site internet
                      <span className="block text-charcoal">Site vitrine sobre et rapide, relié à vos automatisations.</span>
                    </span>
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#0d44e8]"
                        checked={data.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        aria-invalid={!!errors.consent}
                      />
                      <span className="text-[13px] leading-[1.55] text-charcoal">
                        J&apos;accepte que Mobem Solutions utilise ces informations pour me répondre. Elles ne sont jamais
                        cédées. <a href="/confidentialite" target="_blank" className="text-blue underline underline-offset-2">En savoir plus</a>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[13px] text-[#c62828]" role="alert">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                  {status === "error" && (
                    <div className="rounded-[14px] bg-[#c62828]/[0.06] p-4 text-[14px] text-graphite" role="alert">
                      {serverError} Vous pouvez aussi nous écrire directement à{" "}
                      <a href="mailto:contact@mobem-solutions.com" className="font-[550] text-blue underline underline-offset-2">contact@mobem-solutions.com</a>.
                    </div>
                  )}
                </>
              )}
            </form>
          )}
        </div>

        {/* Pied : navigation */}
        {status !== "sent" && (
          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-8">
            {step > 0 ? (
              <button type="button" onClick={back} className="btn-outline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Retour
              </button>
            ) : (
              <span className="text-[13px] text-charcoal">Environ 1 minute</span>
            )}
            <button type="submit" form="contact-form" className="btn-blue min-w-[150px]" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi…
                </>
              ) : step < STEPS.length - 1 ? (
                <>
                  Continuer
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

/** Bouton qui ouvre le formulaire de contact. */
export function ContactButton({ children = "Nous écrire", className }: { children?: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false)
  const [booking, setBooking] = useState<string | null>(null)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} onBook={(email) => setBooking(email)} />
      <BookingModal open={booking !== null} onClose={() => setBooking(null)} email={booking || undefined} />
    </>
  )
}
