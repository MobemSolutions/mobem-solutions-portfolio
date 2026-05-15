// Main app shell
const { useEffect: ue } = React;

function App() {
  const [tweaks, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  useReveal();
  useCursor();

  // Apply theme on documentElement
  ue(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  const toggleTheme = () => setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <Nav theme={tweaks.theme} onToggleTheme={toggleTheme} />

      <main className="frame" style={{ background: 'var(--bg)' }}>
        <Hero variant={tweaks.heroVariant} withImages={tweaks.withImages} />
      </main>

      <Marquee />

      <main className="frame" style={{ background: 'var(--bg)' }}>
        <Bento density={tweaks.bentoDensity} withImages={tweaks.withImages} />
        <Method />
      </main>

      <Proof />

      <main className="frame" style={{ background: 'var(--bg)' }}>
        <Work withImages={tweaks.withImages} />
        <Contact />
      </main>

      <Footer />

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Apparence" />
        <TweakRadio
          label="Thème"
          value={tweaks.theme}
          options={[
            { value: 'light', label: 'Papier' },
            { value: 'dark', label: 'Encre' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakToggle
          label="Avec images"
          value={tweaks.withImages}
          onChange={(v) => setTweak('withImages', v)}
        />

        <TweakSection label="Hero" />
        <TweakRadio
          label="Variante"
          value={tweaks.heroVariant}
          options={[
            { value: 'stack', label: 'Empilé' },
            { value: 'inline', label: 'Inline' },
            { value: 'editorial', label: 'Édito' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)}
        />

        <TweakSection label="Bento services" />
        <TweakRadio
          label="Densité"
          value={tweaks.bentoDensity}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Aéré' },
          ]}
          onChange={(v) => setTweak('bentoDensity', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
