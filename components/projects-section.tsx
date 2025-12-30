'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import BlurFade from '@/components/blurfade';

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'Neural Network from Scratch',
    description: 'Recreating a Multilayer Perceptron Neural Network from scratch.',
    tags: ['Python', 'Scikit-Learn', 'Numpy'],
    github: 'https://github.com/rkcode2025/Hand_Digit_Recognition_with_Multilayer_Perceptron',
  },
  {
    title: 'XTRAIN',
    description: 'Worked with /old-droid on a CPU focused ML Library.',
    tags: ['Deep learning', 'Numpy', 'Collaboration'],
    github: 'https://github.com/old-droid/XTRAIN',
  },
  {
    title: 'Analysis of Amazon Bestsellers',
    description: 'Detailed analysis of Amazon Bestsellers from 2009-2019.',
    tags: ['Numpy', 'Scikit-Learn', 'Plotly'],
    github: 'https://github.com/RkCode2025/Amazon-Bestseller-Books-2009-2019-Analysis',
  },
];

// Configuration for staggered entry
const BLUR_FADE_DELAY = 0.2;

export function ProjectsSection() {
  return (
    <section id="projects" className="px-10 md:px-22 pt-8 pb-16 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-1 tracking-tight">
            Projects
          </h2>
        </BlurFade>

        {/* Section Subtitle */}
        <BlurFade delay={BLUR_FADE_DELAY * 1.5} inView>
          <p className="text-sm md:text-md text-muted-foreground mb-16">
            Made / Collaborated
          </p>
        </BlurFade>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <BlurFade 
              key={project.title} 
              delay={BLUR_FADE_DELAY * 2 + index * 0.05} 
              inView
            >
              {/* Internal card with smooth hover states */}
              <motion.div
                className="group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 h-full flex flex-col overflow-hidden"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="font-info text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
                      >
                        <Github className="w-4 h-4 transition-transform group-hover/link:rotate-12" /> 
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
                      >
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" /> 
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
