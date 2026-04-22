import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Biographie courte', type: 'text', rows: 3 }),
    defineField({ name: 'role', title: 'Rôle', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
