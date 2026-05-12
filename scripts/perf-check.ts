#!/usr/bin/env tsx
/**
 * PageSpeed Insights — rapport compact
 * Usage : npm run perf -- /chemin  OU  npm run perf -- https://url-complète
 * Optionnel : PAGESPEED_API_KEY=<clé> npm run perf -- /chemin
 */

const BASE_URL = 'https://www.mobem-solutions.com'
const API_KEY  = process.env.PAGESPEED_API_KEY ?? ''

// Git Bash (MINGW) convertit /chemin → C:/Program Files/Git/chemin
// npm peut splitter ce chemin sur les espaces → on rejoint tous les argv[2:]
function normaliseArg(parts: string[]): string {
  const raw = parts.join(' ')
  const mingwPrefixes = ['C:/Program Files/Git', 'C:\\Program Files\\Git']
  for (const prefix of mingwPrefixes) {
    if (raw.startsWith(prefix)) return raw.slice(prefix.length)
  }
  return raw
}

async function fetchPSI(url: string, strategy: 'mobile' | 'desktop', retries = 2): Promise<any> {
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
  endpoint.searchParams.set('url', url)
  endpoint.searchParams.set('strategy', strategy)
  if (API_KEY) endpoint.searchParams.set('key', API_KEY)

  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(endpoint.toString())
    if (res.ok) return res.json()
    if (res.status === 429 && attempt < retries) {
      const wait = 8000 * (attempt + 1)
      process.stdout.write(`  ⚠️  Rate limit (${strategy}), retry dans ${wait / 1000}s…\r`)
      await new Promise(r => setTimeout(r, wait))
      continue
    }
    throw new Error(`PSI ${strategy} → HTTP ${res.status}`)
  }
}

function badge(val: number | null) {
  if (val === null) return '  N/A'
  const s = Math.round(val * 100)
  const icon = s >= 90 ? '🟢' : s >= 50 ? '🟡' : '🔴'
  return `${icon} ${String(s).padStart(3)}`
}

function getLcpElement(audits: any): string {
  const items = audits['largest-contentful-paint-element']?.details?.items ?? []
  const node  = items[0]?.node
  if (!node) return 'N/A'
  const raw = (node.nodeLabel ?? node.snippet ?? 'N/A') as string
  return raw.length > 80 ? raw.slice(0, 77) + '…' : raw
}

function getOpportunities(audits: any): string {
  const KEYS = [
    'render-blocking-resources',
    'unused-javascript',
    'unused-css-rules',
    'uses-responsive-images',
    'offscreen-images',
    'uses-optimized-images',
    'uses-text-compression',
    'lcp-lazy-loaded',
  ]
  const lines = KEYS
    .map(k => audits[k])
    .filter(a => a && a.score !== null && a.score < 1)
    .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
    .slice(0, 5)
    .map(a => {
      const ms  = a.details?.overallSavingsMs
      const kib = a.details?.overallSavingsBytes
      const est = ms  ? ` (−${Math.round(ms)}ms)` :
                  kib ? ` (−${Math.round(kib / 1024)}KiB)` : ''
      return `  · ${a.title}${est}`
    })
  return lines.length ? lines.join('\n') : '  · Aucune'
}

function getA11yFails(lhr: any): string {
  const cat = lhr.categories.accessibility
  const refs = cat?.auditRefs ?? []
  const lines = refs
    .filter((r: any) => {
      const a = lhr.audits[r.id]
      return a && a.score !== null && a.score < 1
    })
    .slice(0, 5)
    .map((r: any) => `  · ${lhr.audits[r.id].title}`)
  return lines.length ? lines.join('\n') : '  · Aucun'
}

function m(audits: any, key: string) {
  return (audits[key]?.displayValue ?? 'N/A').padEnd(10)
}

async function run() {
  let arg = normaliseArg(process.argv.slice(2))
  if (!arg) {
    console.error('Usage: npm run perf -- /chemin  OU  npm run perf -- https://...')
    process.exit(1)
  }
  const url = arg.startsWith('http') ? arg : `${BASE_URL}${arg}`

  if (!API_KEY) {
    console.log('💡 Tip : PAGESPEED_API_KEY=<clé> npm run perf -- /chemin  (évite le rate-limit)')
  }
  console.log(`\n⏳  Mobile…`)
  const mob  = await fetchPSI(url, 'mobile')
  console.log(`⏳  Desktop…`)
  const desk = await fetchPSI(url, 'desktop')

  const mA = mob.lighthouseResult.audits
  const dA = desk.lighthouseResult.audits
  const mC = mob.lighthouseResult.categories
  const dC = desk.lighthouseResult.categories

  const bar = '─'.repeat(62)
  const out = `
${bar}
PageSpeed Insights · ${url}
${bar}

SCORES                Mobile    Desktop
  Performance         ${badge(mC.performance?.score)}      ${badge(dC.performance?.score)}
  Accessibilité       ${badge(mC.accessibility?.score)}      ${badge(dC.accessibility?.score)}
  SEO                 ${badge(mC.seo?.score)}      ${badge(dC.seo?.score)}
  Best Practices      ${badge(mC['best-practices']?.score)}      ${badge(dC['best-practices']?.score)}

MÉTRIQUES MOBILES
  LCP   ${m(mA,'largest-contentful-paint')}  TBT   ${m(mA,'total-blocking-time')}
  FCP   ${m(mA,'first-contentful-paint')}  CLS   ${m(mA,'cumulative-layout-shift')}
  TTI   ${m(mA,'interactive')}  TTFB  ${m(mA,'server-response-time')}

MÉTRIQUES DESKTOP
  LCP   ${m(dA,'largest-contentful-paint')}  TBT   ${m(dA,'total-blocking-time')}
  FCP   ${m(dA,'first-contentful-paint')}

ÉLÉMENT LCP — mobile
  ${getLcpElement(mA)}

ÉLÉMENT LCP — desktop
  ${getLcpElement(dA)}

TOP OPPORTUNITÉS — mobile
${getOpportunities(mA)}

TOP OPPORTUNITÉS — desktop
${getOpportunities(dA)}

ACCESSIBILITÉ — échecs
${getA11yFails(mob.lighthouseResult)}

${bar}
`.trim()

  console.log('\n' + out)
}

run().catch(err => {
  console.error('\nErreur PSI:', err.message)
  if (err.message.includes('429')) {
    console.error('→ Obtiens une clé gratuite sur console.cloud.google.com et passe PAGESPEED_API_KEY=<clé>')
  }
  process.exit(1)
})
