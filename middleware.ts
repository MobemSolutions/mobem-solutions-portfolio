import { NextRequest, NextResponse } from 'next/server'

const OG_CRAWLERS = [
  'facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp',
  'TelegramBot', 'Slackbot', 'Discordbot', 'Pinterest', 'Googlebot',
  'Applebot', 'vkShare', 'W3C_Validator', 'redditbot', 'Baiduspider',
  'rogerbot', 'embedly', 'quora link preview', 'XING-contenttabreceiver',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/opengraph-image')) return NextResponse.next()

  // Allow in non-production (dev, preview)
  if (process.env.VERCEL_ENV !== 'production') return NextResponse.next()

  const ua = req.headers.get('user-agent') ?? ''
  const isCrawler = OG_CRAWLERS.some((bot) => ua.includes(bot))

  if (isCrawler) return NextResponse.next()

  return NextResponse.redirect(new URL('/', req.url), { status: 302 })
}

export const config = {
  matcher: ['/opengraph-image', '/opengraph-image/:path*'],
}
