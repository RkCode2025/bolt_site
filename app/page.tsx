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
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-60 dark:opacity-40" />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1 flex justify-center px-4 sm:px-8 py-3"> {/* Added vertical padding to main container */}
          <div
            id="content-card"
            className="
              relative
              w-full
              max-w-4xl
              mx-auto
              backdrop-blur-xl bg-background/70
              rounded-3xl
              border-2 border-dashed border-muted-foreground/20
              shadow-none ring-0
              transition-all duration-500
              flex flex-col
              overflow-hidden
            "
          >
            {/* ── Header Tab Bar (Increased Height) ── */}
            <BlurFade delay={0.1}>
              <div className="
                flex items-center gap-2
                px-6 sm:px-10 lg:px-12
                py-6 {/* Increased from py-3 */}
                bg-muted/40 dark:bg-muted/20
                border-b-2 border-muted-foreground/20
                shadow-[inset_0_-1px_0_0_hsl(var(--muted-foreground)/0.06),0_1px_3px_0_hsl(var(--background)/0.4)]
                text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium
              ">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Jammu & Kashmir, India • <LiveClock />
              </div>
            </BlurFade>

            {/* ── Content Sections ── */}
            <div className="px-6 sm:px-10 lg:px-12 flex-1">
              <section id="hero" className="pt-3 scroll-mt-20">
                <HeroSection />
              </section>
              <section id="journey" className="mt-12 scroll-mt-20">
                <JourneyTimeline />
              </section>
              <section id="projects" className="mt-12 scroll-mt-20">
                <ProjectsSection />
              </section>
              <section id="socials" className="mt-12 mb-12 scroll-mt-20">
                <SocialLinks />
              </section>
            </div>

            {/* ── Footer Tab Bar (Increased Height) ── */}
            <footer className="
              px-6 sm:px-10 lg:px-12
              py-10 {/* Increased from py-4 */}
              text-center text-sm text-muted-foreground
              bg-muted/40 dark:bg-muted/20
              border-t-2 border-muted-foreground/20
              shadow-[inset_0_1px_0_0_hsl(var(--muted-foreground)/0.06),0_-1px_3px_0_hsl(var(--background)/0.4)]
            ">
              <p className="mb-2 font-medium">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p className="opacity-70">© 2026 — Always learning, always building</p>
            </footer>
          </div>
        </main>

        {/* Floating Bottom Navigation */}
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}
