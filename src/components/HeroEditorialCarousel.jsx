import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';

const HERO_IMAGES = [
  '/showcase-1.webp',
  '/showcase-2.webp',
  '/showcase-3.webp',
  '/showcase-4.webp',
  '/showcase-5.webp',
];

const LEAF_COLORS = [
  { fill: 'rgba(45, 80, 22, 0.80)', glow: 'rgba(45, 80, 22, 0.5)' },
  { fill: 'rgba(78, 130, 45, 0.75)', glow: 'rgba(78, 130, 45, 0.45)' },
  { fill: 'rgba(156, 175, 136, 0.85)', glow: 'rgba(156, 175, 136, 0.5)' },
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

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform float dispFactor;
  uniform float time;
  uniform vec2 rippleCenter;
  uniform float rippleStrength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from ripple center
    float dist = distance(uv, rippleCenter);
    
    // Create ripple displacement
    // The ripple expands over time based on dispFactor
    float ripple = sin(dist * 40.0 - dispFactor * 15.0) * 0.03;
    ripple *= pow(1.0 - dist, 2.0); // Falloff
    ripple *= sin(dispFactor * 3.14159); // Fade in/out with transition
    
    vec2 distortedUv = uv + ripple * rippleStrength;
    
    vec4 _texture1 = texture2D(texture1, distortedUv);
    vec4 _texture2 = texture2D(texture2, distortedUv);
    
    // Smooth crossfade
    gl_FragColor = mix(_texture1, _texture2, dispFactor);
  }
`;

export default function HeroEditorialCarousel() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leafVisible, setLeafVisible] = useState(false);
  const [leafStyle, setLeafStyle] = useState({});
  const [leafContent, setLeafContent] = useState('');

  // Three.js refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const texturesRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // FIX: Set pixel ratio for high-DPI displays to prevent pixelation
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const loader = new THREE.TextureLoader();
    const textures = HERO_IMAGES.map(url => {
      const tex = loader.load(url);
      // FIX: Better texture filtering for sharpness
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        texture1: { value: textures[0] },
        texture2: { value: textures[1] },
        dispFactor: { value: 0.0 },
        time: { value: 0.0 },
        rippleCenter: { value: new THREE.Vector2(0.5, 0.5) },
        rippleStrength: { value: 1.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    materialRef.current = material;
    texturesRef.current = textures;

    const animate = (time) => {
      material.uniforms.time.value = time * 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const handleResize = () => {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      renderer.setSize(width, height, false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const triggerTransition = useCallback(() => {
    if (!materialRef.current) return;

    const nextIdx = (currentIndex + 1) % HERO_IMAGES.length;
    const rippleX = 0.2 + Math.random() * 0.6;
    const rippleY = 0.2 + Math.random() * 0.6;

    // 1. Prepare Leaf Animation
    const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    const shapeFn = LEAF_SVGS[Math.floor(Math.random() * LEAF_SVGS.length)];
    const size = 40 + Math.random() * 20;

    setLeafContent(shapeFn(color.fill, color.glow));
    setLeafStyle({
      left: `${rippleX * 100}%`,
      top: `-50px`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
      transition: 'top 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95), opacity 0.3s',
      opacity: 1
    });
    setLeafVisible(true);

    // 2. Start Leaf Fall
    setTimeout(() => {
      setLeafStyle(prev => ({
        ...prev,
        top: `${rippleY * 100}%`,
      }));
    }, 50);

    // 3. Trigger Ripple when leaf "hits" the water (after ~1.1s)
    setTimeout(() => {
      setLeafStyle(prev => ({ ...prev, opacity: 0 }));

      materialRef.current.uniforms.texture1.value = texturesRef.current[currentIndex];
      materialRef.current.uniforms.texture2.value = texturesRef.current[nextIdx];
      materialRef.current.uniforms.rippleCenter.value.set(rippleX, 1.0 - rippleY); // Flip Y for UV

      let startTime = null;
      const duration = 2000; // 2s transition

      function animateTransition(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Custom easing for smooth ripple expansion
        materialRef.current.uniforms.dispFactor.value = progress;

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        } else {
          setCurrentIndex(nextIdx);
          setLeafVisible(false);
        }
      }
      requestAnimationFrame(animateTransition);
    }, 1100);

  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(triggerTransition, 7000);
    return () => clearInterval(interval);
  }, [triggerTransition]);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0 w-[420px] max-w-full h-[315px] p-4 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Ambient Glow */}
      <aside className="absolute inset-0 z-0 overflow-hidden pointer-events-none brightness-75 opacity-30 blur-[100px]">
        <img
          src={HERO_IMAGES[currentIndex]}
          alt=""
          className="w-full h-full object-cover scale-150"
        />
      </aside>

      {/* Main WebGL Display */}
      <figure className="relative w-full h-full z-10 m-0 overflow-hidden bg-stone-950 shadow-inner">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Falling Leaf Overlay */}
        {leafVisible && (
          <div
            className="absolute pointer-events-none z-50"
            style={leafStyle}
            dangerouslySetInnerHTML={{ __html: leafContent }}
          />
        )}

        {/* Glass Frame Overlay */}
        <div className="absolute inset-0 pointer-events-none border border-white/10 z-40 shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]" />
      </figure>

      <style>{`
        @keyframes leafSway {
          0%, 100% { transform: translateX(-10px) rotate(-5deg); }
          50% { transform: translateX(10px) rotate(5deg); }
        }
        .leaf-animate {
          animation: leafSway 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
