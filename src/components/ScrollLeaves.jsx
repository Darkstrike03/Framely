import { useEffect, useRef } from 'react';

const STYLE_ID = 'scroll-leaves-styles';

const LEAF_COLORS = [
  { fill: 'rgba(45, 80, 22, 0.80)',   glow: 'rgba(45, 80, 22, 0.5)' },
  { fill: 'rgba(78, 130, 45, 0.75)',  glow: 'rgba(78, 130, 45, 0.45)' },
  { fill: 'rgba(156, 175, 136, 0.85)',glow: 'rgba(156, 175, 136, 0.5)' },
  { fill: 'rgba(190, 155, 40, 0.75)', glow: 'rgba(190, 155, 40, 0.5)' },
  { fill: 'rgba(160, 100, 30, 0.70)', glow: 'rgba(160, 100, 30, 0.45)' },
  { fill: 'rgba(100, 160, 60, 0.75)', glow: 'rgba(100, 160, 60, 0.45)' },
];

const LEAF_SVGS = [
  // Classic curved leaf
  (f, g) => `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 7px ${g});display:block;">
    <path d="M2 22C2 22 2 13 8 7C14 1 22 2 22 2C22 2 21 11 15 17C9 23 2 22 2 22Z" fill="${f}"/>
    <path d="M2 22L12 12" stroke="${f}" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
  </svg>`,
  // Teardrop leaf
  (f, g) => `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 7px ${g});display:block;">
    <path d="M12 2C12 2 3 9 3 15.5C3 19.6 7.1 23 12 23C16.9 23 21 19.6 21 15.5C21 9 12 2 12 2Z" fill="${f}"/>
    <line x1="12" y1="23" x2="12" y2="10" stroke="${f}" stroke-width="1" stroke-linecap="round" opacity="0.55"/>
  </svg>`,
  // Star / Maple leaf
  (f, g) => `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 7px ${g});display:block;">
    <path d="M15 2L12 9H5L11 13.5L8.5 21L15 16.5L21.5 21L19 13.5L25 9H18L15 2Z" fill="${f}"/>
    <line x1="15" y1="16.5" x2="15" y2="28" stroke="${f}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
  </svg>`,
  // Oval / Ellipse leaf
  (f, g) => `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 7px ${g});display:block;">
    <ellipse cx="12" cy="12" rx="6.5" ry="11" transform="rotate(-15 12 12)" fill="${f}" opacity="0.92"/>
    <path d="M10.5 20C10.5 20 11.5 13 12.5 7" stroke="${f}" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.5"/>
  </svg>`,
  // Fan / Ginkgo leaf
  (f, g) => `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 7px ${g});display:block;">
    <path d="M12 20C12 20 4 15 4 9C4 5 7.5 2 12 2C16.5 2 20 5 20 9C20 15 12 20 12 20Z" fill="${f}"/>
    <path d="M12 20V12M12 12L7 6M12 12L17 6M12 12L5 10M12 12L19 10" stroke="${f}" stroke-width="0.7" stroke-linecap="round" fill="none" opacity="0.45"/>
  </svg>`,
];

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
    .lp-outer {
      position: absolute;
      pointer-events: none;
      will-change: top, opacity;
    }
    .lp-sway {
      animation: lpSway var(--sw-dur, 2s) ease-in-out infinite alternate;
    }
    .lp-spin {
      animation: lpSpin var(--sp-dur, 3s) linear infinite;
      animation-direction: var(--sp-dir, normal);
      transform-origin: center;
      display: block;
    }
    @keyframes lpSway {
      from { transform: translateX(calc(var(--sw-amp, 40px) * -1)); }
      to   { transform: translateX(var(--sw-amp, 40px)); }
    }
    @keyframes lpSpin {
      0%   { transform: rotate(0deg)   rotateY(0deg)   scale(1);    }
      25%  { transform: rotate(90deg)  rotateY(45deg)  scale(0.88); }
      50%  { transform: rotate(180deg) rotateY(0deg)   scale(1);    }
      75%  { transform: rotate(270deg) rotateY(-45deg) scale(0.88); }
      100% { transform: rotate(360deg) rotateY(0deg)   scale(1);    }
    }
    @keyframes lpGlow {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.7; }
    }
  `;
  document.head.appendChild(el);
}

export default function ScrollLeaves() {
  const containerRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const stopTimeout = useRef(null);
  const leafCount = useRef(0);
  const MAX_LEAVES = 25;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    injectStyles();

    const createLeaf = (spawnDelay = 0) => {
      if (!containerRef.current || leafCount.current >= MAX_LEAVES) return;
      leafCount.current++;

      const color  = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      const shapeFn = LEAF_SVGS[Math.floor(Math.random() * LEAF_SVGS.length)];

      const size    = 18 + Math.random() * 30;       // 18–48px
      const startX  = 2 + Math.random() * 96;        // 2vw–98vw
      const fallDur = 2.8 + Math.random() * 3.2;     // 2.8s–6s
      const swayAmp = 25 + Math.random() * 65;       // 25–90px horizontal sway
      const swayDur = 0.7 + Math.random() * 1.4;     // 0.7s–2.1s sway cycle
      const spinDur = 1.2 + Math.random() * 3.8;     // 1.2s–5s rotation
      const spinDir = Math.random() > 0.5 ? 'normal' : 'reverse';

      // --- Outer: vertical fall ---
      const outer = document.createElement('div');
      outer.className = 'lp-outer';
      outer.style.cssText = `
        left: ${startX}vw;
        top: -65px;
        opacity: 0;
        transition: top ${fallDur}s cubic-bezier(0.3, 0.6, 0.5, 1), opacity 0.45s ease;
      `;

      // --- Middle: horizontal sway ---
      const sway = document.createElement('div');
      sway.className = 'lp-sway';
      sway.style.setProperty('--sw-amp', `${swayAmp}px`);
      sway.style.setProperty('--sw-dur', `${swayDur}s`);

      // --- Inner: spin + SVG ---
      const spin = document.createElement('div');
      spin.className = 'lp-spin';
      spin.style.cssText = `width:${size}px;height:${size}px;`;
      spin.style.setProperty('--sp-dur', `${spinDur}s`);
      spin.style.setProperty('--sp-dir', spinDir);
      spin.innerHTML = shapeFn(color.fill, color.glow);

      sway.appendChild(spin);
      outer.appendChild(sway);
      containerRef.current.appendChild(outer);

      // Trigger fall after spawn delay
      setTimeout(() => {
        if (!containerRef.current) return;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            outer.style.top = `${window.innerHeight + 80}px`;
            outer.style.opacity = '1';
          });
        });
      }, spawnDelay);

      // Cleanup
      setTimeout(() => {
        if (containerRef.current?.contains(outer)) {
          containerRef.current.removeChild(outer);
        }
        leafCount.current = Math.max(0, leafCount.current - 1);
      }, (fallDur * 1000) + spawnDelay + 900);
    };

    const handleScroll = () => {
      const currentY  = window.scrollY;
      const diff      = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      if (diff > 3) {
        // Spawn count scales with scroll speed: 1–4 leaves
        const count = diff > 60 ? 4 : diff > 30 ? 3 : diff > 12 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          if (Math.random() < 0.75) {
            createLeaf(i * 80); // stagger each by 80ms
          }
        }
      }

      // Fade all leaves out when scroll stops
      if (stopTimeout.current) clearTimeout(stopTimeout.current);
      stopTimeout.current = setTimeout(() => {
        containerRef.current?.querySelectorAll('.lp-outer').forEach(l => {
          l.style.opacity = '0';
        });
      }, 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stopTimeout.current) clearTimeout(stopTimeout.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 50 }}
      aria-hidden="true"
    />
  );
}
