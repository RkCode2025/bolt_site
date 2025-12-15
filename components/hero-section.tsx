'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Replace with your actual image path (public folder or remote URL)
import profilePic from '/profile.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const techStack = ['Python', 'PyTorch', 'TensorFlow', 'NumPy', 'Scikit-learn', 'Pandas'];

  return (
    <section className="w-full pt-10 pb-2">
      <div className="max-w-6xl mx-auto px-10 md:px-22 flex flex-col md:flex-row items-start gap-3 md:gap-4">
        {/* Text Content */}
        <div className="flex-1 max-w-2xl">
          <motion.div {...fadeUp}>
            <motion.h1 className="font-heading text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              Hi, I'm Syphax
            </motion.h1>

            <motion.p
              className="font-info text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Developer passionate about learning, improving, and adapting every day.
              I’m deeply interested in Machine Learning, Artificial Intelligence, and
              software architecture.
            </motion.p>
          </motion.div>

          <motion.div className="mt-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <motion.h2 className="font-heading text-lg md:text-xl font-medium tracking-tight">
              About
            </motion.h2>
            <motion.p className="font-info mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </motion.p>
          </motion.div>

          <motion.div className="mt-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
            <motion.h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
              Tech Stack
            </motion.h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {techStack.map((tech, idx) => (
                <motion.span
                  key={tech}
                  className="font-info px-3 py-1 rounded-md text-sm border
                    bg-neutral-100 text-neutral-700 border-neutral-300
                    dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-700
                    transition"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * idx }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile Picture */}
        <motion.div
          className="shrink-0 flex items-start pt-1 md:-ml-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div
            className={`w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl border border-white/10 transform transition-all duration-700 ease-out ${
              loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
            } hover:scale-105 hover:shadow-2xl`}
          >
            <Image
              src={profilePic}
              alt="Syphax"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
