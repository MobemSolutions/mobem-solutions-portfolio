import * as React from 'react'

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

interface ConfirmEmailProps {
  email: string
  confirmUrl: string
}

export function ConfirmEmail({ confirmUrl }: ConfirmEmailProps) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirmez votre abonnement — Mobem Solutions</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: B.paper, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>

        {/* Preheader */}
        <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden', color: 'transparent' }}>
          Un clic suffit pour activer votre accès au bulletin mensuel de Mobem Solutions.
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
                                  Newsletter
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* ── Body ── */}
                    <tr>
                      <td style={{ padding: '44px 32px 36px' }}>

                        {/* Eyebrow */}
                        <p style={{ margin: '0 0 18px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: B.red }}>
                          Confirmation d'abonnement
                        </p>

                        {/* Headline */}
                        <h1 style={{ margin: '0 0 20px', fontSize: 30, fontWeight: 800, lineHeight: 1.1, color: B.ink, letterSpacing: '-0.6px' }}>
                          Nos articles,<br />directement chez vous.
                        </h1>

                        {/* Body */}
                        <p style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.7, color: B.muted }}>
                          Chaque mois, recevez nos nouveaux articles dès leur publication — analyses, retours terrain et conseils concrets pour votre activité.
                        </p>
                        <p style={{ margin: '0 0 36px', fontSize: 15, lineHeight: 1.7, color: B.muted }}>
                          Confirmez votre adresse email pour activer votre abonnement.
                        </p>

                        {/* CTA */}
                        <table cellPadding={0} cellSpacing={0} style={{ marginBottom: 36 }}>
                          <tbody>
                            <tr>
                              <td style={{ backgroundColor: B.red }}>
                                <a
                                  href={confirmUrl}
                                  style={{ display: 'inline-block', padding: '15px 32px', fontSize: 14, fontWeight: 700, color: B.white, textDecoration: 'none', letterSpacing: '0.01em' }}
                                >
                                  Confirmer mon abonnement →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Fine print */}
                        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: B.faint }}>
                          Lien valable 24 heures. Si vous n'avez pas fait cette demande, ignorez cet email.
                        </p>

                      </td>
                    </tr>

                    {/* ── Footer ── */}
                    <tr>
                      <td style={{ borderTop: `1px solid ${B.border}`, padding: '16px 32px', backgroundColor: B.subtle }}>
                        <table width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <p style={{ margin: 0, fontSize: 11, color: B.faint, letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 500 }}>
                                  Mobem Solutions · Nantes, France
                                </p>
                              </td>
                              <td align="right">
                                <a href="https://mobem-solutions.com" style={{ fontSize: 11, color: B.faint, textDecoration: 'none' }}>
                                  mobem-solutions.com
                                </a>
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
