"use client"

<<<<<<< HEAD
import { Linkedin, ArrowUpRight } from "lucide-react"
=======
import { Linkedin } from "lucide-react"
>>>>>>> 38f194d (maj)
import Link from "next/link"
import { CopyEmail } from "@/components/ui/copy-email"

const team = [
  {
<<<<<<< HEAD
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
=======
    num: "01",
    name: "Nathan Portier",
    role: "Mandataire — Croissance & Communication",
    description: "Stratège orienté résultats, Nathan assure le pilotage de Mobem Solutions et la cohérence entre objectifs business et exécution. Expert en communication, il transforme chaque projet en levier de croissance.",
    expertise: ["Stratégie", "Communication", "Growth"],
    linkedin: "https://www.linkedin.com/in/nathan-portier/",
    email: "nathan.portier@mobem-solutions.com",
    initials: "NP",
  },
  {
    num: "02",
    name: "Arnaud Clavier",
    role: "Co-Mandataire — Développement Technique",
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
    linkedin: "https://www.linkedin.com/in/antoine-clv/",
    email: "antoine.clavier@mobem-solutions.com",
    initials: "AC",
>>>>>>> 38f194d (maj)
  },
]

export function TeamSection() {
  return (
<<<<<<< HEAD
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
=======
    <section id="equipe" className="border-t border-border" aria-labelledby="team-heading">

      {/* Section head */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-border">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">// 05</span>
          <h2 id="team-heading" className="text-[13px] font-medium uppercase tracking-[0.02em]">
            Équipe
>>>>>>> 38f194d (maj)
          </h2>
        </div>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          Trois associés · Une vision commune
        </span>
      </div>

<<<<<<< HEAD
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
=======
      {/* Team grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {team.map((member, i) => (
          <div
            key={member.num}
            className={cn(
              "flex flex-col px-4 sm:px-6 lg:px-8 py-8 lg:py-10 bento-hover",
              i < 2 && "border-b border-border lg:border-b-0 lg:border-r lg:border-border"
            )}
          >
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">// {member.num}</span>
              <div className="w-9 h-9 border border-current/20 flex items-center justify-center font-mono text-[11px] text-muted-foreground">
                {member.initials}
>>>>>>> 38f194d (maj)
              </div>
            </div>

            <h3 className="text-[28px] lg:text-[32px] font-bold tracking-[-0.025em] leading-none mb-2">
              {member.name}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground mb-5">
              {member.role}
            </p>
            <p className="text-[14px] leading-relaxed text-muted-foreground flex-1 mb-6">
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
                className="w-8 h-8 border border-current/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-current/50 transition-colors"
                aria-label={`Profil LinkedIn de ${member.name}`}
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <CopyEmail email={member.email} variant="icon" ariaLabel={`Copier l'email de ${member.name}`} />
            </div>
          </div>
<<<<<<< HEAD
        </div>

=======
        ))}
>>>>>>> 38f194d (maj)
      </div>
    </section>
  )
}
