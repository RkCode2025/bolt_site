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

  // Detect dark mode & reduced motion
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

    // Particle class
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
        this.size = Math.random() * 2 + 0.8;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fadeSpeed = Math.random() * 0.002 + 0.001;
      }

      update(width: number, height: number, mouse: { x: number; y: number }) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 120 && distance > 0) {
          const force = (120 - distance) / 120;
          this.x += (dx / distance) * force * 1.5;
          this.y += (dy / distance) * force * 1.5;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Fade oscillation
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.7 || this.opacity <= 0.1) this.fadeSpeed *= -1;

        // Wrap around
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const color = isDark
          ? `rgba(130, 180, 255, ${this.opacity})` // electric blue glow
          : `rgba(30, 70, 180, ${this.opacity * 1.3})`; // deep blue tone for light mode

        ctx.beginPath();
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    const initParticles = () => {
      const area = canvas.width * canvas.height;
      const density = window.innerWidth < 768 ? 28000 : 16000;
      const maxParticles = window.innerWidth < 768 ? 40 : 80;
      const count = Math.min(Math.floor(area / density), maxParticles);
      particlesRef.current = Array.from({ length: count }, () =>
        new ParticleImpl(canvas.width, canvas.height) as Particle
      );
    };

    // Resize with debounce
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasSizeRef.current = { width: canvas.width, height: canvas.height };
        initParticles();
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(animationFrameId.current);
      else animate();
    };

    const animate = () => {
      const { width, height } = canvasSizeRef.current;
      ctx.fillStyle = isDark
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        p.update(width, height, mouseRef.current);
        p.draw(ctx);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasSizeRef.current = { width: canvas.width, height: canvas.height };
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [reducedMotion, isDark]);

  // Fallback for reduced motion
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 opacity-20 -z-10" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        opacity: isDark ? 0.5 : 0.6,
        mixBlendMode: isDark ? 'screen' : 'multiply',
        transition: 'opacity 0.4s ease, mix-blend-mode 0.4s ease',
      }}
    />
  );
}
