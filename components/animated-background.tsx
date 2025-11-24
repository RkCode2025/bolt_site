"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);
      drawStaticGrid(); // Rebuild after resize
    }

    window.addEventListener("resize", resize);
    resize();

    // Your content box area coordinates
    const box = {
      x: window.innerWidth / 2 - 500 / 2,
      y: 140,
      w: 500,
      h: window.innerHeight - 250,
    };

    const cell = 45;
    let rows = 0;
    let cols = 0;
    let flickers: { r: number; c: number; life: number }[] = [];

    /** STATIC GRID (NO ANIMATION EXCEPT FLICKERS) */
    function drawStaticGrid() {
      if (!canvas || !ctx) return;

      rows = Math.ceil(canvas.height / cell);
      cols = Math.ceil(canvas.width / cell);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255,255,255,0.04)";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cell;
          const y = r * cell;

          // Skip inside the content box
          if (x > box.x && x < box.x + box.w && y > box.y && y < box.y + box.h)
            continue;

          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    /** SPAWN RANDOM FLICKERS (ONLY OUTSIDE BOX) */
    function spawnFlicker() {
      if (!canvas) return;

      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);

      const x = c * cell;
      const y = r * cell;

      if (x > box.x && x < box.x + box.w && y > box.y && y < box.y + box.h)
        return;

      flickers.push({ r, c, life: 1 + Math.random() * 0.6 });
    }

    /** ANIMATION LOOP (ONLY FLICKERS, NO FULL REDRAW) */
    function animate() {
      if (!canvas || !ctx) return;

      flickers.forEach((f, i) => {
        const x = f.c * cell;
        const y = f.r * cell;

        ctx.fillStyle = `rgba(255,255,255,${f.life})`;
        ctx.fillRect(x, y, 1.2, 1.2);

        f.life -= 0.03;
        if (f.life <= 0) flickers.splice(i, 1);
      });

      if (Math.random() < 0.25) spawnFlicker();

      animationFrameId = requestAnimationFrame(animate);
    }

    drawStaticGrid();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
