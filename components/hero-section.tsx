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

import profilePic from '/profile1.jpg';
import profilePic2 from '/profile2.jpg';

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileAlt, setIsProfileAlt] = useState(false);
  
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
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
    <section id="hero" className="w-full pt-0 pb-0 relative min-h-[700px]">
      
      {/* --- BANNER IMAGE SECTION --- */}
      {/* Positioned absolute to the top-right to avoid the text on the left */}
      <div className="absolute top-0 right-0 w-full md:w-[65%] h-[450px] pointer-events-none overflow-hidden z-0">
        <BlurFade delay={0.2} duration={1.2}>
          <div 
            className="w-full h-full opacity-70 dark:opacity-50 transition-opacity duration-1000"
            style={{
              backgroundImage: `url('https://i.postimg.cc/GmKDtnqn/Itadori-Yuji-x-Ryomen-Sukuna-Banner-Wallpaper.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              /* This creates a clean "vignette" blur on all sides */
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 90%)',
            }}
          />
        </BlurFade>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 relative z-10">
        {/* Main Grid */}
        <div className="flex flex-col md:flex-row items-start gap-12">
          
          {/* Text Content */}
          <div className="flex-1 w-full">
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

            <div className="mt-8">
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h2 className="font-heading text-lg md:text-xl font-medium tracking-tight">
                  About
                </h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <p className="font-info mt-2 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  I started coding and quickly found it both fun and interesting. I’m driven
                  by the desire to build things that make a real impact. My interests lie
                  primarily in Research and modern AI.
                </p>
              </BlurFade>
            </div>

            <div className="mt-8">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
                  Tech Stack
                </h2>
              </BlurFade>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {techStack.map((tech, idx) => (
                  <BlurFade 
                    key={tech.name} 
                    delay={BLUR_FADE_DELAY * 6 + idx * 0.05} 
                    inView
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border 
                      bg-secondary/50 text-secondary-foreground border-border/50
                      dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-800
                      transition-all duration-300 hover:scale-105 whitespace-nowrap">
                      <span className="text-lg shrink-0">{tech.icon}</span>
                      <span className="font-info text-xs md:text-sm font-medium">{tech.name}</span>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="shrink-0 pt-2 hidden md:block">
            <div 
              className="cursor-pointer group relative z-20"
              onClick={() => setIsProfileAlt(!isProfileAlt)}
            >
              <BlurFade 
                key={isProfileAlt ? 'alt' : 'primary'} 
                delay={0.1} 
                duration={0.4}
              >
                <div
                  className={`w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-background transform transition-all duration-700 ease-out ${
                    loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  } group-hover:scale-105 group-active:scale-95`}
                >
                  <Image
                    src={isProfileAlt ? profilePic2 : profilePic}
                    alt="Syphax Profile"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full select-none"
                    priority
                  />
                </div>
              </BlurFade>
              
              <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                <span className="text-[10px] font-medium uppercase tracking-widest">Click to flip</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Chart */}
        <div className="mt-24 w-full max-w-4xl relative z-10">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight mb-4">
              Contributions
            </h2>
            <div className="p-6 rounded-2xl border border-border/50 bg-secondary/10 dark:bg-neutral-900/40 w-full overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                {mounted && (
                  <GitHubCalendar 
                    username="rkcode2025"
                    blockSize={12} 
                    blockMargin={4}
                    theme={calendarTheme}
                    hideColorLegend
                    colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                  />
                )}
                </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
