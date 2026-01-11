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

const SHARED_TRANSITION = {
  duration: 0.4,
  ease: [0.25, 1, 0.5, 1] as const, 
};

export function ProjectsSection() {
  return (
    <section id="projects" className="px-2 md:px-4 pt-8 pb-16 relative">
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

        {/* Updated Grid: Changed from lg:grid-cols-3 to md:grid-cols-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group relative bg-secondary/20 backdrop-blur-sm rounded-2xl border border-border/40 h-full flex flex-col overflow-hidden will-change-transform"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -8 }
                }}
                transition={SHARED_TRANSITION}
              >
                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                  <motion.div 
                    className="w-full h-full"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={SHARED_TRANSITION}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={index < 2}
                    />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
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
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        <Github className="w-4 h-4" /> 
                        Source
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary border border-border text-xs font-medium hover:bg-secondary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> 
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
