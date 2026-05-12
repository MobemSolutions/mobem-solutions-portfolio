/**
 * Pousse les 6 cas d'études statiques vers Sanity.
 * Usage : npm run seed:realisations
 * Pré-requis : SANITY_API_WRITE_TOKEN dans .env.local
 */

import { createClient } from 'next-sanity'
import { CASES } from '../lib/cases'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token     = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN manquant dans .env.local')
  console.error('   → Sanity Dashboard > Settings > API > Tokens > Add (Editor)')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

function key(prefix: string, i: number) {
  return `${prefix}-${i}`
}

async function seed() {
  console.log(`\n🌱  Seed de ${CASES.length} réalisations → dataset "${dataset}"\n`)

  for (const cas of CASES) {
    const doc = {
      _type: 'realisation',
      _id:   `realisation-${cas.slug}`,
      idx:    cas.idx,
      client: cas.client,
      slug:   { _type: 'slug', current: cas.slug },
      cat:    cas.cat,
      sector: cas.sector,
      tag:    cas.tag,
      year:   cas.year,
      kpi:    cas.kpi,
      desc:   cas.desc,
      featured:    false,
      publishedAt: `${cas.year}-01-01`,

      stats: cas.stats.map(([v, l], i) => ({
        _type: 'stat',
        _key:  key('stat', i),
        v,
        l,
      })),

      kpis: cas.kpis.map((k, i) => ({
        _type: 'kpi',
        _key:  key('kpi', i),
        v: k.v,
        l: k.l,
        d: k.d,
      })),

      body: cas.body.map((b, i) => ({
        _type:   'section',
        _key:    key('section', i),
        title:   b.title,
        content: b.content,
      })),

      stack: cas.stack,

      quote: {
        _type:  'quote',
        text:   cas.quote.text,
        author: cas.quote.author,
        role:   cas.quote.role,
      },
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ ${cas.idx} · ${cas.client}`)
    } catch (err: any) {
      console.error(`  ✗ ${cas.client}: ${err?.message ?? err}`)
    }
  }

  console.log('\n✅  Seed terminé. Recharge le studio Sanity pour voir les documents.\n')
}

seed()
