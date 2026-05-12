/**
 * Supprime le coverImage cassé d'une réalisation Sanity.
 * Usage : pnpm fix:cover-image <slug>
 * Exemple : pnpm fix:cover-image boucherie-marchand
 */

import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token     = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN manquant dans .env.local')
  process.exit(1)
}

const slug = process.argv[2]

if (!slug) {
  console.error('❌  Slug manquant.')
  console.error('   Usage : pnpm fix:cover-image <slug>')
  console.error('   Exemple : pnpm fix:cover-image boucherie-marchand')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

async function fix() {
  const docId = `realisation-${slug}`

  const doc = await client.getDocument(docId)
  if (!doc) {
    console.error(`❌  Document "${docId}" introuvable. Vérifiez le slug.`)
    process.exit(1)
  }

  console.log(`\n🔧  Suppression du coverImage cassé sur "${docId}"...`)
  await client.patch(docId).unset(['coverImage']).commit()
  console.log("✅  Fait. Rechargez Sanity Studio et ré-uploadez l'image.\n")
}

fix()
