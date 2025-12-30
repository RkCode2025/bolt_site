'use client';

import { useState, useEffect } from 'react';
import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';
import BlurFade from '@/components/magicui/blur-fade';
import { ProgressiveBlur } from '@/registry/magicui/progressive-blur'; // Added import

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

  if (!time) return null;
  return <span>{time} IST</span>;
};

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      {/* Main Wrapper - Ensure relative for the Blur positioning */}
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
            {/* Clock & Location */}
            <BlurFade delay={0.1} className="pt-5 -mb-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Jammu & Kashmir, India • <LiveClock />
              </div>
            </BlurFade>

            <section id="hero" className="pt-0 scroll-mt-20">
              <HeroSection />
            </section>

            <section id="journey" className="mt-4 scroll-mt-20">
              <JourneyTimeline />
            </section>

            <section id="projects" className="mt-4 scroll-mt-20">
              <ProjectsSection />
            </section>

            <section id="socials" className="mt-4 scroll-mt-20">
              <SocialLinks />
            </section>

            <footer className="text-center text-sm text-muted-foreground pb-20 pt-8 border-t border-border/5">
              <p className="mb-[2px]">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </main>

        {/* Progressive Blur: 
          Positioned absolute at the bottom of the main container.
          This will make the content blur out as it reaches the BottomNav area.
        */}
        <ProgressiveBlur 
          position="bottom" 
          height="120px" 
          className="pointer-events-none" 
        />

        <div className="fixed bottom-0 left-0 right-0 z-50 pb-6">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
