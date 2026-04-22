import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf-8').split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => [l.split('=')[0].trim(), l.split('=').slice(1).join('=').trim()])
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: env.SANITY_API_WRITE_TOKEN,
})

// Trouve les articles dont l'image n'a pas d'asset valide
const broken = await client.fetch(
  `*[_type == "post" && defined(mainImage) && !defined(mainImage.asset._ref)]{ _id, title }`
)

if (broken.length === 0) {
  console.log('Aucun article avec image cassée trouvé.')
  console.log('Tentative avec tous les articles ayant une mainImage...')

  // Liste tous les articles avec leur statut image
  const all = await client.fetch(
    `*[_type == "post"]{ _id, title, "hasAsset": defined(mainImage.asset._ref) }`
  )
  all.forEach(p => console.log(`${p.hasAsset ? '✓' : '✗'} ${p.title} (${p._id})`))
} else {
  console.log(`${broken.length} article(s) avec image cassée :`)
  broken.forEach(p => console.log(`  - "${p.title}" (${p._id})`))

  for (const post of broken) {
    await client.patch(post._id).unset(['mainImage']).commit()
    console.log(`✓ Image retirée de "${post.title}"`)
  }
  console.log('\nTu peux maintenant rouvrir l\'article dans le Studio et ajouter l\'image.')
}
