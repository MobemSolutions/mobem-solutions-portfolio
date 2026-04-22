import { defineType, defineArrayMember } from 'sanity'
import { BlockquoteComponent } from '../components/BlockquoteComponent'

export default defineType({
  name: 'blockContent',
  title: 'Contenu riche',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Titre H2', value: 'h2' },
        { title: 'Titre H3', value: 'h3' },
        { title: 'Titre H4', value: 'h4' },
        { title: 'Citation', value: 'blockquote', component: BlockquoteComponent },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Souligné', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Ouvrir dans un nouvel onglet' },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Texte alternatif', validation: (Rule: any) => Rule.required() },
        { name: 'caption', type: 'string', title: 'Légende' },
        {
          name: 'position',
          type: 'string',
          title: 'Position',
          options: {
            list: [
              { title: 'Pleine largeur', value: 'full' },
              { title: 'Centré', value: 'center' },
              { title: 'Flottant gauche', value: 'left' },
              { title: 'Flottant droite', value: 'right' },
            ],
            layout: 'radio',
          },
          initialValue: 'full',
        },
        {
          name: 'size',
          type: 'string',
          title: 'Taille',
          options: {
            list: [
              { title: 'Petite (33%)', value: 'small' },
              { title: 'Moyenne (50%)', value: 'medium' },
              { title: 'Grande (66%)', value: 'large' },
              { title: 'Pleine largeur', value: 'full' },
            ],
            layout: 'radio',
          },
          initialValue: 'full',
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Bloc CTA / Encadré',
      fields: [
        { name: 'type', type: 'string', title: 'Type', options: { list: ['info', 'warning', 'cta'], layout: 'radio' } },
        { name: 'text', type: 'text', title: 'Texte' },
        { name: 'ctaLabel', type: 'string', title: 'Bouton (optionnel)' },
        { name: 'ctaHref', type: 'string', title: 'Lien bouton' },
      ],
    }),
  ],
})
