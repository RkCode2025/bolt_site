// app/page.tsx
import { AnimatedBackground } from '@/components/animated-background';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      <AnimatedBackground />

      {/* Centered container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 xl:max-w-6xl">

        {/* Hero – much less top spacing */}
        <section className="pt-8 md:pt-12 pb-12">
          <HeroSection />
        </section>

        {/* Projects – very small gap */}
        <section className="py-12 border-t border-border/40">
          <ProjectsSection />
        </section>

        {/* Social Links – tight spacing */}
        <section className="py-12 border-t border-border/40">
          <SocialLinks />
        </section>

        {/* Footer – closer to last section */}
        <footer className="py-10 text-center text-sm text-muted-foreground border-t border-border/50">
          <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
          <p className="mt-1">© 2025 — Always learning, always building</p>
        </footer>
      </div>

      <BottomNav />
    </>
  );
}
