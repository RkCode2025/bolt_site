'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const techStack = [
    'Python',
    'PyTorch',
    'TensorFlow',
    'NumPy',
    'Scikit-learn',
    'Pandas',
  ];

  return (
    <section className="w-full pt-10 pb-2">
      <div className="max-w-6xl mx-auto px-10 md:px-22 flex flex-col md:flex-row items-start gap-3 md:gap-4">

        {/* ==== LEFT TEXT ==== */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Hi, I'm Syphax
          </h1>

          <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            Developer passionate about learning, improving, and adapting every day.
            I’m deeply interested in Machine Learning, Artificial Intelligence, and
            software architecture.
          </p>

          {/* ==== ABOUT SECTION ==== */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">
              About
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </p>
          </div>

          {/* ==== TECH STACK SECTION ==== */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">
              Tech Stack
            </h2>

            <div className="flex flex-wrap gap-3 mt-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1 rounded-md text-sm border
                    bg-neutral-100 text-neutral-700 border-neutral-300 
                    dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-700
                    transition
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ==== RIGHT PFP ==== */}
        <div className="shrink-0 flex items-start pt-1 md:-ml-10">
          <div
            className={`
              w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl
              border border-white/10 transform transition-all duration-700 ease-out
              ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}
              hover:scale-105 hover:shadow-2xl
            `}
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
        </div>

      </div>
    </section>
  );
}
