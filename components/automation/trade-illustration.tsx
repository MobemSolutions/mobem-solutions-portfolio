import { cn } from "@/lib/utils"

/**
 * Illustrations vectorielles par métier, pensées pour être posées sur le champ bleu (.blue-field) :
 * cartes blanches flottantes, accents bleus. Seuls quelques repères (date, €, compteur) : purement décoratives.
 */

const BLUE = "#0d44e8"
const TINT = "#dbe5ff"
const INK = "#161618"
const LINE = "#e6e9f2"

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#041855" floodOpacity="0.28" />
      </filter>
    </defs>
  )
}

function Lines({ x, y, widths, gap = 14 }: { x: number; y: number; widths: number[]; gap?: number }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={7} rx={3.5} fill={LINE} />
      ))}
    </>
  )
}

/* Organisme de formation : attestation, feuille d'émargement, badge Qualiopi */
function Formation() {
  return (
    <>
      <Defs id="fo" />
      {/* Attestation en arrière-plan */}
      <g filter="url(#fo-shadow)" transform="rotate(-7 170 150)">
        <rect x="70" y="60" width="200" height="200" rx="18" fill="#fff" />
        <rect x="92" y="84" width="96" height="10" rx="5" fill={INK} />
        <Lines x={92} y={108} widths={[150, 130, 140]} />
        <circle cx="228" cy="214" r="24" fill={TINT} />
        <circle cx="228" cy="214" r="15" fill={BLUE} />
        <path d="M221 214l5 5 9-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M92 222c10-10 18 8 28-2s16 6 26-4" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      {/* Feuille d'émargement au premier plan */}
      <g filter="url(#fo-shadow)">
        <rect x="200" y="110" width="210" height="190" rx="18" fill="#fff" />
        <rect x="200" y="110" width="210" height="44" rx="18" fill={BLUE} />
        <rect x="200" y="136" width="210" height="18" fill={BLUE} />
        <rect x="220" y="126" width="90" height="9" rx="4.5" fill="#fff" opacity="0.9" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(220 ${172 + i * 30})`}>
            <circle cx="10" cy="8" r="10" fill={TINT} />
            <rect x="28" y="4" width={i === 3 ? 70 : 90} height="8" rx="4" fill={LINE} />
            <rect x="140" y="-2" width="20" height="20" rx="6" fill={i < 3 ? BLUE : "#fff"} stroke={i < 3 ? BLUE : LINE} strokeWidth="2" />
            {i < 3 && <path d="M145 8l4 4 6-7" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        ))}
      </g>
    </>
  )
}

/* Courtier : contrat signé, bouclier, échéance au calendrier */
function Courtier() {
  return (
    <>
      <Defs id="co" />
      {/* Bouclier */}
      <g filter="url(#co-shadow)">
        <path d="M120 70l70 26v62c0 46-32 78-70 92-38-14-70-46-70-92V96z" fill="#fff" />
        <path d="M120 96l46 17v45c0 31-21 53-46 63-25-10-46-32-46-63v-45z" fill={TINT} />
        <path d="M100 152l14 14 28-30" stroke={BLUE} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Contrat */}
      <g filter="url(#co-shadow)" transform="rotate(4 300 180)">
        <rect x="200" y="78" width="190" height="220" rx="18" fill="#fff" />
        <rect x="222" y="102" width="110" height="10" rx="5" fill={INK} />
        <Lines x={222} y={128} widths={[146, 130, 146, 110, 140]} />
        <rect x="222" y="214" width="146" height="54" rx="12" fill="#f5f7fc" />
        <path d="M236 248c12-18 20 10 32-6s14 12 28 0 16 4 24-4" stroke={BLUE} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* Calendrier d'échéance */}
      <g filter="url(#co-shadow)">
        <rect x="320" y="38" width="110" height="104" rx="16" fill="#fff" />
        <rect x="320" y="38" width="110" height="30" rx="16" fill={INK} />
        <rect x="320" y="56" width="110" height="12" fill={INK} />
        <text x="375" y="112" textAnchor="middle" fontSize="34" fontWeight="700" fill={BLUE} fontFamily="inherit">30</text>
        <text x="375" y="131" textAnchor="middle" fontSize="12" fontWeight="600" fill={INK} fontFamily="inherit">JUIN</text>
      </g>
    </>
  )
}

/* Cabinet comptable : factures empilées, dossier client, enveloppe */
function Comptable() {
  const receipt = (x: number, y: number) =>
    `M${x} ${y + 14}a14 14 0 0 1 14-14h132a14 14 0 0 1 14 14v176l-16 -10-16 10-16-10-16 10-16-10-16 10-16-10-16 10-16-10-16 10z`
  return (
    <>
      <Defs id="cp" />
      {/* Factures */}
      <g filter="url(#cp-shadow)" transform="rotate(-8 150 160)">
        <path d={receipt(70, 60)} fill="#fff" />
        <rect x="92" y="84" width="70" height="10" rx="5" fill={INK} />
        <Lines x={92} y={110} widths={[110, 90, 116]} />
        <rect x="92" y="170" width="64" height="20" rx="8" fill={TINT} />
        <text x="124" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill={BLUE} fontFamily="inherit">€</text>
      </g>
      {/* Dossier client */}
      <g filter="url(#cp-shadow)">
        <rect x="216" y="96" width="150" height="120" rx="10" fill="#fff" transform="rotate(6 290 156)" />
        <path d="M190 132a14 14 0 0 1 14-14h62l18 18h112a14 14 0 0 1 14 14v124a14 14 0 0 1-14 14H204a14 14 0 0 1-14-14z" fill={BLUE} />
        <rect x="214" y="190" width="120" height="9" rx="4.5" fill="#fff" opacity="0.85" />
        <rect x="214" y="210" width="80" height="9" rx="4.5" fill="#fff" opacity="0.55" />
        <circle cx="370" cy="250" r="20" fill="#fff" />
        <path d="M361 250l6 6 12-13" stroke={BLUE} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Enveloppe */}
      <g filter="url(#cp-shadow)">
        <rect x="300" y="36" width="116" height="78" rx="14" fill="#fff" />
        <path d="M306 46l52 38 52-38" stroke={BLUE} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="414" cy="40" r="13" fill={INK} />
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
