import { cn } from "@/lib/utils"

/**
 * Illustrations vectorielles par métier, style éditorial à plat : formes blanches cernées d'un trait noir,
 * une seule couleur d'accent (le bleu), aucune ombre ni dégradé. Posées sur un fond gris clair (.art-panel).
 * Seuls quelques repères (date, €, compteur) : purement décoratives.
 */

const BLUE = "#0d44e8"
const INK = "#161618"
const LINE = "#dcdee3"
const S = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const }

function Lines({ x, y, widths, gap = 14 }: { x: number; y: number; widths: number[]; gap?: number }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={6} rx={3} fill={LINE} />
      ))}
    </>
  )
}

function Tick({ x, y, size = 20, filled = true }: { x: number; y: number; size?: number; filled?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={size} height={size} rx={size / 3.5} fill={filled ? BLUE : "#fff"} {...(filled ? {} : S)} />
      {filled && (
        <path
          d={`M${size * 0.27} ${size * 0.52}l${size * 0.2} ${size * 0.2} ${size * 0.33}-${size * 0.38}`}
          stroke="#fff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </g>
  )
}

/* Organisme de formation : attestation et feuille d'émargement */
function Formation() {
  return (
    <>
      <g transform="rotate(-6 170 160)">
        <rect x="70" y="60" width="200" height="200" rx="14" fill="#fff" {...S} />
        <rect x="92" y="84" width="96" height="9" rx="4.5" fill={INK} />
        <Lines x={92} y={108} widths={[150, 130, 140]} />
        <circle cx="228" cy="214" r="18" fill={BLUE} />
        <path d="M220 214l6 6 10-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M92 222c10-10 18 8 28-2s16 6 26-4" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <rect x="200" y="110" width="210" height="190" rx="14" fill="#fff" {...S} />
        <path d="M200 148h210" stroke={INK} strokeWidth="2" />
        <rect x="220" y="125" width="90" height="8" rx="4" fill={INK} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(220 ${166 + i * 32})`}>
            <circle cx="9" cy="9" r="9" fill="#fff" {...S} />
            <rect x="28" y="6" width={i === 3 ? 70 : 92} height="6" rx="3" fill={LINE} />
            <Tick x={148} y={-1} filled={i < 3} />
          </g>
        ))}
      </g>
    </>
  )
}

/* Courtier : bouclier, contrat signé, échéance au calendrier */
function Courtier() {
  return (
    <>
      <g>
        <path d="M120 74l66 24v58c0 44-30 74-66 88-36-14-66-44-66-88V98z" fill="#fff" {...S} />
        <path d="M98 154l16 16 30-32" stroke={BLUE} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="rotate(4 300 180)">
        <rect x="200" y="80" width="186" height="216" rx="14" fill="#fff" {...S} />
        <rect x="222" y="104" width="110" height="9" rx="4.5" fill={INK} />
        <Lines x={222} y={128} widths={[142, 126, 142, 108, 136]} />
        <path d="M222 260h142" stroke={LINE} strokeWidth="2" />
        <path d="M228 248c12-18 20 10 32-6s14 12 28 0 16 4 24-4" stroke={BLUE} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <rect x="322" y="40" width="106" height="100" rx="14" fill="#fff" {...S} />
        <path d="M322 68h106" stroke={INK} strokeWidth="2" />
        <rect x="346" y="50" width="58" height="8" rx="4" fill={INK} />
        <text x="375" y="113" textAnchor="middle" fontSize="34" fontWeight="700" fill={BLUE} fontFamily="inherit">30</text>
        <text x="375" y="131" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="1.5" fill={INK} fontFamily="inherit">JUIN</text>
      </g>
    </>
  )
}

/* Cabinet comptable : facture, dossier client, enveloppe */
function Comptable() {
  const receipt = (x: number, y: number) =>
    `M${x} ${y + 14}a14 14 0 0 1 14-14h132a14 14 0 0 1 14 14v176l-16 -10-16 10-16-10-16 10-16-10-16 10-16-10-16 10-16-10-16 10z`
  return (
    <>
      <g transform="rotate(-7 150 160)">
        <path d={receipt(70, 60)} fill="#fff" {...S} />
        <rect x="92" y="84" width="70" height="9" rx="4.5" fill={INK} />
        <Lines x={92} y={110} widths={[110, 90, 116]} />
        <text x="96" y="190" fontSize="22" fontWeight="700" fill={BLUE} fontFamily="inherit">€</text>
        <rect x="118" y="176" width="58" height="8" rx="4" fill={LINE} />
      </g>
      <g>
        <path d="M190 132a12 12 0 0 1 12-12h62l18 18h114a12 12 0 0 1 12 12v126a12 12 0 0 1-12 12H202a12 12 0 0 1-12-12z" fill="#fff" {...S} />
        <path d="M190 166h218" stroke={INK} strokeWidth="2" />
        <rect x="212" y="190" width="120" height="8" rx="4" fill={LINE} />
        <rect x="212" y="208" width="80" height="8" rx="4" fill={LINE} />
        <Tick x={366} y={244} size={24} />
      </g>
      <g>
        <rect x="302" y="38" width="112" height="76" rx="12" fill="#fff" {...S} />
        <path d="M306 46l52 38 52-38" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="414" cy="40" r="13" fill={BLUE} />
        <text x="414" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="inherit">3</text>
      </g>
    </>
  )
}

const SCENES = {
  "organismes-de-formation": Formation,
  "courtiers-assurance": Courtier,
  "cabinets-comptables": Comptable,
}

export function TradeIllustration({ slug, className }: { slug: string; className?: string }) {
  const Scene = SCENES[slug as keyof typeof SCENES]
  if (!Scene) return null
  return (
    <svg viewBox="0 0 480 340" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <Scene />
    </svg>
  )
}
