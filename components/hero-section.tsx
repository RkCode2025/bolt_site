'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// NOTE: You must have 'profile.jpg' in the root of your project
// or update the import path accordingly.
import profilePic from 'profile.jpg';

/*
 * ====================================================================
 * 1. TECH STACK DATA
 * ====================================================================
 */

// Define the tech stack with names and local image paths for logos
// NOTE: For this to work, create a 'public/logos/' directory and place
// the corresponding SVG or PNG files there (e.g., public/logos/python.svg).
const techStackTools = [
  { name: 'Python', logoPath: '/logos/python.svg' },
  { name: 'PyTorch', logoPath: '/logos/pytorch.svg' },
  { name: 'TensorFlow', logoPath: '/logos/tensorflow.svg' },
  { name: 'NumPy', logoPath: '/logos/numpy.svg' },
  { name: 'Scikit-learn', logoPath: '/logos/scikit-learn.svg' },
  { name: 'Pandas', logoPath: '/logos/pandas.svg' },
  // Duplicate a few tools for better seamless transition in the loop
  { name: 'Python', logoPath: '/logos/python.svg' },
  { name: 'PyTorch', logoPath: '/logos/pytorch.svg' },
];

const sliderAnimationDuration = 30; // 30 seconds for one full loop

/*
 * ====================================================================
 * 2. SLIDER SUB-COMPONENTS
 * ====================================================================
 */

// Helper component for each tech tool card
function ToolCard({ name, logoPath }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 min-w-[120px] h-[100px] border rounded-lg
                 shadow-md bg-neutral-100 border-neutral-300
                 dark:bg-neutral-900/60 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={logoPath}
        alt={`${name} Logo`}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
      />
      <span className="mt-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
        {name}
      </span>
    </div>
  );
}

// Component to handle the infinite sliding animation
function TechStackSlider({ tools }) {
  // To create the infinite loop effect, we duplicate the array.
  const duplicatedTools = [...tools, ...tools];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Container for the sliding content */}
      <div 
        className="flex w-[200%] slider-track gap-6" 
        // Use inline style to pass the CSS variable for animation duration
        style={{ '--animation-duration': `${sliderAnimationDuration}s` }}
      >
        {duplicatedTools.map((tool, index) => (
          <ToolCard key={`tool-${tool.name}-${index}`} name={tool.name} logoPath={tool.logoPath} />
        ))}
      </div>

      {/* Fading edges to make the slider look infinite */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-black/90 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-black/90 to-transparent pointer-events-none"></div>
    </div>
  );
}

/*
 * ====================================================================
 * 3. MAIN HERO SECTION COMPONENT
 * ====================================================================
 */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Small timeout to ensure the image transition runs after component mounts
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full pt-10 pb-2">
      <div className="max-w-6xl mx-auto px-10 md:px-22 flex flex-col md:flex-row items-start gap-3 md:gap-4">
        
        {/* Left Column: Text and Slider */}
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

          {/* About Section */}
          <motion.div className="mt-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <motion.h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
              About
            </motion.h2>
            <motion.p className="font-info mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I started coding and quickly found it both fun and interesting. I’m driven
              by the desire to build things that make a real impact. My interests lie
              primarily in backend systems and modern AI — especially NLP with PyTorch
              and TensorFlow.
            </motion.p>
          </motion.div>

          {/* Tech Stack Slider Section */}
          <motion.div className="mt-10" {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
            <motion.h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
              Tech Stack
            </motion.h2>
            <TechStackSlider tools={techStackTools} />
          </motion.div>
        </div>

        {/* Right Column: Profile Picture */}
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
