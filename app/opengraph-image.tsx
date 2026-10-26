import { ImageResponse } from "next/og"

export const alt = "Mobem Solutions — Vos tâches administratives tournent toutes seules"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #3d6cf5 0%, #0d44e8 55%, #0a2fa8 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <g stroke="#fff" strokeWidth="5" strokeLinecap="round">
              <path d="M33 12.5L9 26.5M9 26.5L28.5 40M28.5 40L33 12.5" />
            </g>
            <circle cx="33" cy="12.5" r="9" fill="#fff" />
            <circle cx="9" cy="26.5" r="6.5" fill="#fff" />
            <circle cx="28.5" cy="40" r="6.5" fill="#fff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 34, fontWeight: 700 }}>Mobem</span>
            <span style={{ fontSize: 28 }}>Solutions</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
            Vos tâches administratives tournent toutes seules.
          </div>
          <div style={{ fontSize: 30, opacity: 0.85 }}>Automatisation sur vos propres outils · Échange gratuit de 20 min</div>
        </div>
      </div>
    ),
    size
  )
}
