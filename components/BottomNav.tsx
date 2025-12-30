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
    const htmlStyle = document.documentElement.style as any;
    if (htmlStyle.viewTransitionName !== undefined) {
      htmlStyle.viewTransitionName = 'page-content';
    }

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
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }
    // ... rest of your view transition logic remains the same
    setTheme(newTheme); 
  };

  if (!mounted) return null;

  // Shared icon style for consistency
  const iconClasses = "w-5 h-5 text-black dark:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95 cursor-pointer";

  return (
    <div 
      className={`
        fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
        ${isAtBottom 
          ? 'bottom-8 scale-90 opacity-40 blur-[1px]' 
          : 'bottom-6 scale-100 opacity-100'
        }
      `}
    >
      <nav
        className="
          group flex items-center justify-center gap-2 md:gap-4
          backdrop-blur-xl bg-white/40 dark:bg-neutral-900/40 shadow-2xl rounded-full
          px-4 py-3 border border-white/30 dark:border-neutral-700/50
          transition-all duration-300 hover:px-8 hover:bg-white/60 dark:hover:bg-neutral-800/60
        "
      >
        <NavItem icon={<Home className={iconClasses} />} label="Home" onClick={() => scrollToSection('hero')} />
        <NavItem icon={<BookOpen className={iconClasses} />} label="Journey" onClick={() => scrollToSection('journey')} />
        <NavItem icon={<FolderKanban className={iconClasses} />} label="Projects" onClick={() => scrollToSection('projects')} />
        <NavItem icon={<Users className={iconClasses} />} label="Socials" onClick={() => scrollToSection('socials')} />

        <div className="w-px h-4 bg-neutral-400/50 dark:bg-neutral-600/50 mx-1" />

        <div className="relative flex flex-col items-center group/item">
           {theme === 'light' ? (
            <Moon onClick={handleThemeToggle} className={iconClasses} />
          ) : (
            <Sun onClick={handleThemeToggle} className={iconClasses} />
          )}
          <span className="absolute -top-10 scale-0 transition-all rounded bg-neutral-800 p-2 text-xs text-white group-hover/item:scale-100">
            Theme
          </span>
        </div>
      </nav>
    </div>
  );
}

// Sub-component for cleaner code and tooltips
function NavItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div className="relative flex flex-col items-center group/item" onClick={onClick}>
      {icon}
      {/* Tooltip */}
      <span className="absolute -top-10 scale-0 transition-all rounded bg-neutral-800 dark:bg-white px-2 py-1 text-[10px] font-medium text-white dark:text-black group-hover/item:scale-100">
        {label}
      </span>
    </div>
  );
}
