'use client';

import { useEffect, useRef, useState } from 'react';

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

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 🌗 Detect dark mode & reduced motion preferences
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateDarkMode = () => setIsDark(darkModeMediaQuery.matches);
    const updateReducedMotion = () => setReducedMotion(reducedMotionMediaQuery.matches);

    updateDarkMode();
    updateReducedMotion();

    darkModeMediaQuery.addEventListener('change', updateDarkMode);
    reducedMotionMediaQuery.addEventListener('change', updateReducedMotion);

    return () => {
      darkModeMediaQuery.removeEventListener('change', updateDarkMode);
      reducedMotionMediaQuery.removeEventListener('change', updateReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 🌌 Particle class
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
        this.size = Math.random() * 2 + 0.6;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
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

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Fade oscillation
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.7 || this.opacity <= 0.1) {
          this.fadeSpeed *= -1;
        }

        // Wrap around edges
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // 🎨 Dynamic colors per theme
        const color = isDark
          ? `rgba(140, 190, 255, ${this.opacity})` // glowing sky blue for dark
          : `rgba(20, 80, 200, ${this.opacity * 1.2})`; // deep royal blue for light

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 📏 Resize handler (debounced)
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        canvasSizeRef.current = { width: canvas.width, height: canvas.height };
        initParticles();
      }, 150);
    };

    // 🖱 Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // 💤 Pause animation when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId.current);
      } else {
        animate();
      }
    };

    // 🌠 Initialize particles
    const initParticles = () => {
      const area = canvas.width * canvas.height;
      const density = window.innerWidth < 768 ? 30000 : 18000;
      const maxParticles = window.innerWidth < 768 ? 50 : 100;
      const count = Math.min(Math.floor(area / density), maxParticles);
      particlesRef.current = Array.from({ length: count }, () =>
        new ParticleImpl(canvas.width, canvas.height) as Particle
      );
    };

    // 🎞 Animation loop
    const animate = () => {
      const { width, height } = canvasSizeRef.current;

      // Slight trail effect
      ctx.fillStyle = isDark
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.06)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const maxConnectionsPerParticle = 4;

      particles.forEach((particle, i) => {
        particle.update(width, height, mouseRef.current);
        particle.draw(ctx);

        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < maxConnectionsPerParticle; j++) {
          const p2 = particles[j];
          const dx = p2.x - particle.x;
          const dy = p2.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 130) {
            const opacity = 0.25 * (1 - distance / 130);
            const color = isDark
              ? `rgba(140, 190, 255, ${opacity})`
              : `rgba(20, 80, 200, ${opacity * 1.1})`;

            ctx.strokeStyle = color;
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

    // 🧩 Setup
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasSizeRef.current = { width: canvas.width, height: canvas.height };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    initParticles();
    animate();

    // 🧹 Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [reducedMotion, isDark]);

  // ♿ Static fallback
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 opacity-20 z-[1]" />
    );
  }

  // 🎨 Render canvas properly layered
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        opacity: isDark ? 0.35 : 0.6,
        mixBlendMode: isDark ? 'screen' : 'multiply',
        transition: 'opacity 0.4s ease, mix-blend-mode 0.4s ease',
      }}
    />
  );
}
