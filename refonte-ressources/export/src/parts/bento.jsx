// Bento — 3 offers + features grid
const OFFERS = [
  {
    code: 'S1',
    name: 'Essentiel',
    sub: 'Sites en production sous 10 jours.',
    price: 'À partir de',
    priceVal: '4 800 €',
    priceUnit: 'forfait',
    flagship: false,
    features: [
      'Votre site en ligne sous 10 jours',
      'Design professionnel sur-mesure',
      '100 % lisible sur mobile & tablette',
      'Trouvé par vos clients locaux (SEO local)',
      'Hébergement inclus la 1ère année',
    ],
    proof: ['Lighthouse 92+', 'Mise en ligne 10 j'],
  },
  {
    code: 'S2',
    name: 'Croissance',
    sub: 'Plateformes pensées pour convertir.',
    price: 'À partir de',
    priceVal: '14 500 €',
    priceUnit: 'projet',
    flagship: true,
    features: [
      'Architecture multi-pages évolutive',
      'UI/UX premium qui convertit',
      'Gestion de contenu en autonomie',
      'Connexion à vos outils (CRM, Calendly…)',
      'SEO sémantique avancé',
      'Rapport de performance mensuel',
    ],
    proof: ['Conv. ×2.4 obs.', 'Lighthouse 96+', 'WCAG AA'],
  },
  {
    code: 'S3',
    name: 'Stratégique',
    sub: 'Accompagnement long-terme, sur-mesure.',
    price: 'Sur devis',
    priceVal: 'Custom',
    priceUnit: 'rétainer trimestriel',
    flagship: false,
    features: [
      'Architecture sur-mesure pensée pour durer',
      'Intégrations API & systèmes tiers complexes',
      'Design system propriétaire',
      'Accompagnement stratégique dédié',
      'SLA personnalisé & équipe dédiée',
      'Scalabilité et évolutivité garanties',
    ],
    proof: ['Roadmap trimestrielle', 'WCAG AAA', 'SLA 4 h'],
  },
];

function OfferCard({ offer, density, idx }) {
  const pad = density === 'compact' ? '20px 22px' : '32px 28px';
  const titleSize = density === 'compact' ? 36 : 48;

  return (
    <div
      className={`bento-cell ${offer.flagship ? 'flagship' : ''}`}
      data-cursor="hover"
      data-cursor-label={`offre ${offer.code}`}
      style={{
        gridColumn: 'span 4',
        padding: pad,
        borderRight: idx < 2 ? '1px solid var(--line)' : 'none',
        display: 'flex', flexDirection: 'column',
        minHeight: density === 'compact' ? 460 : 560,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <span className="mono" style={{ opacity: 0.7 }}>// {offer.code}</span>
        <Arrow size={20} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: titleSize, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 8 }}>
          {offer.name}
        </div>
        <div style={{ fontSize: 15, opacity: 0.85, maxWidth: 320, lineHeight: 1.4 }}>
          {offer.sub}
        </div>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
        {offer.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, lineHeight: 1.45 }}>
            <span style={{ marginTop: 6, width: 10, height: 1, background: 'currentColor', flexShrink: 0, opacity: 0.6 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {offer.proof.map((p, i) => (
          <span key={i} className="mono" style={{
            padding: '5px 8px',
            border: '1px solid currentColor',
            opacity: offer.flagship ? 1 : 0.7,
            fontSize: 9.5,
          }}>{p}</span>
        ))}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingTop: 18,
        borderTop: '1px solid currentColor',
        opacity: 1,
      }}>
        <div>
          <div className="mono" style={{ opacity: 0.7, marginBottom: 4 }}>{offer.price}</div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {offer.priceVal}
          </div>
          <div className="mono" style={{ opacity: 0.7, marginTop: 4 }}>/ {offer.priceUnit}</div>
        </div>
      </div>
    </div>
  );
}

