'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from 'Miyamoto Musashi.jpg'; // make sure the filename is exactly correct (case-sensitive!)

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-20">
      {/* ===== Profile Picture – now safely positioned above everything ===== */}
      <motion.div
        className="absolute top-20 right-6 md:right-12 lg:right-20 w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-dashed border-foreground/40 bg-background/40 backdrop-blur-md shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        whileHover={{ scale: 1.1, rotate: 4 }}
      >
        <Image
          src={profilePic}
          alt="Syphax"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* ===== Main Content – safely indented from the picture ===== */}
      <div className="max-w-3xl pr-0 md:pr-48 lg:pr-64"> {/* This padding-right prevents overlap */}
        {/* Intro */}
        <motion.div
          className="border border-dashed border-foreground/50 rounded-2xl p-8 backdrop-blur-xl bg-background/50 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm Syphax
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Developer passionate about learning, improving, and adapting every day. I’m deeply
            interested in Machine Learning algorithms, Artificial Intelligence, and software
            architecture.
          </p>
        </motion.div>

        {/* About */}
        <motion.div
          className="mt-10 border border-dashed border-foreground/50 rounded-2xl p-8 backdrop-blur-xl bg-background/50 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">About</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I’m deeply fascinated by how intelligence can be built — from ML fundamentals to AI
            systems. I study models, scalability, and system design. Strong passion for NLP with
            PyTorch & TensorFlow.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="mt-12 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            'Python',
            'NumPy',
            'Pandas',
            'scikit-learn',
            'Machine Learning',
            'PyTorch',
            'TensorFlow',
            'NLP',
            'Data Science',
          ].map((skill) => (
            <span
              key={skill}
              className="px-5 py-2.5 bg-foreground/10 rounded-full text-sm md:text-base font-medium tracking-wide"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
