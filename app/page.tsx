'use client';

import { useState, useEffect } from 'react';
import { AnimatedBackground } from "@/components/animated-background"; 
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BlurFade from '@/components/blurfade';
// Added ThemeToggle import - adjust path if your component is named differently (e.g. mode-toggle)
import { ThemeToggle } from '@/components/theme-toggle'; 

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
      {/* Background stays global and outside */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-60 dark:opacity-40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* main wrapper with no top/bottom padding to keep card flush */}
        <main className="flex-1 flex justify-center px-4 sm:px-8">
          <div
            id="content-card"
            className="
              relative
              w-full
              max-w-4xl
              mx-auto
              px-6 sm:px-10 lg:px-12
              /* Glassmorphism background */
              backdrop-blur-xl bg-background/70
              /* Rounded corners added */
              rounded-3xl
              /* Dashed borders */
              border-2 border-dashed border-muted-foreground/20
              /* Remove all shadows cast onto the background */
              shadow-none ring-0
              transition-all duration-500
              flex flex-col
              /* Ensure children don't bleed out of rounded corners */
              overflow-hidden
            "
          >
            {/* Header: Location/Clock (Left) & Theme Toggle (Right) */}
            <BlurFade delay={0.1} className="pt-6 -mb-2">
              <div className="flex items-center justify-between w-full">
                {/* Left Side: Location & Clock */}
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Jammu & Kashmir, India • <LiveClock />
                </div>

                {/* Right Side: Theme Toggle Button */}
                <div>
                  <ThemeToggle />
                </div>
              </div>
            </BlurFade>

            {/* Content Sections */}
            <section id="hero" className="pt-2 scroll-mt-20">
              <HeroSection />
            </section>

            <section id="journey" className="mt-8 scroll-mt-20">
              <JourneyTimeline />
            </section>

            <section id="projects" className="mt-8 scroll-mt-20">
              <ProjectsSection />
            </section>

            <section id="socials" className="mt-8 scroll-mt-20">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground pb-12 pt-12 border-t border-dashed border-muted-foreground/10 mt-12">
              <p className="mb-1">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2026 — Always learning, always building</p>
            </footer>
          </div>
        </main>
        
        {/* Removed Floating Bottom Navigation */}
      </div>
    </>
  );
}
