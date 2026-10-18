/*
 * Visuel du hero : « le bureau qui s'organise ». Illustration éditoriale à plat (contours noirs épais,
 * aplats bleus, bleu très pâle) : un calendrier dont les échéances se cochent, une facture classée,
 * une relance qui part, et un réveil dont le cadran se remplit de temps retrouvé. Le logo Mobem signe
 * le bandeau du calendrier. Boucle de 12 s : un curseur parcourt le calendrier et coche les cases, la facture
 * s'imprime, la relance s'envole, l'aiguille tourne. Les tâches se terminent une à une, puis tout reste
 * en place quelques secondes. Figé sur l'état final si l'utilisateur préfère moins d'animations.
 */

const INK = "#161618"
const BLUE = "#0d44e8"
const PALE = "#e6edff"

// Grille du calendrier : 4 colonnes, la dernière ligne n'a que 2 cases
const COLS = [52, 122, 192, 262]
const ROWS = [150, 202, 254, 306]
const CELL = { w: 54, h: 34 }
const CELLS = ROWS.flatMap((y, r) => COLS.slice(0, r === 3 ? 2 : 4).map((x, c) => ({ x, y, key: `${c}-${r}` })))

// Cases qui se « terminent », dans l'ordre, avec leur moment d'apparition (secondes)
const DONE: Record<string, number> = { "1-0": 0.5, "0-1": 2.3, "3-0": 4.4, "2-2": 5.4, "1-1": 6.2 }

// Ticket de caisse : bord inférieur en dents de scie
const RECEIPT = { x: 384, y: 50, w: 110, h: 186 }
const TEETH = Array.from({ length: 21 }, (_, i) => `${RECEIPT.x + RECEIPT.w - i * 5.5} ${RECEIPT.y + RECEIPT.h + (i % 2 ? 11 : 0)}`)

const delay = (s: number) => ({ animationDelay: `${s}s` }) as React.CSSProperties

export function HeroArtwork() {
  return (
    <svg viewBox="0 0 520 400" className="block h-auto w-full" aria-hidden="true" focusable="false">
      {/* ── Calendrier ── */}
      <rect x="22" y="78" width="318" height="292" fill="#fff" />
      <rect x="22" y="78" width="318" height="50" fill={BLUE} />
      {/* Logo Mobem en signature, dans le bandeau */}
      <g transform="translate(34 89) scale(0.6)" fill="#fff">
        <path d="M33 12.5L9 26.5M9 26.5L28.5 40M28.5 40L33 12.5" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <circle cx="33" cy="12.5" r="9" />
        <circle cx="9" cy="26.5" r="6.5" />
        <circle cx="28.5" cy="40" r="6.5" />
      </g>
      <rect x="22" y="78" width="318" height="292" fill="none" stroke={INK} strokeWidth="5" />
      {[110, 170, 230, 290].map((x) => (
        <rect key={x} x={x - 7} y="56" width="14" height="44" rx="7" fill={INK} />
      ))}

      {/* Une case déjà réglée, en aplat pâle */}
      <rect x={COLS[3]} y={ROWS[2]} width={CELL.w} height={CELL.h} fill={PALE} />
      {CELLS.filter((c) => c.key !== "3-2").map(({ x, y, key }) => (
        <g key={key}>
          {key in DONE && (
            <rect x={x} y={y} width={CELL.w} height={CELL.h} fill={PALE} className="hero-fade" style={delay(DONE[key])} />
          )}
          <rect x={x} y={y} width={CELL.w} height={CELL.h} fill="none" stroke={INK} strokeWidth="4" />
          {key in DONE && (
            <circle cx={x + CELL.w} cy={y + CELL.h} r="10" fill={BLUE} className="hero-pop" style={delay(DONE[key])} />
          )}
        </g>
      ))}

      {/* Curseur : glisse de case en case, juste avant que chacune se coche */}
      <rect x={COLS[1] - 5} y={ROWS[0] - 5} width={CELL.w + 10} height={CELL.h + 10} rx="4" fill="none" stroke={BLUE} strokeWidth="4" className="cal-cursor" />

      {/* ── Réveil : le cadran se remplit de temps retrouvé ── */}
      <rect x="289" y="296" width="14" height="10" rx="3" fill={INK} />
      <circle cx="296" cy="342" r="36" fill="#fff" stroke={INK} strokeWidth="5" />
      <circle
        cx="296"
        cy="342"
        r="15"
        fill="none"
        stroke={BLUE}
        strokeWidth="30"
        strokeDasharray="94.25"
        className="hero-sweep"
        transform="rotate(-90 296 342)"
      />
      <path d="M296 342h16" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M296 342V316" stroke={INK} strokeWidth="4" strokeLinecap="round" className="clock-hand" />
      <circle cx="296" cy="342" r="4" fill={INK} />

      {/* ── Facture classée ── */}
      <g className="receipt-print">
      <path
        d={`M${RECEIPT.x} ${RECEIPT.y}H${RECEIPT.x + RECEIPT.w}V${RECEIPT.y + RECEIPT.h}L${TEETH.join("L")}Z`}
        fill={PALE}
      />
      {[
        [400, 82, 70],
        [400, 102, 34],
        [446, 102, 30],
        [400, 122, 76],
        [400, 142, 44],
        [452, 142, 24],
        [400, 162, 56],
      ].map(([x, y, w]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height="4" rx="2" fill={BLUE} />
      ))}
      </g>
      <rect x="374" y="38" width="130" height="18" rx="9" fill={INK} />
      <g className="hero-pop" style={delay(4)}>
        <circle cx="472" cy="210" r="24" fill={BLUE} />
        <path d="M461 210l9 11 20-30" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ── Relance envoyée ── */}
      <g className="hero-pop" style={delay(1.2)}>
        <path d="M346 300h22M340 316h28M350 332h18" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="env-send">
        <rect x="384" y="280" width="120" height="84" fill="#fff" stroke={INK} strokeWidth="5" />
        <path d="M394 292l50 36 50-36" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="504" cy="280" r="10" fill={BLUE} className="hero-pop" style={delay(3)} />
    </svg>
  )
}
