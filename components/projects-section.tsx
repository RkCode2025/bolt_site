'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import BlurFade from '@/components/blurfade';
import Image from 'next/image';
import { useRef, useState } from 'react';

import neuralNetImg from '/e.png';
import xtrainImg from '/pr.jpeg';
import amazonImg from '/t.jpg';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: any;
  github?: string;
  demo?: string;
  year: string;
  index: number;
}

const projects: Project[] = [
  {
    title: 'Efficient MoE Transformer',
    description:
      'Compact Mixture-of-Experts Transformer architecture benchmarked on Wikitext-2. Designed for parameter efficiency without sacrificing model quality.',
    tags: ['PyTorch', 'Transformer', 'Research'],
    image: amazonImg,
    github: 'https://github.com/rkcode2025/wikitext-MoE-40M',
    year: '2024',
    index: 0,
  },
  {
    title: 'AI Image Authentication',
    description:
      'Custom CNN pipeline for detecting AI-generated imagery with a Gradio interface. Trained on a curated dataset of real vs. synthetic visuals.',
    tags: ['PyTorch', 'CNN', 'Gradio'],
    image: neuralNetImg,
    github: 'https://github.com/RkCode2025/AI-Authenticator',
    demo: 'https://tinyurl.com/syphaxauth',
    year: '2024',
    index: 1,
  },
  {
    title: 'XTRAIN',
    description:
      'CPU-focused deep learning library built in collaboration with /old-droid. Pure NumPy at its core — no GPU required.',
    tags: ['Deep Learning', 'NumPy', 'Collaboration'],
    image: xtrainImg,
    github: 'https://github.com/old-droid/XTRAIN',
    year: '2023',
    index: 2,
  },
];

const BLUR_FADE_DELAY = 0.2;

/** Tilt card with spring physics */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 28 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 2 + project.index * 0.1} inView>
      <TiltCard className="h-full">
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative h-full flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0d0d0d] shadow-[0_2px_40px_rgba(0,0,0,0.5)] cursor-default"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle animated border glow on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl z-20"
            animate={
              hovered
                ? { boxShadow: '0 0 0 1px rgba(255,255,255,0.12), 0 0 30px rgba(255,255,255,0.04)' }
                : { boxShadow: '0 0 0 1px rgba(255,255,255,0.0)' }
            }
            transition={{ duration: 0.35 }}
          />

          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden bg-[#111]">
            <motion.div
              className="w-full h-full"
              animate={hovered ? { scale: 1.07 } : { scale: 1 }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-80"
                priority={project.index < 3}
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />

            {/* Year badge */}
            <span className="absolute top-3 right-3 text-[10px] font-mono tracking-widest text-white/40 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/[0.07]">
              {project.year}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[15px] leading-snug text-white/90 tracking-tight">
                {project.title}
              </h3>
              {/* Animated arrow */}
              <motion.div
                animate={hovered ? { x: 2, y: -2, opacity: 1 } : { x: 0, y: 0, opacity: 0.3 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 mt-0.5"
              >
                <ArrowUpRight className="w-4 h-4 text-white/60" />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-[12px] text-white/40 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono uppercase tracking-widest px-2 py-[3px] rounded-md bg-white/[0.04] text-white/35 border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Action Buttons */}
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[10px] font-semibold tracking-wide hover:bg-white/90 transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-[10px] font-medium hover:bg-white/[0.09] hover:text-white/80 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </BlurFade>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-22 pt-8 pb-20 relative">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <div className="flex items-baseline gap-4 mb-1">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-white/90">
              Projects
            </h2>
            <span className="text-sm font-mono text-white/20 tracking-widest">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 1.5} inView>
          <p className="text-sm text-white/30 mb-12 font-light">
            Things I&apos;ve built &amp; collaborated on
          </p>
        </BlurFade>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
