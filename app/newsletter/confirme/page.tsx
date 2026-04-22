import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Abonnement confirmé — Mobem Solutions',
  description: 'Votre abonnement à la newsletter Mobem Solutions est confirmé.',
}

export default function NewsletterConfirmedPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">

          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Abonnement confirmé
          </h1>
          <p className="text-muted-foreground mb-2 leading-relaxed">
            Bienvenue dans la newsletter Mobem Solutions.
          </p>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Vous recevrez nos prochaines analyses sur la stratégie digitale, le design et la performance web directement dans votre boîte mail.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Découvrir le blog →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-border text-muted-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
