function useCountUp(target, durationMs = 1400, trigger = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, trigger]);
  return val;
}

function ProofNumber({ value, suffix = '', label, sub, decimals = 0, idx, last }) {
  const ref = useRef(null);
  const [trig, setTrig] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setTrig(true); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v = useCountUp(value, 1500, trig);
  const display = decimals ? v.toFixed(decimals) : Math.round(v);

  return (
    <div ref={ref} style={{
      gridColumn: 'span 3',
      padding: '40px 28px 32px',
      borderRight: !last ? '1px solid var(--line)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 12,
      position: 'relative',
    }}>
      <span className="mono" style={{ color: 'var(--muted)' }}>0{idx + 1}</span>
      <div style={{
        fontWeight: 800,
        fontSize: 'clamp(72px, 8vw, 124px)',
        lineHeight: 0.9,
        letterSpacing: '-0.05em',
        fontFeatureSettings: '"tnum" 1',
      }}>
        {display}<span style={{ color: 'var(--signal)' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>{label}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

function Proof() {
  const stats = [
    { v: 10, s: ' j', l: 'Délai moyen de livraison', d: 'Pour les sites essentiels — de la signature à la mise en ligne.' },
    { v: 90, s: '+', l: 'Score Lighthouse garanti', d: 'Performance contractualisée. Mesurée à chaque livraison.' },
    { v: 3, s: '', l: 'Associés complémentaires', d: 'Stratégie · Design · Ingénierie. Un seul point de contact.' },
    { v: 24, s: ' h', l: 'Délai de réponse support', d: 'SLA réponse inclus dès l\'offre Croissance.' },
  ];

  return (
    <section id="chiffres" className="reveal" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
      <div style={{
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 24,
        borderTop: '1px solid #1f1f1f',
        borderBottom: '1px solid #1f1f1f',
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
          <span className="mono" style={{ color: '#888' }}>// 04</span>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: 500, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Chiffres</h2>
        </div>
        <span className="mono" style={{ color: '#888' }}>Q1 — 2026</span>
      </div>

      <div className="grid12" style={{ borderBottom: '1px solid #1f1f1f' }}>
        {stats.map((s, i) => (
          <ProofNumber key={i} value={s.v} suffix={s.s} label={s.l} sub={s.d} idx={i} last={i === stats.length - 1} />
        ))}
      </div>

      {/* Quote band */}
      <div style={{ padding: '64px 32px 56px', borderBottom: '1px solid #1f1f1f' }}>
        <div className="grid12" style={{ alignItems: 'start' }}>
          <div style={{ gridColumn: 'span 1' }} className="mono" style={{ color: '#888' }}>—</div>
          <blockquote style={{
            gridColumn: 'span 8',
            margin: 0,
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(36px, 4.4vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.018em',
          }}>
            « Mobem ne nous a pas vendu un site. Ils nous ont vendu un <em style={{ color: 'var(--signal)' }}>plan</em>. Six mois plus tard, on a triplé nos demandes entrantes. »
          </blockquote>
          <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 4 }} className="mono">
            <span style={{ color: '#888' }}>— Témoignage</span>
            <span style={{ marginTop: 8 }}>Directrice marketing</span>
            <span style={{ color: '#888' }}>PME industrielle · 80 collab.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Proof = Proof;
