import { cn } from "@/lib/utils"

/** Accent rouge Mobem — identique dans les deux thèmes */
const RED = "#BE1217"

interface LogoProps {
  className?: string
  /** "mark" = monogramme seul · "full" = monogramme + MOBEM SOLUTIONS */
  variant?: "mark" | "full"
}

/**
 * Monogramme MS — géométrique angulaire.
 * currentColor est utilisé pour le M/S → s'adapte automatiquement au thème clair/sombre.
 * L'accent rouge reste toujours #BE1217.
 */
export function MobemLogo({ className, variant = "mark" }: LogoProps) {
  if (variant === "full") return <MobemFullLogo className={className} />
  return <MobemMark className={className} />
}

/** Monogramme seul (navbar, favicon) */
export function MobemMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 148 110"
      aria-label="Mobem Solutions"
      role="img"
      className={cn("fill-current", className)}
    >
      {/* ── M ── quatre barres parallélogrammes */}
      {/* Jambe gauche */}
      <polygon points="0,0 16,0 16,110 0,110" />
      {/* Diagonale gauche (vers le creux) */}
      <polygon points="16,0 32,0 55,65 39,65" />
      {/* Diagonale droite (miroir) */}
      <polygon points="74,0 90,0 71,65 55,65" />
      {/* Jambe droite */}
      <polygon points="90,0 106,0 106,110 90,110" />

      {/* ── S (angulaire — 3 barres + connecteurs diagonaux) */}
      {/* Barre haute */}
      <polygon points="114,0 148,0 148,20 114,20" />
      {/* Connecteur haut-droite → bas-gauche */}
      <polygon points="132,20 148,20 148,54 114,54 114,38 132,38" />
      {/* Barre médiane */}
      <polygon points="114,38 148,38 148,58 114,58" />
      {/* Connecteur bas-droite */}
      <polygon points="114,58 148,58 148,90 132,90 132,74 114,74" />
      {/* Barre basse */}
      <polygon points="114,90 148,90 148,110 114,110" />

      {/* ── Accent rouge (petit rectangle en haut à droite) */}
      <rect x="130" y="0" width="18" height="9" fill={RED} />
    </svg>
  )
}

/** Logo complet : monogramme + MOBEM SOLUTIONS */
function MobemFullLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 110"
      aria-label="Mobem Solutions"
      role="img"
      className={cn("fill-current", className)}
    >
      {/* Monogramme MS (réutilise les mêmes paths) */}
      <polygon points="0,0 16,0 16,110 0,110" />
      <polygon points="16,0 32,0 55,65 39,65" />
      <polygon points="74,0 90,0 71,65 55,65" />
      <polygon points="90,0 106,0 106,110 90,110" />
      <polygon points="114,0 148,0 148,20 114,20" />
      <polygon points="132,20 148,20 148,54 114,54 114,38 132,38" />
      <polygon points="114,38 148,38 148,58 114,58" />
      <polygon points="114,58 148,58 148,90 132,90 132,74 114,74" />
      <polygon points="114,90 148,90 148,110 114,110" />
      <rect x="130" y="0" width="18" height="9" fill={RED} />

      {/* MOBEM */}
      <text
        x="164"
        y="78"
        fontFamily="system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="72"
        letterSpacing="-3"
        textAnchor="start"
      >
        MOBEM
      </text>

      {/* SOLUTIONS */}
      <text
        x="167"
        y="106"
        fontFamily="system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="300"
        fontSize="18"
        letterSpacing="7"
        fill={RED}
        textAnchor="start"
      >
        SOLUTIONS
      </text>
    </svg>
  )
}
