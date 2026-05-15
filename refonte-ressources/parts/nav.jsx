function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'metiers' | 'villes' | null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenMenu(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = [
    { n: '01', l: 'Accueil', h: 'Mobem.html' },
    { n: '02', l: 'Réalisations', h: 'realisations.html' },
    { n: '03', l: 'Blog', h: 'blog.html' },
    { n: '04', l: 'Sites par métier', h: 'metiers.html' },
    { n: '05', l: 'Nos villes', h: 'villes.html' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'border-color 200ms ease',
      }}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 32px', margin: '0 24px', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>
        <a href="index.html" data-cursor="hover" data-cursor-label="home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--fg)' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="0.5" y="0.5" width="21" height="21" stroke="currentColor"/>
            <rect x="4" y="4" width="6" height="6" fill="currentColor"/>
            <rect x="12" y="12" width="6" height="6" fill="var(--signal)"/>
          </svg>
          <span style={{ fontWeight: 600, letterSpacing: '-0.01em', fontSize: 15 }}>Mobem<span style={{ color: 'var(--signal)' }}>.</span></span>
        </a>

        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
          {items.map(({ n, l, h }) => (
            <a
              key={n}
              href={h}
              data-cursor="hover"
              style={{ display: 'inline-flex', gap: 8, alignItems: 'baseline', fontSize: 13, fontWeight: 500 }}
            >
              <span className="mono" style={{ color: 'var(--muted)' }}>{n}</span>
              <span className="ul">{l}</span>
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
          <button onClick={onToggleTheme} data-cursor="hover" aria-label="Toggle theme"
            style={{ width: 36, height: 36, border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            )}
          </button>
          <a href="#contact" className="btn btn-signal" data-cursor="hover">Diagnostic gratuit<Arrow size={14} /></a>
        </div>
      </div>

      {openMenu && <MegaMenu kind={openMenu} onClose={() => setOpenMenu(null)} />}
    </header>
  );
}

function MegaMenu({ kind, onClose }) {
  const metiers = [
    ['Bâtiment & Travaux', ['Plombier', 'Électricien', 'Paysagiste', 'Maçon', 'Carreleur']],
    ['Santé & Bien-être', ['Ostéopathe', 'Kinésithérapeute', 'Psychologue', 'Diététicien', 'Dentiste']],
    ['Beauté', ['Salon de coiffure', 'Esthéticienne', 'Barbier']],
    ['Mobilité & Transport', ['Auto-école', 'Garage automobile', 'Taxi VTC']],
    ['Sport & Loisirs', ['Coach sportif', 'Bowling', 'Salle de sport', 'École de danse', 'École de musique']],
    ['Restauration & Commerce', ['Restaurant', 'Boulangerie', 'Épicerie fine']],
    ['Juridique & Finance', ['Avocat', 'Comptable', 'Conseiller financier']],
  ];
  const villes = [
    ['Île-de-France', ['Paris']],
    ['Auvergne-Rhône-Alpes', ['Lyon', 'Grenoble', 'Clermont-Ferrand', 'Saint-Étienne']],
    ['PACA', ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence']],
    ['Pays de la Loire', ['Nantes', 'Angers', 'Le Mans']],
    ['Bretagne', ['Rennes', 'Brest']],
    ['Occitanie', ['Toulouse', 'Montpellier', 'Nîmes']],
    ['Nouvelle-Aquitaine', ['Bordeaux', 'Limoges', 'Poitiers']],
  ];
  const data = kind === 'metiers' ? metiers : villes;
  const allLink = kind === 'metiers' ? ['metiers.html', 'Voir tous les métiers'] : ['villes.html', 'Voir toutes les villes'];
  const total = kind === 'metiers' ? '42 métiers disponibles' : '30 villes couvertes';

  return (
    <div style={{
      position: 'absolute', top: '100%', left: 24, right: 24,
      background: 'var(--bg)', border: '1px solid var(--line)', borderTop: 0,
      padding: 32, zIndex: 49,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {data.map(([cat, items], i) => (
          <div key={i}>
            <div className="mono" style={{ color: 'var(--muted)', marginBottom: 12 }}>{cat}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((m, j) => (
                <li key={j}><a href="#" className="ul" style={{ fontSize: 14 }} data-cursor="hover">{m}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', marginTop: 24, paddingTop: 16 }} className="mono">
        <span style={{ color: 'var(--muted)' }}>{total}</span>
        <a href={allLink[0]} className="ul" data-cursor="hover" style={{ color: 'var(--signal)' }}>{allLink[1]} →</a>
      </div>
    </div>
  );
}

window.Nav = Nav;
