import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container } from "@/components/home/primitives"
import { cn } from "@/lib/utils"

export interface LegalSection {
  id: string
  title: string
  content: React.ReactNode
}

const LEGAL_PAGES = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
]

interface LegalLayoutProps {
  current: string
  title: string
  intro: React.ReactNode
  updated: string
  sections: LegalSection[]
}

export function LegalLayout({ current, title, intro, updated, sections }: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="legal-heading">
          <div className="blue-glow pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden="true" />
          <Container className="relative">
            <p className="chip-dark">Informations légales</p>
            <h1 id="legal-heading" className="type-display mt-6 text-ink">
              {title}
            </h1>
            <div className="type-body mt-5 max-w-[64ch] text-charcoal">{intro}</div>
            <p className="mt-4 type-caption text-charcoal">{updated}</p>
          </Container>
        </section>

        <Container className="grid gap-12 py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Sommaire" className="flex flex-col gap-1">
              <p className="mb-2 type-meta text-graphite">Sommaire</p>
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="rounded-[10px] px-2 py-1.5 text-[14px] text-charcoal transition-colors hover:bg-black/[0.04] hover:text-graphite">
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
            <nav aria-label="Autres pages légales" className="mt-8 flex flex-wrap gap-2">
              {LEGAL_PAGES.filter((p) => p.href !== current).map((p) => (
                <Link key={p.href} href={p.href} className="rounded-[12px] border border-border px-3 py-1.5 text-[13px] font-[550] text-graphite hover:bg-black/[0.04]">
                  {p.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="legal-prose flex max-w-[72ch] flex-col gap-14">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28" aria-labelledby={`${s.id}-title`}>
                <h2 id={`${s.id}-title`} className="type-feature text-ink sm:text-[24px] sm:leading-[1.3]">
                  <span className="mr-2 text-charcoal">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-5 flex flex-col gap-4">{s.content}</div>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

/** Encadré blanc pour une fiche d'identité, un hébergeur, un sous-traitant… */
export function LegalCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("card-lift p-5", className)}>{children}</div>
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-[20px] shadow-card">
      <table className="w-full min-w-[520px] text-left text-[14px]">
        <thead className="bg-black/[0.03] text-graphite">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-[550]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={cn("px-4 py-3 align-top", j === 0 ? "text-graphite" : "text-charcoal")}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
