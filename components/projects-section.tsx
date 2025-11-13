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
    <section className="px-6 md:px-12 py-24 text-center">
      <motion.span
        className="inline-block text-sm px-4 py-1 border rounded-full mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.span>

      <motion.h2
        className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Check out my latest work
      </motion.h2>

      <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
        I've worked on a variety of projects, from simple websites to complex web applications.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 border border-border rounded-xl bg-secondary/30 backdrop-blur-sm hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-4 text-sm">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
                >
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
