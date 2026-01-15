"use client";

import React, { useId } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility: Tailwind Class Merger ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Interfaces ---
interface AnimatedBackgroundProps {
  className?: string;
}

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  glow?: boolean;
}

// --- Internal Component: DotPattern ---
function DotPattern({
  width = 12,      // High density grid
  height = 12,     // High density grid
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 0.8,        // Small, subtle dots
  glow = true,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const filterId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        // Visibility: dark gray in light mode, off-white in dark mode
        "fill-neutral-900/40 dark:fill-neutral-100/50",
        className,
      )}
      {...props}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(6px, 4px); }
            100% { transform: translate(0, 0); }
          }
          .animate-dot-float {
            animation: float 20s ease-in-out infinite;
          }
        `}
      </style>
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
        
        {glow && (
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="2.5" /> 
            </feComponentTransfer>
            <feComposite in="SourceGraphic" operator="over" />
          </filter>
        )}
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        strokeWidth={0} 
        fill={`url(#${id})`} 
        className="animate-dot-float"
        style={glow ? { filter: `url(#${filterId})` } : {}}
      />
    </svg>
  );
}

/**
 * --- Main Export: AnimatedBackground ---
 * This component is imported in your page.tsx as:
 * import AnimatedBackground from "@/components/animated-background"
 */
export default function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-transparent", className)}>
      {/* Dense Dot Layer */}
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
        )}
      />
      
      {/* Decorative center glow for depth */}
      <div 
        className="absolute inset-0 pointer-events-none 
                   bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_60%)] 
                   dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_60%)]" 
        aria-hidden="true"
      />
    </div>
  );
}
