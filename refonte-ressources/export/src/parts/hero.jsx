function Hero({ variant, withImages }) {
  const now = new Date();
  const meta = `Édition 04 · ${now.getFullYear()}`;

  return (
    <section id="approche" style={{ borderTop: '1px solid var(--line)' }}>
      {/* Top metadata strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
        padding: '14px 32px',
        borderBottom: '1px solid var(--line)',
        gap: 24,
      }} className="mono" >
        <div style={{ color: 'var(--muted)' }}>FR · 47.218°N · 1.553°W</div>
        <div style={{ color: 'var(--muted)' }}>{meta}</div>
        <div style={{ color: 'var(--muted)' }}>v.2026 · Refonte / Conseil</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end', color: 'var(--muted)' }}>
          <span className="liveDot" /> Disponibilité Q2 — 2 places
        </div>
      </div>

      {/* Massive hero typo */}
      <div style={{ padding: '64px 32px 24px', position: 'relative' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
          <span className="chip"><span className="sig-dot" /> Cabinet conseil digital · PME &amp; ETI</span>
          <span className="mono" style={{ color: 'var(--muted)' }}>// Diagnostic → Stratégie → Exécution</span>
        </div>

        {variant === 'editorial' ? (
          <h1 className="reveal" style={{
            margin: 0,
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(64px, 11vw, 200px)',
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
          }}>
            La précision <em style={{ fontStyle: 'italic', color: 'var(--signal)' }}>digitale</em><br/>
            à l'échelle humaine.
          </h1>
        ) : variant === 'inline' ? (
          <h1 className="reveal" style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 'clamp(56px, 9.5vw, 168px)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
          }}>
            Nous transformons votre <span style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em' }}>présence digitale</span> en levier de croissance mesurable.<span className="caret" />
          </h1>
        ) : (
          <h1 className="reveal" style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 'clamp(72px, 13vw, 240px)',
            lineHeight: 0.86,
            letterSpacing: '-0.05em',
          }}>
            Stratégie<br />
            <span style={{ color: 'var(--signal)' }}>·</span> Design<br />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em' }}>Ingénierie<span className="caret" /></span>
          </h1>
        )}

        {/* sub line + cta + meta column */}
        <div className="grid12 reveal" style={{ marginTop: 56, gap: 24 }}>
          <div style={{ gridColumn: 'span 1' }} className="mono">— 01</div>
          <p style={{ gridColumn: 'span 5', margin: 0, fontSize: 19, lineHeight: 1.45, maxWidth: 540 }}>
            On ne livre pas un site. On diagnostique, on prescrit, on exécute. Mobem est un cabinet de conseil digital pour PME &amp; ETI qui veulent que <strong>chaque clic, chaque page, chaque ligne de code</strong> serve la croissance.
          </p>

          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>— Engagement</span>
            <div style={{ fontSize: 14, lineHeight: 1.5 }}>
              Roadmap trimestrielle. Tarification à la valeur. Un seul interlocuteur, trois associés.
            </div>
          </div>

          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <a href="#contact" className="btn btn-signal" data-cursor="hover" data-cursor-label="parlons-en">
              Démarrer un diagnostic <Arrow size={14} />
            </a>
            <a href="#services" className="btn btn-ghost" data-cursor="hover" data-cursor-label="explorer">
              Voir les services <Arrow size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Hero footer block — KPIs strip */}
      <div className="grid12" style={{
        borderTop: '1px solid var(--line)',
        marginTop: 56,
      }}>
        {[
          ['Diagnostic', '45 min', 'Audit gratuit, sans engagement'],
          ['Livraison', '10 jours', 'Sites essentiels en production'],
          ['Lighthouse', '90+', 'Performance garantie au contrat'],
          ['Suivi', '24 h', 'SLA réponse support inclus'],
        ].map(([k, v, d], i) => (
          <div key={i} style={{
            gridColumn: 'span 3',
            padding: '24px 24px 20px',
            borderRight: i < 3 ? '1px solid var(--line)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <span className="mono" style={{ color: 'var(--muted)' }}>{`0${i+1}`} · {k}</span>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{d}</div>
          </div>
        ))}
      </div>

      {/* Optional image strip */}
      {withImages && (
        <div style={{ padding: '48px 32px 0', borderTop: '1px solid var(--line)' }}>
          <div className="grid12" style={{ gap: 16 }}>
            <div style={{ gridColumn: 'span 8' }}>
              <Placeholder label="capture projet · client réel · WebP < 100KB" ratio="16/9" />
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Placeholder label="capture · interface admin" ratio="4/3" />
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }} className="mono">
                Fig. 01 — Refonte landing client industriel.<br/>
                LCP 1.4s · CLS 0 · Score 96
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

window.Hero = Hero;
