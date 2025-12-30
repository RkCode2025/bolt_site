'use client'; // Ensure this is at the top if using Next.js App Router

import { useState, useEffect } from 'react';
import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

// Helper component for the live IST clock
const LiveClock = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(now.toLocaleTimeString('en-IN', options));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Return null on first render to avoid hydration mismatch
  if (!time) return null;

  return <span>{time} IST</span>;
};

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 flex items-start justify-center px-5 sm:px-8 py-0">
          <div
            id="content-card"
            className="
              w-full
              max-w-4xl
              mx-auto
              px-5 sm:px-8 lg:px-10
              backdrop-blur-xl bg-background/60
              shadow-xl ring-0
              transition-all duration-500
              flex flex-col
              relative
            "
          >
            {/* Location & Time Tag */}
            <div className="pt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/80 font-medium">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Jammu & Kashmir, India • <LiveClock />
            </div>

            {/* Hero - Flush Top */}
            <section id="hero" className="pt-2 scroll-mt-20">
              <HeroSection />
            </section>

            {/* Internal Sections */}
            <section id="journey" className="mt-4 scroll-mt-20">
              <JourneyTimeline />
            </section>

            <section id="projects" className="mt-4 scroll-mt-20">
              <ProjectsSection />
            </section>

            <section id="socials" className="mt-4 scroll-mt-20">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground pb-4 pt-8 border-t border-border/5">
              <p className="mb-[2px]">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </main>

        <div className="pb-0">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
