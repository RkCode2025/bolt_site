'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  Home,
  FolderKanban,
  Notebook,
  Github,
  Sun,
  Moon,
  Twitter,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const NavItem = ({ icon: Icon, label, onClick }: any) => (
  <motion.div
    onClick={onClick}
    className="relative group cursor-pointer flex items-center justify-center w-10 h-10 rounded-full"
    whileHover={{
      width: 60,
      backgroundColor: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(10px)',
    }}
    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
  >
    {/* Icon */}
    <motion.div whileHover={{ scale: 1.3 }}>
      <Icon className="w-5 h-5 text-black dark:text-white" />
    </motion.div>

    {/* Tooltip */}
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileHover={{ opacity: 1, y: -4 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 
      text-xs bg-black/80 dark:bg-white/80 text-white dark:text-black 
      px-2 py-1 rounded-md pointer-events-none whitespace-nowrap
      backdrop-blur-md border border-white/10 dark:border-black/10
      opacity-0 group-hover:opacity-100"
    >
      {label}
    </motion.div>
  </motion.div>
);

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-4
        backdrop-blur-xl bg-white/20 dark:bg-neutral-900/20
        border border-white/30 dark:border-neutral-700/40
        rounded-full px-5 py-2"
      >
        <NavItem icon={Home} label="Home" onClick={() => scrollToSection('hero')} />
        <NavItem icon={FolderKanban} label="Projects" onClick={() => scrollToSection('projects')} />

        <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700" />

        <NavItem icon={Notebook} label="Notes" onClick={() => scrollToSection('notes')} />
        <NavItem icon={Github} label="GitHub" onClick={() => scrollToSection('socials')} />
        <NavItem icon={Twitter} label="Twitter" onClick={() => scrollToSection('socials')} />

        <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700" />

        {theme === 'light' ? (
          <NavItem icon={Moon} label="Dark Mode" onClick={() => setTheme('dark')} />
        ) : (
          <NavItem icon={Sun} label="Light Mode" onClick={() => setTheme('light')} />
        )}
      </motion.div>
    </div>
  );
}
