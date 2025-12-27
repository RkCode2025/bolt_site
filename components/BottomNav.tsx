'use client';

import { useTheme } from 'next-themes';
import {
  Home,
  BookOpen,
  FolderKanban,
  Users,
  Sun,
  Moon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. View Transition Logic
    const htmlStyle = document.documentElement.style as any;
    if (htmlStyle.viewTransitionName !== undefined) {
      htmlStyle.viewTransitionName = 'page-content';
    }

    // 2. Scroll Logic to detect footer proximity
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + window.scrollY;
      
      // Threshold: Adjust '120' to match the height of your footer
      const threshold = 120; 
      setIsAtBottom(scrollHeight - scrollPos < threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (htmlStyle.viewTransitionName !== undefined) {
        htmlStyle.viewTransitionName = '';
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleThemeToggle = (e: React.MouseEvent<SVGSVGElement>) => {
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
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath: clipPath },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(page-content)',
        }
      );
    });
  };

  if (!mounted) return null;

  return (
    <div 
      className={`
        fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out
        ${isAtBottom 
          ? 'bottom-12 scale-90 opacity-60 blur-[0.5px]' // The "Folded" state
          : 'bottom-6 scale-100 opacity-100'            // The Floating state
        }
      `}
    >
      <div
        className="
          flex items-center justify-center gap-6
          backdrop-blur-lg bg-white/30 dark:bg-neutral-900/30 shadow-xl rounded-full
          px-6 py-3 border border-white/20 dark:border-neutral-700/40
          transition-all duration-300 hover:bg-white/40 dark:hover:bg-neutral-900/40
        "
      >
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

        {theme === 'light' ? (
          <Moon
            onClick={(e: any) => handleThemeToggle(e)}
            className="w-5 h-5 text-black hover:scale-110 transition-transform cursor-pointer"
          />
        ) : (
          <Sun
            onClick={(e: any) => handleThemeToggle(e)}
            className="w-5 h-5 text-white hover:scale-110 transition-transform cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
