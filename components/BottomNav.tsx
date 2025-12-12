'use client';

import { useTheme } from 'next-themes';
import {
  Home,
  BookOpen, // journey
  FolderKanban, // projects
  Users, // social
  Sun,
  Moon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Ensure the HTML tag has the view-transition-name property for the CSS to target
    document.documentElement.style.viewTransitionName = 'page-content';
    
    return () => {
        document.documentElement.style.viewTransitionName = '';
    }
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * New function to handle theme toggle with circular reveal animation.
   */
  const handleThemeToggle = (e: React.MouseEvent<SVGSVGElement>) => {
    const isDark = theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // @ts-ignore: specific browser API check
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // 1. Get the position of the click event
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 2. Start the transition
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(newTheme); // Update the theme inside the transition scope
    });

    // 3. Define the animation
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          // Target the new content pseudo-element with the specific name
          pseudoElement: '::view-transition-new(page-content)',
        }
      );
    });
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          flex items-center justify-center gap-6
          backdrop-blur-lg bg-white/30 dark:bg-neutral-900/30 shadow-xl rounded-full
          px-6 py-3 border border-white/20 dark:border-neutral-700/40
          transition-all duration-300 hover:bg-white/40 dark:hover:bg-neutral-900/40
        "
      >
        {/* Navigation links (No change here) */}
        <Home
          onClick={() => scrollToSection('hero')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />
        <BookOpen
          onClick={() => scrollToSection('journey')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />
        <FolderKanban
          onClick={() => scrollToSection('projects')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />
        <Users
          onClick={() => scrollToSection('socials')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />

        <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700" />

        {/* Theme toggle - Now uses the handleThemeToggle function */}
        {theme === 'light' ? (
          <Moon
            onClick={handleThemeToggle} // Use the new handler
            className="w-5 h-5 text-black hover:scale-110 transition-transform cursor-pointer"
          />
        ) : (
          <Sun
            onClick={handleThemeToggle} // Use the new handler
            className="w-5 h-5 text-white hover:scale-110 transition-transform cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
