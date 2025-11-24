import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      {/* Animated background covers viewport, never interferes with interactions */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* You can set theme="dark" or theme="light" */}
        <AnimatedBackground theme="dark" />
      </div>

      {/* Main app content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 xl:max-w-6xl">
        <section id="hero" className="py-0 pt-4">
          <HeroSection />
        </section>

        <section id="journey" className="py-10 border-t border-border/40">
          <JourneyTimeline />
        </section>

        <section id="projects" className="py-0 border-t border-border/40">
          <ProjectsSection />
        </section>

        <section id="socials" className="py-0 border-t border-border/40">
          <SocialLinks />
        </section>

        <section id="notes" className="py-0 border-t border-border/40">
          {/* Add your NotesSection here if needed */}
        </section>

        <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border/50">
          <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
          <p className="mt-1">© 2025 — Always learning, always building</p>
        </footer>
      </div>

      <BottomNav />
    </>
  );
}
