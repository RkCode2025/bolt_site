'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import BlurFade from '@/components/blurfade';
import Image from 'next/image';

// Assuming these are exported from your constants or local assets
import neuralNetImg from '@/public/bolt_site/e.jpg';
import xtrainImg from '@/public/bolt_site/pr.jpeg';
import amazonImg from '@/public/bolt_site/s.jpg';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: any; // Using 'any' for imported static assets
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'Neural Network from Scratch',
    description: 'Recreating a Multilayer Perceptron Neural Network from scratch.',
    tags: ['Python', 'Scikit-Learn', 'Numpy'],
    image: neuralNetImg,
    github: 'https://github.com/rkcode2025/Hand_Digit_Recognition_with_Multilayer_Perceptron',
  },
  {
    title: 'XTRAIN',
    description: 'Worked with /old-droid on a CPU focused ML Library.',
    tags: ['Deep learning', 'Numpy', 'Collaboration'],
    image: xtrainImg,
    github: 'https://github.com/old-droid/XTRAIN',
  },
  {
    title: 'Analysis of Amazon Bestsellers',
    description: 'Detailed analysis of Amazon Bestsellers from 2009-2019.',
    tags: ['Numpy', 'Scikit-Learn', 'Plotly'],
    image: amazonImg,
    github: 'https://github.com/RkCode2025/Amazon-Bestseller-Books-2009-2019-Analysis',
  },
];

const BLUR_FADE_DELAY = 0.2;

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-22 pt-8 pb-16 relative">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-1 tracking-tight">
            Projects
          </h2>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 1.5} inView>
          <p className="text-sm text-muted-foreground mb-12">
            Made / Collaborated
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <BlurFade 
              key={project.title} 
              delay={BLUR_FADE_DELAY * 2 + index * 0.05} 
              inView
            >
              <motion.div
                className="group relative bg-secondary/20 backdrop-blur-sm rounded-xl border border-border/40 h-full flex flex-col overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Image Section - Upper Half */}
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Section - Lower Half */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-medium hover:opacity-90 transition-opacity"
                      >
                        <Github className="w-3.5 h-3.5" /> 
                        Source
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-[10px] font-medium hover:bg-secondary/80 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> 
                        Website
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
