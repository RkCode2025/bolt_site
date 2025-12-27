'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'X (Twitter)',
    url: 'https://x.com/syphax_twt',
    icon: Twitter,
    username: '@syphax_twt',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/rkcode2025',
    icon: Github,
    username: 'rkcode2025',
  },
];

export function SocialLinks() {
  return (
    <section className="px-6 md:px-12 pt-0 relative">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="font-info text-2xl md:text-3xl font-semibold tracking-wide uppercase text-neutral-800 dark:text-neutral-200 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Connect
        </motion.h2>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex items-center gap-6 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon with shake */}
              <motion.div
                className="relative z-10 p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                initial={{ rotate: 0 }}
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <link.icon className="w-8 h-8" />
              </motion.div>

              {/* Text */}
              <div className="relative z-10 flex-1">
                <h3 className="font-info text-xl font-semibold mb-1">{link.name}</h3>
                <p className="font-info text-sm text-muted-foreground">{link.username}</p>
              </div>

              {/* Arrow animation */}
              <motion.div
                className="relative z-10 text-muted-foreground"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-info text-muted-foreground mb-2">Open to collaborations and new ideas</p>
          <a
            href="mailto:syphaxtwt2025@gmail.com"
            className="inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors font-info"
          >
            <Mail className="w-4 h-4" /> Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
