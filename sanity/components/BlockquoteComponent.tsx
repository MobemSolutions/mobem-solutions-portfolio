import React from 'react'

// Remplace le composant Text de @sanity/ui (qui render <p>) par un <blockquote>
// natif pour éviter l'erreur d'hydration "div cannot be a descendant of p" dans le Studio PTE.
export const BlockquoteComponent = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(
    'blockquote',
    {
      style: {
        borderLeft: '3px solid #888',
        paddingLeft: '1em',
        margin: '0.5em 0',
        fontStyle: 'italic',
        color: 'inherit',
      },
    },
    children
  )
