'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set the view-transition-name to match your CSS logic
    const htmlStyle = document.documentElement.style as any;
    if (htmlStyle.viewTransitionName !== undefined) {
      htmlStyle.viewTransitionName = 'page-content';
    }

    return () => {
      if (htmlStyle.viewTransitionName !== undefined) {
        htmlStyle.viewTransitionName = '';
      }
    };
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // 1. Fallback for browsers that don't support View Transitions
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 2. Start the transition
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    // 3. Define the slow fading blur animation
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
          // The "Slow Fading Blur" Logic:
          filter: ['blur(20px)', 'blur(0px)'],
          opacity: [0.4, 1],
        },
        {
          duration: 750, // Increased duration for a "slower" feel
          easing: 'ease-in-out',
          // Targets the new theme state being revealed
          pseudoElement: '::view-transition-new(page-content)',
        }
      );
    });
  };

  if (!mounted) {
    return (
      <button className="relative w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative z-50 w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 flex items-center justify-center group overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="w-5 h-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 absolute" />
    </button>
  );
}
