'use client';

import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="w-full py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-12 px-4 md:px-0">

        {/* ==== LEFT: TEXT ==== */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm Syphax
          </h1>

          <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Developer passionate about learning, improving, and adapting every day.
            I’m deeply interested in Machine Learning, Artificial Intelligence, and
            software architecture.
          </p>

          {/* About */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold">About</h2>
            <p className="mt-2 text-base md:text-lg text-muted-foreground leading-relaxed">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie 
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </p>
          </div>
        </div>

        {/* ==== RIGHT: SMALL PROFILE IMAGE ==== */}
        <div className="shrink-0">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg">
            <Image
              src={profilePic}
              alt="Syphax"
              width={300}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
