function Method() {
  const steps = [
    { n: '01', t: 'Diagnostic', d: 'Audit gratuit, 45 minutes, sans engagement. On regarde ce qui marche, ce qui freine, ce qui coûte.', dur: 'Semaine 0', deliv: 'Rapport stratégique 10 pages' },
    { n: '02', t: 'Prescription', d: 'Roadmap chiffrée, prioritaire, alignée sur vos OKR. Vous validez avant que nous bougions une ligne de code.', dur: 'Semaine 1', deliv: 'Plan d\'action + budget' },
    { n: '03', t: 'Exécution', d: 'Sprints courts, livrables hebdomadaires. Design system, ingénierie, contenu — un seul interlocuteur.', dur: 'Semaines 2–10', deliv: 'Mise en production' },
    { n: '04', t: 'Itération', d: 'Roadmap trimestrielle. Rapport de performance mensuel. Ce qu\'on mesure, on l\'améliore.', dur: 'Continu', deliv: 'Rapport mensuel + revue Q' },
  ];

  return (
    <section id="methode" className="reveal">
      <SectionHead num="// 03" title="Méthode" meta="Diagnostiquer avant de prescrire" />

      <div className="grid12">
        <div style={{ gridColumn: 'span 4', padding: '40px 32px', borderRight: '1px solid var(--line)' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 64, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            On commence par <em style={{ color: 'var(--signal)' }}>écouter.</em>
          </h3>
          <p style={{ marginTop: 28, fontSize: 15, lineHeight: 1.55, maxWidth: 400 }}>
            Nous refusons les briefs livrés tels quels. Une bonne réponse part toujours d'une bonne question — et d'un audit sans complaisance.
          </p>
        </div>
        <div style={{ gridColumn: 'span 8' }}>
          {steps.map((s, i) => (
            <div key={i}
              data-cursor="hover"
              className="bento-cell"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1.4fr 1fr 200px',
                alignItems: 'baseline',
                gap: 24,
                padding: '28px 32px',
                borderBottom: i < steps.length - 1 ? '1px solid var(--line)' : '0',
              }}>
              <span className="mono" style={{ color: 'var(--signal)', fontSize: 14 }}>{s.n}</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1 }}>{s.t}</div>
                <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.5, marginTop: 8, maxWidth: 380 }}>{s.d}</div>
              </div>
              <div className="mono" style={{ color: 'var(--muted)' }}>{s.dur}</div>
              <div style={{ fontSize: 12, lineHeight: 1.4, textAlign: 'right' }}>
                <span className="mono" style={{ color: 'var(--muted)' }}>Livrable —</span><br/>
                <span style={{ marginTop: 4, display: 'inline-block' }}>{s.deliv}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Method = Method;
