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

const B = {
  red:    '#E63030',
  ink:    '#0D0D0D',
  paper:  '#F8F7F5',
  white:  '#FFFFFF',
  border: '#E2E2E2',
  subtle: '#F3F3F1',
  text:   '#111827',
  muted:  '#6B7280',
  faint:  '#9CA3AF',
}

const BASE_URL = 'https://mobem-solutions.com'

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
    'Conseils actionnables pour votre activité',
    'Exemples concrets et retours terrain',
  ]

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} — Mobem Solutions</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: B.paper, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>

        {/* Preheader */}
        <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden', color: 'transparent' }}>
          {excerpt}
        </div>

        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: B.paper, padding: '48px 16px' }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="100%" cellPadding={0} cellSpacing={0}
                  style={{ maxWidth: 560, backgroundColor: B.white, border: `1px solid ${B.border}` }}>
                  <tbody>

                    {/* ── Header ── */}
                    <tr>
                      <td style={{ backgroundColor: B.ink, padding: '20px 32px', borderBottom: `3px solid ${B.red}` }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: 'middle' }}>
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ verticalAlign: 'middle', paddingRight: 10 }}>
                                        <span style={{ display: 'inline-block', width: 28, height: 28, backgroundColor: B.red, color: B.white, fontSize: 17, fontWeight: 900, lineHeight: '28px', textAlign: 'center' }}>M</span>
                                      </td>
                                      <td style={{ verticalAlign: 'middle' }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.2px', color: B.white }}>Mobem Solutions</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td align="right" style={{ verticalAlign: 'middle' }}>
                                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#555' }}>
                                  Le Journal
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── Hero image ── */}
                    {imageUrl && (
                      <tr>
                        <td style={{ padding: 0 }}>
                          <img
                            src={imageUrl}
                            alt={title}
                            width={560}
                            style={{ width: '100%', maxWidth: 560, height: 260, objectFit: 'cover', display: 'block' }}
                          />
                        </td>
                      </tr>
                    )}

                    {/* ── Content ── */}
                    <tr>
                      <td style={{ padding: '40px 32px 32px' }}>

                        {/* Meta */}
                        <table cellPadding={0} cellSpacing={0} style={{ marginBottom: 20 }}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: B.red }}>
                                  Nouveau sur le blog
                                  {formattedDate ? ` · ${formattedDate}` : ''}
                                  {authorName ? ` · ${authorName}` : ''}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Title */}
                        <h1 style={{ margin: '0 0 18px', fontSize: 26, fontWeight: 800, lineHeight: 1.15, color: B.ink, letterSpacing: '-0.5px' }}>
                          {title}
                        </h1>

                        {/* Excerpt */}
                        <p style={{ margin: '0 0 28px', fontSize: 15, lineHeight: 1.7, color: B.muted }}>
                          {excerpt}
                        </p>

                        {/* Key points */}
                        <table cellPadding={0} cellSpacing={0} width="100%"
                          style={{ marginBottom: 32, borderLeft: `3px solid ${B.red}`, backgroundColor: B.subtle }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: '18px 20px' }}>
                                <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: B.red }}>
                                  Ce que vous allez apprendre
                                </p>
                                {points.map((point, i) => (
                                  <p key={i} style={{ margin: i < points.length - 1 ? '0 0 8px' : '0', fontSize: 14, lineHeight: 1.6, color: B.text }}>
                                    <span style={{ color: B.red, fontWeight: 700, marginRight: 8 }}>→</span>
                                    {point}
                                  </p>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* CTA */}
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td style={{ backgroundColor: B.red }}>
                                <a
                                  href={articleUrl}
                                  style={{ display: 'inline-block', padding: '15px 32px', fontSize: 14, fontWeight: 700, color: B.white, textDecoration: 'none', letterSpacing: '0.01em' }}
                                >
                                  Lire l'analyse complète →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>

                    {/* ── Footer ── */}
                    <tr>
                      <td style={{ borderTop: `1px solid ${B.border}`, padding: '16px 32px', backgroundColor: B.subtle }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <p style={{ margin: '0 0 4px', fontSize: 11, color: B.faint, letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 500 }}>
                                  Mobem Solutions · Nantes, France
                                </p>
                                <p style={{ margin: 0, fontSize: 11, color: B.faint }}>
                                  <a href={`${BASE_URL}/blog`} style={{ color: B.faint, textDecoration: 'none' }}>Blog</a>
                                  {' · '}
                                  <a href="https://www.linkedin.com/in/mobem-solutions-136816404/" style={{ color: B.faint, textDecoration: 'none' }}>LinkedIn</a>
                                </p>
                              </td>
                              <td align="right" style={{ verticalAlign: 'top' }}>
                                {unsubscribeUrl && (
                                  <a href={unsubscribeUrl} style={{ fontSize: 11, color: B.faint, textDecoration: 'underline' }}>
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