function Bento({ density, withImages }) {
  return (
    <section id="services" className="reveal">
      <SectionHead num="// 02" title="Services — Le Bento" meta="Trois offres · Une promesse mesurable" />

      {/* Manifesto row */}
      <div className="grid12" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ gridColumn: 'span 4', padding: '32px', borderRight: '1px solid var(--line)' }}>
          <span className="mono" style={{ color: 'var(--muted)' }}>— Promesse</span>
          <p style={{ margin: '12px 0 0', fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.015em', fontFamily: 'var(--serif)', fontWeight: 400 }}>
            Une case = un message.<br/>
            Un message = un résultat.
          </p>
        </div>
        <div style={{ gridColumn: 'span 5', padding: '32px', borderRight: '1px solid var(--line)' }}>
          <span className="mono" style={{ color: 'var(--muted)' }}>— Lecture</span>
          <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--fg)' }}>
            Choisissez une offre par maturité, pas par features. Chaque case affiche un <em>outcome</em> mesurable, pas une spécification technique.
          </p>
        </div>
        <div style={{ gridColumn: 'span 3', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
          <span className="mono" style={{ color: 'var(--muted)' }}>— Index</span>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>
            S1 — Essentiel<br/>
            S2 — Croissance <span style={{ color: 'var(--signal)' }}>●</span><br/>
            S3 — Stratégique
          </div>
        </div>
      </div>

      {/* The 3 offers */}
      <div className="grid12">
        {OFFERS.map((o, i) => <OfferCard key={i} offer={o} density={density} idx={i} />)}
      </div>

      {/* Cross-cutting capabilities */}
      <div className="grid12" style={{ borderTop: '1px solid var(--line)' }}>
        <div style={{ gridColumn: 'span 12', padding: '20px 32px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between' }}>
          <span className="mono" style={{ color: 'var(--muted)' }}>— Capacités transverses</span>
          <span className="mono" style={{ color: 'var(--muted)' }}>15 / 15</span>
        </div>
        {[
          { k: 'PERF', v: 'Sites ultra-rapides', d: 'LCP < 2s · CLS 0 · TTI optimisé', proof: 'Lighthouse 96+' },
          { k: 'SEC', v: 'Sécurité contractuelle', d: 'En-têtes stricts, MAJ continues', proof: 'Score A+' },
          { k: 'SEO', v: 'Trafic qualifié', d: 'Sémantique, schema, log-analysis', proof: '×3 trafic obs.' },
          { k: 'A11Y', v: 'Accessible par défaut', d: 'WCAG AA / AAA selon offre', proof: 'WCAG AAA' },
        ].map((c, i) => (
          <div key={i} style={{
            gridColumn: 'span 3',
            padding: '24px',
            borderRight: i < 3 ? '1px solid var(--line)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 10,
            minHeight: 180,
          }} className="bento-cell" data-cursor="hover">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="mono" style={{ opacity: 0.7 }}>// {c.k}</span>
              <Arrow size={14} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 8 }}>{c.v}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.d}</div>
            <div style={{ marginTop: 'auto', fontSize: 11, fontWeight: 600, color: 'var(--signal)' }}>● {c.proof}</div>
          </div>
        ))}
      </div>

      {/* Optional capture */}
      {withImages && (
        <div className="grid12" style={{ borderTop: '1px solid var(--line)' }}>
          <div style={{ gridColumn: 'span 7', padding: '32px', borderRight: '1px solid var(--line)' }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>— Cas client</span>
            <h3 style={{ margin: '12px 0 16px', fontSize: 36, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              Refonte d'un acteur industriel régional. <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--signal)' }}>×2.4 conversions</span> en 90 jours.
            </h3>
            <Placeholder label="capture projet · industrie · WebP" ratio="16/9" />
          </div>
          <div style={{ gridColumn: 'span 5', padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>— Résultats à 90 j.</span>
            {[
              ['+241%', 'Trafic organique qualifié'],
              ['1.3 s', 'LCP mobile (était 4.8 s)'],
              ['×2.4', 'Taux de conversion form.'],
              ['96 / 100', 'Score Lighthouse moyen'],
            ].map(([n, l], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'baseline', gap: 16, paddingBottom: 16, borderBottom: i < 3 ? '1px solid var(--line)' : '0' }}>
                <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--signal)' }}>{n}</div>
                <div style={{ fontSize: 14, color: 'var(--fg)' }}>{l}</div>
              </div>
            ))}
            <a href="#travaux" className="btn btn-ghost" data-cursor="hover" style={{ alignSelf: 'flex-start' }}>
              Voir tous les cas <Arrow size={14} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

window.Bento = Bento;
