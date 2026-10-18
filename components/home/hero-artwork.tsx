import { FileCheck2, FolderCheck, Mail } from "lucide-react"

/*
 * Visuel du hero : la marque Mobem (trois nœuds reliés) dessinée en grand devient le schéma d'une automatisation.
 * Un point bleu parcourt les traits ; chaque nœud s'allume à son passage. À plat, trait noir, une touche de bleu.
 * Coordonnées dans un carré 480 × 480 (la marque d'origine, 48 × 48, agrandie dix fois et recentrée).
 */

const DURATION = 6 // secondes pour un tour complet
const A = { x: 72, y: 243 } // le mail arrive
const B = { x: 267, y: 378 } // la pièce est rangée
const C = { x: 312, y: 103 } // le dossier est à jour (le gros nœud de la marque)
const PATH = `M${A.x} ${A.y}L${B.x} ${B.y}L${C.x} ${C.y}Z`

// Moment d'arrivée du point sur chaque nœud (fraction du tour, proportionnelle à la longueur des traits)
const NODES = [
  { ...A, at: 0, size: 64, Icon: Mail, label: "Un mail arrive", labelClass: "left-1/2 top-full mt-3 -translate-x-1/2" },
  { ...B, at: 0.3, size: 64, Icon: FileCheck2, label: "La pièce est rangée", labelClass: "left-full top-1/2 ml-3 -translate-y-1/2 max-sm:left-1/2 max-sm:top-full max-sm:ml-0 max-sm:mt-3 max-sm:-translate-x-1/2 max-sm:translate-y-0" },
  { ...C, at: 0.65, size: 84, Icon: FolderCheck, label: "Le dossier est à jour", labelClass: "right-full top-1/2 mr-3 -translate-y-1/2" },
]

const pct = (v: number) => `${(v / 480) * 100}%`

export function HeroArtwork() {
  return (
    <div className="art-panel relative aspect-square w-full overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" focusable="false">
        <path d={PATH} fill="none" stroke="#161618" strokeWidth="2.5" strokeLinejoin="round" />
        <circle r="7" fill="#0d44e8" className="mark-runner">
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite" path={PATH} />
        </circle>
      </svg>

      {NODES.map(({ x, y, at, size, Icon, label, labelClass }) => (
        <div
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(x), top: pct(y) }}
        >
          <span
            className="mark-node flex items-center justify-center rounded-full"
            style={{
              width: `clamp(${size * 0.7}px, ${(size / 480) * 100 * 1.6}vw, ${size}px)`,
              aspectRatio: "1",
              // Décalage négatif : le nœud s'allume pile quand le point arrive
              animationDelay: `${-(1 - at) * DURATION}s`,
              animationDuration: `${DURATION}s`,
            }}
          >
            <Icon className="h-[40%] w-[40%]" strokeWidth={2} />
          </span>
          <span className={`absolute whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[13px] font-[550] text-ink ring-1 ring-[#e5e5e8] ${labelClass}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
