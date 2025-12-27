'use client';
import { useEffect, useState } from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  description: string;
}

export default function Experience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const experiences: ExperienceItem[] = [
    {
      role: "AI/ML Developer",
      company: "Fiberr (Startup)",
      date: "Nov 2025 – Present",
      description:
        "AI/ML developer for a research-focused startup building systems for insight and development.",
    },
  ];

  const githubUrl = "https://github.com/old-droid";

  const BriefcaseIcon = (
    <svg
      /* Updated: Specific hex for light mode, green for dark mode */
      className="w-5 h-5 text-[#C15F3C] dark:text-green-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M6 7V5a2 2 0 012-2h4a2 2 0 012 2v2h3a1 1 0 011 1v3H2V8a1 1 0 011-1h3zm2-2v2h4V5H8z" />
      <path d="M2 12h16v4a1 1 0 01-1 1H3a1 1 0 01-1-1v-4z" />
    </svg>
  );

  const GithubIcon = (
    <svg
      /* Updated hover behavior to match */
      className="w-5 h-5 cursor-pointer text-neutral-700 dark:text-neutral-300 hover:text-[#C15F3C] dark:hover:text-green-400 transition"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.55v-2.1c-3.2.71-3.88-1.39-3.88-1.39-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a10.9 10.9 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.57.23 2.73.11 3.02.75.81 1.2 1.85 1.2 3.11 0 4.43-2.69 5.4-5.25 5.68.42.36.8 1.08.8 2.18v3.24c0 .31.21.67.8.55A11.52 11.52 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mt-14">
      <h2
        className={`font-heading text-4xl md:text-5xl font-semibold mb-10 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        Experience
      </h2>

      <div className="space-y-14">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-4">
                {BriefcaseIcon}
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {exp.role}{' '}
                    {/* Updated text color for the date */}
                    <span className="text-sm text-[#C15F3C] dark:text-green-400 font-semibold">
                      ({exp.date})
                    </span>
                  </h3>
                  <p className="font-info text-base text-neutral-600 dark:text-neutral-400 font-medium">
                    {exp.company}
                  </p>
                </div>
              </div>

              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                {GithubIcon}
              </a>
            </div>

            <div className="ml-9 h-px bg-neutral-300 dark:bg-neutral-700 mb-4"></div>

            <p className="ml-9 font-info text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
