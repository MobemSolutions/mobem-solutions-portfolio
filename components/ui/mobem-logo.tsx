import { cn } from "@/lib/utils"

/** Marque Mobem : trois nœuds reliés. Hérite de la couleur du texte (currentColor). */
export function MobemMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn("shrink-0", className)}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M33 12.5L9 26.5M9 26.5L28.5 40M28.5 40L33 12.5" />
      </g>
      <circle cx="33" cy="12.5" r="9" fill="currentColor" />
      <circle cx="9" cy="26.5" r="6.5" fill="currentColor" />
      <circle cx="28.5" cy="40" r="6.5" fill="currentColor" />
    </svg>
  )
}

/** Logo complet : marque + « Mobem / Solutions » sur deux lignes. */
export function MobemLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MobemMark className="logo-mark h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[19px] font-semibold tracking-[-0.02em]">Mobem</span>
        <span className="mt-0.5 text-[15px] font-normal tracking-[-0.01em]">Solutions</span>
      </span>
    </span>
  )
}
