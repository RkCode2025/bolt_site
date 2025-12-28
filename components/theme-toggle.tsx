'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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

    // Fallback for browsers that don't support View Transitions
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

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      // 1. The Circular Reveal (Incoming Theme)
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(page-content)',
        }
      );

      // 2. The Blur Fade (Outgoing Theme)
      // This leaves a "blurred residue" of the old theme that fades out
      document.documentElement.animate(
        {
          filter: ['blur(0px)', 'blur(20px)'],
          opacity: [1, 0],
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: '::view-transition-old(page-content)',
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
      className="relative w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 flex items-center justify-center group overflow-hidden z-50"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="w-5 h-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 absolute" />
    </button>
  );
}
