"use client";

import { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  sidesOnly?: boolean;
  className?: string;
  contentMaxWidth?: number; // e.g., 800 for max-w-5xl
  topOffset?: number;       // space from top (header)
  bottomOffset?: number;    // space from bottom
}

export function AnimatedBackground({
  sidesOnly = false,
  className = "",
  contentMaxWidth = 800,
  topOffset = 140,
  bottomOffset = 250,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const flickersRef = useRef<{ r: number; c: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rows = 0;
    let cols = 0;
    const cell = 45;
    const dpr = window.devicePixelRatio || 1;

    // Content safe zone (center column to avoid)
    const getContentBox = () => ({
      x: window.innerWidth / 2 - contentMaxWidth / 2,
      y: topOffset,
      w: contentMaxWidth,
      h: window.innerHeight - topOffset - bottomOffset,
    });

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      rows = Math.ceil(height / cell);
      cols = Math.ceil(width / cell);

      drawStaticGrid();
    };

    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";

      const box = getContentBox();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cell;
          const y = r * cell;

          if (sidesOnly) {
            const insideBox =
              x >= box.x &&
              x <= box.x + box.w &&
              y >= box.y &&
              y <= box.y + box.h;

            if (insideBox) continue;
          }

          ctx.fillRect(x + 0.5, y + 0.5, 1, 1); // centered pixel
        }
      }
    };

    const spawnFlicker = () => {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      const x = c * cell;
      const y = r * cell;

      if (sidesOnly) {
        const box = getContentBox();
        const insideBox =
          x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
        if (insideBox) return;
      }

      flickersRef.current.push({
        r,
        c,
        life: 0.8 + Math.random() * 0.7, // 0.8–1.5
      });
    };

    const animate = () => {
      const flickers = flickersRef.current;

      // Use reverse loop to safely remove items
      for (let i = flickers.length - 1; i >= 0; i--) {
        const f = flickers[i];
        f.life -= 0.025;

        if (f.life <= 0) {
          flickers.splice(i, 1);
          continue;
        }

        const x = f.c * cell;
        const y = f.r * cell;
        ctx.fillStyle = `rgba(255, 255, 255, ${f.life})`;
        ctx.fillRect(x, y, 2, 2); // slightly larger for visibility
      }

      // Randomly spawn new flickers
      if (Math.random() < 0.2) spawnFlicker();

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resize();
    window.addEventListener("resize", resize);

    // Start animation
    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resize);
      flickersRef.current = [];
    };
  }, [sidesOnly, contentMaxWidth, topOffset, bottomOffset]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
    />
  );
}
