'use client';

import Image from 'next/image';
import BlurFade from '@/components/blurfade';
import { Github } from 'lucide-react';

// IMPORT the logo as a module
import fibLogo from '/fib.png'; 

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  logo: any;
  githubUrl: string;
}

const BLUR_FADE_DELAY = 0.04;

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      role: "AI/ML Developer",
      company: "Fiberr",
      date: "Nov 2025 – Present",
      logo: fibLogo,
      githubUrl: "https://github.com/old-droid",
    },
  ];

  return (
    <section id="journey" className="max-w-6xl mx-auto px-6 md:px-22 mt-14 mb-20">
      <BlurFade delay={BLUR_FADE_DELAY} inView>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 tracking-tight text-black dark:text-white">
          Work Experience
        </h2>
      </BlurFade>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <BlurFade 
            key={exp.company + i} 
            delay={BLUR_FADE_DELAY * 2 + i * 0.05} 
            inView
          >
            {/* Removed background and border - now using a clean row layout */}
            <div className="flex items-center justify-between group py-6 transition-all border-b border-neutral-100 dark:border-neutral-800 last:border-none">
              
              <div className="flex items-center gap-5">
                {/* Logo Container - Simplified */}
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-xl flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    className="w-full h-full object-contain p-1"
                    priority
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-black dark:text-white leading-tight">
                    {exp.company}
                  </h3>
                  <p className="font-info text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {exp.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-sm font-medium text-neutral-400 dark:text-neutral-500 tabular-nums">
                  {exp.date}
                </div>
                
                <a 
                  href={exp.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="View Project on GitHub"
                >
                  <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
