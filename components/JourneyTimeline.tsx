'use client';
import { useEffect, useState } from 'react';
import { FaGithub, FaBriefcase } from "react-icons/fa"; 

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  description: string;
}

export default function Experience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set a slight timeout (e.g., 50ms) to trigger the CSS transition/fade-in
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const experiences: ExperienceItem[] = [
    {
      role: "AI/ML Developer",
      company: "Fiberr (Startup)",
      date: "Nov 2025 – Present",
      // Enhanced description for better impact
      description: "Implementing **novel model architectures** for a research-based startup, focusing on translating cutting-edge R&D into **developmental insights** and production-ready systems.",
    },
    // Add more experiences here as needed
  ];

  const githubUrl = "https://github.com/old-droid"; // Centralized GitHub URL

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mt-14">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
        Experience
      </h2>
      
      
      <div className="space-y-10">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`
              pb-8 transition-all duration-700 ease-out 
              ${i < experiences.length - 1 ? "border-b border-neutral-200 dark:border-neutral-800" : ""}
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            `}
          >
            {/* 1. Primary Hierarchy (Role and Company) */}
            <div className="flex items-start gap-4 mb-1"> 
              {/* Experience Icon (FaBriefcase) */}
              <FaBriefcase className="w-5 h-5 mt-1 flex-shrink-0 text-green-600 dark:text-green-400" />

              <div>
                {/* Role: Highest level of text hierarchy (large, bold) */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {exp.role}
                </h3>
                {/* Company: Second level (medium size, medium weight, italic) */}
                <p className="text-base text-neutral-600 dark:text-neutral-400 font-medium italic">
                  {exp.company}
                </p>
              </div>
            </div>

            {/* 2. Secondary Detail (Date) - Indented for alignment */}
            <p className="ml-9 text-sm text-green-700 dark:text-green-400 font-semibold">
              {exp.date}
            </p>

            {/* 3. Description (The main content) - Indented */}
            <p className="ml-9 mt-4 text-neutral-700 dark:text-neutral-300 leading-normal">
              {exp.description}
            </p>

          </div>
        ))}
      </div>

      {/* The dedicated GitHub Button at the bottom of the section
      */}
      <div className="mt-10 text-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg 
                     text-lg font-semibold text-neutral-800 dark:text-neutral-200 
                     bg-neutral-50 dark:bg-neutral-900 hover:bg-green-500 hover:text-white dark:hover:bg-green-600 
                     transition-all duration-300 shadow-md"
        >
          <FaGithub className="w-6 h-6" />
          View All Relevant Work on GitHub
        </a>
      </div>
    </section>
  );
}
