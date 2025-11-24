'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const techStack = ['Python', 'PyTorch', 'TensorFlow', 'NumPy', 'Scikit-learn', 'Pandas'];

  return (
    <section className="w-full pt-16 pb-6 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-10 md:px-20 flex flex-col md:flex-row items-start gap-8">

        {/* LEFT TEXT BOX */}
        <div className="flex-1 max-w-2xl space-y-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-neutral-700">
          <motion.div {...fadeUp}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Hi, I'm Syphax
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg">
              Developer passionate about learning, improving, and adapting every day.
              I’m deeply interested in Machine Learning, Artificial Intelligence, and
              software architecture.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              About
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.25 }}>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-4 mt-5">
              {techStack.map((tech, idx) => (
                <motion.span
                  key={tech}
                  className="
                    px-4 py-2 rounded-md text-base font-semibold border
                    bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-neutral-600
                    hover:bg-blue-600 hover:text-white cursor-default
                    transition
                  "
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

        {/* PROFILE IMAGE */}
        <motion.div
          className="shrink-0 flex items-start pt-2 md:-ml-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            className={`
              w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden relative
              shadow-lg border border-gray-300 dark:border-gray-600
              transform transition-all duration-700 ease-out
              ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}
              hover:scale-105 hover:shadow-xl
            `}
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
