import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const runtime = "nodejs"
export const alt = "Mobem Solutions — Agence Web Nantes · Sites pro en 10 jours"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  // Logo noir (texte sombre) sur fond crème — toujours visible quelle que soit la transparence du PNG
  const logoData = await readFile(join(process.cwd(), "public", "logos", "mobem-logo-black.png"))
  const logoSrc  = `data:image/png;base64,${logoData.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#F5F5F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Mobem Solutions" style={{ width: "580px", height: "auto" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
