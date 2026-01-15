"use client";

import React, { useId } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedBackgroundProps {
  className?: string;
}

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cr?: number;
  glow?: boolean;
}

function DotPattern({
  width = 12,
  height = 12,
  cr = 0.8,
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
        "fill-neutral-900/40 dark:fill-neutral-100/50",
        className
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
        >
          <circle cx={1} cy={1} r={cr} />
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
        fill={`url(#${id})`}
        className="animate-dot-float"
        style={glow ? { filter: `url(#${filterId})` } : {}}
      />
    </svg>
  );
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-transparent", className)}>
      <DotPattern
        glow={true}
        className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
      />
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_60%)]" 
      />
    </div>
  );
}
