'use client';

import React, { useEffect, useRef } from "react";

export function AnimatedBackground({
  theme = "dark",
  sidesOnly = false,
  className = ""
}: {
  theme?: "light" | "dark";
  sidesOnly?: boolean;
  className?: string;
}) {
  return (
    <div
      className={
        sidesOnly
          ? // expands background OUTSIDE the box only
            "absolute inset-0 -inset-x-[20vw] -inset-y-[12vh] overflow-hidden pointer-events-none"
          : "absolute inset-0 overflow-hidden pointer-events-none"
      }
    >
      <FlickeringGrid
        theme={theme}
        className={className}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          ULTRA-FAST FLICKERING GRID                        */
/* -------------------------------------------------------------------------- */

function FlickeringGrid({
  theme,
  className
}: {
  theme: "light" | "dark";
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cell = 10; // spacing
  const size = 3; // square size
  const flickerSpeed = 0.07;

  const color = theme === "light"
    ? "rgba(180,180,255,"
    : "rgba(120,120,255,";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * 1.6; // extended for sidesOnly effect
      canvas.height = window.innerHeight * 1.6;
      buildStaticGrid();
    };

    let gridAlpha: number[][] = [];
    let rows = 0;
    let cols = 0;

    // Draw only once — static grid
    function buildStaticGrid() {
      rows = Math.ceil(canvas.height / cell);
      cols = Math.ceil(canvas.width / cell);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gridAlpha = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random())
      );

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          ctx.fillStyle = `${color}${gridAlpha[y][x] * 0.25})`;
          ctx.fillRect(x * cell, y * cell, size, size);
        }
      }
    }

    function animate() {
      // fade updates only
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (Math.random() < flickerSpeed) {
            const next = Math.random();
            gridAlpha[y][x] = next;
            ctx.fillStyle = `${color}${next * 0.25})`;
            ctx.fillRect(x * cell, y * cell, size, size);
          }
        }
      }

      requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className={className} />;
}
