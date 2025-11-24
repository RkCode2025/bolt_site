import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import JourneyTimeline from '@/components/JourneyTimeline';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      {/* Flickering grid — only on the left & right sides (no lag!) */}
      <AnimatedBackground className="opacity-50 dark:opacity-30" />

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Centered Content Card — Narrower & More Elegant */}
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
          <div
            id="content-card"
            className="w-full max-w-3xl mx-auto               // ← Narrower card (~800px max)
                       border border-border/50 rounded-3xl      // Slightly softer corners
                       p-8 sm:p-10 lg:p-12                      // More internal breathing room
                       backdrop-blur-2xl bg-background/60       // Stronger glass effect
                       shadow-2xl ring-1 ring-white/10         // Subtle glow ring
                       transition-all duration-500"
          >
            {/* Hero */}
            <section id="hero" className="pb-8">
              <HeroSection />
            </section>

            {/* Journey */}
            <section id="journey" className="py-12 border-t border-border/40">
              <JourneyTimeline />
            </section>

            {/* Projects */}
            <section id="projects" className="py-12 border-t border-border/40">
              <ProjectsSection />
            </section>

            {/* Socials */}
            <section id="socials" className="py-12 border-t border-border/40">
              <SocialLinks />
            </section>

            {/* Footer */}
            <footer className="pt-12 mt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
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
