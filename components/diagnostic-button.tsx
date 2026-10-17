"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Réserver un diagnostic gratuit"
    >
      <div className="absolute inset-0 bg-studio/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[20px] bg-white shadow-card">
        <button ref={closeRef} type="button" onClick={onClose} className="icon-control absolute right-3 top-3 z-10 bg-white" aria-label="Fermer">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <InlineWidget
          url={CALENDLY_URL}
          prefill={email ? { email } : undefined}
          styles={{ height: "670px", minWidth: "300px" }}
          pageSettings={{ hideGdprBanner: true, primaryColor: "0d44e8" }}
        />
      </div>
    </div>,
    document.body
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
