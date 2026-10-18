/*
 * Visuel du hero : la marque Mobem, en grand et fidèle au logo (traits épais, trois points pleins).
 * Les trois points s'allument en bleu tour à tour, et une étiquette apparaît à côté de chacun :
 * une automatisation qui fait son travail. Tout en SVG, animé en CSS (figé si moins d'animations).
 * Repère : marque d'origine 48 × 48, agrandie 5,5 fois et centrée dans un cadre 480 × 400.
 */

const K = 5.5
const at = (x: number, y: number) => ({ x: 118 + x * K, y: 62 + y * K })
const A = at(9, 26.5) // petit point gauche
const B = at(28.5, 40) // petit point bas
const C = at(33, 12.5) // gros point haut

/** Étapes dans l'ordre d'allumage ; `delay` décale chacune d'un tiers de la boucle de 6 s. */
const STEPS = [
  { dot: A, r: 6.5 * K, label: "Un mail arrive", chip: { x: 28, y: 262, w: 158 }, delay: "0s" },
  { dot: B, r: 6.5 * K, label: "Pièce rangée", chip: { x: 322, y: 300, w: 140 }, delay: "-4s" },
  { dot: C, r: 9 * K, label: "Client relancé", chip: { x: 66, y: 52, w: 156 }, delay: "-2s" },
]

export function HeroArtwork() {
  return (
    <div className="art-panel w-full overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 480 400" className="block h-auto w-full" focusable="false">
        {/* Traits de la marque */}
        <path
          d={`M${C.x} ${C.y}L${A.x} ${A.y}L${B.x} ${B.y}Z`}
          fill="none"
          stroke="#161618"
          strokeWidth={5 * K}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {STEPS.map(({ dot, r, label, chip, delay }) => (
          <g key={label}>
            <circle cx={dot.x} cy={dot.y} r={r} className="mark-dot" style={{ animationDelay: delay }} />
            <g className="mark-chip" style={{ animationDelay: delay }}>
              <rect x={chip.x} y={chip.y} width={chip.w} height={40} rx={20} fill="#ffffff" stroke="#e5e5e8" />
              <circle cx={chip.x + 20} cy={chip.y + 20} r={10} fill="#0d44e8" />
              <path
                d={`M${chip.x + 15.5} ${chip.y + 20.5}l3 3 6-6.5`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={chip.x + 38} y={chip.y + 25.5} fontSize="15" fontWeight="550" fill="#161618" fontFamily="inherit">
                {label}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
