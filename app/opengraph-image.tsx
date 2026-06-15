import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const runtime = "nodejs"
export const alt = "Mobem Solutions — Agence Web Nantes · Sites pro en 10 jours"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const data = await readFile(join(process.cwd(), "public", "opengraph", "og-image.png"))
  const src = `data:image/png;base64,${data.toString("base64")}`

  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={1200} height={630} style={{ objectFit: "cover" }} alt="" />,
    { width: 1200, height: 630 }
  )
}
