'use client';

import { useState, useEffect } from 'react';
import AnimatedBackground from "@/components/animated-background"
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
  return (
    <div className="relative min-h-screen flex flex-col bg-background selection:bg-primary/10">
      <main className="flex-1 flex items-start justify-center px-4 sm:px-8 py-12">
        <div
          id="content-card"
          className="
            relative
            w-full
            max-w-4xl
            mx-auto
            px-6 sm:px-10 lg:px-12
            /* Container styling */
            bg-background/40
            backdrop-blur-md
            /* The Dashed Border */
            border-2 border-dashed border-muted-foreground/20
            rounded-3xl
            transition-all duration-500
            flex flex-col
            overflow-hidden
          "
        >
          {/* Background is now INSIDE the dashed box */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <AnimatedBackground className="opacity-40 dark:opacity-20" />
          </div>

          <BlurFade delay={0.1} className="pt-8 -mb-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Jammu & Kashmir, India • <LiveClock />
            </div>
          </BlurFade>

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

          <footer className="text-center text-sm text-muted-foreground pb-8 pt-12 border-t border-dashed border-muted-foreground/10 mt-8">
            <p className="mb-1">Built with Next.js 14, Tailwind & Framer Motion</p>
            <p>© 2026 — Always learning, always building</p>
          </footer>
        </div>
      </main>

      <div className="sticky bottom-6 z-50">
        <BottomNav />
      </div>
    </div>
  );
}
