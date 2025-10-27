'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from 'image-removebg-preview.png'; // update path if different

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative">
      {/* Profile Image - Top Right */}
      <motion.div
        className="absolute top-8 right-8 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-foreground/20 shadow-lg"
        initial={{ opacity: 0, x: 30, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src={profilePic}
          alt="Syphax"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Text Content */}
      <div className="max-w-3xl w-full mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Syphax
          </motion.h1>

          <motion.div
            className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-light text-foreground">
              Developer, AI Enthusiast, and Creative Coder.
            </p>

            <p>
              I’m Syphax — a developer driven by curiosity, precision, and creativity.
              My work explores the convergence of code and cognition, where neural networks
              meet design systems and data becomes a medium for expression. I aim to create
              technology that doesn’t just *function*, but *feels alive* — intelligent,
              adaptive, and elegant.
            </p>

            <p>
              My current focus revolves around transformer architectures, FastAPI backends,
              and machine learning workflows using PyTorch. I’m fascinated by how abstraction,
              logic, and emotion blend inside algorithms — and how those systems reshape the
              boundaries of creativity and computation.
            </p>

            <p>
              Always learning, always iterating, always building something new.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Skills Bar */}
      <motion.div
        className="mt-16 flex flex-wrap justify-start gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {['Python', 'NumPy', 'Pandas', 'scikit-learn', 'Machine Learning', 'PyTorch', 'Data Science'].map((skill, index) => (
          <motion.span
            key={skill}
            className="px-4 py-2 bg-foreground/10 rounded-full text-sm md:text-base text-foreground/80 font-medium hover:bg-foreground/20 transition"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
