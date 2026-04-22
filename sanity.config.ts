import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'mobem-solutions',
  title: 'Mobem Solutions — Blog',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    unsplashImageAsset(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem().title('Articles').child(S.documentTypeList('post').title('Articles')),
            S.listItem().title('Auteurs').child(S.documentTypeList('author').title('Auteurs')),
            S.listItem().title('Catégories').child(S.documentTypeList('category').title('Catégories')),
          ]),
    }),
  ],

  schema: { types: schemaTypes },

  document: {
    productionUrl: async (prev, { document: doc }) => {
      if (doc._type === 'post') {
        const slug = (doc.slug as { current?: string })?.current
        const secret = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET
        if (slug && secret) {
          const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
          return `${base}/api/draft?secret=${secret}&slug=${slug}`
        }
      }
      return prev
    },
  },
})
