import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading, FaqList, Eyebrow } from "@/components/home/primitives"
import { FLOW_ICONS } from "@/components/automation/flow-icons"
import { ClosingBand } from "@/components/home/closing-band"
import { BookingButton, BookingNotice } from "@/components/booking-button"
import { TradeVisual } from "@/components/automation/trade-visual"
import { Method, Trust, ToolsStrip } from "@/components/home/sections"
import { FAQ, TRADES, type Trade } from "@/lib/automation-content"

export function TradePage({ trade }: { trade: Trade }) {
  const others = TRADES.filter((t) => t.slug !== trade.slug)
  const url = `https://mobem-solutions.com${trade.href}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: trade.metaTitle.replace(" | Mobem Solutions", ""),
        description: trade.metaDescription,
        url,
        audience: { "@type": "BusinessAudience", name: trade.audience },
        provider: { "@id": "https://mobem-solutions.com/#organization" },
        areaServed: "FR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://mobem-solutions.com" },
          { "@type": "ListItem", position: 2, name: "Métiers", item: "https://mobem-solutions.com/metiers" },
          { "@type": "ListItem", position: 3, name: trade.navLabel, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="trade-heading">
          <Container className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <nav aria-label="Fil d'Ariane" className="type-meta text-charcoal">
                <Link href="/metiers" className="inline-flex items-center gap-1.5 hover:text-graphite">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Métiers
                </Link>
              </nav>
              <Eyebrow className="mt-8">{trade.audience}</Eyebrow>
              <h1 id="trade-heading" className="type-display mt-4 text-ink text-balance">
                {trade.headline}
              </h1>
              <p className="type-body mt-6 text-charcoal">{trade.intro}</p>
              <p className="mt-6 flex items-baseline gap-2 text-[15px] text-[#838385]">
                <span className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-blue">{trade.beforeAfter.after}</span>
                au lieu de {trade.beforeAfter.before} · exemple type
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookingButton />
              </div>
              <p className="mt-5 type-meta text-charcoal">20 min en visio · Gratuit et sans engagement</p>
              <BookingNotice />
            </div>
            <TradeVisual trade={trade} className="rounded-[16px]" />
          </Container>
        </section>

        <ToolsStrip />

        <section id="taches" className="py-12 sm:py-16 lg:py-24" aria-labelledby="taches-heading">
          <Container>
            <SectionHeading
              id="taches-heading"
              eyebrow="Ce que nous automatisons"
              title="Les tâches qui reviennent chaque semaine"
              text="Nous partons de vos mots et de vos outils. Chaque tâche est reliée à ce que vous utilisez déjà, puis mesurée."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {trade.tasks.map((task) => {
                const Icon = FLOW_ICONS[task.icon]
                return (
                  <li key={task.title} className="hairline flex flex-col gap-4 p-6 hover:border-[#cfcfd4] hover:bg-white sm:p-7">
                    <span className="icon-tile" aria-hidden="true">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="text-[18px] font-[550] leading-[1.4] text-ink">{task.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-charcoal">{task.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Container>
        </section>

        <Method />
        <Trust />

        <section className="py-12 sm:py-16 lg:py-24" aria-labelledby="trade-faq-heading">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading id="trade-faq-heading" eyebrow="Questions fréquentes" title="Vos questions, avant un premier échange" />
            <FaqList items={[...trade.faq, ...FAQ.slice(0, 3)]} />
          </Container>
        </section>

        <section className="pb-4" aria-labelledby="autres-metiers">
          <Container>
            <Eyebrow as="h2" id="autres-metiers">Autres métiers</Eyebrow>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="hairline group flex items-center justify-between gap-4 p-5 transition-colors duration-300 hover:border-[#cfcfd3] hover:bg-white">
                    <span className="flex flex-col gap-1">
                      <span className="text-[13px] text-charcoal">{t.eyebrow}</span>
                      <span className="type-feature text-ink">{t.headline}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-charcoal transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <ClosingBand />
      </main>
      <Footer />
    </>
  )
}
