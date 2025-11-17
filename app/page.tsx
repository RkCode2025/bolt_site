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

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 xl:max-w-6xl">

        {/* ZERO top/bottom padding */}
        <section className="py-0 pt-4">
          <HeroSection />
        </section>

        {/* ZERO spacing except border */}
        <section className="py-0 border-t border-border/40">
          <ProjectsSection />
        </section>

        {/* ZERO spacing except border */}
        <section className="py-0 border-t border-border/40">
          <SocialLinks />
        </section>

        {/* Footer also tightened */}
        <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border/50">
          <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
          <p className="mt-1">© 2025 — Always learning, always building</p>
        </footer>
      </div>

      <BottomNav />
    </>
  );
}
