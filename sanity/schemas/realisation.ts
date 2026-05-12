import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'realisation',
  title: 'Réalisation',
  type: 'document',
  groups: [
    { name: 'meta',       title: 'Identification'   },
    { name: 'content',    title: 'Contenu'           },
    { name: 'media',      title: 'Médias'            },
    { name: 'perf',       title: 'Performances'      },
  ],
  fields: [
    // ── Identification ─────────────────────────────────────────────
    defineField({
      name: 'idx',
      title: 'N° de cas',
      type: 'string',
      group: 'meta',
      description: 'Numéro affiché sur la carte (ex. "01")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      group: 'meta',
      options: { source: 'client', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cat',
      title: 'Catégorie (filtre)',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Refonte',        value: 'refonte'    },
          { title: 'Site essentiel', value: 'essentiel'  },
          { title: 'Plateforme',     value: 'plateforme' },
          { title: 'SEO local',      value: 'seo'        },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sector',
      title: 'Secteur',
      type: 'string',
      group: 'meta',
      description: 'Ex. "Industrie · Loire-Atlantique"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag (affiché sur les cartes)',
      type: 'string',
      group: 'meta',
      description: 'Ex. "Refonte + SEO"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'string',
      group: 'meta',
      description: 'Ex. "2025"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kpi',
      title: 'KPI principal',
      type: 'string',
      group: 'meta',
      description: 'Valeur mise en avant dans la liste (ex. "+241% trafic")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant (homepage)',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de mise en ligne',
      type: 'date',
      group: 'meta',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),

    // ── Résumé ─────────────────────────────────────────────────────
    defineField({
      name: 'desc',
      title: 'Description (carte)',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Texte affiché sur les cartes réalisations.',
      validation: (Rule) => Rule.required().max(280),
    }),

    // ── Stats carte (2-3 items) ─────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats (bande carte)',
      type: 'array',
      group: 'content',
      description: '2 ou 3 métriques affichées en bas des cartes.',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'v', title: 'Valeur', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'l', title: 'Libellé', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'v', subtitle: 'l' },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(3),
    }),

    // ── KPIs détail (4 items) ───────────────────────────────────────
    defineField({
      name: 'kpis',
      title: 'KPIs (bande résultats — page détail)',
      type: 'array',
      group: 'content',
      description: 'Exactement 4 métriques pour la bande résultats de la page de détail.',
      of: [
        {
          type: 'object',
          name: 'kpi',
          fields: [
            defineField({ name: 'v', title: 'Valeur', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'l', title: 'Libellé', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'd', title: 'Description (optionnel)', type: 'string' }),
          ],
          preview: {
            select: { title: 'v', subtitle: 'l' },
          },
        },
      ],
      validation: (Rule) => Rule.length(4),
    }),

    // ── Body sections ───────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Corps du cas client (sections)',
      type: 'array',
      group: 'content',
      description: 'Format titre : "01 · Contexte terrain". Chaque section devient un chapitre.',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre de section',
              type: 'string',
              description: 'Format : "01 · Contexte terrain"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Contenu',
              type: 'text',
              rows: 8,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'content' },
            prepare({ title, subtitle }: any) {
              return { title, subtitle: subtitle?.slice(0, 80) }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // ── Stack ───────────────────────────────────────────────────────
    defineField({
      name: 'stack',
      title: 'Stack technique',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // ── Quote ───────────────────────────────────────────────────────
    defineField({
      name: 'quote',
      title: 'Témoignage client',
      type: 'object',
      group: 'content',
      description: 'Laissez vide si pas de témoignage réel.',
      fields: [
        defineField({
          name: 'text',
          title: 'Citation',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'author',
          title: 'Auteur',
          type: 'string',
        }),
        defineField({
          name: 'role',
          title: 'Rôle / Titre',
          type: 'string',
        }),
      ],
    }),

    // ── Media ───────────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Image couverture (miniature listing)',
      type: 'image',
      group: 'media',
      description: 'Affichée sur les cartes de la page Réalisations.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif (SEO)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ficheImage',
      title: 'Image fiche (page détail)',
      type: 'image',
      group: 'media',
      description: 'Grande image affichée dans la page de détail, entre le hero et le contenu.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif (SEO)', type: 'string' }),
      ],
    }),

    // ── Scores Lighthouse ───────────────────────────────────────────
    defineField({
      name: 'performance',
      title: 'Scores Lighthouse',
      type: 'object',
      group: 'perf',
      fields: [
        defineField({ name: 'performance',    title: 'Performance',       type: 'number', validation: (Rule) => Rule.min(0).max(100) }),
        defineField({ name: 'accessibility',  title: 'Accessibilité',     type: 'number', validation: (Rule) => Rule.min(0).max(100) }),
        defineField({ name: 'seo',            title: 'SEO',               type: 'number', validation: (Rule) => Rule.min(0).max(100) }),
        defineField({ name: 'bestPractices',  title: 'Bonnes pratiques',  type: 'number', validation: (Rule) => Rule.min(0).max(100) }),
      ],
    }),
  ],

  orderings: [
    {
      title: 'N° de cas (croissant)',
      name: 'idxAsc',
      by: [{ field: 'idx', direction: 'asc' }],
    },
    {
      title: 'Date (récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title:    'client',
      subtitle: 'tag',
      media:    'coverImage',
      idx:      'idx',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, idx, featured }: any) {
      return {
        title: `${idx ? idx + ' · ' : ''}${title}`,
        subtitle: `${subtitle ?? ''}${featured ? ' · ★ Mis en avant' : ''}`,
        media,
      }
    },
  },
})
