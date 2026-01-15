"use client";

import React, { useId } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Component: DotPattern ---
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  glow?: boolean;
  className?: string;
}

function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1.2,
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
        // Increased opacity for better visibility
        "fill-neutral-600/50 dark:fill-neutral-300/60",
        className,
      )}
      {...props}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(10px, 10px); }
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
            <feGaussianBlur stdDeviation="1.5" result="blur" />
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

// --- Main Export: AnimatedBackground ---
export default function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-transparent", className)}>
      {/* Primary Dot Layer */}
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
        )}
      />
      
      {/* Decorative Gradient for added depth */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%)]" 
        aria-hidden="true"
      />
    </div>
  );
}
