'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg'; // adjust to your exact file path

export function HeroSection() {
  return (
    <section className="relative w-full py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-12">
        
        {/* ==== LEFT: Text Content ==== */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm Syphax
          </h1>

          <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Developer passionate about learning, improving, and adapting every day. 
            I’m deeply interested in Machine Learning, Artificial Intelligence, and 
            software architecture. Always exploring new technologies and eager to 
            tackle new challenges.
          </p>

          {/* About Section — very tight spacing */}
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

        {/* ==== RIGHT: Profile Image ==== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden shadow-md shrink-0"
        >
          <Image
            src={profilePic}
            alt="Syphax"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
