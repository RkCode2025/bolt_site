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
        {/* Hero – starts higher, less empty space at top */}
        <section className="pt-16 md:pt-24 pb-32">
          <HeroSection />
        </section>

        {/* Projects – much tighter gap from hero */}
        <section className="py-32 border-t border-border/40">
          <ProjectsSection />
        </section>

        {/* Socials / Contact – tight and final */}
        <section className="py-32 border-t border-border/40">
          <SocialLinks />
        </section>

        {/* Footer – closer to the last section */}
        <footer className="py-20 text-center text-sm text-muted-foreground border-t border-border/50">
          <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
          <p className="mt-2">© 2025 — Always learning, always building</p>
        </footer>
      </div>

      <BottomNav />
    </>
  );
}
