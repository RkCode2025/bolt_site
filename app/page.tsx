import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground className="opacity-50 dark:opacity-30" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Added py-20 to main to give space at the very top and bottom of the scroll */}
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8 py-20">
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
              space-y-24          /* This adds consistent air between every section */
            "
          >
            {/* Hero */}
            <section id="hero" className="pt-10">
              <HeroSection />
            </section>

            {/* Journey */}
            <section id="journey">
              <JourneyTimeline />
            </section>

            {/* Projects */}
            <section id="projects">
              <ProjectsSection />
            </section>

            {/* Socials */}
            <section id="socials">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground pb-12 pt-8 border-t border-border/10">
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
