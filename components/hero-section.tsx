'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 py-24 relative">
      {/* Profile Image */}
      <motion.div
        className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image src={profilePic} alt="Syphax" fill className="object-cover" priority />
      </motion.div>

      {/* Intro */}
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hi, I'm Syphax</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Developer passionate about learning, improving, and adapting every day.  
          I’m deeply interested in Machine Learning algorithms, Artificial Intelligence,
          and software architecture.
        </p>
      </motion.div>

      {/* About */}
      <motion.div
        className="max-w-2xl mt-10 text-left md:text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          I’m deeply fascinated by how intelligence can be built — from ML fundamentals to AI systems.
          I study models, scalability, and system design. Strong passion for NLP with PyTorch & TensorFlow.
        </p>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="mt-10 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[
          'Python', 'NumPy', 'Pandas', 'scikit-learn',
          'Machine Learning', 'PyTorch', 'Data Science'
        ].map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-foreground/10 rounded-full text-sm text-foreground/80 font-medium"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
