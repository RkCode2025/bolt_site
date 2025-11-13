'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 relative">
      {/* Main content container: text + image side by side */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto 
                   border border-dashed border-foreground/40 rounded-2xl p-8 
                   backdrop-blur-xl bg-background/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Text content */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Hi, I'm Syphax
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Developer passionate about learning, improving, and adapting every day.  
            I’m deeply interested in Machine Learning algorithms, Artificial Intelligence,
            and software architecture.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I’m deeply fascinated by how intelligence can be built — from ML fundamentals to AI systems.
            I study models, scalability, and system design. Strong passion for NLP with PyTorch & TensorFlow.
          </p>
        </div>

        {/* Right: Profile image */}
        <motion.div
          className="relative w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden 
                     border border-dashed border-foreground/50 bg-background/30 
                     backdrop-blur-md flex-shrink-0"
          initial={{ opacity: 0, x: 30, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, rotate: 3 }}
        >
          <Image
            src={profilePic}
            alt="Syphax"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Skills section under intro */}
      <motion.div
        className="mt-16 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[
          'Python', 'NumPy', 'Pandas', 'scikit-learn',
          'Machine Learning', 'PyTorch', 'Data Science'
        ].map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-foreground/10 rounded-full 
                       text-sm md:text-base text-foreground/80 font-medium"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
