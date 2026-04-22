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
      <div style={{ width: "1200px", height: "630px", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        <img src={logoSrc} width={900} height={254} style={{ objectFit: "contain" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
