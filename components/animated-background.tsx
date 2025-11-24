'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBackgroundProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  maxOpacity?: number;
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.25,
  maxOpacity = 0.25,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [baseColor, setBaseColor] = useState("rgb(120,120,120)");

  // -----------------------------------------------------
  // Watch HTML <html data-theme="dark"> for theme changes
  // -----------------------------------------------------
  useEffect(() => {
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");

      setBaseColor(
        isDark
          ? "rgb(120, 120, 255)" // bluish for dark mode
          : "rgb(180, 180, 255)" // gray for light mode
      );
    };

    updateColor();

    // MutationObserver to track theme changes
    const mo = new MutationObserver(updateColor);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => mo.disconnect();
  }, []);

  // -----------------------------------------------------
  // Convert rgb → rgba(r,g,b,
  // -----------------------------------------------------
  const memoizedColor = useMemo(() => {
    if (typeof window === "undefined") return "rgba(0,0,0,";

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "rgba(0,0,0,";

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 1, 1);

    const data = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${data[0]},${data[1]},${data[2]},`;
  }, [baseColor]);

  // -----------------------------------------------------
  // Grid Setup
  // -----------------------------------------------------
  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { dpr, cols, rows, squares };
    },
    [squareSize, gridGap, maxOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, delta: number) => {
      const limit = flickerChance * delta;
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < limit) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const opacity = squares[col * rows + row];

          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            col * (squareSize + gridGap) * dpr,
            row * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );

  // -----------------------------------------------------
  // Animation Lifecycle
  // -----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grid: ReturnType<typeof setupCanvas>;
    let frameId: number;
    let last = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      setCanvasSize({ width: w, height: h });

      grid = setupCanvas(canvas, w, h);
    };

    resize();

    const animate = (t: number) => {
      if (!isInView) return;

      const delta = (t - last) / 1000;
      last = t;

      updateSquares(grid.squares, delta);

      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        grid.cols,
        grid.rows,
        grid.squares,
        grid.dpr
      );

      frameId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(canvas);

    if (isInView) frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
    };
  }, [isInView, setupCanvas, updateSquares, drawGrid]);

  return (
    <div ref={containerRef} className={cn("w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};
