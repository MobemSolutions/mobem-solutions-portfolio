"use client"

import { Linkedin } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CopyEmail } from "@/components/ui/copy-email"

const team = [
  {
    num: "01",
    name: "Nathan Portier",
    role: "Mandataire · Croissance & Communication",
    description: "Stratège orienté résultats, Nathan assure le pilotage de Mobem Solutions et la cohérence entre objectifs business et exécution. Expert en communication, il transforme chaque projet en levier de croissance.",
    expertise: ["Stratégie", "Communication", "Growth"],
    linkedin: "https://www.linkedin.com/in/nathan-portier/",
    email: "nathan.portier@mobem-solutions.com",
    initials: "NP",
  },
  {
    num: "02",
    name: "Arnaud Clavier",
    role: "Co-Mandataire · Développement Technique",
    description: "Architecte de solutions digitales, Arnaud transforme les idées complexes en architectures robustes et évolutives. Garant technique du collectif, il supervise le développement et garantit performance et sécurité.",
    expertise: ["Architecture", "Développement", "Sécurité"],
    linkedin: "https://www.linkedin.com/in/arnaud-clvr/",
    email: "arnaud.clavier@mobem-solutions.com",
    initials: "AC",
  },
  {
    num: "03",
    name: "Antoine Clavier",
    role: "Responsable Design & UX/UI",
    description: "Créateur d'interfaces intuitives, Antoine place l'utilisateur au centre. Son rôle : traduire les besoins fonctionnels en expériences visuelles marquantes qui maximisent l'impact de chaque plateforme.",
    expertise: ["UX/UI Design", "Design Systems", "Prototypage"],
    linkedin: "https://www.linkedin.com/in/antoine-clavier-561750204/",
    email: "antoine.clavier@mobem-solutions.com",
    initials: "AC",
  },
]

export function TeamSection() {
  return (
    <section id="equipe" className="border-t border-border" aria-labelledby="team-heading">

      <div className="px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-10 lg:pb-12 border-b border-border">
        <h2 id="team-heading" className="text-[clamp(44px,6vw,80px)] font-bold leading-[0.92] tracking-[-0.04em]">
          Notre <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">équipe.</span>
        </h2>
      </div>

      {/* Team grid — desktop: 3 cols, mobile: horizontal scroll with snap */}
      <div className="overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory lg:snap-none">
      <div className="flex lg:grid lg:grid-cols-[1.12fr_1fr_0.92fr] min-w-max lg:min-w-0">
        {team.map((member, i) => (
          <div
            key={member.num}
            data-cursor="hover"
            className={cn(
              "group flex flex-col w-[320px] lg:w-auto px-6 lg:px-8 py-8 lg:py-10 bento-hover border-r border-border lg:border-r-0 snap-start lg:snap-align-none",
              i < 2 && "lg:border-r lg:border-border"
            )}
          >
            <div className="flex justify-end mb-6">
              <div className="w-9 h-9 border border-current/20 flex items-center justify-center font-mono text-[11px] text-foreground/70 group-hover:text-background/70 transition-colors">
                {member.initials}
              </div>
            </div>

            <h3 className="text-[28px] lg:text-[32px] font-bold tracking-[-0.025em] leading-none mb-2">
              {member.name}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-foreground group-hover:text-background/70 mb-5 transition-colors">
              {member.role}
            </p>
            <p className="text-[14px] leading-relaxed text-muted-foreground group-hover:text-background/60 flex-1 mb-6 transition-colors">
              {member.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {member.expertise.map((skill) => (
                <span key={skill} className="font-mono text-[9.5px] uppercase tracking-[0.06em] px-2 py-1 border border-current/20">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-current/10">
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-current/20 flex items-center justify-center text-muted-foreground group-hover:text-background/60 hover:opacity-100 hover:border-current/50 transition-colors"
                aria-label={`Profil LinkedIn de ${member.name}`}
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <CopyEmail email={member.email} variant="icon" ariaLabel={`Copier l'email de ${member.name}`} />
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
