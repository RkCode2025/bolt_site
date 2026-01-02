'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import BlurFade from '@/components/blurfade';
import Image from 'next/image';

// Assuming these are exported from your constants or local assets
import neuralNetImg from '/e.jpg';
import xtrainImg from '/pr.jpeg';
import amazonImg from '/t.jpg';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: any; 
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'Efficient MoE Transformer',
    description: 'A compact 109M MoE transformer benchmarking on Wikitext-2.',
    tags: ['Pytorch', 'Transformer', 'Research'],
    image: amazonImg,
    github: 'https://github.com/rkcode2025/wikitext-MoE-40M',
  },
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
];

const BLUR_FADE_DELAY = 0.2;

export function ProjectsSection() {
  return (
    // max-w-7xl ensures the row is physically wider across the screen
    <section id="projects" className="px-4 md:px-8 pt-8 pb-16 relative w-full">
      <div className="max-w-7xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-1 tracking-tight">
            Projects
          </h2>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 1.5} inView>
          <p className="text-sm text-muted-foreground mb-10">
            Made / Collaborated
          </p>
        </BlurFade>

        {/* 3 columns on large screens, gap-4 to keep it tight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <BlurFade 
              key={project.title} 
              delay={BLUR_FADE_DELAY * 2 + index * 0.05} 
              inView
            >
              <motion.div
                className="group relative bg-secondary/20 backdrop-blur-sm rounded-xl border border-border/40 overflow-hidden flex flex-col h-auto"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Image Section - Reduced height from h-44 to h-32 to make it "less long" */}
                <div className="relative h-32 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Section - Tighter padding to keep the box short */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-[12px] text-muted-foreground mb-3 line-clamp-2 leading-snug">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-foreground text-background text-[10px] font-medium hover:opacity-90 transition-opacity"
                      >
                        <Github className="w-3 h-3" /> 
                        Source
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary border border-border text-[10px] font-medium hover:bg-secondary/80 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> 
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
