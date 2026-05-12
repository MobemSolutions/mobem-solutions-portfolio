import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'sector',
      title: 'Secteur d\'activité',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Site web',
      type: 'url',
    }),
    defineField({
      name: 'testimonial',
      title: 'Citation',
      type: 'text',
      rows: 4,
      description: 'Témoignage du client (optionnel)',
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Auteur de la citation',
      type: 'string',
    }),
    defineField({
      name: 'testimonialRole',
      title: 'Poste / rôle',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'sector', media: 'logo' },
  },
})
