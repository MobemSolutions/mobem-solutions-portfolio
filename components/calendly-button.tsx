"use client"

import { Calendar } from "lucide-react"
import { PopupButton } from "react-calendly"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface CalendlyButtonProps {
  text?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

const CALENDLY_URL = "https://calendly.com/contact-mobem-solutions/30min"

export function CalendlyButton({
  text = "Réserver un appel",
  variant = "default",
  size = "default",
  className = "",
}: CalendlyButtonProps) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.body)
  }, [])

  if (!rootElement) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
        {text}
      </Button>
    )
  }

  return (
    <PopupButton
      url={CALENDLY_URL}
      rootElement={rootElement}
      text=""
      className="inline-flex"
    >
      <Button variant={variant} size={size} className={className} asChild>
        <span>
          <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
          {text}
        </span>
      </Button>
    </PopupButton>
  )
}
