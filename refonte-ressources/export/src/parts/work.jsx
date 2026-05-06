function Work({ withImages }) {
  const cases = [
    { idx: '01', client: 'Atelier Vernay', sector: 'Industrie', tag: 'Refonte + SEO', kpi: '+241% trafic', year: '2025' },
    { idx: '02', client: 'Cabinet Lefranc', sector: 'Services pro.', tag: 'Site essentiel', kpi: 'LCP 1.2s', year: '2025' },
    { idx: '03', client: 'Maison Ferré', sector: 'Hospitalité', tag: 'Plateforme + CRM', kpi: 'Conv. ×3.1', year: '2026' },
    { idx: '04', client: 'Groupe Pénard', sector: 'BTP — ETI', tag: 'Stratégie + DS', kpi: 'WCAG AAA', year: '2026' },
  ];

  return (
    <section id="travaux" className="reveal">
      <SectionHead num="// 05" title="Réalisations" meta="Sélection — 2025 / 2026" />

      <div>
        {cases.map((c, i) => (
          <a key={i}
            href="#"
            data-cursor="hover"
            data-cursor-label="voir le cas"
            className="bento-cell"
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 2fr 1.2fr 1fr 1fr 60px',
              alignItems: 'center',
              gap: 24,
              padding: '32px',
              borderBottom: '1px solid var(--line)',
              color: 'var(--fg)',
            }}
          >
            <span className="mono" style={{ color: 'var(--muted)' }}>{c.idx}</span>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1 }}>
              {c.client}
            </div>
            <div className="mono" style={{ color: 'var(--muted)' }}>{c.sector}</div>
            <div style={{ fontSize: 13.5 }}>{c.tag}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--signal)' }}>{c.kpi}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Arrow size={20} />
            </div>
          </a>
        ))}
      </div>

      {withImages && (
        <div className="grid12" style={{ borderBottom: '1px solid var(--line)' }}>
          <div style={{ gridColumn: 'span 6', borderRight: '1px solid var(--line)', padding: '32px' }}>
            <Placeholder label="capture · atelier vernay" ratio="4/3" />
          </div>
          <div style={{ gridColumn: 'span 6', padding: '32px' }}>
            <Placeholder label="capture · maison ferré" ratio="4/3" />
          </div>
        </div>
      )}
    </section>
  );
}

window.Work = Work;
