// Shared hooks + atoms
const { useEffect, useRef, useState, useMemo, useCallback } = React;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    if (!cursor || !label) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    let raf;
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      cursor.style.opacity = 1;
    };
    const tick = () => {
      tx += (x - tx) * 0.22;
      ty += (y - ty) * 0.22;
      cursor.style.left = tx + 'px';
      cursor.style.top = ty + 'px';
      label.style.left = x + 'px';
      label.style.top = y + 'px';
      raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { cursor.style.opacity = 0; label.style.opacity = 0; };

    // Hover targets
    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        const mode = t.getAttribute('data-cursor');
        cursor.setAttribute('data-mode', mode);
        const txt = t.getAttribute('data-cursor-label');
        if (txt) {
          label.textContent = txt;
          label.style.opacity = 1;
        } else {
          label.style.opacity = 0;
        }
      } else {
        cursor.removeAttribute('data-mode');
        label.style.opacity = 0;
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function Arrow({ size = 20, className = '' }) {
  return (
    <svg className={`arrow ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 17 L17 7" />
      <path d="M9 7 H17 V15" />
    </svg>
  );
}

function Cross({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4 V20" /><path d="M4 12 H20" />
    </svg>
  );
}

function Dot({ size = 8, color = 'var(--signal)' }) {
  return <span style={{ width: size, height: size, background: color, borderRadius: '50%', display: 'inline-block' }} />;
}

// SectionHead component
function SectionHead({ num, title, meta }) {
  return (
    <div className="section-head">
      <div className="label">
        <span className="num">{num}</span>
        <h2>{title}</h2>
      </div>
      {meta && <span className="num">{meta}</span>}
    </div>
  );
}

// Placeholder image with subtle stripes
function Placeholder({ label = 'image', height = 320, ratio }) {
  const style = ratio
    ? { aspectRatio: ratio, width: '100%' }
    : { height };
  return (
    <div className="ph" style={style}>
      <span>[ {label} ]</span>
    </div>
  );
}

// Crosshairs corner mark
function Crosshair({ x, y }) {
  return (
    <span style={{
      position: 'absolute',
      [x]: -5, [y]: -5,
      width: 10, height: 10,
      pointerEvents: 'none',
      color: 'var(--signal)',
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M5 0 V10" /><path d="M0 5 H10" />
      </svg>
    </span>
  );
}

Object.assign(window, { useReveal, useCursor, Arrow, Cross, Dot, SectionHead, Placeholder, Crosshair });
