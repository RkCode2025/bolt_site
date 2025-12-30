'use client';

import Image from 'next/image';
import BlurFade from '@/components/blurfade';
import { Github } from 'lucide-react';
import { useState } from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  logo: string;
  githubUrl: string;
}

const BLUR_FADE_DELAY = 0.04;

export default function Experience() {
  const [imageError, setImageError] = useState(false);

  const experiences: ExperienceItem[] = [
    {
      role: "AI/ML Developer",
      company: "Fiberr",
      date: "Nov 2025 – Present",
      // If profile.png works as "/profile.png", this MUST be "/fib.png"
      logo: "/fib.png", 
      githubUrl: "https://github.com/old-droid",
    },
  ];

  return (
    <section id="journey" className="max-w-6xl mx-auto px-10 md:px-22 mt-14 mb-20">
      <BlurFade delay={BLUR_FADE_DELAY} inView>
        <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-10 tracking-tight text-black dark:text-white">
          Work Experience
        </h2>
      </BlurFade>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, i) => (
          <BlurFade 
            key={exp.company + i} 
            delay={BLUR_FADE_DELAY * 2 + i * 0.05} 
            inView
          >
            <div className="flex items-center justify-between group p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
              
              <div className="flex items-center gap-4">
                {/* Logo Container */}
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full border border-neutral-100 dark:border-neutral-800 bg-neutral-100 dark:bg-black flex items-center justify-center">
                  {!imageError ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-cover p-1"
                      unoptimized
                      onError={() => setImageError(true)}
                      priority
                    />
                  ) : (
                    // Fallback if image still won't load
                    <span className="text-xs font-bold text-neutral-400">FB</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-black dark:text-white leading-tight">
                    {exp.company}
                  </h3>
                  <p className="font-info text-sm text-neutral-600 dark:text-neutral-400">
                    {exp.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-sm font-info text-neutral-500 dark:text-neutral-500 tabular-nums">
                  {exp.date}
                </div>
                
                <a 
                  href={exp.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-black dark:hover:text-white"
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
