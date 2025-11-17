'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

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
    tags: ['Python', 'Neural Nets', 'Numpy'],
    github: 'https://github.com/rkcode2025/Hand_Digit_Recognition_with_Multilayer_Perceptron',
  },
  {
    title: 'Loan Approval Probability Classification',
    description: 'Classification of probability of Bank Loan Approval.',
    tags: ['Numpy', 'Xgboost', 'Scikit Learn'],
    github: 'https://github.com/RkCode2025/Loan-Approval-Classification',
  },
  {
    title: 'Analysis of Amazon Bestsellers',
    description: 'Detailed analysis of Amazon Bestsellers from 2009-2019.',
    tags: ['Numpy', 'Plotly', 'Data Science'],
    github: 'https://github.com/RkCode2025/Amazon-Bestseller-Books-2009-2019-Analysis',
  },
];

export function ProjectsSection() {
  return (
    <section className="px-6 md:px-12 pt-4 pb-16 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-semibold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 h-full flex flex-col"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-jetbrains"
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
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
