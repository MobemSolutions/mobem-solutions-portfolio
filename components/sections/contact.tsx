"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, MapPin, Mail, Phone, Clock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InlineWidget } from "react-calendly"

import { CopyEmail } from "@/components/ui/copy-email"

const CALENDLY_URL = "https://calendly.com/contact-mobem-solutions/30min"

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
  { icon: Clock, title: "Réponse sous 24h", description: "Nous revenons vers vous rapidement" },
  { icon: Shield, title: "Confidentialité garantie", description: "Vos données restent privées" },
  { icon: Users, title: "Contact direct", description: "Échangez avec un associé" },
]

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "Nantes, France" },
  { icon: Mail, label: "Email", value: "contact@mobem-solutions.com", href: "mailto:contact@mobem-solutions.com" },
  { icon: Phone, label: "Téléphone", value: "07 84 27 53 83", href: "tel:+33784275383" },
]

interface FormState {
  name: string
  email: string
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

const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    services: "",
    budget: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: formData.services ? [formData.services] : [],
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setErrors({ submit: data.error ?? "Erreur lors de l'envoi. Réessayez." })
        return
      }
      setIsSubmitted(true)
    } catch {
      setErrors({ submit: "Impossible de contacter le serveur. Réessayez." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 lg:py-32 bg-secondary/30" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-2xl border border-border p-12">
            <div className="w-16 h-16 rounded-full bg-chart-4/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-chart-4" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Message envoyé avec succès !</h2>
            <p className="text-muted-foreground mb-2">
              Merci pour votre message. Un membre de notre équipe vous contactera sous 24 heures ouvrées.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Un email de confirmation a été envoyé à{" "}
              <span className="font-medium text-foreground">{formData.email}</span>.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: "", email: "", company: "", services: "", budget: "", message: "" })
              }}
              variant="outline"
            >
              Retour au site
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/30" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Contact
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-balance">
              Parlons de <span className="text-accent">votre projet</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Décrivez-nous votre besoin ou réservez directement un créneau pour en discuter.
          </p>
        </div>

        {/* Formulaire pleine largeur */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h3 className="text-base font-semibold text-foreground mb-5">Décrivez votre projet</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">

              {/* Row 1 : Nom | Email | Entreprise */}
              <div className="grid md:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm text-foreground font-medium">
                    Nom complet <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Prénom et nom de famille"
                    aria-invalid={!!errors.name}
                    className={cn("text-sm", errors.name && "border-destructive focus-visible:ring-destructive")}
                  />
                  {errors.name && <p className="text-xs text-destructive" role="alert">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm text-foreground font-medium">
                    Email professionnel <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="vous@votre-entreprise.fr"
                    aria-invalid={!!errors.email}
                    className={cn("text-sm", errors.email && "border-destructive focus-visible:ring-destructive")}
                  />
                  {errors.email && <p className="text-xs text-destructive" role="alert">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-sm text-foreground font-medium">
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

              {/* Row 2 : Besoin | Budget */}
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="services" className="text-sm text-foreground font-medium">
                    Type de projet <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
                  </Label>
                  <select
                    id="services"
                    value={formData.services}
                    onChange={(e) => handleChange("services", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Sélectionner un type de projet</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="budget" className="text-sm text-foreground font-medium">
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
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm text-foreground font-medium">
                  Description du projet <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Décrivez votre besoin, vos contraintes et vos délais indicatifs."
                  rows={4}
                  aria-invalid={!!errors.message}
                  className={cn("resize-none text-sm", errors.message && "border-destructive focus-visible:ring-destructive")}
                />
                {errors.message && <p className="text-xs text-destructive" role="alert">{errors.message}</p>}
              </div>

              {errors.submit && (
                <p className="text-sm text-destructive text-center" role="alert">{errors.submit}</p>
              )}

              {/* Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><span className="animate-spin mr-2">⏳</span>Envoi en cours...</>
                  ) : (
                    <>Soumettre mon projet<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></>
                  )}
                </Button>
              </div>

            </div>
          </form>
        </div>

        {/* Séparateur */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-secondary/30 px-6 text-sm text-muted-foreground">
              ou réservez directement un créneau de 30 min
            </span>
          </div>
        </div>

        {/* Calendly | Info cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Calendly widget */}
          <div className="rounded-2xl border border-border overflow-hidden" style={{ height: "460px" }}>
            <div style={{ zoom: 0.85, height: "624px" }}>
              <InlineWidget
                url={CALENDLY_URL}
                styles={{ width: "100%", height: "624px" }}
                pageSettings={{
                  hideEventTypeDetails: true,
                  hideLandingPageDetails: true,
                }}
              />
            </div>
          </div>

          {/* Info cards empilées, hauteur naturelle */}
          <div className="flex flex-col gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Pourquoi nous contacter ?</h3>
              <div className="space-y-4">
                {reassuranceItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Nous retrouver</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{info.label}</h4>
                      {info.href?.startsWith("mailto:") ? (
                        <CopyEmail email={info.value} className="text-xs" />
                      ) : info.href ? (
                        <a href={info.href} className="text-xs text-accent hover:text-accent/80 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-xs text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
