'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profilePic from '@/public/Miyamoto_Musashi.jpg'; // ✅ Make sure image is in /public folder

export function HeroSection() {
  return (
    <section className="px-6 md:px-20 py-14 flex flex-col items-start relative text-black">
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Profile beside intro - tighter horizontal layout */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:flex-1"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
              Hi, I'm Syphax
            </h1>
            <p className="text-base md:text-lg leading-snug font-medium text-black">
              Developer passionate about learning, improving, and adapting every day.  
              Deeply interested in Machine Learning, Artificial Intelligence,  
              and software architecture.
            </p>
          </motion.div>

          <motion.div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-black/20 
                       bg-background/50 backdrop-blur-sm shrink-0 mx-auto md:mx-0 md:ml-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image src={profilePic} alt="Profile" fill className="object-cover" priority />
          </motion.div>
        </div>

        {/* About */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-1">About</h2>
          <p className="text-sm md:text-base leading-snug max-w-2xl text-gray-700">
            Fascinated by how intelligence can be built — from ML fundamentals to AI systems.  
            Focused on scalable model design, NLP with PyTorch & TensorFlow, and modern dev practices.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-1">Education</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 text-sm">
            <div>
              <p className="font-medium text-black">Independent Learner</p>
              <p>Deep Learning, AI Systems & Web Development</p>
            </div>
            <span className="text-xs sm:text-sm mt-1 sm:mt-0 opacity-80">2023 – Present</span>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Python', 'NumPy', 'Pandas', 'scikit-learn',
              'Machine Learning', 'PyTorch', 'Data Science',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-black/10 rounded-full text-xs md:text-sm 
                           text-black/80 font-medium"
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

