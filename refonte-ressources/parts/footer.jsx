function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      <div style={{ padding: '64px 32px 28px' }}>
        <div className="grid12" style={{ alignItems: 'start' }}>
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 24, overflow: 'hidden' }}>
            <div className="mono" style={{ color: '#888' }}>// Manifeste</div>
            <h2 style={{
              margin: 0,
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 'clamp(44px, 6.2vw, 112px)',
              lineHeight: 0.88,
              letterSpacing: '-0.045em',
              wordBreak: 'break-word',
              hyphens: 'auto',
            }}>
              Diagnostiquer<br/>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--signal)' }}>avant</span><br/>
              de prescrire.
            </h2>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, paddingLeft: 16 }}>
            <span className="mono" style={{ color: '#888' }}>— Cabinet</span>
            {['Approche', 'Services', 'Méthode', 'Réalisations'].map(x => (
              <a key={x} href="#" className="ul" data-cursor="hover" style={{ color: 'var(--paper)' }}>{x}</a>
            ))}
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <span className="mono" style={{ color: '#888' }}>— Légal</span>
            {['Mentions légales', 'CGU', 'Politique RGPD', 'Cookies'].map(x => (
              <a key={x} href="#" className="ul" data-cursor="hover" style={{ color: 'var(--paper)' }}>{x}</a>
            ))}
          </div>

          <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <span className="mono" style={{ color: '#888' }}>— Liens</span>
            {['LinkedIn', 'GitHub', 'Are.na', 'News'].map(x => (
              <a key={x} href="#" className="ul" data-cursor="hover" style={{ color: 'var(--paper)' }}>{x} ↗</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #1f1f1f',
        padding: '20px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }} className="mono">
        <span style={{ color: '#888' }}>© Mobem · 2026 · Tous droits réservés</span>
        <span style={{ color: '#888' }}>Conçu par Mobem · Lighthouse 96/100 · LCP 1.4s</span>
        <span style={{ color: '#888' }}>v.2026.04 · Refonte / Conseil</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
