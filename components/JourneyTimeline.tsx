'use client';

import Image from 'next/image';
import BlurFade from '@/components/blurfade';

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  logo: string;
}

const BLUR_FADE_DELAY = 0.04;

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      role: "AI/ML Developer",
      company: "Fiberr",
      date: "Nov 2025 – Present",
      logo: "/fib.png",
    },
    // Add more experiences here following the same structure
  ];

  return (
    <section id="journey" className="max-w-6xl mx-auto px-10 md:px-22 mt-14 mb-20">
      {/* Animated Header */}
      <BlurFade delay={BLUR_FADE_DELAY} inView>
        <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-10 tracking-tight text-black dark:text-white">
          Work Experience
        </h2>
      </BlurFade>

      {/* Animated Experience List */}
      <div className="flex flex-col gap-9">
        {experiences.map((exp, i) => (
          <BlurFade 
            key={exp.company + i} 
            delay={BLUR_FADE_DELAY * 2 + i * 0.05} 
            inView
          >
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                {/* Logo Container */}
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    fill
                    className="object-cover p-1"
                    priority
                  />
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

              {/* Date Column */}
              <div className="text-sm font-info text-neutral-500 dark:text-neutral-500 tabular-nums">
                {exp.date}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
