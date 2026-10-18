import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, SectionHeading, FaqList, Eyebrow } from "@/components/home/primitives"
import { ClosingBand } from "@/components/home/closing-band"
import { DiagnosticButton } from "@/components/diagnostic-button"
import { PricingIcon } from "@/components/home/pricing-icons"
import { PlanCard } from "@/components/home/sections"
import { PRICING, getPlan } from "@/lib/automation-content"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return PRICING.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const plan = getPlan((await params).slug)
  if (!plan) return {}
  const url = `https://mobem-solutions.com${plan.href}`
  return {
    title: `${plan.name} · ${plan.price} | Mobem Solutions`,
    description: `${plan.tagline} ${plan.text}`,
    alternates: { canonical: url },
    openGraph: { title: `${plan.name} | Mobem Solutions`, description: plan.tagline, url },
  }
}

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const plan = getPlan((await params).slug)
  if (!plan) notFound()
  const others = PRICING.filter((p) => p.slug !== plan.slug)

  return (
    <>
      <Header />
      <main id="main-content">
        {/* En-tête : la formule, son prix, et l'action */}
        <section className="pt-28 sm:pt-36" aria-labelledby="plan-heading">
          <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <nav aria-label="Fil d'Ariane" className="type-meta text-charcoal">
                <Link href="/#tarifs" className="inline-flex items-center gap-1.5 hover:text-graphite">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Tarifs
                </Link>
              </nav>
              <Eyebrow className="mt-8">{plan.name}</Eyebrow>
              <h1 id="plan-heading" className="type-display mt-4 max-w-[18ch] text-ink text-balance">
                {plan.tagline}
              </h1>
              <p className="type-body mt-6 max-w-[54ch] text-charcoal">{plan.forWho}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DiagnosticButton>{plan.featured ? "Réserver mon diagnostic" : "En parler au diagnostic"}</DiagnosticButton>
              </div>
              <p className="mt-5 text-[14px] text-[#838385]">45 min · Sans engagement · Hébergé en Europe</p>
            </div>

            {/* Fiche prix, dans le style des cartes de tarifs */}
            <div className="overflow-hidden rounded-[14px] border-2 border-ink bg-white shadow-[6px_6px_0_#161618]">
              <div className={cn("border-b-2 border-ink px-6 py-3 text-[15px] font-[650]", plan.featured ? "bg-blue text-white" : "bg-[#f3f4f6] text-ink")}>
                {plan.name}
              </div>
              <div className="p-6 sm:p-8">
                <PricingIcon name={plan.icon} className="h-16 w-16" />
                <p className="mt-6 text-[40px] font-bold leading-none tracking-[-0.03em] text-ink">{plan.price}</p>
                <p className="mt-2 text-[15px] text-[#838385]">{plan.unit}</p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t-2 border-dashed border-[#d9dbe0] pt-6">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-graphite">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Déroulé */}
        <section className="py-12 sm:py-16 lg:py-24" aria-labelledby="deroule-heading">
          <Container>
            <SectionHeading id="deroule-heading" eyebrow="Comment ça se passe" title="Trois étapes, sans surprise." />
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {plan.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="group rounded-[14px] border-2 border-ink bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#161618] sm:p-7"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-[700] transition-colors duration-300",
                      i === 0 ? "bg-blue text-white" : "bg-white text-ink ring-2 ring-inset ring-ink group-hover:bg-blue group-hover:text-white group-hover:ring-blue"
                    )}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[18px] font-[650] text-ink">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-charcoal">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Ce que vous obtenez + questions */}
        <section className="pb-12 sm:pb-16 lg:pb-24" aria-labelledby="livrables-heading">
          <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading id="livrables-heading" eyebrow="Ce que vous obtenez" title="Concrètement." />
              <ul className="mt-8 flex flex-col gap-3">
                {plan.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 rounded-[12px] bg-[#f3f4f6] px-5 py-4 text-[16px] text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-white" aria-hidden="true">
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Questions fréquentes" title="Vos questions." />
              <div className="mt-8">
                <FaqList items={plan.faq} />
              </div>
            </div>
          </Container>
        </section>

        {/* Les autres formules */}
        <section className="pb-12 sm:pb-16" aria-labelledby="autres-formules">
          <Container>
            <Eyebrow as="h2" id="autres-formules">
              Les autres formules
            </Eyebrow>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug} className="flex">
                  <PlanCard plan={p} />
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
