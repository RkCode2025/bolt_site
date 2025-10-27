'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            About Me
          </motion.h1>

          <motion.div
            className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-light text-foreground">
              Developer, AI enthusiast, and creative coder.
            </p>

            <p>
              I'm passionate about artificial intelligence, machine learning, and building
              intuitive digital experiences. I explore the intersection of technology and
              creativity, experimenting with new frameworks, algorithms, and design patterns.
            </p>

            <p>
              Currently diving deep into transformer architectures, FastAPI backends, and
              modern web development. Always learning, always building.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
