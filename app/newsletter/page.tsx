import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSignupForm } from "@/components/newsletter-signup-form"

export const metadata: Metadata = {
  title: "Newsletter — Le bulletin mensuel | Mobem Solutions",
  description: "Un mail par mois. Trois constats terrain, deux outils que nous utilisons, une question pour vous. Aucun spam. Par l'équipe Mobem Solutions.",
  robots: { index: false, follow: false },
}

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-14 lg:pt-16 border-t border-border">
          <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-36 pb-20 border-b border-border grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-end max-w-7xl mx-auto">
            <div>
              <nav
                className="flex items-center gap-2.5 mb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground"
                aria-label="Fil d'Ariane"
              >
                <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-accent transition-colors">Journal</Link>
                <span>/</span>
                <span className="text-foreground">Newsletter</span>
              </nav>
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground mb-4">
                Bulletin mensuel
              </div>
              <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-[clamp(48px,7vw,112px)] mb-6">
                Un mail,{" "}
                <em className="font-serif font-normal italic text-accent tracking-[-0.02em]">par mois.</em>
              </h1>
              <p className="text-xl leading-[1.5] max-w-[600px] text-muted-foreground">
                Trois constats terrain, deux outils que nous utilisons, une question pour vous.
                Rédigé par nos consultants. Aucun spam.
              </p>
            </div>
            <div className="hidden lg:block pb-2 text-right">
              <div className="text-[clamp(64px,8vw,120px)] font-extrabold leading-none tracking-[-0.05em] text-accent tabular-nums">1×</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mt-2">par mois</div>
            </div>
          </div>
        </section>

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 border-b border-border max-w-7xl mx-auto">
          <div className="max-w-[680px]">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
              Rejoindre{" "}
              <em className="font-serif font-normal italic text-accent">la liste.</em>
            </h2>
            <NewsletterSignupForm />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Désabonnement en un clic. Aucune donnée revendue.
            </p>
          </div>
        </section>

        {/* ── What you get ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 border-b border-border max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-border">
            {[
              { num: "01", title: "3 constats terrain", desc: "Ce qu'on observe chaque mois chez nos clients PME & artisans. Sans filtre." },
              { num: "02", title: "2 outils testés", desc: "Des outils qu'on utilise réellement, avec notre retour honnête sur leur utilité." },
              { num: "03", title: "1 question posée", desc: "Une question stratégique à vous poser sur votre présence digitale." },
            ].map((item) => (
              <div
                key={item.num}
                className="border-r border-b border-border p-8 flex flex-col gap-4"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent">{item.num}</span>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] leading-[1.1]">{item.title}</h3>
                <p className="text-[14px] leading-[1.55] text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Back to blog ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 text-center max-w-7xl mx-auto">
          <Link
            href="/blog"
            data-cursor="hover"
            className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-accent transition-colors"
          >
            ← Retour au journal
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
