"use client"

import { Code2, Palette, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "ingenierie",
    icon: Code2,
    number: "01",
    title: "Ingénierie & Développement",
    description:
      "Applications web sur-mesure, APIs robustes, intégrations complexes. Nous concevons des solutions techniques qui évoluent avec votre entreprise.",
    features: [
      "Applications web & mobile",
      "APIs et microservices",
      "Intégrations systèmes",
      "Maintenance évolutive",
    ],
    color: "accent",
  },
  {
    id: "design",
    icon: Palette,
    number: "02",
    title: "Design & Expérience",
    description:
      "Interfaces intuitives, identités visuelles mémorables. Nous créons des expériences digitales qui engagent vos utilisateurs et reflètent votre marque.",
    features: [
      "UX/UI Design",
      "Identité visuelle",
      "Design systems",
      "Prototypage interactif",
    ],
    color: "chart-2",
  },
  {
    id: "strategie",
    icon: TrendingUp,
    number: "03",
    title: "Stratégie & Croissance",
    description:
      "Audit digital, stratégie d'acquisition, optimisation de conversion. Nous vous accompagnons pour maximiser l'impact de votre présence en ligne.",
    features: [
      "Audit & conseil",
      "SEO & acquisition",
      "Analytics & data",
      "Optimisation conversion",
    ],
    color: "chart-4",
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-secondary/30"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Nos expertises
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            <span className="text-balance">
              Une approche globale pour{" "}
              <span className="text-accent">un modèle d&apos;avenir</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Trois pôles d&apos;expertise complémentaires pour vous accompagner de la stratégie jusqu&apos;à la mise en œuvre.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.id}
              className={cn(
                "group relative bg-card rounded-2xl border border-border p-8 transition-all duration-300",
                "hover:shadow-xl hover:border-border/50 hover:-translate-y-1",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number */}
              <span
                className="absolute top-6 right-6 text-6xl font-bold text-muted/30 select-none"
                aria-hidden="true"
              >
                {service.number}
              </span>

              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                  service.color === "accent" && "bg-accent/10 text-accent",
                  service.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                  service.color === "chart-4" && "bg-chart-4/10 text-chart-4"
                )}
              >
                <service.icon className="w-7 h-7" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6" role="list">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full flex-shrink-0",
                        service.color === "accent" && "bg-accent",
                        service.color === "chart-2" && "bg-chart-2",
                        service.color === "chart-4" && "bg-chart-4"
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href="#contact"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                  service.color === "accent" && "text-accent hover:text-accent/80",
                  service.color === "chart-2" && "text-chart-2 hover:text-chart-2/80",
                  service.color === "chart-4" && "text-chart-4 hover:text-chart-4/80"
                )}
              >
                En savoir plus
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Vous avez un projet qui nécessite plusieurs expertises ?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors"
          >
            Parlons de votre projet
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
