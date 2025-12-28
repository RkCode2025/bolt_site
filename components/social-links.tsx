'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Send } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rkcode2025', icon: Github },
  { name: 'X (Twitter)', url: 'https://x.com/syphax_twt', icon: Twitter },
  { name: 'Email', url: 'mailto:syphaxtwt2025@gmail.com', icon: Mail },
];

export function SocialLinks() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const mailtoUrl = `mailto:syphaxtwt2025@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section className="px-10 md:px-22 pt-8 pb-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header - Using animate instead of whileInView to prevent repeat */}
        <motion.h2
          className="font-heading text-4xl md:text-5xl font-semibold mb-1 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>
        
        <motion.p
          className="text-sm md:text-md text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get in touch / Reach out
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Badge Links */}
          <div className="lg:col-span-1 space-y-4">
            <p className="font-info text-sm text-muted-foreground mb-4">Find me here!</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all font-info text-sm group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <link.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <motion.div
            className="lg:col-span-2 group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-info text-muted-foreground uppercase tracking-wider ml-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-info text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-info text-muted-foreground uppercase tracking-wider ml-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none font-info text-sm"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSend}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
