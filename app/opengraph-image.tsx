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
          background: "#F8F7F5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "#E63030",
            display: "flex",
          }}
        />

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "#E2E2E2",
            display: "flex",
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#0D0D0D",
              letterSpacing: "-2px",
              lineHeight: "1",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            Mobem
          </div>

          {/* Sub-wordmark */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "300",
              color: "#6B7280",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Solutions
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: "52px",
            }}
          >
            Agence Web · Nantes · France
          </div>

          {/* Tagline strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
              borderTop: "1px solid #E2E2E2",
              paddingTop: "28px",
              width: "680px",
              justifyContent: "center",
            }}
          >
            {[
              "Sites en 10 jours",
              "SEO local garanti",
              "Lighthouse 90+",
              "Diagnostic 0 €",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "14px",
                  color: "#555555",
                  letterSpacing: "-0.1px",
                  paddingLeft: i > 0 ? "20px" : "0px",
                  borderLeft: i > 0 ? "1px solid #E2E2E2" : "none",
                  marginLeft: i > 0 ? "20px" : "0px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
