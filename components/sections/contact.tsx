"use client"

import { useState, useEffect } from "react"
import { useCountdown } from "@/hooks/useCountdown"
import { createPortal } from "react-dom"
import { ArrowRight, CheckCircle2, MapPin, Mail, Phone, Clock, Shield, Users, CalendarDays, Loader2, X } from "lucide-react"
import { useSuccessSound } from "@/hooks/useSuccessSound"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InlineWidget } from "react-calendly"
import { CopyEmail } from "@/components/ui/copy-email"

const CALENDLY_URL = "https://calendly.com/contact-mobem-solutions/15min"

const SERVICES = [
  "Design UI/UX",
  "Création de site vitrine",
  "Refonte de site existant",
  "Application web (SaaS / backoffice)",
  "Application mobile",
  "E-commerce",
  "SEO & Référencement naturel",
  "Conseil & stratégie digitale",
]

const BUDGET_OPTIONS = [
  "Moins de 3 000 €",
  "3 000 – 8 000 €",
  "8 000 – 20 000 €",
  "Plus de 20 000 €",
  "Budget non défini",
]

const reassuranceItems = [
  { icon: Clock,  title: "Réponse sous 24h",        description: "Nous revenons vers vous rapidement" },
  { icon: Shield, title: "Confidentialité garantie", description: "Vos données restent privées" },
  { icon: Users,  title: "Contact direct",           description: "Échangez directement avec un associé" },
]

const contactInfo = [
  { icon: MapPin, label: "Nantes, France" },
  { icon: Mail,   label: "contact@mobem-solutions.com", href: "mailto:contact@mobem-solutions.com", copy: true },
  { icon: Phone,  label: "07 84 27 53 83",              href: "tel:+33784275383" },
]

