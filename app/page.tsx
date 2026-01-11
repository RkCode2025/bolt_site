'use client';

import { useState, useEffect } from 'react';
import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';
import BlurFade from '@/components/blurfade';

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
  // Shared styling for both boxes to ensure consistency
  const boxStyles = `
    w-full 
    max-w-4xl 
    mx-auto 
    px-6 sm:px-10 
    backdrop-blur-xl 
    bg-background/60 
    shadow-2xl 
    border border-white/10 
    rounded-[2.5rem] 
    transition-all 
    duration-500
  `;

  return (
    <>
      {/* Background stays fixed behind everything */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col pt-6 pb-24">
        <main className="flex-1 flex flex-col items-center justify-start px-4">
          
          {/* BOX 1: Hero and Experience/Journey */}
          <div id="hero-card" className={boxStyles}>
            <BlurFade delay={0.1} className="pt-8 -mb-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Jammu & Kashmir, India • <LiveClock />
              </div>
            </BlurFade>

            <section id="hero" className="pt-2 scroll-mt-20">
              <HeroSection />
            </section>

            <section id="journey" className="mt-4 pb-12 scroll-mt-20">
              <JourneyTimeline />
            </section>
          </div>

          {/* BOX 2: Projects, Socials, and Footer */}
          <div id="projects-card" className={`${boxStyles} mt-3`}>
            <section id="projects" className="pt-10 scroll-mt-20">
              <ProjectsSection />
            </section>

            <section id="socials" className="mt-8 scroll-mt-20">
              <SocialLinks />
            </section>

            <footer className="text-center text-xs text-muted-foreground pb-8 pt-12 border-t border-white/5">
              <p className="mb-1">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>

        </main>

        {/* Navigation remains fixed or at the bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
