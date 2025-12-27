'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import profilePic from '../profile.png';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const techStack = [
  { name: 'Python', icon: '🐍' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'TensorFlow', icon: '🧠' },
  { name: 'NumPy', icon: '📊' },
  { name: 'Scikit-learn', icon: '🤖' },
  { name: 'Pandas', icon: '🐼' },
];

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full pt-10 pb-2">
      <div className="max-w-6xl mx-auto px-10 md:px-22">
        {/* Hero Header with Profile */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          {/* Profile Picture with Status */}
          <motion.div
            className="relative shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-200 dark:border-neutral-800 transform transition-all duration-700 ease-out ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } hover:scale-105 hover:shadow-[0_20px_70px_rgba(0,0,0,0.3)]`}
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

            {/* Available Badge */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full
                bg-green-500 dark:bg-green-600 text-white text-xs font-semibold shadow-lg
                flex items-center gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Available
            </motion.div>
          </motion.div>

          {/* Name and Tagline */}
          <motion.div className="flex-1" {...fadeUp}>
            <motion.h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              Hi, I'm Syphax
            </motion.h1>

            <motion.p
              className="font-info text-lg md:text-xl text-muted-foreground leading-relaxed"
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Developer passionate about learning, improving, and adapting every day.
              I'm deeply interested in Machine Learning, Artificial Intelligence, and
              software architecture.
            </motion.p>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div className="mb-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
          <motion.h2 className="font-info text-base md:text-lg font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400 mb-3">
            About
          </motion.h2>
          <motion.p className="font-info text-base md:text-lg text-muted-foreground leading-relaxed">
            I started coding and quickly found it both fun and interesting. I'm driven
            by the desire to build things that make a real impact. My interests lie
            primarily in backend systems and modern AI — especially NLP with PyTorch
            and TensorFlow.
          </motion.p>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div className="mt-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
          <motion.h2 className="font-info text-base md:text-lg font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400 mb-4">
            Tech Stack
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                className="group relative px-4 py-2.5 rounded-xl text-sm font-medium border-2
                  bg-white dark:bg-neutral-900/80
                  text-neutral-800 dark:text-neutral-200
                  border-neutral-200 dark:border-neutral-700
                  hover:border-neutral-400 dark:hover:border-neutral-500
                  hover:shadow-lg transition-all duration-300
                  flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
                whileHover={{ y: -2 }}
              >
                <span className="text-lg">{tech.icon}</span>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
