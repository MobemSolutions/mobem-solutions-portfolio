"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Check, MapPin, Mail, Phone, Clock, Loader2, X, CalendarDays } from "lucide-react"
import { useSuccessSound } from "@/hooks/useSuccessSound"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InlineWidget } from "react-calendly"

const CALENDLY_URL = "https://calendly.com/contact-mobem-solutions/15min"

const SERVICES = [
  "Design UI/UX",
  "Site vitrine",
  "Refonte de site",
  "Application web",
  "E-commerce",
  "SEO",
  "Conseil digital",
]

const BUDGET_OPTIONS = [
  "< 3 000 €",
  "3 000 - 8 000 €",
  "8 000 - 20 000 €",
  "> 20 000 €",
  "Non défini",
]

const selectClass = "flex h-10 w-full border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

const reassuranceItems = [
  { icon: Check, title: "Sans engagement", description: "Diagnostic gratuit, 90 minutes" },
  { icon: Clock, title: "Réponse sous 24h", description: "Jours ouvrés garantis" },
  { icon: MapPin, title: "Équipe locale", description: "Nantes, pas un sous-traitant distant" },
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

function SuccessCard({ name, email, onReset }: { name: string; email: string; onReset: () => void }) {
  const firstName = name.split(" ")[0]
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    const t = setTimeout(onReset, 10000)
    return () => clearTimeout(t)
  }, [onReset])

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
      <div className="w-16 h-16 bg-chart-4 flex items-center justify-center">
        <Check className="w-8 h-8 text-white" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          Merci {firstName}.
        </h3>
        <p className="text-muted-foreground">
          Message envoyé. Réponse sous 24h ouvrées.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Confirmation à <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Réinitialisation dans <span className="font-bold tabular-nums">{seconds}s</span>
      </p>
    </div>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    name: "", email: "", phone: "", company: "", services: "", budget: "", message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
    if (!formData.name.trim()) newErrors.name = "Nom requis"
    if (!formData.email.trim()) {
      newErrors.email = "Email requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }
    if (!formData.message.trim()) newErrors.message = "Message requis"
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
        setErrors({ submit: data.error ?? "Erreur. Réessayez." })
        return
      }
      setIsSubmitted(true)
      playSuccess()
    } catch {
      setErrors({ submit: "Erreur serveur. Réessayez." })
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
    <section id="contact" className="border-t border-border" aria-labelledby="contact-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
        <div className="flex items-baseline gap-5">
          <h2 id="contact-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
            Diagnostic
          </h2>
        </div>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          90 minutes · sans engagement
        </span>
      </div>

      {/* Editorial header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-border mx-auto max-w-7xl">
        <h3 className="text-[clamp(44px,6vw,80px)] font-bold leading-[0.92] tracking-[-0.04em]">
          Parlons<br />
          de votre{" "}
          <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">levier.</span>
        </h3>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Grid */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Formulaire (3/5) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-card border border-border p-6 lg:p-8 flex flex-col flex-1 relative overflow-hidden">
              {isSubmitted ? (
                <SuccessCard name={formData.name} email={formData.email} onReset={resetForm} />
              ) : (
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

                      {/* Message */}
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
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-xs text-muted-foreground">Vos données restent confidentielles.</p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" />Envoi...</>
                        ) : (
                          <>Envoyer <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Sidebar (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Calendly popup card */}
            <div className="relative border border-accent/30 bg-accent/5 p-6 overflow-hidden">
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
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCalendlyOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold cta-hover active:scale-[0.98] transition-all"
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  Choisir un créneau
                </button>
              </div>
            </div>

            {/* Reassurance + contact info */}
            <div className="bg-card border border-border p-6 flex flex-col flex-1">
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
              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                  Nous retrouver
                </h3>
                <div className="space-y-2.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span>Nantes, France</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <a href="mailto:contact@mobem-solutions.com" className="hover:text-foreground transition-colors">
                      contact@mobem-solutions.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <a href="tel:+33784275383" className="hover:text-foreground transition-colors">
                      07 84 27 53 83
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span>Réponse sous 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Calendly Modal */}
      {mounted && calendlyOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCalendlyOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white shadow-2xl w-full max-w-3xl overflow-hidden">
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
