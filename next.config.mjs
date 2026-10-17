/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    qualities: [75, 90],
  },
  // Anciennes pages SEO de l'offre « création de sites » (métiers × villes, plan du site) :
  // redirigées pour conserver le référencement acquis sans publier de contenu hors sujet.
  async redirects() {
    const trades = 'organismes-de-formation|courtiers-assurance|cabinets-comptables'
    return [
      { source: '/metiers/comptable/:ville*', destination: '/metiers/cabinets-comptables', permanent: true },
      { source: `/metiers/:slug((?!${trades})[^/]+)/:ville*`, destination: '/metiers', permanent: true },
      { source: '/villes/:path*', destination: '/', permanent: true },
      { source: '/plan-du-site', destination: '/', permanent: true },
    ]
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ]

    const appCsp = [
      "default-src 'self';",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://assets.calendly.com https://va.vercel-scripts.com https://vercel.live;`,
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com;",
      "img-src 'self' blob: data: cdn.sanity.io https://assets.calendly.com https://images.unsplash.com;",
      "font-src 'self' data:;",
      "connect-src 'self' *.sanity.io *.vercel-analytics.com https://va.vercel-scripts.com https://api.resend.com https://calendly.com https://api.unsplash.com https://vercel.live wss://ws-us3.pusher.com;",
      "frame-src 'self' https://calendly.com https://vercel.live;",
      "worker-src 'self' blob:;",
    ].join(' ')

    return [
      // All routes — base security headers + restrictive CSP
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: appCsp },
        ],
      },
      // Sanity Studio — override CSP with permissive policy
      // (Studio pings npm registry, Sanity CDN, and various external services)
      {
        source: '/studio(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;" },
        ],
      },
    ]
  },
}

export default nextConfig;