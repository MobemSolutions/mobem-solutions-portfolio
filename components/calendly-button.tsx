"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Calendar, X } from "lucide-react"
import { InlineWidget } from "react-calendly"
import { Button } from "@/components/ui/button"

interface CalendlyButtonProps {
  text?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

const CALENDLY_URL = "https://calendly.com/contact-mobem-solutions/15min"

export function CalendlyButton({
  text = "Réserver un appel",
  variant = "default",
  size = "default",
  className = "",
}: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
        {text}
      </Button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
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
    </>
  )
}
