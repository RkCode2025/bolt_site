'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const updateTheme = () => {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      fade: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 1;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.4;
        this.fade = (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1);
      }

      update(width: number, height: number) {
        this.x = (this.x + this.vx + width) % width;
        this.y = (this.y + this.vy + height) % height;
        this.opacity += this.fade;
        if (this.opacity < 0.2 || this.opacity > 1) this.fade *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${this.opacity})`
          : `rgba(0, 0, 0, ${this.opacity})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const num = Math.min((canvas.width * canvas.height) / 15000, 90);
      particles = Array.from({ length: num }, () => new Particle(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      window.matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-80 dark:opacity-40"
      style={{ zIndex: 0 }}
    />
  );
}
