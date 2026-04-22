import * as React from 'react'

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
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

        {/* Preview text hidden */}
        <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden', color: 'transparent' }}>
          Un clic suffit pour activer votre accès aux analyses stratégiques de Mobem Solutions.
        </div>

        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#f9fafb', padding: '40px 16px' }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 580, backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <tbody>

                    {/* Header */}
                    <tr>
                      <td style={{ backgroundColor: '#0f0f0f', padding: '28px 40px' }}>
                        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px', color: '#E86A33' }}>
                          Mobem<span style={{ color: '#ffffff' }}> Solutions</span>
                        </span>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td style={{ padding: '48px 40px 40px' }}>

                        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E86A33' }}>
                          Confirmation d'abonnement
                        </p>

                        <h1 style={{ margin: '0 0 20px', fontSize: 26, fontWeight: 700, lineHeight: 1.3, color: '#111827', letterSpacing: '-0.4px' }}>
                          Le futur de votre stratégie digitale commence ici.
                        </h1>

                        <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.7, color: '#374151' }}>
                          Vous avez demandé à rejoindre la newsletter Mobem Solutions — analyses stratégiques, tendances digitales et retours d'expérience terrain, livrés directement dans votre boîte mail.
                        </p>

                        <p style={{ margin: '0 0 32px', fontSize: 15, lineHeight: 1.7, color: '#374151' }}>
                          Confirmez votre abonnement pour activer votre accès.
                        </p>

                        {/* CTA Button */}
                        <table cellPadding={0} cellSpacing={0} style={{ marginBottom: 32 }}>
                          <tbody>
                            <tr>
                              <td style={{ borderRadius: 10, backgroundColor: '#E86A33' }}>
                                <a
                                  href={confirmUrl}
                                  style={{
                                    display: 'inline-block',
                                    padding: '14px 32px',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    borderRadius: 10,
                                    letterSpacing: '-0.1px',
                                  }}
                                >
                                  Confirmer mon abonnement →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p style={{ margin: '0 0 0', fontSize: 13, lineHeight: 1.6, color: '#9ca3af' }}>
                          Lien valable 24 heures. Si vous n'avez pas fait cette demande, ignorez simplement cet email.
                        </p>

                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={{ borderTop: '1px solid #f3f4f6', padding: '24px 40px', backgroundColor: '#fafafa' }}>
                        <p style={{ margin: '0 0 6px', fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
                          Mobem Solutions · Nantes, France
                        </p>
                        <p style={{ margin: '0', fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
                          Vous recevez cet email car vous avez soumis votre adresse sur{' '}
                          <a href="https://mobem-solutions.com" style={{ color: '#E86A33', textDecoration: 'none' }}>mobem-solutions.com</a>.
                          {' '}Vous ne reconnaissez pas cette demande ?{' '}
                          <a href="mailto:contact@mobem-solutions.com" style={{ color: '#E86A33', textDecoration: 'none' }}>Contactez-nous</a>.
                        </p>
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
