/**
 * Illustration animée du hero : les papiers du quotidien (mail, facture, agenda, document, note)
 * flottent puis s'envolent un à un vers un dossier qui se range tout seul ; une tasse fume à côté,
 * pour le temps retrouvé. Purement décorative, animée en CSS (figée si moins d'animations).
 */

const BLUE = "#0d44e8"
const TINT = "#dbe5ff"
const INK = "#161618"
const LINE = "#e6e9f2"

// Centre du dossier, cible des papiers
const TARGET = { x: 805, y: 205 }

type Paper = { x: number; y: number; w: number; h: number; rotate: number; delay: number; shape: React.ReactNode }

const PAPERS: Paper[] = [
  {
    x: 70, y: 70, w: 124, h: 86, rotate: -8, delay: 0,
    shape: (
      <>
        <rect width="124" height="86" rx="14" fill="#fff" />
        <path d="M10 14l52 36 52-36" stroke={BLUE} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    x: 250, y: 36, w: 96, h: 128, rotate: 7, delay: 1.6,
    shape: (
      <>
        <path d="M0 14a14 14 0 0 1 14-14h68a14 14 0 0 1 14 14v114l-12-8-12 8-12-8-12 8-12-8-12 8-12-8-12 8z" fill="#fff" />
        <rect x="16" y="20" width="48" height="9" rx="4.5" fill={INK} />
        <rect x="16" y="42" width="64" height="7" rx="3.5" fill={LINE} />
        <rect x="16" y="56" width="52" height="7" rx="3.5" fill={LINE} />
        <rect x="16" y="82" width="44" height="16" rx="7" fill={TINT} />
      </>
    ),
  },
  {
    x: 130, y: 205, w: 112, h: 108, rotate: 5, delay: 3.2,
    shape: (
      <>
        <rect width="112" height="108" rx="16" fill="#fff" />
        <rect width="112" height="30" rx="16" fill={INK} />
        <rect y="16" width="112" height="14" fill={INK} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={16 + c * 22} y={44 + r * 20} width="14" height="12" rx="3" fill={r === 1 && c === 2 ? BLUE : LINE} />
          ))
        )}
      </>
    ),
  },
  {
    x: 360, y: 150, w: 104, h: 134, rotate: -6, delay: 4.8,
    shape: (
      <>
        <rect width="104" height="134" rx="14" fill="#fff" />
        <rect x="16" y="20" width="56" height="9" rx="4.5" fill={INK} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="16" y={44 + i * 14} width={i === 3 ? 48 : 72} height="7" rx="3.5" fill={LINE} />
        ))}
        <path d="M18 112c8-9 14 6 22-2s12 5 20-3" stroke={BLUE} strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    x: 470, y: 40, w: 90, h: 84, rotate: 9, delay: 6.4,
    shape: (
      <>
        <rect width="90" height="84" rx="12" fill={TINT} />
        <rect x="14" y="18" width="52" height="8" rx="4" fill={BLUE} opacity="0.55" />
        <rect x="14" y="34" width="62" height="8" rx="4" fill={BLUE} opacity="0.35" />
        <rect x="14" y="50" width="40" height="8" rx="4" fill={BLUE} opacity="0.35" />
      </>
    ),
  },
]

export function HeroIllustration() {
  return (
    <figure className="blue-field relative overflow-hidden rounded-[20px]" aria-hidden="true">
      <svg viewBox="0 0 1100 380" className="block h-auto w-full" focusable="false">
        <defs>
          <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#041855" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Trajet pointillé vers le dossier */}
        <path
          className="hero-trail"
          d="M150 330 C 380 380, 560 300, 700 220"
          stroke="#fff"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeDasharray="2 12"
          strokeLinecap="round"
          fill="none"
        />

        {/* Papiers */}
        {PAPERS.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <g
              className="hero-paper"
              style={
                {
                  "--dx": `${TARGET.x - (p.x + p.w / 2)}px`,
                  "--dy": `${TARGET.y - (p.y + p.h / 2)}px`,
                  animationDelay: `${p.delay - 8}s`,
                } as React.CSSProperties
              }
            >
              <g className="hero-bob" style={{ animationDelay: `${i * 0.7}s` }}>
                <g transform={`rotate(${p.rotate} ${p.w / 2} ${p.h / 2})`} filter="url(#hero-shadow)">
                  {p.shape}
                </g>
              </g>
            </g>
          </g>
        ))}

        {/* Dossier */}
        <g className="hero-folder" filter="url(#hero-shadow)">
          <path d="M700 150a16 16 0 0 1 16-16h66l20 20h94a16 16 0 0 1 16 16v130a16 16 0 0 1-16 16H716a16 16 0 0 1-16-16z" fill="#fff" />
          <rect x="722" y="168" width="150" height="10" rx="5" fill={TINT} />
          <path d="M700 196a16 16 0 0 1 16-16h180a16 16 0 0 1 16 16v104a16 16 0 0 1-16 16H716a16 16 0 0 1-16-16z" fill="#f4f6fd" />
          {/* Étiquette du dossier : la signature Mobem Solutions */}
          <g transform="translate(728 232) scale(1.05)" fill={INK}>
            <path d="M33 12.5L9 26.5M9 26.5L28.5 40M28.5 40L33 12.5" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="33" cy="12.5" r="9" />
            <circle cx="9" cy="26.5" r="6.5" />
            <circle cx="28.5" cy="40" r="6.5" />
          </g>
          <text x="790" y="254" fill={INK} fontFamily="inherit" fontSize="25" fontWeight="600" letterSpacing="-0.5">Mobem</text>
          <text x="790" y="280" fill={INK} fontFamily="inherit" fontSize="20" letterSpacing="-0.2">Solutions</text>
        </g>
        <g className="hero-check">
          <circle cx="900" cy="150" r="24" fill={BLUE} stroke="#fff" strokeWidth="5" />
          <path d="M889 150l7 7 14-15" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Tasse : le temps retrouvé */}
        <g transform="translate(965 238)" filter="url(#hero-shadow)">
          <path d="M0 6h70v34a32 32 0 0 1-32 32h-6A32 32 0 0 1 0 40z" fill="#fff" />
          <path d="M70 18h8a14 14 0 0 1 0 28h-8" stroke="#fff" strokeWidth="8" fill="none" />
          <rect x="-8" y="72" width="86" height="8" rx="4" fill="#fff" opacity="0.9" />
        </g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="hero-steam"
            style={{ animationDelay: `${i * 0.6}s` }}
            d={`M${985 + i * 15} 228c-8-10 8-16 0-28s8-16 0-26`}
            stroke="#fff"
            strokeOpacity="0.8"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </svg>
    </figure>
  )
}
