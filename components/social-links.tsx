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

export function SozialLinks() {
  return (
    <section className="px-6 md:px-12 py-24 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-semibold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Connect
        </motion.h2>

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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                className="relative z-10 p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <link.icon className="w-8 h-8" />
              </motion.div>

              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-semibold mb-1">{link.name}</h3>
                <p className="text-sm text-muted-foreground font-jetbrains">{link.username}</p>
              </div>

              <motion.div
                className="relative z-10 text-muted-foreground"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
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

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-2">Open to collaborations and new ideas</p>
          <a
            href="mailto:syphaxtwt2025@gmail.com"
            className="inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors font-jetbrains"
          >
            <Mail className="w-4 h-4" /> Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
