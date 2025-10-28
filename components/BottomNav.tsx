'use client';

import { useTheme } from 'next-themes';
import { Home, FolderKanban, Notebook, Github, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center justify-center gap-6 
        backdrop-blur-md bg-white/30 dark:bg-neutral-900/30
        shadow-xl rounded-full px-6 py-3 border border-white/20 dark:border-neutral-700/40
        transition-all duration-300 hover:bg-white/40 dark:hover:bg-neutral-900/40"
      >
        {/* Home */}
        <Home
          onClick={() => scrollToSection('hero')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />

        {/* Projects */}
        <FolderKanban
          onClick={() => scrollToSection('projects')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />

        <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700" />

        {/* Notes */}
        <Notebook
          onClick={() => scrollToSection('notes')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />

        {/* GitHub */}
        <Github
          onClick={() => scrollToSection('socials')}
          className="w-5 h-5 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer"
        />

        <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700" />

        {/* Theme toggle */}
        {theme === 'light' ? (
          <Moon
            onClick={() => setTheme('dark')}
            className="w-5 h-5 text-black hover:scale-110 transition-transform cursor-pointer"
          />
        ) : (
          <Sun
            onClick={() => setTheme('light')}
            className="w-5 h-5 text-white hover:scale-110 transition-transform cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
