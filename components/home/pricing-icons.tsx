/**
 * Petites illustrations des formules, dans le style du visuel d'accueil :
 * contours noirs épais, aplats bleu et bleu très pâle, aucune ombre.
 */

const INK = "#161618"
const BLUE = "#0d44e8"
const PALE = "#e6edff"
const S = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

/** Diagnostic : une liste passée à la loupe */
function Diagnostic() {
  return (
    <>
      <rect x="8" y="6" width="32" height="40" rx="3" fill={PALE} />
      <path d="M15 16h18M15 24h14M15 32h10" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="38" r="10" fill="#fff" {...S} />
      <path d="M47 45l6 6" {...S} strokeWidth="4" />
    </>
  )
}

/** Pilote : une seule tâche, cochée */
function Pilote() {
  return (
    <>
      <rect x="10" y="10" width="36" height="36" rx="4" fill="#fff" {...S} />
      <path d="M19 28l7 7 13-15" stroke={BLUE} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

/** Pack métier : plusieurs tâches empilées */
function Pack() {
  return (
    <>
      <rect x="16" y="6" width="32" height="24" rx="3" fill={PALE} />
      <rect x="12" y="16" width="32" height="24" rx="3" fill="#fff" {...S} />
      <rect x="6" y="28" width="32" height="24" rx="3" fill="#fff" {...S} />
      <path d="M14 40l5 5 10-10" stroke={BLUE} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

/** Maintenance : une cloche qui veille */
function Maintenance() {
  return (
    <>
      <path d="M16 38V26a12 12 0 0 1 24 0v12l4 5H12z" fill="#fff" {...S} />
      <path d="M24 48a4 4 0 0 0 8 0" {...S} fill="none" />
      <circle cx="42" cy="14" r="6" fill={BLUE} />
    </>
  )
}

const ICONS = { diagnostic: Diagnostic, pilote: Pilote, pack: Pack, maintenance: Maintenance }

export function PricingIcon({ name, className }: { name: keyof typeof ICONS; className?: string }) {
  const Icon = ICONS[name]
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true" focusable="false">
      <Icon />
    </svg>
  )
}
