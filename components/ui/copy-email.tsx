"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyEmailProps {
  email: string
  className?: string
  /** "text" renders an inline link; "icon" renders an icon button */
  variant?: "text" | "icon"
  /** Label for accessibility (icon variant) */
  ariaLabel?: string
}

export function CopyEmail({
  email,
  className,
  variant = "text",
  ariaLabel,
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea")
      el.value = email
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleCopy}
        className={cn(
          "relative w-9 h-9 rounded-lg bg-secondary flex items-center justify-center",
          "text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className
        )}
        aria-label={copied ? "Email copié !" : (ariaLabel ?? `Copier l'adresse email ${email}`)}
        title={copied ? "Email copié !" : email}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
        ) : (
          <Mail className="w-4 h-4" aria-hidden="true" />
        )}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-0.5 text-[10px] text-background shadow-md pointer-events-none">
            Copié !
          </span>
        )}
      </button>
    )
  }

  return (
    <span className="relative inline-flex items-center gap-1.5">
      <button
        onClick={handleCopy}
        className={cn(
          "text-accent hover:text-accent/80 transition-colors underline-offset-2 hover:underline",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded",
          className
        )}
        title={copied ? "Email copié !" : `Copier ${email}`}
        aria-label={copied ? "Email copié !" : `Copier l'adresse email`}
      >
        {email}
      </button>
      {copied && (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium animate-fade-in">
          <Check className="w-3 h-3" aria-hidden="true" />
          Copié !
        </span>
      )}
    </span>
  )
}
