import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading, FaqList } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { DiagnosticButton } from "@/components/diagnostic-button"
import { FlowDemo } from "@/components/automation/flow-demo"
import { Method, Trust, ToolsStrip } from "@/components/home/sections"
import { FAQ, TRADES, type Trade } from "@/lib/automation-content"

export function TradePage({ trade }: { trade: Trade }) {
  const others = TRADES.filter((t) => t.slug !== trade.slug)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: trade.metaTitle,
    description: trade.metaDescription,
    audience: { "@type": "BusinessAudience", name: trade.audience },
    provider: { "@id": "https://mobem-solutions.com/#organization" },
    areaServed: "FR",
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
              <p className="chip-dark mt-6">{trade.audience}</p>
              <h1 id="trade-heading" className="type-display mt-6 text-ink text-balance">
                {trade.headline}
              </h1>
              <p className="type-body mt-6 text-charcoal">{trade.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DiagnosticButton>Voir si c&apos;est automatisable chez moi</DiagnosticButton>
                <Link href="#taches" className="btn-outline">
                  Ce qu&apos;on automatise
                </Link>
              </div>
              <p className="mt-5 type-meta text-charcoal">45 min · Sans engagement · Vos données restent chez vous</p>
            </div>
            <FlowDemo trigger={trade.trigger} steps={trade.steps} result={trade.beforeAfter} />
          </Container>
        </section>

        <ToolsStrip />

        <section id="taches" className="py-16 lg:py-24" aria-labelledby="taches-heading">
          <Container>
            <SectionHeading
              id="taches-heading"
              eyebrow="Ce qu'on automatise"
              title="Les tâches qui reviennent chaque semaine"
              text="On part de vos mots et de vos outils. Chaque tâche est installée sur vos comptes, puis mesurée."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {trade.tasks.map((task) => (
                <li key={task.title} className="card-lift flex gap-4 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.05]" aria-hidden="true">
                    <Check className="h-4 w-4 text-blue" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="type-feature text-ink">{task.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-charcoal">{task.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <Method />
        <Trust />

        <section className="py-16 lg:py-24" aria-labelledby="trade-faq-heading">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading id="trade-faq-heading" eyebrow="Questions fréquentes" title="Vos questions, avant le diagnostic" />
            <FaqList items={[...trade.faq, ...FAQ.slice(0, 3)]} />
          </Container>
        </section>

        <section className="pb-4" aria-labelledby="autres-metiers">
          <Container>
            <h2 id="autres-metiers" className="type-meta text-charcoal">Autres métiers</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="card-lift flex flex-col gap-1 p-5 transition-transform hover:-translate-y-0.5">
                    <span className="type-meta text-charcoal">{t.eyebrow}</span>
                    <span className="type-feature text-ink">{t.headline}</span>
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
