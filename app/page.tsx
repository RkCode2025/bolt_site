import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      {/* Background ONLY around edges of the box */}
      <AnimatedBackground
        sidesOnly
        className="opacity-40 dark:opacity-25"
      />

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 flex justify-center">
        
        {/* MAIN CONTENT BOX */}
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 xl:max-w-6xl">
          <div className="border border-border/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-background/40 shadow-lg">

            {/* HERO */}
            <section id="hero" className="py-0 pt-4">
              <HeroSection />
            </section>

            {/* TIMELINE */}
            <section id="journey" className="py-10 border-t border-border/40">
              <JourneyTimeline />
            </section>

            {/* PROJECTS */}
            <section id="projects" className="py-0 border-t border-border/40">
              <ProjectsSection />
            </section>

            {/* SOCIALS */}
            <section id="socials" className="py-0 border-t border-border/40">
              <SocialLinks />
            </section>

            {/* FOOTER */}
            <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border/50">
              <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
              <p className="mt-1">© 2025 — Always learning, always building</p>
            </footer>

          </div>
        </div>

      </div>

      <BottomNav />
    </>
  );
}
