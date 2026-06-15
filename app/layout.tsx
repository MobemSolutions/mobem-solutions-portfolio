import type { Metadata, Viewport } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientOnlyUI } from '@/components/client-only-ui'
import { ScrollReveal } from '@/components/scroll-reveal'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})


export const metadata: Metadata = {
  metadataBase: new URL('https://mobem-solutions.com'),
  title: 'Mobem Solutions - Conseil en Digitalisation | Nantes',
  description: 'Mobem Solutions accompagne les PME et ETI dans leur transformation digitale. Conseil, stratégie et solutions sur-mesure. Agence basée à Nantes.',
  keywords: ['conseil digital', 'digitalisation', 'Nantes', 'transformation digitale', 'stratégie digitale', 'PME', 'ETI', 'agence conseil', 'solutions digitales'],
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
    title: 'Mobem Solutions - Conseil en Digitalisation | Nantes',
    description: 'Conseil et accompagnement dans la transformation digitale pour PME et ETI. Basée à Nantes.',
    images: [
      {
        url: '/opengraph/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mobem Solutions — Agence Web Nantes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobem Solutions - Conseil en Digitalisation | Nantes',
    description: 'Conseil et accompagnement dans la transformation digitale pour PME et ETI. Basée à Nantes.',
    images: ['/opengraph/og-image.png'],
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F7F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1813' },
  ],
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
      <body className={`${inter.variable} ${dmSerif.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
