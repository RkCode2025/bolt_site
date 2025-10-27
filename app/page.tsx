import { AnimatedBackground } from '@/components/animated-background';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { NotesSection } from '@/components/notes-section';
import { SocialLinks } from '@/components/social-links';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <NotesSection />
        <SocialLinks />
      </div>

      <footer className="relative z-10 py-12 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
        <p className="mt-2">© 2025 - Always learning, always building</p>
      </footer>
    </main>
  );
}
