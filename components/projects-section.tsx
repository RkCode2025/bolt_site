'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import BlurFade from '@/components/blurfade';
import Image from 'next/image';

// Image imports
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
const SHARED_TRANSITION = {
  duration: 0.4,
  ease: [0.25, 1, 0.5, 1] as const, 
};

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-4 pb-12 relative">
      <div className="max-w-3xl mx-auto"> {/* Constrained width to keep cards from stretching */}
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-1 tracking-tight">
            Projects
          </h2>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 1.5} inView>
          <p className="text-xs text-muted-foreground mb-8">
            Made / Collaborated
          </p>
        </BlurFade>

        {/* Grid: 2 columns, but with a smaller gap and max-width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <BlurFade 
              key={project.title} 
              delay={BLUR_FADE_DELAY * 2 + index * 0.05} 
              inView
            >
              <motion.div
                initial="initial"
                whileHover="hover"
                animate="initial"
                className="group relative bg-secondary/10 backdrop-blur-sm rounded-xl border border-border/40 h-full flex flex-col overflow-hidden"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -4 } // Subtle lift
                }}
                transition={SHARED_TRANSITION}
              >
                {/* Image Section - Much shorter height */}
                <div className="relative h-32 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Content Section - Tightened padding */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2 leading-snug">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] uppercase font-semibold px-1.5 py-0.5 rounded bg-secondary/50 text-muted-foreground border border-border/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity"
                        title="Source Code"
                      >
                        <Github className="w-3.5 h-3.5" /> 
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> 
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
