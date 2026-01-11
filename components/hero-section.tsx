'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import GitHubCalendar from 'react-github-calendar';
import BlurFade from '@/components/blurfade';
import { 
  SiPython, 
  SiPytorch, 
  SiTensorflow, 
  SiNumpy, 
  SiScikitlearn, 
  SiPandas 
} from 'react-icons/si';

import profilePic from '/profile.png';

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Theme configuration
  // Light mode uses your requested RGB(193, 95, 60) which is #C15F3C
  const calendarTheme = {
    light: ['#f0f0f0', '#e5b19b', '#d88c6e', '#c15f3c', '#a54b2d'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const techStack = [
    { name: 'Python', icon: <SiPython className="text-blue-400" /> },
    { name: 'PyTorch', icon: <SiPytorch className="text-orange-600" /> },
    { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-400" /> },
    { name: 'NumPy', icon: <SiNumpy className="text-blue-500" /> },
    { name: 'Scikit-learn', icon: <SiScikitlearn className="text-orange-500" /> },
    { name: 'Pandas', icon: <SiPandas className="text-indigo-400" /> },
  ];

  return (
    <section id="hero" className="w-full pt-10 pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Flex Row: Text on Left, Image on Right */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1 w-full">
            {/* Intro */}
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="font-heading text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
                Hi, I'm Syphax
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="font-info text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                I'm an AI/ML developer currently learning Pytorch and deep learning.
                I specialize in NLP with focus on Research with
                implementing new designs for Large Language Models.
              </p>
            </BlurFade>

            {/* About */}
            <div className="mt-6">
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h2 className="font-heading text-lg md:text-xl font-medium tracking-tight">
                  About
                </h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <p className="font-info mt-2 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  I started coding and quickly found it both fun and interesting. I’m driven
                  by the desire to build things that make a real impact. My interests lie
                  primarily in Research and modern AI — especially NLP with PyTorch
                  and TensorFlow.
                </p>
              </BlurFade>
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
                  Tech Stack
                </h2>
              </BlurFade>
              <div className="flex flex-wrap items-center gap-2 mt-3 overflow-visible">
                {techStack.map((tech, idx) => (
                  <BlurFade 
                    key={tech.name} 
                    delay={BLUR_FADE_DELAY * 6 + idx * 0.05} 
                    inView
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border 
                      bg-secondary/50 text-secondary-foreground border-border/50
                      dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-800
                      transition-all duration-300 hover:bg-secondary/80 dark:hover:bg-neutral-800 hover:scale-105 whitespace-nowrap">
                      <span className="text-lg shrink-0">{tech.icon}</span>
                      <span className="font-info text-xs md:text-sm font-medium">{tech.name}</span>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Picture (Stays on Right side) */}
          <div className="shrink-0 pt-2 hidden md:block">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <div
                className={`w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border border-white/10 transform transition-all duration-700 ease-out ${
                  loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                } hover:scale-110 hover:rotate-2 hover:shadow-2xl`}
              >
                <Image
                  src={profilePic}
                  alt="Syphax"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Small GitHub Contribution Chart (Full Width Below) */}
        <div className="mt-12 w-full max-w-4xl">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight mb-4">
              Contributions
            </h2>
            <div className="p-4 md:p-6 rounded-2xl border border-border/50 bg-secondary/10 dark:bg-neutral-900/40 flex justify-start items-center overflow-x-auto">
                {mounted && (
                  <GitHubCalendar 
                    username="rkcode2025"
                    blockSize={10} // Reduced size for "Smaller" look
                    blockMargin={3}
                    fontSize={12}
                    theme={calendarTheme}
                    loading={false}
                    colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                  />
                )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
