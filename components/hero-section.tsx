'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '𝘔𝘪𝘺𝘢𝘮𝘰𝘵𝘰 𝘔𝘶𝘴𝘢𝘴𝘩𝘪.jpg';

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 relative">
      {/* Profile Image */}
      <motion.div
        className="absolute top-20 right-10 md:top-24 md:right-32 w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden border border-dashed border-foreground/40 cursor-pointer bg-background/30 backdrop-blur-md"
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.12, rotate: 3 }}
      >
        <Image src={profilePic} alt="Syphax" fill className="object-cover" priority />
      </motion.div>

      {/* Intro */}
      <motion.div
        className="max-w-3xl border border-dashed border-foreground/50 rounded-xl p-6 md:p-8 backdrop-blur-xl bg-background/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Hi, I'm Syphax
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Developer passionate about learning, improving, and adapting every day. I’m deeply
          interested in Machine Learning algorithms, Artificial Intelligence, and software
          architecture.
        </p>
      </motion.div>

      {/* About */}
      <motion.div
        className="max-w-3xl mt-10 border border-dashed border-foreground/50 rounded-xl p-6 backdrop-blur-xl bg-background/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-foreground">About</h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          I’m deeply fascinated by how intelligence can be built — from ML fundamentals to AI
          systems. I study models, scalability, and system design. Strong passion for NLP with
          PyTorch & TensorFlow.
        </p>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="mt-12 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[
          'Python',
          'NumPy',
          'Pandas',
          'scikit-learn',
          'Machine Learning',
          'PyTorch',
          'Data Science',
        ].map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-foreground/10 rounded-full text-sm md:text-base text-foreground/80 font-jetbrains"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
