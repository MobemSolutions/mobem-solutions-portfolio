import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Mobem Solutions | Agence Digitale à Nantes',
  description: 'Mobem Solutions accompagne les PME et ETI dans leur transformation digitale. Ingénierie, Design, Stratégie — une agence à taille humaine avec des compétences de grande structure.',
  keywords: ['agence digitale', 'Nantes', 'développement web', 'design UX', 'stratégie digitale', 'PME', 'ETI'],
  authors: [{ name: 'Mobem Solutions' }],
  creator: 'Mobem Solutions',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mobem.fr',
    siteName: 'Mobem Solutions',
    title: 'Mobem Solutions | Agence Digitale à Nantes',
    description: 'Mobem Solutions accompagne les PME et ETI dans leur transformation digitale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobem Solutions | Agence Digitale à Nantes',
    description: 'Mobem Solutions accompagne les PME et ETI dans leur transformation digitale.',
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
      </body>
    </html>
  )
}
