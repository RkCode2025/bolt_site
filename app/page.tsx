import { AnimatedBackground } from '@/components/animated-background';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { NotesSection } from '@/components/notes-section';
import { SocialLinks } from '@/components/social-links';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      

      {/* Page content */}
      <div className="relative z-10">
        <section id="hero"><HeroSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="notes"><NotesSection /></section>
        <section id="socials"><SocialLinks /></section>
      </div>

      <footer className="relative z-10 py-12 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
        <p className="mt-2">© 2025 - Always learning, always building</p>
      </footer>

      {/* Bottom nav bar */}
      <BottomNav />
    </main>
  );
}
