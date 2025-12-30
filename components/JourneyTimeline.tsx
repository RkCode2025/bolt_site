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
      company: "Fiberr.co",
      date: "Nov 2025 – Present",
      // Updated to match your renamed file
      logo: "/fiberr.jpeg", 
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
            {/* Background color set to #ECE9E6 for light mode */}
            <div 
              className="flex items-center justify-between group p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#ECE9E6] dark:bg-neutral-900/50 backdrop-blur-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm"
            >
              
              <div className="flex items-center gap-4">
                {/* Logo Container */}
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {!imageError ? (
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-cover p-1"
                      unoptimized
                      onError={() => setImageError(true)}
                      priority
                    />
                  ) : (
                    /* Fallback Circle if image fails */
                    <div className="w-full h-full bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center">
                       <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">FB</span>
                    </div>
                  )}
                </div>

                {/* Info Column */}
                <div className="flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-black dark:text-white leading-tight">
                    {exp.company}
                  </h3>
                  <p className="font-info text-sm text-neutral-600 dark:text-neutral-400">
                    {exp.role}
                  </p>
                </div>
              </div>

              {/* Right Side: Date & GitHub Link */}
              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-sm font-info text-neutral-500 dark:text-neutral-500 tabular-nums">
                  {exp.date}
                </div>
                
                <a 
                  href={exp.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-black dark:hover:text-white"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </a>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
