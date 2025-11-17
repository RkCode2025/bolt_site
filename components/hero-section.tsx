'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="w-full py-8">
      {/* === TOP LARGE IMAGE (non-glitching, no hover scaling) === */}
      <div className="w-full overflow-hidden rounded-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <Image
            src={profilePic}
            alt="Syphax"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* === BELOW IMAGE: TEXT CONTENT === */}
      <div className="max-w-5xl mx-auto mt-10 px-4 md:px-0">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Hi, I'm Syphax</h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
          Developer passionate about learning, improving, and adapting every day. 
          I’m deeply interested in Machine Learning, Artificial Intelligence, and 
          software architecture.
        </p>

        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold">About</h2>
          <p className="mt-2 text-base md:text-lg text-muted-foreground leading-relaxed">
            I started coding and quickly found it both fun and interesting. 
            I’m driven by the desire to build things that make a real impact. 
            My interests lie primarily in backend systems and modern AI — 
            especially NLP with PyTorch and TensorFlow.
          </p>
        </div>
      </div>
    </section>
  );
}
