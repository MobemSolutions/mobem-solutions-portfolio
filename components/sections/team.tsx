"use client"

import { Linkedin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { CopyEmail } from "@/components/ui/copy-email"

const team = [
  {
    id: 1,
    name: "Nathan Portier",
    role: "Croissance & Communication",
    initials: "NP",
    expertise: ["Strategie", "Communication", "Growth"],
    linkedin: "https://www.linkedin.com/in/nathan-portier/",
    email: "nathan.portier@mobem-solutions.com",
  },
  {
    id: 2,
    name: "Arnaud Clavier",
    role: "Developpement Technique",
    initials: "AC",
    expertise: ["Architecture", "Developpement", "Securite"],
    linkedin: "https://www.linkedin.com/in/arnaud-clvr/",
    email: "arnaud.clavier@mobem-solutions.com",
  },
  {
    id: 3,
    name: "Antoine Clavier",
    role: "Design & Experience",
    initials: "AC",
    expertise: ["UX/UI", "Design Systems", "Prototypage"],
    linkedin: "https://www.linkedin.com/in/antoine-clavier-561750204/",
    email: "antoine.clavier@mobem-solutions.com",
  },
]

const values = [
  {
    number: "01",
    title: "Expertise accessible",
    description: "On traduit la complexite technique en options concretes.",
  },
  {
    number: "02",
    title: "Engagement resultats",
    description: "Chaque livraison est mesurable : score, delai, objectif.",
  },
  {
    number: "03",
    title: "Partenariat long terme",
    description: "Apres le lancement, on reste disponibles.",
  },
]

export function TeamSection() {
  return (
    <section
      id="equipe"
      className="py-20 lg:py-32"
      aria-labelledby="team-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header - Swiss typography */}
        <div className="mb-16 lg:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
            Equipe
          </span>
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight"
          >
            Trois associes,
            <br />
            <span className="text-accent">une vision commune.</span>
          </h2>
        </div>

        {/* Team Grid - Swiss bento */}
        <div className="grid lg:grid-cols-3 gap-px bg-border mb-20">
          {team.map((member) => (
            <article key={member.id} className="bg-card p-8">
              {/* Initials - Large typographic element */}
              <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center text-xl font-black mb-6">
                {member.initials}
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-4">
                {member.role}
              </p>

              {/* Expertise */}
              <div className="flex flex-wrap gap-2 mb-6">
                {member.expertise.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-xs text-muted-foreground border border-border px-2 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-2">
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  aria-label={`LinkedIn de ${member.name}`}
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

        {/* Values - Swiss horizontal */}
        <div className="border-t border-border pt-16">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
              Valeurs
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Ce qui nous guide.
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-border">
            {values.map((value) => (
              <div key={value.number} className="bg-background p-8">
                <span className="text-xs font-bold text-accent mb-4 block">
                  {value.number}
                </span>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
