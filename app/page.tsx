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
        {/* Removed all vertical padding (pt-0 pb-0) */}
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
            "
          >
            {/* Hero - Flush Top */}
            <section id="hero" className="pt-0 scroll-mt-20">
              <HeroSection />
            </section>

            {/* Internal Sections with tight spacing */}
            <section id="journey" className="mt-4 scroll-mt-20">
              <JourneyTimeline />
            </section>

            <section id="projects" className="mt-4 scroll-mt-20">
              <ProjectsSection />
            </section>

            <section id="socials" className="mt-4 scroll-mt-20">
              <SocialLinks />
            </section>

            {/* Footer - Reduced bottom padding to keep it tight */}
            <footer className="text-center text-sm text-muted-foreground pb-4 pt-8 border-t border-border/5">
              <p className="mb-[2px]">Built with Next.js 14, Tailwind & Framer Motion</p>
              <p>© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </main>

        {/* Removed pb-6 to bring BottomNav closer to the content card */}
        <div className="pb-0">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
