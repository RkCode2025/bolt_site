'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '@/public/image-removebg-preview.png'; // update path if different

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 gap-12 relative">
      {/* Profile Image */}
      <motion.div
        className="flex-shrink-0"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-foreground/20 shadow-lg">
          <Image
            src={profilePic}
            alt="Syphax"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="max-w-2xl w-full">
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
              technology that doesn’t just *function*, but *feels alive* — intelligent, adaptive,
              and elegant.
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
    </section>
  );
}
