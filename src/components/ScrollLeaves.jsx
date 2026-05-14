import { useEffect, useRef, useState } from 'react';

export default function ScrollLeaves() {
  const containerRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const stopScrollTimeout = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const createLeaf = () => {
      if (!containerRef.current) return;

      const leaf = document.createElement('div');
      leaf.classList.add('absolute', 'pointer-events-none', 'text-primary/30', 'leaf-particle');
      
      const startX = Math.random() * 100;
      const startRotation = Math.random() * 360;
      const endRotation = startRotation + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360);
      const size = 16 + Math.random() * 24; 
      const duration = 1.5 + Math.random() * 1.5; 

      leaf.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 22C2 22 2 13 8 7C14 1 22 2 22 2C22 2 21 11 15 17C9 23 2 22 2 22Z" />
        <path d="M2 22L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>`;

      leaf.style.left = `${startX}vw`;
      // Start slightly above the top of the viewport
      leaf.style.top = '-50px';
      leaf.style.transform = `rotate(${startRotation}deg)`;
      leaf.style.transition = `transform ${duration}s ease-in-out, top ${duration}s linear, opacity 0.5s ease-out`;
      leaf.style.opacity = '0';

      containerRef.current.appendChild(leaf);

      // Trigger falling animation
      requestAnimationFrame(() => {
        leaf.style.top = `${window.innerHeight + 50}px`;
        leaf.style.transform = `rotate(${endRotation}deg) translateX(${Math.random() * 100 - 50}px)`;
        leaf.style.opacity = '1';
      });

      // Cleanup organically
      setTimeout(() => {
        if (containerRef.current && containerRef.current.contains(leaf)) {
          containerRef.current.removeChild(leaf);
        }
      }, duration * 1000);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      if (scrollDiff > 5) {
        if (Math.random() < 0.4) {
          createLeaf();
        }
      }

      // Reset leaves opacity if scrolling stops
      if (stopScrollTimeout.current) clearTimeout(stopScrollTimeout.current);
      
      // If we stop scrolling for 200ms, fade all active leaves
      stopScrollTimeout.current = setTimeout(() => {
        if (!containerRef.current) return;
        const leaves = containerRef.current.querySelectorAll('.leaf-particle');
        leaves.forEach((leaf) => {
          leaf.style.opacity = '0';
        });
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stopScrollTimeout.current) clearTimeout(stopScrollTimeout.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      aria-hidden="true"
    />
  );
}
