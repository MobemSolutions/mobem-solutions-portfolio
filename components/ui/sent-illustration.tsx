/**
 * Illustration « message envoyé » : avion en papier au trait sur une forme bleu pâle, quelques étincelles.
 * Même dessin que l'image de l'e-mail de confirmation (public/email/sent.png).
 */
export function SentIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden="true" focusable="false">
      {/* Forme douce en fond */}
      <path
        d="M58 22c26-16 74-18 100 4 24 20 30 58 18 86-12 27-44 42-80 40-34-2-66-20-74-50-8-31 10-63 36-80z"
        fill="#e6edff"
      />
      {/* Traînée */}
      <path d="M48 104l26-14M58 118l20-11M70 126l10-6" stroke="#0d44e8" strokeWidth="3" strokeLinecap="round" />
      {/* Avion en papier */}
      <g stroke="#161618" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M74 80l84-38-30 76-22-26z" fill="#fff" />
        <path d="M106 92l52-50" />
        <path d="M106 92l-6 26 16-14" fill="#fff" />
      </g>
      {/* Étincelles */}
      <g fill="#0d44e8">
        <path d="M66 46l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" />
        <path d="M150 112l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z" />
        <circle cx="112" cy="34" r="3" />
      </g>
    </svg>
  )
}
