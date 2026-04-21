import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mobem Solutions – Agence Web, Design & Stratégie à Nantes',
  description: 'Mobem Solutions accompagne les PME et ETI dans leur transformation digitale. Création de sites web, design UX/UI et stratégie digitale — une agence à taille humaine basée à Nantes.',
  keywords: ['agence web', 'Nantes', 'création site web', 'design UX', 'stratégie digitale', 'PME', 'ETI', 'développement web', 'agence digitale'],
  authors: [{ name: 'Mobem Solutions' }],
  creator: 'Mobem Solutions',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mobem-solutions.com',
    siteName: 'Mobem Solutions',
    title: 'Mobem Solutions – Agence Web, Design & Stratégie à Nantes',
    description: 'Création de sites web, design UX/UI et stratégie digitale pour PME et ETI. Basée à Nantes.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mobem Solutions – Agence Web, Design & Stratégie à Nantes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobem Solutions – Agence Web, Design & Stratégie à Nantes',
    description: 'Création de sites web, design UX/UI et stratégie digitale pour PME et ETI. Basée à Nantes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
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
    <html lang="fr" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
