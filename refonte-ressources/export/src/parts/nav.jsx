function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 32px', margin: '0 24px', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>
        {/* Brand */}
        <a href="#" data-cursor="hover" data-cursor-label="home" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--fg)' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="0.5" y="0.5" width="21" height="21" stroke="currentColor"/>
            <rect x="4" y="4" width="6" height="6" fill="currentColor"/>
            <rect x="12" y="12" width="6" height="6" fill="var(--signal)"/>
          </svg>
          <span style={{ fontWeight: 600, letterSpacing: '-0.01em', fontSize: 15 }}>Mobem<span style={{ color: 'var(--signal)' }}>.</span></span>
          <span className="mono" style={{ color: 'var(--muted)', marginLeft: 6 }}>cabinet conseil digital</span>
        </a>

        {/* Center nav */}
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
          {[
            ['01', 'Approche', '#approche'],
            ['02', 'Services', '#services'],
            ['03', 'Méthode', '#methode'],
            ['04', 'Réalisations', '#travaux'],
            ['05', 'Contact', '#contact'],
          ].map(([n, l, h]) => (
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

        {/* Right cluster */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onToggleTheme}
            data-cursor="hover"
            data-cursor-label={theme === 'dark' ? 'mode clair' : 'mode sombre'}
            aria-label="Toggle theme"
            style={{
              width: 36, height: 36,
              border: '1px solid var(--line)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            )}
          </button>

          <a href="#contact" className="btn btn-signal" data-cursor="hover" data-cursor-label="démarrer">
            Diagnostic gratuit
            <Arrow size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

window.Nav = Nav;
