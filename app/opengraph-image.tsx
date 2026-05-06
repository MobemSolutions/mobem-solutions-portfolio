import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Mobem Solutions — Agence Web Nantes · Sites pro en 10 jours"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const COLS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0D0D0D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red accent bar — top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#E63030", display: "flex" }} />

        {/* Vertical grid lines */}
        {COLS.map((x) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.055)",
              display: "flex",
            }}
          />
        ))}

        {/* Inner content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "56px 72px 60px",
          }}
        >
          {/* ── Header row ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* M logomark + wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "#E63030",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "900",
                  color: "#FFFFFF",
                  lineHeight: "1",
                }}
              >
                M
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", color: "#FAFAF8", letterSpacing: "-0.3px" }}>
                  Mobem Solutions
                </span>
                <span style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
                  Nantes · France
                </span>
              </div>
            </div>

            {/* Right tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "8px 18px",
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                Agence Web
              </span>
            </div>
          </div>

          {/* ── Main headline ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "88px",
                fontWeight: "900",
                letterSpacing: "-0.045em",
                lineHeight: "0.90",
                color: "#FAFAF8",
              }}
            >
              Sites web qui
              <br />
              <span style={{ color: "#E63030" }}>convertissent.</span>
            </div>
            <div
              style={{
                fontSize: "22px",
                color: "rgba(255,255,255,0.50)",
                fontWeight: "400",
                letterSpacing: "-0.01em",
                maxWidth: "680px",
                lineHeight: "1.5",
              }}
            >
              Pour PME, ETI et artisans ambitieux. Livrés en 10 jours,
              SEO local inclus, Lighthouse 90+ garanti.
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "28px",
            }}
          >
            {[
              { v: "10 j", l: "Délai moyen" },
              { v: "90+",  l: "Lighthouse" },
              { v: "100%", l: "Sur-mesure" },
              { v: "0 €",  l: "Diagnostic" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  paddingRight: "56px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  marginRight: i < 3 ? "56px" : "0",
                }}
              >
                <div style={{ fontSize: "34px", fontWeight: "800", color: "#E63030", letterSpacing: "-0.02em" }}>
                  {s.v}
                </div>
                <div style={{ fontFamily: "monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
