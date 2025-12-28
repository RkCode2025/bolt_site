'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

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
    const transition = document.startViewTransition(async () => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      // 1. The Circular Reveal (Incoming Theme)
      // This sits on top and expands
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      // 2. The Blur Fade (Outgoing Theme)
      // This happens "behind" the circle, creating the residue effect
      document.documentElement.animate(
        {
          filter: ['blur(0px)', 'blur(40px)'],
          opacity: [1, 0],
          transform: ['scale(1)', 'scale(1.05)'], // Subtle zoom adds to the "dissolve" feel
        },
        {
          duration: 1000, // Longer duration so the blur "lingers"
          easing: 'ease-out',
          pseudoElement: '::view-transition-old(root)',
        }
      );
    });
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-all flex items-center justify-center z-[9999]"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="w-5 h-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 absolute" />
    </button>
  );
}
