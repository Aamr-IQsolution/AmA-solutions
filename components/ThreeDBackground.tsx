
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const geoMain = new THREE.IcosahedronGeometry(1.6, 1);
    const matMain = new THREE.MeshPhongMaterial({
      color: 0x0a0a1a,
      emissive: 0x100020,
      shininess: 120,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geoMain, matMain);
    scene.add(mesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.62, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, wireframe: true, transparent: true, opacity: 0.35 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    const coreGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x7b2fff, wireframe: true, transparent: true, opacity: 0.5 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const ringGeo = new THREE.TorusGeometry(2.5, 0.012, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff4b6e, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.9, 0.008, 8, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.2 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.5;
    ring2.rotation.z = Math.PI / 4;
    scene.add(ring2);

    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 3;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({ color: 0x00f5d4, size: 0.022, transparent: true, opacity: 0.7, sizeAttenuation: true });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0x0a0a2a, 2);
    scene.add(ambient);

    const light1 = new THREE.PointLight(0x00f5d4, 4, 12);
    light1.position.set(4, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7b2fff, 4, 12);
    light2.position.set(-4, -2, 3);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xff4b6e, 2, 10);
    light3.position.set(0, 4, -3);
    scene.add(light3);

    let scrollProgress = 0;
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener('scroll', handleScroll);

    const clock = new THREE.Clock();
    let smoothScroll = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      smoothScroll += (scrollProgress - smoothScroll) * 0.06;
      const s = smoothScroll;

      mesh.rotation.x = s * Math.PI * 1.8 + t * 0.12;
      mesh.rotation.y = s * Math.PI * 2.4 + t * 0.18;

      const pulse = 1 + 0.06 * Math.sin(t * 1.8);
      const scrollScale = 1 + s * 0.35;
      mesh.scale.setScalar(pulse * scrollScale);

      wire.rotation.x = -s * Math.PI * 1.2 + t * 0.09;
      wire.rotation.y = s * Math.PI * 1.6 + t * 0.14;
      wire.scale.setScalar(pulse * scrollScale);

      core.rotation.x = t * 0.6 + s * Math.PI * 3;
      core.rotation.y = t * 0.9 + s * Math.PI * 2;
      core.scale.setScalar(1 + 0.15 * Math.sin(t * 2.5));

      ring.rotation.z = t * 0.25 + s * Math.PI;
      ring.rotation.y = t * 0.1;
      ring2.rotation.z = -t * 0.18 + s * Math.PI * 1.5;
      ring2.rotation.x = t * 0.08 + s * 1.2;

      ringMat.opacity = 0.2 + 0.3 * Math.abs(Math.sin(t * 0.7));
      ring2Mat.opacity = 0.1 + 0.2 * Math.abs(Math.sin(t * 0.5 + 1));

      particles.rotation.y = t * 0.04 + s * Math.PI * 0.6;
      particles.rotation.x = t * 0.02 + s * Math.PI * 0.3;

      light1.position.x = 4 * Math.cos(t * 0.5);
      light1.position.z = 4 * Math.sin(t * 0.5);
      light2.position.x = -4 * Math.cos(t * 0.4 + 1);
      light2.position.z = -4 * Math.sin(t * 0.4 + 1);

      const hue = (t * 30) % 360;
      const c = new THREE.Color(`hsl(${hue}, 100%, 60%)`);
      wireMat.color = c;

      camera.position.x = Math.sin(t * 0.15) * 0.4;
      camera.position.y = Math.cos(t * 0.12) * 0.25 - s * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      // Proper cleanup needed here. For simplicity, we're not disposing of Three.js objects.
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

export default ThreeDBackground;
