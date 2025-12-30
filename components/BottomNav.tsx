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

  const handleThemeToggle = (e: React.MouseEvent) => {
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
          duration: 600,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(page-content)',
        }
      );
    });
  };

  if (!mounted) return null;

  // Reduced scale and duration for a smoother feel
  const iconClasses = "w-5 h-5 text-black dark:text-white transition-all duration-500 ease-out hover:scale-110 active:scale-95 cursor-pointer opacity-70 hover:opacity-100";

  return (
    <div 
      className={`
        fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out
        ${isAtBottom 
          ? 'bottom-10 scale-95 opacity-20 blur-[2px] pointer-events-none' 
          : 'bottom-8 scale-100 opacity-100' 
        }
      `}
    >
      <nav
        className="
          flex items-center justify-center gap-8
          backdrop-blur-xl bg-white/20 dark:bg-neutral-900/30 shadow-2xl rounded-full
          px-10 py-4 border border-white/20 dark:border-neutral-700/30
          transition-all duration-500 ease-out
          hover:bg-white/30 dark:hover:bg-neutral-800/40
          hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        "
      >
        <Home
          onClick={() => scrollToSection('hero')}
          className={iconClasses}
        />
        <BookOpen
          onClick={() => scrollToSection('journey')}
          className={iconClasses}
        />
        <FolderKanban
          onClick={() => scrollToSection('projects')}
          className={iconClasses}
        />
        <Users
          onClick={() => scrollToSection('socials')}
          className={iconClasses}
        />

        <div className="w-px h-4 bg-neutral-400/20 dark:bg-neutral-600/40 mx-[-4px]" />

        {theme === 'light' ? (
          <Moon
            onClick={(e: any) => handleThemeToggle(e)}
            className={iconClasses}
          />
        ) : (
          <Sun
            onClick={(e: any) => handleThemeToggle(e)}
            className={iconClasses}
          />
        )}
      </nav>
    </div>
  );
}
