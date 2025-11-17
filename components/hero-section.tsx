'use client';

import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 px-6">

        {/* ==== LEFT: TEXT (Main Block) ==== */}
        <div className="flex-1 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Hi, I'm Syphax
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            Developer passionate about learning, improving, and adapting every day.
            I’m deeply interested in Machine Learning, Artificial Intelligence, and
            software architecture.
          </p>

          {/* About */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              About
            </h2>

            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie 
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </p>
          </div>
        </div>

        {/* ==== RIGHT: CIRCLE IMAGE ==== */}
        <div className="shrink-0 flex items-start pt-2">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl border border-white/10">
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

