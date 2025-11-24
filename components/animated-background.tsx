"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface AnimatedBackgroundProps {
  theme?: "light" | "dark";
}

export function AnimatedBackground({
  theme = "dark",
}: AnimatedBackgroundProps) {
  const color = theme === "light" ? "rgb(180, 180, 255)" : "rgb(120, 120, 255)";

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <FlickeringGridSidesOnly
        squareSize={4}
        gridGap={6}
        flickerChance={0.3}
        maxOpacity={0.3}
        color={color}
        className="opacity-30 dark:opacity-25 w-full h-full"
      />
    </div>
  );
}

/* ——————————————————————— Optimized Sides-Only Version ——————————————————————— */

interface FlickeringGridSidesOnlyProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  className?: string;
  maxOpacity?: number;
}

export const FlickeringGridSidesOnly: React.FC<FlickeringGridSidesOnlyProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(120,120,255)",
  className,
  maxOpacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentBox, setContentBox] = useState<DOMRect | null>(null);

  const memoizedColor = useMemo(() => {
    if (typeof window === "undefined") return "rgba(120,120,255,";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r},${g},${b},`;
  }, [color]);

  // Watch the real content card (#content-card) bounds
  useEffect(() => {
    const card = document.getElementById("content-card");
    if (!card) return;

    const update = () => setContentBox(card.getBoundingClientRect());
    update();

    const ro = new ResizeObserver(update);
    ro.observe(card);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update); // in case it moves

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !contentBox) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    const totalCell = squareSize + gridGap;
    const cols = Math.ceil(width / totalCell);
    const rows = Math.ceil(height / totalCell);

    // Only draw on left and right sides
    const leftEdge = 0;
    const rightEdge = contentBox.right;
    const safeLeft = contentBox.left;
    const safeRight = width;

    for (let col = 0; col < cols; col++) {
      const x = col * totalCell;

      // Skip if inside the center content area
      if (x + squareSize >= safeLeft && x <= rightEdge) continue;

      for (let row = 0; row < rows; row++) {
        const y = row * totalCell;

        // Optional: also skip top/bottom margins if you want
        if (y < contentBox.top - 100 || y > contentBox.bottom + 100) continue;

        const opacity = Math.random() * maxOpacity;
        if (Math.random() < flickerChance) {
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
    }
  }, [contentBox, memoizedColor, squareSize, gridGap, flickerChance, maxOpacity]);

  //  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.style.width = container.clientWidth + "px";
      canvas.style.height = container.clientHeight + "px";
      draw();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Animate flicker
    let frame = 0;
    const animate = () => {
      draw();
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
};
