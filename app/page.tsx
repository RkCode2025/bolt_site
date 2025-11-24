import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      {/* Animated grid background — only on sides */}
      <AnimatedBackground
        sidesOnly
        className="opacity-40 dark:opacity-25"
        // We'll pass a ref-based safe zone via a tiny prop trick below
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="flex-1 flex justify-center px-6 sm:px-8 lg:px-12">
          {/* This is the visible content card */}
          <div 
            id="content-card"
            className="w-full max-w-5xl xl:max-w-6xl mx-auto 
                       border border-border/40 rounded-2xl 
                       p-6 sm:p-8 
                       backdrop-blur-xl bg-background/40 shadow-lg"
          >
            <section id="hero" className="pt-4">
              <HeroSection />
            </section>

            <section id="journey" className="py-10 border-t border-border/40">
              <JourneyTimeline />
            </section>

            <section id="projects" className="py-10 border-t border-border/40">
              <ProjectsSection />
            </section>

            <section id="socials" className="py-10 border-t border-border/40">
              <SocialLinks />
            </section>

            <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
              <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
              <p className="mt-1">© 2025 — Always learning, always building</p>
            </footer>
          </div>
        </div>

        <BottomNav />
      </div>
    </>
  );
}
