import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading, FaqList, AppWindow, Eyebrow } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { DiagnosticButton } from "@/components/diagnostic-button"
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
          <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />
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
              <div className="hairline mt-7 flex max-w-[460px] items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-[13px] text-charcoal">Exemple type, chaque mois</p>
                  <p className="mt-1 text-[15px] font-[550] text-charcoal line-through decoration-[#c2c2c4]">{trade.beforeAfter.before}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#c2c2c4]" aria-hidden="true" />
                <p className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-[-0.03em] text-blue">{trade.beforeAfter.after}</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DiagnosticButton>Voir si c&apos;est automatisable chez moi</DiagnosticButton>
                <Link href="#taches" className="btn-outline">
                  Ce que nous automatisons
                </Link>
              </div>
              <p className="mt-5 type-meta text-charcoal">45 min · Sans engagement · Vos données restent chez vous</p>
            </div>
            <AppWindow title={`${trade.navLabel} · automatisations`} bodyClassName="p-2 sm:p-3">
              <TradeVisual trade={trade} className="rounded-[10px]" />
            </AppWindow>
          </Container>
        </section>

        <ToolsStrip />

        <section id="taches" className="py-12 sm:py-16 lg:py-24" aria-labelledby="taches-heading">
          <Container>
            <SectionHeading
              id="taches-heading"
              eyebrow="Ce que nous automatisons"
              title="Les tâches qui reviennent chaque semaine"
              text="Nous partons de vos mots et de vos outils. Chaque tâche est installée sur vos comptes, puis mesurée."
            />
            {/* Grille à traits fins : les cases partagent leurs bordures, comme un tableau */}
            <ul className="hairline mt-12 grid overflow-hidden sm:grid-cols-2">
              {trade.tasks.map((task, i) => (
                <li
                  key={task.title}
                  className="group relative flex flex-col gap-3 border-[#e6e6e8] p-6 transition-colors duration-300 hover:bg-white max-sm:[&:not(:first-child)]:border-t sm:p-8 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(n+3)]:border-t"
                >
                  <span className="flex items-center justify-between">
                    <span className="eyebrow text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f2] text-graphite transition-colors duration-300 group-hover:bg-blue group-hover:text-white"
                      aria-hidden="true"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </span>
                  <h3 className="type-feature text-ink">{task.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-charcoal">{task.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <Method />
        <Trust />

        <section className="py-12 sm:py-16 lg:py-24" aria-labelledby="trade-faq-heading">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading id="trade-faq-heading" eyebrow="Questions fréquentes" title="Vos questions, avant le diagnostic" />
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
