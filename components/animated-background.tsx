'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation loop
    const draw = () => {
      const width = c.width;
      const height = c.height;

      // --- FLICKERING BACKGROUND ---
      const flicker = Math.random() > 0.5;
      ctx.fillStyle = flicker
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, width, height);

      // --- GRID ---
      const gridSize = 40;
      ctx.beginPath();
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = "rgba(255,255,255,0.06)";

      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}
