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

    // 1. View Transition Logic initialization
    const htmlStyle = document.documentElement.style as any;
    if (htmlStyle.viewTransitionName !== undefined) {
      htmlStyle.viewTransitionName = 'page-content';
    }

    // 2. Scroll Logic to detect footer proximity
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + window.scrollY;
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

    // @ts-ignore - Check for browser support
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

    // @ts-ignore - Start the transition
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

  // Shared icon styling for responsiveness
  const iconClasses = "w-5 h-5 text-black dark:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1.5 active:scale-90 cursor-pointer";

  return (
    <div 
      className={`
        fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out
        ${isAtBottom 
          ? 'bottom-10 scale-90 opacity-40 blur-[1px] pointer-events-none' 
          : 'bottom-6 scale-100 opacity-100' 
        }
      `}
    >
      <nav
        className="
          group flex items-center justify-center gap-3 md:gap-6
          backdrop-blur-xl bg-white/30 dark:bg-neutral-900/40 shadow-2xl rounded-full
          px-6 py-3 border border-white/20 dark:border-neutral-700/40
          transition-all duration-300 hover:bg-white/50 dark:hover:bg-neutral-800/60
          hover:px-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
        "
      >
        <NavItem 
          icon={<Home className={iconClasses} />} 
          label="Home" 
          onClick={() => scrollToSection('hero')} 
        />
        <NavItem 
          icon={<BookOpen className={iconClasses} />} 
          label="Journey" 
          onClick={() => scrollToSection('journey')} 
        />
        <NavItem 
          icon={<FolderKanban className={iconClasses} />} 
          label="Projects" 
          onClick={() => scrollToSection('projects')} 
        />
        <NavItem 
          icon={<Users className={iconClasses} />} 
          label="Socials" 
          onClick={() => scrollToSection('socials')} 
        />

        <div className="w-px h-5 bg-neutral-400/40 dark:bg-neutral-600/50 mx-1" />

        <div className="relative flex flex-col items-center group/item">
           {theme === 'light' ? (
            <Moon onClick={handleThemeToggle} className={iconClasses} />
          ) : (
            <Sun onClick={handleThemeToggle} className={iconClasses} />
          )}
          <span className="absolute -top-12 scale-0 transition-all duration-200 rounded-lg bg-neutral-900 dark:bg-white px-2 py-1 text-[10px] text-white dark:text-black group-hover/item:scale-100">
            Theme
          </span>
        </div>
      </nav>
    </div>
  );
}

// Helper component for tooltips and hover logic
function NavItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div className="relative flex flex-col items-center group/item" onClick={onClick}>
      {icon}
      <span className="absolute -top-12 scale-0 transition-all duration-200 rounded-lg bg-neutral-900 dark:bg-white px-2 py-1 text-[10px] font-medium text-white dark:text-black group-hover/item:scale-100 shadow-xl">
        {label}
      </span>
    </div>
  );
}
