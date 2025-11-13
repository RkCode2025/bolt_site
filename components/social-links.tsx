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
    <section className="px-6 md:px-12 py-24 text-center">
      <motion.span
        className="inline-block text-sm px-4 py-1 border rounded-full mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.span>

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h2>

      <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
        Want to chat? Just shoot me a DM{' '}
        <a href="https://x.com/syphax_twt" className="text-primary underline">
          on Twitter
        </a>{' '}
        and I’ll respond whenever I can.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <link.icon className="w-8 h-8 text-foreground" />
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold">{link.name}</h3>
              <p className="text-sm text-muted-foreground font-mono">{link.username}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-2">Open to collaborations and new ideas</p>
        <a
          href="mailto:syphaxtwt2025@gmail.com"
          className="inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors font-mono"
        >
          <Mail className="w-4 h-4" />
          Get in touch
        </a>
      </motion.div>
    </section>
  );
}
