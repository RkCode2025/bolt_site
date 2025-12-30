'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';
import BlurFade from '@/components/blurfade';

const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/rkcode2025', 
    // Uses the official black color (181717)
    logo: 'https://cdn.simpleicons.org/github/181717' 
  },
  { 
    name: 'X (Twitter)', 
    url: 'https://x.com/syphax_twt', 
    // Uses black (000000)
    logo: 'https://cdn.simpleicons.org/x/000000' 
  },
  { 
    name: 'Gmail', 
    url: 'mailto:syphaxtwt2025@gmail.com', 
    // Using a dark version of the Gmail red or pure black
    logo: 'https://cdn.simpleicons.org/gmail/000000' 
  },
];

const BLUR_FADE_DELAY = 0.04;

export function SocialLinks() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const mailtoUrl = `mailto:syphaxtwt2025@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="socials" className="px-10 md:px-22 pt-8 pb-16 relative">
      <div className="max-w-6xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-1 tracking-tight">
            Contact
          </h2>
        </BlurFade>
        
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <p className="text-sm md:text-md text-muted-foreground mb-12">
            Get in touch / Reach out
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-1 space-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
              <p className="font-info text-sm text-muted-foreground mb-4">Find me here!</p>
            </BlurFade>
            
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, index) => (
                <BlurFade 
                  key={link.name} 
                  delay={BLUR_FADE_DELAY * 4 + index * 0.05} 
                  inView
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all font-info text-sm group"
                  >
                    {/* The icons are now forced to black/dark via the URL */}
                    <img 
                      src={link.logo} 
                      alt={`${link.name} logo`}
                      className="w-4 h-4 object-contain transition-transform group-hover:scale-110 grayscale brightness-0" 
                    />
                    <span>{link.name}</span>
                  </a>
                </BlurFade>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
              <div className="group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 transition-all hover:border-border/80">
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
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/10"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </div>
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}
