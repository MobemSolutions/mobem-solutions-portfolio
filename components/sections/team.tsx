"use client"

import { useState } from "react"
import { Linkedin, Lightbulb, Target, Handshake } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CopyEmail } from "@/components/ui/copy-email"

const team = [
  {
    id: 1,
    tab: "Marketing",
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
    tab: "Développement",
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
    tab: "Design",
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
    icon: Lightbulb,
    title: "Expertise accessible",
    tagline: "Pas de jargon, des décisions claires",
    description: "On traduit la complexité technique en options concrètes. Vous restez maître de votre projet, on vous donne les clés pour décider.",
    color: "accent",
  },
  {
    icon: Target,
    title: "Engagement sur les résultats",
    tagline: "Notre succès = le vôtre",
    description: "Chaque livraison est mesurable : score Lighthouse, délai respecté, objectif atteint. On s'engage sur des indicateurs réels, pas des promesses.",
    color: "chart-2",
  },
  {
    icon: Handshake,
    title: "Partenariat sur le long terme",
    tagline: "Un associé, pas un prestataire",
    description: "Après le lancement, on reste disponibles. Vous avez un interlocuteur direct, joignable, qui connaît votre projet par cœur.",
    color: "chart-4",
  },
]

export function TeamSection() {
  const [activeMember, setActiveMember] = useState(1)

  const renderMemberCard = (member: typeof team[0]) => (
    <article
      key={member.id}
      className="bg-card rounded-2xl border border-border p-8 flex flex-col h-full"
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-5",
          member.color === "accent" && "bg-accent/10 text-accent",
          member.color === "chart-2" && "bg-chart-2/10 text-chart-2",
          member.color === "chart-4" && "bg-chart-4/10 text-chart-4"
        )}
        aria-hidden="true"
      >
        {member.initials}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
      <p className={cn(
        "text-sm font-medium mb-4",
        member.color === "accent" && "text-accent",
        member.color === "chart-2" && "text-chart-2",
        member.color === "chart-4" && "text-chart-4",
      )}>
        {member.role}
      </p>
      <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">{member.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {member.expertise.map((skill) => (
          <span key={skill} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={member.linkedin}
          className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={`Profil LinkedIn de ${member.name}`}
        >
          <Linkedin className="w-4 h-4" aria-hidden="true" />
        </Link>
        <CopyEmail email={member.email} variant="icon" ariaLabel={`Copier l'email de ${member.name}`} />
      </div>
    </article>
  )

  return (
    <section
      id="equipe"
      className="py-14 lg:py-32 bg-secondary/30"
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

        {/* Mobile + tablettes: tab switcher */}
        <div className="xl:hidden mb-12">
          <div
            className="flex bg-secondary rounded-2xl p-1 gap-1 mb-6"
            role="tablist"
            aria-label="Choisir un membre"
          >
            {team.map((member) => (
              <button
                key={member.id}
                role="tab"
                aria-selected={activeMember === member.id}
                onClick={() => setActiveMember(member.id)}
                className={cn(
                  "flex-1 py-2.5 px-1 text-xs font-medium rounded-xl transition-all duration-200 leading-tight",
                  activeMember === member.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {member.tab}
              </button>
            ))}
          </div>
          {team.filter((m) => m.id === activeMember).map(renderMemberCard)}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-8 mb-20">
          {team.map(renderMemberCard)}
        </div>

        {/* Values */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-3">
              Notre ADN
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Ce qui nous guide
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                  value.color === "accent" && "bg-accent/10 text-accent",
                  value.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                  value.color === "chart-4" && "bg-chart-4/10 text-chart-4",
                )} aria-hidden="true">
                  <value.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={cn(
                    "text-xs font-semibold uppercase tracking-wider mb-1",
                    value.color === "accent" && "text-accent",
                    value.color === "chart-2" && "text-chart-2",
                    value.color === "chart-4" && "text-chart-4",
                  )}>
                    {value.tagline}
                  </p>
                  <h4 className="text-base font-bold text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
