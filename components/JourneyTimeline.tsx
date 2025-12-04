'use client';
import { useEffect, useState } from 'react';
import { Briefcase } from "lucide-react";

export default function Experience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const experiences = [
    {
      role: "AI/ML Developer",
      company: "Fiberr (Startup)",
      date: "June 2025 – Present",
      description:
        "Working on research-oriented AI/ML implementations, contributing to model experimentation, optimization, and practical deployments. (GitHub: old-droid)",
      logo: "https://raw.githubusercontent.com/old-droid.png",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mt-14">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
        Experience
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transform transition-all duration-700 ease-out hover:scale-[1.03] hover:shadow-xl ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="flex items-center gap-4">
              {exp.logo ? (
                <img
                  src={exp.logo}
                  alt="company logo"
                  className="w-12 h-12 rounded-xl object-cover border border-neutral-300 dark:border-neutral-700"
                />
              ) : (
                <Briefcase className="w-10 h-10 text-teal-500" />
              )}

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {exp.role}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  {exp.company}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
              {exp.date}
            </p>

            <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
