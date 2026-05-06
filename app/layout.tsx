import type { Metadata, Viewport } from 'next'
<<<<<<< HEAD
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
=======
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
>>>>>>> 38f194d (maj)
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

<<<<<<< HEAD
const dmSerif = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
=======
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
>>>>>>> 38f194d (maj)
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
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mobem Solutions - Conseil en Digitalisation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobem Solutions - Conseil en Digitalisation | Nantes',
    description: 'Conseil et accompagnement dans la transformation digitale pour PME et ETI. Basée à Nantes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F7F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
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
<<<<<<< HEAD
    <html lang="fr" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} ${dmSerif.variable} font-sans antialiased`}>
=======
    <html lang="fr" suppressHydrationWarning className="bg-background" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${dmSerif.variable} ${jetbrains.variable} font-sans antialiased`}>
>>>>>>> 38f194d (maj)
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
