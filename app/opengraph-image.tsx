import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Mobem Solutions — Agence Web Nantes · Sites pro en 10 jours"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0D0D0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Left red accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: "10px",
            background: "#E63030",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {/* MOBEM — huge, instantly readable at any size */}
          <div
            style={{
              fontSize: "200px",
              fontWeight: "900",
              color: "#FFFFFF",
              letterSpacing: "-8px",
              lineHeight: "1",
              textTransform: "uppercase",
            }}
          >
            MOBEM
          </div>

          {/* SOLUTIONS — accent color, wide tracking */}
          <div
            style={{
              fontSize: "40px",
              fontWeight: "300",
              color: "#E63030",
              letterSpacing: "18px",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            SOLUTIONS
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "40px",
            }}
          >
            AGENCE WEB · NANTES · FRANCE
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
