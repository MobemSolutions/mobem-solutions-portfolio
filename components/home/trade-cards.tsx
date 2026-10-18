import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TRADES } from "@/lib/automation-content"
import { TradeIllustration } from "@/components/automation/trade-illustration"
import { Eyebrow } from "@/components/home/primitives"
import { TradeCarousel } from "@/components/home/trade-carousel"

/** Exemples par métier : trois cartes à trait fin, illustration en haut, texte en dessous. */
export function TradeCards() {
  return (
    <>
      {/* Mobile : le carrousel en rotation, une carte à la fois */}
      <div className="mt-10 md:hidden">
        <TradeCarousel />
      </div>
    <ul className="mt-12 hidden gap-4 md:grid md:grid-cols-3 lg:mt-16">
      {TRADES.map((trade) => (
        <li key={trade.slug}>
          <Link href={trade.href} className="hairline group flex h-full flex-col p-3 hover:border-[#cfcfd4] hover:bg-white">
            <div className="art-panel overflow-hidden rounded-[8px]">
              <TradeIllustration
                slug={trade.slug}
                className="px-6 pt-6 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
              <Eyebrow>{trade.eyebrow}</Eyebrow>
              <h3 className="mt-2 text-[20px] font-[550] leading-[1.3] tracking-[-0.01em] text-ink text-balance">{trade.headline}</h3>
              <p className="mt-4 flex items-baseline gap-2 border-t border-[#ececef] pt-4 text-[14px] text-[#838385]">
                <span className="text-[22px] font-semibold tracking-[-0.02em] text-blue">{trade.beforeAfter.after}</span>
                au lieu de {trade.beforeAfter.before}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-[550] text-graphite">
                Voir le détail
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
    </>
  )
}
