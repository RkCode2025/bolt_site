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
      // Calculate how far the user has scrolled
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Check if we are within 20px of the bottom
      const reachedBottom = scrollTop + windowHeight >= documentHeight - 20;
      setIsAtBottom(reachedBottom);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page is short
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      {/* BOTTOM BLUR OVERLAY
          This hides (opacity-0) when isAtBottom is true 
      */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-40
          backdrop-blur-md bg-gradient-to-t from-background/80 to-transparent
          transition-opacity duration-500 ease-in-out
          [mask-image:linear-gradient(to_top,black,transparent)]
          ${isAtBottom ? 'opacity-0' : 'opacity-100'}
        `}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
          <div
            id="content-card"
            className="
              w-full
              max-w-4xl
              mx-auto
              px-5 sm:px-8 lg:px-10
              py-0
              backdrop-blur-xl bg-background/60
              shadow-xl ring-0
              transition-all duration-500
            "
          >
            {/* Hero */}
            <section id="hero" className="py-0">
              <HeroSection />
            </section>

            {/* Journey */}
            <section id="journey" className="py-0">
              <JourneyTimeline />
            </section>

            {/* Projects */}
            <section id="projects" className="py-0">
              <ProjectsSection />
            </section>

            {/* Socials */}
            <section id="socials" className="py-0">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground py-4">
              <p className="mb-[2px]">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </main>

        {/* Ensure BottomNav is above the blur but moves with the page */}
        <div className="pb-0 relative z-50">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
