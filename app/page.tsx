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
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
          <div
            id="content-card"
            className="
              w-full
              max-w-4xl
              mx-auto
              px-5 sm:px-8 lg:px-10      /* SIDE SPACING KEPT */
              py-0
              backdrop-blur-xl bg-background/60
              shadow-xl ring-0          /* REMOVE CARD BORDER/RING */
              transition-all duration-500
            "
          >
            {/* Hero */}
            <section id="hero" className="py-0">
              <HeroSection />
            </section>

            {/* Journey */}
            <section id="journey" className="py-0">
              <JourneyTimeline />
            </section>

            {/* Projects */}
            <section id="projects" className="py-0">
              <ProjectsSection />
            </section>

            {/* Socials */}
            <section id="socials" className="py-0">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground py-4">
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
