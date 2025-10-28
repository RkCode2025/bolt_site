'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  update: (width: number, height: number, mouse: { x: number; y: number }) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reducedMotionRef = useRef(false);
  const themeRef = useRef<'light' | 'dark'>('light');

  // Detect reduced motion + theme (system preference)
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const update = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;
      themeRef.current = darkModeQuery.matches ? 'dark' : 'light';
    };

    update(); // Initial

    reducedMotionQuery.addEventListener('change', update);
    darkModeQuery.addEventListener('change', update);

    return () => {
      reducedMotionQuery.removeEventListener('change', update);
      darkModeQuery.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (reducedMotionRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // === Particle Class ===
    class ParticleImpl {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.002 + 0.001;
      }

      update(width: number, height: number, mouse: { x: number; y: number }) {
        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150;
          this.x += (dx / distance) * force * 1.5;
          this.y += (dy / distance) * force * 1.5;
        }

        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Fade in/out
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.7 || this.opacity <= 0.1) {
          this.fadeSpeed *= -1;
        }

        // Wrap around
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const mode = themeRef.current;
        const r = mode === 'dark' ? 120 : 70;
        const g = mode === 'dark' ? 160 : 100;
        const b = 255;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // === Resize Handler (Uses CSS size) ===
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        canvasSizeRef.current = { width: canvas.width, height: canvas.height };
        initParticles();
      }, 100);
    };

    // === Mouse Move ===
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // === Visibility Change (Pause when hidden) ===
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId.current);
      } else {
        animate();
      }
    };

    // === Initialize Particles ===
    const initParticles = () => {
      const area = canvas.width * canvas.height;
      const density = window.innerWidth < 768 ? 30000 : 18000;
      const maxParticles = window.innerWidth < 768 ? 50 : 100;
      const count = Math.min(Math.floor(area / density), maxParticles);

      particlesRef.current = Array.from({ length: count }, () =>
        new ParticleImpl(canvas.width, canvas.height) as unknown as Particle
      );
    };

    // === Animation Loop ===
    const animate = () => {
      const { width, height } = canvasSizeRef.current;

      // Fade trail
      ctx.fillStyle = themeRef.current === 'dark'
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const maxConnections = 4;

      particles.forEach((particle, i) => {
        particle.update(width, height, mouseRef.current);
        particle.draw(ctx);

        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const p2 = particles[j];
          const dx = p2.x - particle.x;
          const dy = p2.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 130) {
            const opacity = 0.2 * (1 - distance / 130);
            const mode = themeRef.current;
            const r = mode === 'dark' ? 120 : 80;
            const g = mode === 'dark' ? 160 : 120;
            const b = 255;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connections++;
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // === Setup ===
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvasSizeRef.current = { width: canvas.width, height: canvas.height };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    initParticles();
    animate();

    // === Cleanup ===
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // === Reduced Motion Fallback ===
  if (reducedMotionRef.current) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 opacity-20 -z-10" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        opacity: themeRef.current === 'dark' ? 0.35 : 0.4,
        mixBlendMode: 'screen',
      }}
    />
  );
}
