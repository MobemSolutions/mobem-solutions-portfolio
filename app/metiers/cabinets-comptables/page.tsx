import type { Metadata } from "next"
import { TradePage } from "@/components/trade/trade-page"
import { getTrade } from "@/lib/automation-content"

const trade = getTrade("cabinets-comptables")!

export const metadata: Metadata = {
  title: trade.metaTitle,
  description: trade.metaDescription,
  alternates: { canonical: `https://mobem-solutions.com${trade.href}` },
  openGraph: {
    title: trade.metaTitle,
    description: trade.metaDescription,
    url: `https://mobem-solutions.com${trade.href}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <TradePage trade={trade} />
}
