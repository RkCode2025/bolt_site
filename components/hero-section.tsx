'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="px-6 md:px-20 py-16 flex flex-col items-start relative">
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Profile image beside intro */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-2">
              Hi, I'm Syphax
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-snug max-w-2xl">
              Developer passionate about learning, improving, and adapting every day.  
              Deeply interested in Machine Learning, Artificial Intelligence,
              and software architecture.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 md:mt-0 md:ml-6 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden 
                       border border-foreground/20 bg-background/50 backdrop-blur-sm shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image src={profilePic} alt="Profile" fill className="object-cover" priority />
          </motion.div>
        </div>

        {/* About */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-1">About</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-snug max-w-2xl">
            Fascinated by how intelligence can be built — from ML fundamentals to AI systems.
            Focused on scalable model design, NLP with PyTorch & TensorFlow, and modern dev practices.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-1">Education</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between text-muted-foreground text-sm">
            <div>
              <p className="font-medium text-foreground">Independent Learner</p>
              <p>Deep Learning, AI Systems & Web Development</p>
            </div>
            <span className="text-xs sm:text-sm mt-1 sm:mt-0 opacity-80">2023 – Present</span>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Python', 'NumPy', 'Pandas', 'scikit-learn',
              'Machine Learning', 'PyTorch', 'Data Science'
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-foreground/10 rounded-full text-xs md:text-sm 
                           text-foreground/80 font-medium"
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
