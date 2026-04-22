import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20 flex items-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-8xl font-bold text-accent mb-6">404</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Page introuvable
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou explorez notre blog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-secondary text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              Voir le blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
