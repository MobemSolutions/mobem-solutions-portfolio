import * as React from 'react'

export interface NewArticleAlertProps {
  title: string
  excerpt: string
  slug: string
  imageUrl?: string
  authorName?: string
  publishedAt?: string
  keyPoints?: [string, string, string]
  unsubscribeUrl?: string
}

const BASE_URL = 'https://mobem-solutions.com'

/*
 * Subject lines recommandées (à choisir selon le contenu) :
 * 1. "{title} — Notre dernière analyse"
 * 2. "Nouveau sur le blog : {title}"
 * 3. "{title} | Mobem Solutions"
 */
export function NewArticleAlert({
  title,
  excerpt,
  slug,
  imageUrl,
  authorName,
  publishedAt,
  keyPoints,
  unsubscribeUrl,
}: NewArticleAlertProps) {
  const articleUrl = `${BASE_URL}/blog/${slug}`
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const points = keyPoints ?? [
    'Analyse approfondie du sujet',
    'Conseils actionnables pour votre business',
    'Exemples concrets et retours terrain',
  ]

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} — Mobem Solutions</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

        {/* Preview text */}
        <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden', color: 'transparent' }}>
          {excerpt}
        </div>

        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#f9fafb', padding: '40px 16px' }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <tbody>

                    {/* Header */}
                    <tr>
                      <td style={{ backgroundColor: '#0f0f0f', padding: '24px 36px', borderBottom: '2px solid #E86A33' }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', color: '#E86A33' }}>
                                  Mobem<span style={{ color: '#ffffff' }}> Solutions</span>
                                </span>
                              </td>
                              <td align="right">
                                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>
                                  Nouveau sur le blog
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Hero image */}
                    {imageUrl && (
                      <tr>
                        <td style={{ padding: 0 }}>
                          <img
                            src={imageUrl}
                            alt={title}
                            width={600}
                            style={{ width: '100%', maxWidth: 600, height: 280, objectFit: 'cover', display: 'block' }}
                          />
                        </td>
                      </tr>
                    )}

                    {/* Content */}
                    <tr>
                      <td style={{ padding: '36px 36px 28px' }}>

                        {/* Meta */}
                        <table cellPadding={0} cellSpacing={0} style={{ marginBottom: 16 }}>
                          <tbody>
                            <tr>
                              {formattedDate && (
                                <td>
                                  <span style={{ fontSize: 12, color: '#9ca3af', marginRight: 12 }}>
                                    {formattedDate}
                                  </span>
                                </td>
                              )}
                              {authorName && (
                                <td>
                                  <span style={{ fontSize: 12, color: '#9ca3af' }}>
                                    par {authorName}
                                  </span>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>

                        {/* Title */}
                        <h1 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 700, lineHeight: 1.3, color: '#111827', letterSpacing: '-0.4px' }}>
                          {title}
                        </h1>

                        {/* Excerpt */}
                        <p style={{ margin: '0 0 28px', fontSize: 15, lineHeight: 1.7, color: '#4b5563' }}>
                          {excerpt}
                        </p>

                        {/* Key points */}
                        <div style={{ backgroundColor: '#f9fafb', borderRadius: 10, padding: '20px 24px', marginBottom: 28, borderLeft: '3px solid #E86A33' }}>
                          <p style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E86A33' }}>
                            Ce que vous allez apprendre
                          </p>
                          {points.map((point, i) => (
                            <p key={i} style={{ margin: i < points.length - 1 ? '0 0 8px' : '0', fontSize: 14, lineHeight: 1.6, color: '#374151', display: 'flex' }}>
                              <span style={{ color: '#E86A33', fontWeight: 700, marginRight: 8, flexShrink: 0 }}>→</span>
                              {point}
                            </p>
                          ))}
                        </div>

                        {/* CTA */}
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td style={{ borderRadius: 10, backgroundColor: '#E86A33' }}>
                                <a
                                  href={articleUrl}
                                  style={{
                                    display: 'inline-block',
                                    padding: '13px 28px',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    borderRadius: 10,
                                  }}
                                >
                                  Lire l'analyse complète →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={{ borderTop: '1px solid #f3f4f6', padding: '20px 36px', backgroundColor: '#fafafa' }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <p style={{ margin: '0 0 4px', fontSize: 12, color: '#9ca3af' }}>
                                  Mobem Solutions · Nantes, France
                                </p>
                                <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>
                                  <a href={`${BASE_URL}/blog`} style={{ color: '#E86A33', textDecoration: 'none' }}>Blog</a>
                                  {' · '}
                                  <a href="https://linkedin.com/company/mobem-solutions" style={{ color: '#E86A33', textDecoration: 'none' }}>LinkedIn</a>
                                  {' · '}
                                  <a href="https://x.com/mobem_solutions" style={{ color: '#E86A33', textDecoration: 'none' }}>X</a>
                                </p>
                              </td>
                              <td align="right" style={{ verticalAlign: 'top' }}>
                                {unsubscribeUrl && (
                                  <a
                                    href={unsubscribeUrl}
                                    style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'underline' }}
                                  >
                                    Se désabonner
                                  </a>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </body>
    </html>
  )
}
