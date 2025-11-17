'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 px-6">

        {/* ==== LEFT TEXT ==== */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Hi, I'm Syphax
          </h1>

          {/* Reduced stretch */}
          <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Developer passionate about learning, improving, and adapting every day.
            I’m deeply interested in Machine Learning, Artificial Intelligence, and
            software architecture.
          </p>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">
              About
            </h2>

            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </p>
          </div>
        </div>

        {/* ==== RIGHT PFP WITH HOVER + LOAD ANIMATION ==== */}
        <div className="shrink-0 flex items-start pt-2">
          <div
            className={`
              w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden 
              shadow-xl border border-white/10 transform
              transition-all duration-700 ease-out

              /* Load animation */
              ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}

              /* Hover animation */
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
