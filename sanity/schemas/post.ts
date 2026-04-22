import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Auteurs',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'author' } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) =>
        Rule.custom((value: any) => {
          if (!value) return true
          if (!value?.asset?._ref)
            return "L'image est encore en cours de chargement — attendez qu'elle soit complète avant de publier."
          return true
        }),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif (SEO obligatoire)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (méta-description SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Contenu de l\'article',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author0: 'authors.0.name',
      author1: 'authors.1.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, author0, author1, media, date }: any) {
      const authorLabel = [author0, author1].filter(Boolean).join(', ') || 'Sans auteur'
      return {
        title,
        subtitle: `${authorLabel} · ${date ? new Date(date).toLocaleDateString('fr-FR') : 'Non publié'}`,
        media,
      }
    },
  },
})
