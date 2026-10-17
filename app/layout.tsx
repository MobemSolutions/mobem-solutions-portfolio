import type { Metadata, Viewport } from 'next'
import { Google_Sans_Flex } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientOnlyUI } from '@/components/client-only-ui'
import { ScrollReveal } from '@/components/scroll-reveal'
import './globals.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  variable: '--font-google-sans-flex',
  display: 'swap',
  axes: ['ROND'],
  fallback: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  adjustFontFallback: false,
})


export const metadata: Metadata = {
  metadataBase: new URL('https://mobem-solutions.com'),
  title: 'Mobem Solutions — Automatisation des tâches administratives | Nantes',
  description: 'Mobem Solutions automatise les tâches administratives des TPE-PME, organismes de formation, courtiers et cabinets comptables. Sur vos propres outils, heures gagnées mesurées. Basé à Nantes.',
  keywords: ['automatisation tâches administratives', 'automatisation PME', 'Qualiopi automatisation', 'courtier assurance automatisation', 'cabinet comptable relance pièces', 'Nantes', 'TPE', 'PME'],
  authors: [{ name: 'Mobem Solutions' }],
  creator: 'Mobem Solutions',
  verification: {
    google: 'RTZLToXEiTRLwYiuu4xjBbzPgjSuJwhANVl5PODg7Zk',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mobem-solutions.com',
    siteName: 'Mobem Solutions',
    title: 'Mobem Solutions — Automatisation des tâches administratives | Nantes',
    description: 'Vos tâches administratives tournent toutes seules. Vous récupérez vos heures.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mobem Solutions — Automatisation des tâches administratives',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobem Solutions — Automatisation des tâches administratives | Nantes',
    description: 'Vos tâches administratives tournent toutes seules. Vous récupérez vos heures.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: '/favicon/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/favicon/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="bg-background" data-scroll-behavior="smooth">
      <body className={`${googleSansFlex.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientOnlyUI />
          <ScrollReveal />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
