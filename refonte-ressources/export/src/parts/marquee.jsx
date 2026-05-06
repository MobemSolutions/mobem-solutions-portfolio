function Marquee() {
  const items = [
    'Diagnostic avant prescription',
    'Tarification à la valeur',
    'Roadmap trimestrielle',
    'Performance contractualisée',
    'Un seul interlocuteur',
    'Score Lighthouse 90+',
    'WCAG AAA compatible',
    'SEO sémantique avancé',
  ];
  // duplicate for infinite scroll
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <div key={i} className="marquee-item">
            <span className="dot" />
            <span style={{ fontStyle: i % 3 === 1 ? 'italic' : 'normal' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Marquee = Marquee;