interface FormState {
  name: string
  email: string
  phone: string
  company: string
  services: string
  budget: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
  submit?: string
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

function SuccessCard({ name, email, onReset }: { name: string; email: string; onReset: () => void }) {
  const firstName = name.split(" ")[0]
  const countdown = useCountdown(10, true)

  useEffect(() => {
    const t = setTimeout(onReset, 10000)
    return () => clearTimeout(t)
  }, [onReset])

  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center gap-5 animate-in fade-in zoom-in-95 duration-500 pb-2">
      {/* Animated checkmark */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring */}
        <span
          className="absolute w-20 h-20 rounded-full bg-green-500/20"
          style={{ animation: "ring-pulse 1.2s ease-out 0.3s forwards" }}
          aria-hidden="true"
        />
        <div className="relative w-20 h-20 rounded-full bg-green-500/10 ring-8 ring-green-500/5 flex items-center justify-center">
          <svg
            className="w-9 h-9 text-green-500"
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

      {/* Text */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Merci {firstName}&nbsp;!
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Votre message est bien envoyé. Nous vous répondons sous 24 heures ouvrées.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Confirmation à{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      {/* Countdown note */}
      <p className="text-xs text-muted-foreground/60 animate-in fade-in duration-500 delay-500">
        Le formulaire se réinitialise dans{" "}
        <span className="font-semibold tabular-nums">{countdown}s</span>
      </p>

      {/* Depleting progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-green-500/60 rounded-b-2xl"
        style={{ animation: "progress-shrink 10s linear forwards", transformOrigin: "left" }}
        aria-hidden="true"
      />
    </div>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    name: "", email: "", phone: "", company: "", services: "", budget: "", message: "",
  })
  const [errors, setErrors]       = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted]   = useState(false)
  const playSuccess = useSuccessSound()
  const [calendlyOpen, setCalendlyOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = calendlyOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [calendlyOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Votre nom est requis"
    if (!formData.email.trim()) {
      newErrors.email = "Votre email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide"
    }
    if (!formData.message.trim()) newErrors.message = "Décrivez-nous votre projet"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, services: formData.services ? [formData.services] : [] }),
      })
      if (!res.ok) {
        const data = await res.json()
        setErrors({ submit: data.error ?? "Erreur lors de l'envoi. Réessayez." })
        return
      }
      setIsSubmitted(true)
      playSuccess()
    } catch {
      setErrors({ submit: "Impossible de contacter le serveur. Réessayez." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({ name: "", email: "", phone: "", company: "", services: "", budget: "", message: "" })
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Contact
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            <span className="text-balance">
              Parlons de <span className="text-accent">votre projet</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Remplissez le formulaire ou réservez directement un créneau avec notre équipe.
          </p>
        </div>

        {/* Grid — no items-start so columns stretch to equal height */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ── Formulaire (3/5) ── */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 flex flex-col flex-1 relative overflow-hidden">

              {isSubmitted ? (
                /* ── Success state ── */
                <SuccessCard name={formData.name} email={formData.email} onReset={resetForm} />
              ) : (
                /* ── Form ── */
                <>
                  <h3 className="text-base font-semibold text-foreground mb-6">Décrivez votre projet</h3>
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col flex-1">
                    <div className="flex flex-col gap-4 flex-1">

                      {/* Row 1 : Nom | Email */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Nom complet <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Prénom Nom"
                            aria-invalid={!!errors.name}
                            className={cn("text-sm", errors.name && "border-destructive focus-visible:ring-destructive")}
                          />
                          {errors.name && <p className="text-xs text-destructive" role="alert">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="vous@entreprise.fr"
                            aria-invalid={!!errors.email}
                            className={cn("text-sm", errors.email && "border-destructive focus-visible:ring-destructive")}
                          />
                          {errors.email && <p className="text-xs text-destructive" role="alert">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Row 2 : Téléphone | Entreprise */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Téléphone <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="06 00 00 00 00"
                            className="text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="company" className="text-sm font-medium">
                            Entreprise <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
                          </Label>
                          <Input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Raison sociale"
                            className="text-sm"
                          />
                        </div>
                      </div>

                      {/* Row 3 : Type de projet | Budget */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="services" className="text-sm font-medium">
                            Type de projet <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
                          </Label>
                          <select
                            id="services"
                            value={formData.services}
                            onChange={(e) => handleChange("services", e.target.value)}
                            className={selectClass}
                          >
                            <option value="">Sélectionner…</option>
                            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="budget" className="text-sm font-medium">
                            Budget estimé <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
                          </Label>
                          <select
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => handleChange("budget", e.target.value)}
                            className={selectClass}
                          >
                            <option value="">Fourchette budgétaire</option>
                            {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Message — grows to fill remaining card height */}
                      <div className="flex flex-col flex-1 gap-1.5 min-h-0">
                        <Label htmlFor="message" className="text-sm font-medium">
                          Description du projet <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Décrivez votre besoin, vos contraintes et vos délais indicatifs."
                          aria-invalid={!!errors.message}
                          className={cn(
                            "resize-none text-sm flex-1 min-h-[120px]",
                            errors.message && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                        {errors.message && <p className="text-xs text-destructive" role="alert">{errors.message}</p>}
                      </div>

                      {errors.submit && (
                        <p className="text-sm text-destructive text-center" role="alert">{errors.submit}</p>
                      )}

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                          Vos données sont utilisées uniquement pour vous recontacter.
                        </p>
                        <Button
                          type="submit"
                          size="lg"
                          className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold active:scale-[0.97] transition-all"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi en cours…</>
                          ) : (
                            <>Soumettre mon projet <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></>
                          )}
                        </Button>
                      </div>

                    </div>
                  </form>
                </>
              )}

            </div>
          </div>

          {/* ── Sidebar (2/5) ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Calendly popup card */}
            <div className="relative rounded-2xl border border-accent/25 bg-accent/5 p-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl pointer-events-none" aria-hidden="true" />

              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                  <CalendarDays className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>

                <h3 className="text-base font-bold text-foreground mb-1">
                  Préférez un échange direct ?
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Réservez un appel de 15 minutes avec un de nos associés. Gratuit, sans engagement.
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {["15 min", "Gratuit", "Sans engagement"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCalendlyOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/90 active:scale-[0.98] transition-all"
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  Choisir un créneau
                </button>
              </div>
            </div>

            {/* Pourquoi + Nous retrouver — flex-1 so it fills remaining sidebar height */}
            <div className="bg-card rounded-2xl border border-border p-6 flex flex-col flex-1">

              <h3 className="text-sm font-semibold text-foreground mb-4">Pourquoi nous contacter ?</h3>
              <div className="space-y-3 mb-6">
                {reassuranceItems.map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-none mb-0.5">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-5 mt-auto">
                <h3 className="text-sm font-semibold text-foreground mb-4">Nous retrouver</h3>
                <div className="space-y-3">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                      </div>
                      {info.copy ? (
                        <CopyEmail email={info.label} className="text-xs" />
                      ) : info.href ? (
                        <a href={info.href} className="text-xs text-accent hover:text-accent/80 transition-colors">
                          {info.label}
                        </a>
                      ) : (
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {mounted && calendlyOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCalendlyOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <button
              onClick={() => setCalendlyOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-zinc-700" />
            </button>
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: "670px", minWidth: "320px" }}
              pageSettings={{ hideGdprBanner: true }}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
