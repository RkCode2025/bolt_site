'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  const skills = [
    'Python',
    'NumPy',
    'Pandas',
    'scikit-learn',
    'Machine Learning',
    'PyTorch',
    'Data Science',
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-4xl w-full text-center">
        {/* Animated Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Name */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Syphax
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-2xl md:text-3xl font-light text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Engineering intelligence, one thought at a time.
          </motion.p>

          {/* Description */}
          <motion.div
            className="space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              I’m a developer exploring the edge of <span className="text-foreground">AI</span>, cognition,
              and creative systems. My focus lies in building intelligent architectures that
              merge logic with design, and theory with experience.
            </p>

            <p>
              Currently experimenting with <span className="text-foreground">transformers</span>,
              <span className="text-foreground"> FastAPI</span>, and neural systems using
              <span className="text-foreground"> PyTorch</span>. Always learning. Always building.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2 rounded-full bg-muted text-sm md:text-base font-medium text-foreground/90 hover:bg-foreground/10 transition-colors border border-foreground/10 backdrop-blur-sm"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
