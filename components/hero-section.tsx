'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 flex flex-col items-start relative">
      {/* Container with text + profile */}
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Profile image on right */}
        <motion.div
          className="absolute top-0 right-0 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden 
          border border-foreground/20 bg-background/50 backdrop-blur-sm"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={profilePic} alt="Profile" fill className="object-cover" priority />
        </motion.div>

        {/* Intro */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Hi, I'm Syphax
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Developer passionate about learning, improving, and adapting every day.  
            I’m deeply interested in Machine Learning algorithms, Artificial Intelligence,
            and software architecture.
          </p>
        </motion.div>

        {/* About */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-1">About</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            I’m deeply fascinated by how intelligence can be built — from ML fundamentals to AI systems.
            I study models, scalability, and system design. Strong passion for NLP with PyTorch & TensorFlow.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-1">Education</h2>
          <div className="text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Independent Learner</p>
              <p className="text-sm">Deep Learning, AI Systems & Modern Web</p>
            </div>
            <span className="text-sm mt-1 sm:mt-0">2023 – Present</span>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Python', 'NumPy', 'Pandas', 'scikit-learn',
              'Machine Learning', 'PyTorch', 'Data Science'
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-foreground/10 rounded-full 
                           text-sm text-foreground/80 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
