import Link from "next/link"
import { MobemLogo } from "@/components/ui/mobem-logo"
import { ArrowUpRight } from "lucide-react"
import { TRADES } from "@/lib/automation-content"

const navStudio = [
  { name: "Méthode", href: "/methode" },
  { name: "Exemples", href: "/#exemples" },
  { name: "Tarifs", href: "/#tarifs" },
  { name: "À propos", href: "/a-propos" },
  { name: "Questions fréquentes", href: "/#faq" },
]

const navLegal = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV", href: "/cgv" },
  { name: "Confidentialité", href: "/confidentialite" },
]

const LINK = "link-underline self-start text-[14px] text-white/65 transition-colors hover:text-white"
const HEAD = "type-meta text-white"

export function Footer() {
  return (
    <footer className="bg-studio text-white" aria-label="Pied de page">
      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Mobem Solutions — Retour à l'accueil">
              <MobemLogo />
            </Link>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-white/65">
              Automatisation des tâches administratives pour TPE et PME, par Arnaud Clavier, concepteur-développeur en automatisation près de Nantes.
            </p>
            <p className="mt-6 text-[20px] font-semibold tracking-[-0.01em]">« Diagnostiquer avant de prescrire. »</p>
          </div>

          <nav aria-label="Métiers" className="flex flex-col gap-3">
            <span className={HEAD}>Métiers</span>
            {TRADES.map((t) => (
              <Link key={t.href} href={t.href} className={LINK}>
                {t.navLabel}
              </Link>
            ))}
            <Link href="/metiers" className={LINK}>
              Tous les métiers
            </Link>
          </nav>

          <nav aria-label="Studio" className="flex flex-col gap-3">
            <span className={HEAD}>Studio</span>
            {navStudio.map((item) => (
              <Link key={item.name} href={item.href} className={LINK}>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className={HEAD}>Contact</span>
            <a href="mailto:contact@mobem-solutions.com" className={LINK}>
              contact@mobem-solutions.com
            </a>
            <a href="https://www.linkedin.com/in/mobem-solutions-136816404/" target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn <ArrowUpRight className="inline h-3 w-3" aria-hidden="true" />
            </a>
            <span className={`${HEAD} mt-4`}>Légal</span>
            {navLegal.map((item) => (
              <Link key={item.name} href={item.href} className={LINK}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 type-caption text-white/60 sm:flex-row">
          <span>© Mobem Solutions · {new Date().getFullYear()} · Nantes</span>
          <span>Installé sur vos propres comptes. Vos données restent chez vous.</span>
        </div>
      </div>
    </footer>
  )
}
