'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from 'image-removebg-preview.png';

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 relative">

      {/* Profile Image with hover animation */}
      <motion.div
        className="absolute top-20 right-10 md:top-24 md:right-32 w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden 
        border border-dotted border-foreground/40 shadow-lg cursor-pointer 
        backdrop-blur-md bg-background/20"
        
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.15, rotate: 5, boxShadow: '0px 12px 30px rgba(0,0,0,0.25)' }}
      >
        <Image src={profilePic} alt="Syphax" fill className="object-cover" priority />
      </motion.div>

      {/* Intro Text */}
      <motion.div
        className="max-w-3xl border border-dotted border-foreground/40 rounded-xl p-6 md:p-8 
        backdrop-blur-xl bg-background/30 shadow-md"
        
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Hi, I'm Syphax</h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          Developer passionate about learning, improving, and adapting every day.  
          I’m deeply interested in Machine Learning algorithms, Artificial Intelligence,
          and software architecture.
        </p>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="max-w-3xl mt-10 border border-dotted border-foreground/40 rounded-xl p-6 
        backdrop-blur-xl bg-background/30 shadow-md"
        
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-foreground">About</h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          I’m deeply fascinated by how intelligence can be built — from ML foundations to AI evolution.
          I love diving into system architecture, optimization, and scaling. Major interest in NLP with
          PyTorch & TensorFlow.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="mt-12 flex flex-wrap gap-4 p-4 rounded-xl border border-dotted border-foreground/40 
        backdrop-blur-xl bg-background/30 shadow-md"
        
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
            className="px-4 py-2 bg-foreground/10 rounded-full text-sm md:text-base 
            text-foreground/80 font-medium hover:bg-foreground/20 transition backdrop-blur-md"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
