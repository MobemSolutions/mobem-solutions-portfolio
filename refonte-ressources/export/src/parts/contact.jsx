function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', size: '', need: '', budget: '' });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <section id="contact" className="reveal" style={{ borderTop: '1px solid var(--line)' }}>
      <SectionHead num="// 06" title="Diagnostic" meta="45 minutes · sans engagement" />

      <div className="grid12">
        <div style={{ gridColumn: 'span 5', padding: '48px 32px', borderRight: '1px solid var(--line)' }}>
          <h3 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 'clamp(56px, 6.5vw, 96px)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
          }}>
            Parlons<br/>
            de votre <span style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: 'italic', color: 'var(--signal)' }}>levier.</span>
          </h3>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <span className="mono" style={{ color: 'var(--muted)' }}>— Email</span>
              <div style={{ fontSize: 18, marginTop: 6 }}>contact@mobem-solutions.com</div>
            </div>
            <div>
              <span className="mono" style={{ color: 'var(--muted)' }}>— Adresse</span>
              <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>
                Mobem · Cabinet conseil digital<br/>
                Nantes · France · 47.218°N / 1.553°W
              </div>
            </div>
            <div>
              <span className="mono" style={{ color: 'var(--muted)' }}>— Disponibilité</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <span className="liveDot" />
                <span style={{ fontSize: 14 }}>Q2 2026 — 2 places ouvertes</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} style={{ gridColumn: 'span 7', padding: '48px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div className="field">
              <label>01 · Nom</label>
              <input data-cursor="text" required value={form.name} onChange={set('name')} placeholder="Votre nom" />
            </div>
            <div className="field">
              <label>02 · Société</label>
              <input data-cursor="text" required value={form.company} onChange={set('company')} placeholder="Nom de l'entreprise" />
            </div>
            <div className="field">
              <label>03 · Email pro</label>
              <input data-cursor="text" required type="email" value={form.email} onChange={set('email')} placeholder="vous@société.fr" />
            </div>
            <div className="field">
              <label>04 · Effectif</label>
              <input data-cursor="text" value={form.size} onChange={set('size')} placeholder="ex. 12 / 80 / 250 collaborateurs" />
            </div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>05 · Besoin principal</label>
              <textarea data-cursor="text" required rows="3" value={form.need} onChange={set('need')} placeholder="Refonte ? acquisition ? scalabilité ? Dites-nous ce qui freine la croissance." />
            </div>
            <div className="field">
              <label>06 · Enveloppe</label>
              <input data-cursor="text" value={form.budget} onChange={set('budget')} placeholder="ex. 5–15 k · 15–50 k · 50 k+" />
            </div>
            <div className="field">
              <label>07 · Échéance</label>
              <input data-cursor="text" placeholder="ex. T2 · T3 · ASAP" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, gap: 24 }}>
            <span className="mono" style={{ color: 'var(--muted)', maxWidth: 360, lineHeight: 1.5 }}>
              Réponse sous 24 h ouvrées. Vos informations restent strictement confidentielles.
            </span>
            <button type="submit" className="btn btn-signal" data-cursor="hover" data-cursor-label="envoyer">
              {sent ? 'Reçu — à très vite' : 'Demander un diagnostic'} <Arrow size={14} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

window.Contact = Contact;
