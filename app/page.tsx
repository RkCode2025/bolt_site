'use client';
import { useState, useEffect } from 'react';
import { AnimatedBackground } from "@/components/animated-background"; 
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
    <>
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-60 dark:opacity-40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main container: Removed vertical padding (py-0) to touch top and bottom */}
        <main className="flex-1 flex justify-center px-4 sm:px-8 py-0"> 
          <div
            id="content-card"
            className="
              relative
              w-full
              max-w-4xl
              mx-auto
              backdrop-blur-xl bg-background/70
              /* Removed top/bottom rounding to sit flush with screen edges */
              rounded-l-3xl rounded-r-3xl rounded-t-none rounded-b-none 
              border-x-2 border-dashed border-muted-foreground/20
              shadow-none
              flex flex-col
              min-h-screen
            "
          >
            {/* ── HEADER: Deep padding & Black/Large text ── */}
            <BlurFade delay={0.1}>
              <div className="
                flex items-center justify-between
                px-8 sm:px-12
                py-12 {/* Very long header */}
                bg-muted/50 dark:bg-muted/30
                border-b-2 border-muted-foreground/20
                text-sm sm:text-base uppercase tracking-[0.3em] text-foreground font-black
              ">
                <div className="flex items-center gap-4">
                  <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span>J&K, INDIA • <LiveClock /></span>
                </div>
                <div className="hidden md:block opacity-40">
                  PORTFOLIO / 2026
                </div>
              </div>
            </BlurFade>

            {/* ── CONTENT: Main Body ── */}
            <div className="px-6 sm:px-10 lg:px-12 flex-1">
              <section id="hero" className="pt-12 scroll-mt-20">
                <HeroSection />
              </section>
              <section id="journey" className="mt-20 scroll-mt-20">
                <JourneyTimeline />
              </section>
              <section id="projects" className="mt-20 scroll-mt-20">
                <ProjectsSection />
              </section>
              <section id="socials" className="mt-20 mb-20 scroll-mt-20">
                <SocialLinks />
              </section>
            </div>

            {/* ── FOOTER: Deep padding & Extra Bold ── */}
            <footer className="
              px-8 sm:px-12
              py-20 {/* Extra long footer */}
              text-center
              bg-muted/50 dark:bg-muted/30
              border-t-2 border-muted-foreground/20
            ">
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl font-black text-foreground tracking-tighter italic">
                  BUILT WITH NEXT.JS 14 & FRAMER MOTION
                </p>
                <div className="h-px w-12 bg-muted-foreground/30 mx-auto" />
                <p className="text-xs sm:text-sm font-bold text-muted-foreground tracking-[0.5em] uppercase">
                  © 2026 — ALWAYS BUILDING
                </p>
              </div>
            </footer>
          </div>
        </main>

        {/* Floating Navigation */}
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}
