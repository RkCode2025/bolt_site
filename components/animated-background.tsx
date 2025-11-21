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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

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
        // Slightly larger and more varied sizes
        this.size = Math.random() * 3.5 + 1.5;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.4; // Start brighter
        this.fade = (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1);
      }

      update(width: number, height: number) {
        this.x = (this.x + this.vx + width) % width;
        this.y = (this.y + this.vy + height) % height;
        this.opacity += this.fade;
        if (this.opacity < 0.3 || this.opacity > 1) this.fade *= -1;
        this.opacity = Math.max(0.3, Math.min(1, this.opacity));
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Emerald glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${this.opacity})`);     // emerald-500
        gradient.addColorStop(0.4, `rgba(52, 211, 153, ${this.opacity * 0.7})`); // emerald-400
        gradient.addColorStop(1, `rgba(167, 243, 208, 0)`);                  // fade out

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Solid core for extra visibility
        ctx.fillStyle = `rgba(236, 253, 245, ${this.opacity})`; // emerald-50 like bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      const density = 12000; // Increased density for more connections
      const num = Math.min((canvas.width * canvas.height) / density, 120);
      particles = Array.from({ length: num }, () => new Particle(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(canvas.width, canvas.height);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) { // Slightly longer connection range
            const opacity = Math.max(0, (1 - dist / 140) * 0.4);

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`);
            gradient.addColorStop(1, `rgba(110, 231, 183, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-70 dark:opacity-80 -z-10"
      style={{ background: 'transparent' }}
    />
  );
}
