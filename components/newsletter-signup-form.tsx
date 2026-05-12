"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

type Status = "idle" | "loading" | "success" | "exists" | "error"

export function NewsletterSignupForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.status === 409) {
        setStatus("exists")
      } else if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-3 px-5 py-4 border border-border bg-card">
          <span className="text-accent font-bold text-lg leading-none">✓</span>
          <div>
            <p className="text-[15px] font-semibold">Vérifiez vos emails.</p>
            <p className="text-[13px] text-muted-foreground mt-0.5">Un lien de confirmation vous a été envoyé à <strong>{email}</strong>.</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === "exists") {
    return (
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-3 px-5 py-4 border border-border bg-card">
          <span className="text-muted-foreground font-bold text-lg leading-none">i</span>
          <div>
            <p className="text-[15px] font-semibold">Déjà inscrit(e).</p>
            <p className="text-[13px] text-muted-foreground mt-0.5"><strong>{email}</strong> est déjà abonné à notre newsletter.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vous@entreprise.fr"
        required
        disabled={status === "loading"}
        className="flex-1 border border-border bg-transparent px-5 py-4 text-[15px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="hover"
        className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-accent text-accent-foreground font-medium text-[14px] cta-hover transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "S'abonner"}
        {status !== "loading" && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
      </button>
      {status === "error" && (
        <p className="text-[13px] text-destructive mt-1 sm:col-span-2">
          Une erreur est survenue. Réessayez dans quelques instants.
        </p>
      )}
    </form>
  )
}
