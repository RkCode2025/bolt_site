// app/page.tsx
import { AnimatedBackground } from '@/components/animated-background';
import { ThemeToggle } from '@/components/theme-toggle';

// These were exported as named exports → use curly braces
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import BottomNav from '@/components/BottomNav';               // this one can stay as default (or change if needed)

// Rest of your centered layout code stays exactly the same
export default function Home() {
  return (
    <>
      <AnimatedBackground />

      {/* Centered container – the one you wanted */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 xl:max-w-6xl">
        <main className="min-h-screen pb-24 pt-20 md:pt-32">
          <section id="hero">
            <HeroSection />
          </section>

          <section id="projects" className="mt-32 md:mt-40">
            <ProjectsSection />
          </section>

          <section id="socials" className="mt-32 md:mt-40">
            <SocialLinks />
          </section>

          <footer className="mt-40 border-t border-border/50 py-16 text-center text-sm text-muted-foreground">
            <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
            <p className="mt-2">© 2025 — Always learning, always building</p>
          </footer>
        </main>
      </div>

      <BottomNav />
    </>
  );
}
