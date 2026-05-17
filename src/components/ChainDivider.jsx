import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ChainDivider() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();

    // Use an orthographic camera for a 2D-like chain placement
    const frustumSize = 10;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Overlay canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '10';
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaea, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xccddff, 0.4);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Rusted, mossy material
    const material = new THREE.MeshStandardMaterial({
      color: 0x5a6b32, // Moss green mixed with rust brown
      emissive: 0x1a1505, // Slight warm rust undertone
      roughness: 1.0,
      metalness: 0.1,
      flatShading: true, // Gives a slightly jagged, textured look without loading maps
    });

    const chains = [];
    const numLinks = 12; // Links per chain to span vertically
    const linkRadius = 0.45;
    const tubeRadius = 0.15;

    const createChain = () => {
      const links = [];
      const geometry = new THREE.TorusGeometry(linkRadius, tubeRadius, 8, 16);

      for (let i = 0; i < numLinks; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        if (i % 2 === 1) mesh.rotation.y = Math.PI / 2;
        scene.add(mesh);
        links.push({
          mesh,
          x: 0,
          baseX: 0,
          y: 0,
          z: 0,
          shakeVel: 0,
          shakeAcc: 0,
        });
      }
      return links;
    };

    // Create 5 hanging chains
    for (let i = 0; i < 5; i++) {
      chains.push(createChain());
    }

    const mouse = { x: -1000, y: -1000 };
    let mouseWorldX = -1000;

    const onMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouseWorldX = -1000;
    };

    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('mouseleave', onMouseLeave);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const currentWidth = renderer.domElement.clientWidth;

      // Calculate mouse in world coordinates based on orthographic bounds
      if (mouse.x > -1000 && currentWidth > 0) {
        const currentAspect = camera.right / (frustumSize / 2);
        mouseWorldX = (mouse.x / currentWidth) * (frustumSize * currentAspect) - (frustumSize * currentAspect) / 2;
      } else {
        mouseWorldX = -1000;
      }

      // Allow chains to hang slightly outside the vertical bounds so they "connect" sections
      const topY = frustumSize / 2 + 1.0;
      const bottomY = -frustumSize / 2 - 1.0;

      chains.forEach((links, chainIndex) => {
        const chainX = links[0].baseX;
        const distToMouseX = Math.abs(mouseWorldX - chainX);

        let force = 0;
        // Apply shaking force if mouse is near
        if (mouse.x > 0 && distToMouseX < 2.0) {
          // Shakes more violently closer to the mouse
          force = (2.0 - distToMouseX) * Math.sin(time * 35) * 0.15;
        }

        links.forEach((link, i) => {
          const t = i / (links.length - 1);

          // Gentle ambient wind sway
          const wind = Math.sin(time * 1.5 + chainIndex + i * 0.3) * 0.05 * Math.sin(t * Math.PI);

          // Shaking should be max in the middle, pinned at ends
          const shakeFactor = Math.sin(t * Math.PI);

          // Spring physics
          link.shakeAcc = (force * shakeFactor) - (link.x - link.baseX) * 0.1;
          link.shakeVel += link.shakeAcc;
          link.shakeVel *= 0.85; // damping

          link.x += link.shakeVel + wind;
          link.y = topY * (1 - t) + bottomY * t;

          link.mesh.position.set(link.x, link.y, link.z);

          // Calculate correct rotation to point to the next link
          if (i > 0) {
            const prev = links[i - 1];
            const dx = link.x - prev.x;
            const dy = link.y - prev.y;

            if (i % 2 === 0) {
              link.mesh.rotation.z = Math.atan2(dx, -dy);
            } else {
              // Alternate links rotated 90deg on Y
              link.mesh.rotation.x = -Math.atan2(dx, -dy);
            }
          }
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);

      const newAspect = w / h;
      camera.left = -frustumSize * newAspect / 2;
      camera.right = frustumSize * newAspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();

      // Spread chains evenly across the width
      const numChains = chains.length;
      const span = frustumSize * newAspect * 0.75; // span 75% of container width
      chains.forEach((links, i) => {
        const xBase = -span / 2 + (span / (numChains - 1)) * i;
        links.forEach(l => {
          l.baseX = xBase;
          l.x = xBase;
        });
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial positioning

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-24 md:h-32 overflow-hidden cursor-crosshair group my-4"
      title="Hover the chains"
    >
      <div
        className="absolute inset-0 z-0 opacity-80 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'url(/middle-image.webp)',
          backgroundSize: 'fill',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
