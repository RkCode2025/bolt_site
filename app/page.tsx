'use client';

import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // We hide the pill slightly before the absolute bottom (e.g., 50px)
      // so it feels smooth as the footer comes into view.
      const reachedBottom = scrollTop + windowHeight >= documentHeight - 60;
      setIsAtBottom(reachedBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      {/* FLOATING PILL CONTAINER */}
      <div 
        className={`
          fixed bottom-8 left-1/2 -translate-x-1/2 z-50
          transition-all duration-500 ease-in-out
          ${isAtBottom ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
        `}
      >
        <div className="bg-background/40 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-2xl rounded-full px-2 py-2">
           <BottomNav />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
          <div
            id="content-card"
            className="w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-0 backdrop-blur-xl bg-background/60 shadow-xl ring-0 transition-all duration-500"
          >
            <section id="hero" className="py-0">
              <HeroSection />
            </section>

            <section id="journey" className="py-0">
              <JourneyTimeline />
            </section>

            <section id="projects" className="py-0">
              <ProjectsSection />
            </section>

            <section id="socials" className="py-0">
              <SocialLinks />
            </section>

            {/* Footer: When this becomes visible, the pill disappears */}
            <footer className="text-center text-sm text-muted-foreground py-12 border-t border-white/5">
              <p className="mb-[2px]">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
