// Shared Nav + Footer for sub-pages, plus theme toggle
(function() {
  const STORAGE_KEY = 'mobem-theme';
  function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; }
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch(e) {}
  }
  setTheme(getTheme());

  const navItems = [
    ['01', 'Accueil', 'Mobem.html'],
    ['02', 'Réalisations', 'realisations.html'],
    ['03', 'Blog', 'blog.html'],
    ['04', 'Sites par métier', 'metiers.html'],
    ['05', 'Nos villes', 'villes.html'],
  ];

  function renderNavLink(n, l, h, active) {
    return `<a href="${h}" class="nav-link ${l === active ? 'is-active' : ''}"><span class="mono" style="color: var(--muted);">${n}</span><span class="ul">${l}</span></a>`;
  }

  function renderNav(activeKey) {
    const links = navItems.map(([n, l, h]) => renderNavLink(n, l, h, activeKey)).join('');
    return `
      <header class="site-nav">
        <div class="site-nav-inner">
          <a href="Mobem.html" class="brand">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="0.5" y="0.5" width="21" height="21" stroke="currentColor"/>
              <rect x="4" y="4" width="6" height="6" fill="currentColor"/>
              <rect x="12" y="12" width="6" height="6" fill="var(--signal)"/>
            </svg>
            <span style="font-weight: 600; letter-spacing: -0.01em; font-size: 15px;">Mobem<span style="color: var(--signal);">.</span></span>
          </a>
          <nav class="site-nav-center">${links}</nav>
          <div class="site-nav-right">
            <button id="themeToggle" aria-label="Toggle theme" class="theme-btn"></button>
            <a href="Mobem.html#contact" class="btn btn-signal">Diagnostic gratuit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17 L17 7"/><path d="M9 7 H17 V15"/></svg>
            </a>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div style="padding: 64px 32px 28px;">
          <div class="footer-grid">
            <div class="footer-manifeste">
              <div class="mono" style="color: #888;">// Manifeste</div>
              <h2>Diagnostiquer<br/><span style="font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--signal);">avant</span><br/>de prescrire.</h2>
            </div>
            <div class="footer-col">
              <span class="mono" style="color: #888;">— Cabinet</span>
              <a href="Mobem.html" class="ul">Accueil</a>
              <a href="realisations.html" class="ul">Réalisations</a>
              <a href="blog.html" class="ul">Blog</a>
              <a href="Mobem.html#contact" class="ul">Contact</a>
            </div>
            <div class="footer-col">
              <span class="mono" style="color: #888;">— Référencement</span>
              <a href="metiers.html" class="ul">Sites par métier</a>
              <a href="villes.html" class="ul">Sites par ville</a>
              <a href="plan-du-site.html" class="ul">Plan du site</a>
            </div>
            <div class="footer-col">
              <span class="mono" style="color: #888;">— Légal</span>
              <a href="#" class="ul">Mentions légales</a>
              <a href="#" class="ul">CGV</a>
              <a href="#" class="ul">Confidentialité</a>
            </div>
            <div class="footer-col">
              <span class="mono" style="color: #888;">— Liens</span>
              <a href="#" class="ul">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <div class="footer-meta mono">
          <span>© Mobem · 2026 · Tous droits réservés</span>
          <span>Conçu par Mobem · Lighthouse 96/100</span>
          <span>v.2026.04 · Refonte / Conseil</span>
        </div>
      </footer>
    `;
  }

  function init(activeKey) {
    const navHost = document.getElementById('site-nav');
    const footHost = document.getElementById('site-footer');
    if (navHost) navHost.outerHTML = renderNav(activeKey);
    if (footHost) footHost.outerHTML = renderFooter();

    // Inject cursor elements
    if (!document.getElementById('cursor')) {
      const c = document.createElement('div'); c.id = 'cursor';
      const l = document.createElement('div'); l.id = 'cursorLabel';
      document.body.append(c, l);
    }
    initCursor();

    // Mark common interactive elements as cursor hover targets
    document.querySelectorAll('a, button, .btn, .filter-btn, .v-tag, .m-tag, .tile-tag, .nav-link, .case-row, .case-card, .article-row, .grid-card, .related-card, .metier-card, .ville-card').forEach(el => {
      if (!el.hasAttribute('data-cursor')) el.setAttribute('data-cursor', 'hover');
    });

    const btn = document.getElementById('themeToggle');
    function paintBtn() {
      const t = getTheme();
      btn.innerHTML = t === 'dark'
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    }
    paintBtn();
    btn.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      paintBtn();
    });
  }

  window.MobemSite = { init };

  function initCursor() {
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    if (!cursor || !label || cursor.dataset.bound) return;
    cursor.dataset.bound = '1';
    let x = 0, y = 0, tx = 0, ty = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY; cursor.style.opacity = 1; };
    const tick = () => {
      tx += (x - tx) * 0.22; ty += (y - ty) * 0.22;
      cursor.style.left = tx + 'px'; cursor.style.top = ty + 'px';
      label.style.left = x + 'px'; label.style.top = y + 'px';
      requestAnimationFrame(tick);
    };
    const onLeave = () => { cursor.style.opacity = 0; label.style.opacity = 0; };
    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        cursor.setAttribute('data-mode', t.getAttribute('data-cursor'));
        const txt = t.getAttribute('data-cursor-label');
        if (txt) { label.textContent = txt; label.style.opacity = 1; } else { label.style.opacity = 0; }
      } else { cursor.removeAttribute('data-mode'); label.style.opacity = 0; }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    requestAnimationFrame(tick);
  }
})();
