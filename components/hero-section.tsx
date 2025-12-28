'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// These logos are imported from Simple Icons via react-icons
import { 
  SiPython, 
  SiPytorch, 
  SiTensorflow, 
  SiNumpy, 
  SiScikitlearn, 
  SiPandas 
} from 'react-icons/si';

import profilePic from '/profile.png';

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

  const techStack = [
    { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
    { name: 'PyTorch', icon: <SiPytorch className="text-[#EE4C2C]" /> },
    { name: 'TensorFlow', icon: <SiTensorflow className="text-[#FF6F00]" /> },
    { name: 'NumPy', icon: <SiNumpy className="text-[#013243]" /> },
    { name: 'Scikit-learn', icon: <SiScikitlearn className="text-[#F7931E]" /> },
    { name: 'Pandas', icon: <SiPandas className="text-[#150458]" /> },
  ];

  return (
    <section className="w-full pt-10 pb-2">
      <div className="max-w-6xl mx-auto px-10 md:px-22 flex flex-col md:flex-row items-start gap-3 md:gap-4">
        <div className="flex-1 max-w-2xl">
          <motion.div {...fadeUp}>
            <motion.h1 className="font-heading text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
              Hi, I'm Syphax
            </motion.h1>
            <motion.p className="font-info text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              I'm an AI/ML developer currently learning Pytorch and deep learning.
              I specialize in NLP with focus on Research with implementing new designs for Large Language Models.
            </motion.p>
          </motion.div>

          {/* TECH STACK SECTION */}
          <motion.div className="mt-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
            <motion.h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
              Tech Stack
            </motion.h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border 
                    bg-neutral-100 text-neutral-700 border-neutral-300
                    dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-800
                    transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * idx }}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="font-info text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="shrink-0 flex items-start pt-1 md:-ml-10" {...fadeUp}>
          <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl border border-white/10 transform transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Image src={profilePic} alt="Syphax" width={400} height={400} className="object-cover w-full h-full" priority />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
