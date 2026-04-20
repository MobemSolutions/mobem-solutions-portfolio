"use client"

import { Linkedin } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CopyEmail } from "@/components/ui/copy-email"

const team = [
  {
    id: 1,
    name: "Nathan Portier",
    role: "Mandataire – Responsable Croissance & Communication",
    description: "Stratège orienté résultats, Nathan assure le pilotage de Mobem Solutions et la cohérence entre les objectifs business et leur exécution. Expert en communication, il transforme chaque projet en levier de croissance pour nos clients en optimisant leur visibilité et leur stratégie d'acquisition.",
    expertise: ["Stratégie", "Communication", "Growth"],
    linkedin: "https://www.linkedin.com/in/nathan-portier/",
    email: "nathan.portier@mobem-solutions.com",
    initials: "NP",
    color: "accent",
  },
  {
    id: 2,
    name: "Arnaud Clavier",
    role: "Co-Mandataire – Responsable Développement Technique",
    description: "Architecte de solutions digitales, Arnaud transforme les idées complexes en architectures robustes et évolutives. En tant que garant technique du collectif, il supervise le développement et s'assure que chaque ligne de code répond aux standards de performance et de sécurité les plus exigeants.",
    expertise: ["Architecture", "Développement", "Sécurité"],
    linkedin: "https://www.linkedin.com/in/arnaud-clvr/",
    email: "arnaud.clavier@mobem-solutions.com",
    initials: "AC",
    color: "chart-2",
  },
  {
    id: 3,
    name: "Antoine Clavier",
    role: "Responsable Design & Expérience Utilisateur (UX/UI)",
    description: "Créateur d'interfaces intuitives, Antoine place l'utilisateur au centre de la réflexion. Son rôle est de traduire les besoins fonctionnels en expériences visuelles marquantes, alliant esthétisme moderne et ergonomie fluide pour maximiser l'impact de chaque plateforme.",
    expertise: ["UX/UI Design", "Design Systems", "Prototypage"],
    linkedin: "https://www.linkedin.com/in/antoine-clv/",
    email: "antoine.clavier@mobem-solutions.com",
    initials: "AC",
    color: "chart-4",
  },
]

const values = [
  {
    title: "Expertise accessible",
    description: "Nous rendons la technologie compréhensible et les décisions claires.",
  },
  {
    title: "Engagement concret",
    description: "Nous mesurons notre succès à l'impact réel sur votre activité.",
  },
  {
    title: "Relation durable",
    description: "Nous construisons des partenariats, pas des prestations ponctuelles.",
  },
]

export function TeamSection() {
  return (
    <section
      id="equipe"
      className="py-24 lg:py-32 bg-secondary/30"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Notre équipe
          </span>
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            <span className="text-balance">
              Trois associés,{" "}
              <span className="text-accent">une vision commune</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Une équipe complémentaire qui allie expertise technique, sens du design et vision stratégique.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {team.map((member) => (
            <article
              key={member.id}
              className={cn(
                "group relative bg-card rounded-2xl border border-border p-8 transition-all duration-300",
                "hover:shadow-xl hover:border-border/50"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 transition-transform duration-300 group-hover:scale-105",
                  member.color === "accent" && "bg-accent/10 text-accent",
                  member.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                  member.color === "chart-4" && "bg-chart-4/10 text-chart-4"
                )}
                aria-hidden="true"
              >
                {member.initials}
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-4">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {member.description}
              </p>

              {/* Expertise tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {member.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3">
                <Link
                  href={member.linkedin}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label={`Profil LinkedIn de ${member.name}`}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </Link>
                <CopyEmail
                  email={member.email}
                  variant="icon"
                  ariaLabel={`Copier l'email de ${member.name}`}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Values */}
        <div className="border-t border-border pt-16">
          <h3 className="text-center text-xl font-semibold text-foreground mb-10">
            Ce qui nous guide
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center"
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent text-sm font-bold mb-4"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
