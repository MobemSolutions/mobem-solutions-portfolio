import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import path from "path"

export const runtime = "nodejs"
export const alt = "Mobem Solutions – Agence Web, Design & Stratégie à Nantes"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const logoData = readFileSync(path.join(process.cwd(), "public", "mobem-logo-redimension-removebg-preview.png"))
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`

  return new ImageResponse(
    (
      <div style={{ width: "1200px", height: "630px", display: "flex", alignItems: "center", justifyContent: "center", background: "#E86A33", position: "relative", overflow: "hidden" }}>
        {/* Dark circle top-right */}
        <div style={{ position: "absolute", top: "-160px", right: "-160px", width: "520px", height: "520px", borderRadius: "50%", background: "rgba(10,22,40,0.2)", display: "flex" }} />
        {/* Dark circle bottom-left */}
        <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "380px", height: "380px", borderRadius: "50%", background: "rgba(10,22,40,0.15)", display: "flex" }} />

        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "64px 64px", display: "flex" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px", padding: "0 100px" }}>
          <img src={logoSrc} width={260} height={74} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />

          <div style={{ width: "60px", height: "3px", background: "rgba(255,255,255,0.5)", borderRadius: "2px", display: "flex" }} />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "40px", fontWeight: 700, color: "#ffffff", textAlign: "center", display: "flex" }}>
              Agence Web, Design & Stratégie
            </div>
            <div style={{ fontSize: "28px", color: "rgba(255,255,255,0.85)", fontWeight: 500, display: "flex" }}>
              à Nantes
            </div>
          </div>

          <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", textAlign: "center", display: "flex" }}>
            Ingénierie · Design · Stratégie — pour les PME et ETI ambitieuses
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", background: "rgba(10,22,40,0.25)", borderRadius: "999px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white", display: "flex" }} />
            <div style={{ fontSize: "14px", color: "white", fontWeight: 500, display: "flex" }}>mobem-solutions.com</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: "rgba(10,22,40,0.3)", display: "flex" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
