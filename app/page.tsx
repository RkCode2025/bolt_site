import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      {/* Flickering grid — fixed, full-screen, always running */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Centered Content Card */}
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
          <div
            id="content-card"
            className="
              w-full 
              max-w-4xl
              mx-auto
              border border-border/40
              pt-8                   /* <<< added top padding */
              pb-6 px-6 sm:px-8 lg:px-10
              backdrop-blur-xl bg-background/60
              shadow-xl ring-1 ring-white/10
              transition-all duration-500
            "
          >
            {/* Hero */}
            <section id="hero" className="">
              <HeroSection />
            </section>

            {/* Journey */}
            <section id="journey" className="border-t border-border/40 pt-10">
              <JourneyTimeline />
            </section>

            {/* Projects */}
            <section id="projects" className="border-t border-border/40 pt-10">
              <ProjectsSection />
            </section>

            {/* Socials */}
            <section id="socials" className="border-t border-border/40 pt-10">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="border-t border-border/40 pt-10 mt-8 text-center text-sm text-muted-foreground">
              <p className="mb-1">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="pb-6">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
