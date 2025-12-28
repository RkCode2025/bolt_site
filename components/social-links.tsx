'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Send } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rkcode2025', icon: Github },
  { name: 'X (Twitter)', url: 'https://x.com/syphax_twt', icon: Twitter },
  { name: 'Email', url: 'mailto:syphaxtwt2025@gmail.com', icon: Mail },
];

export function SocialLinks() {
  return (
    <section className="px-6 py-20 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <header className="mb-10">
          <p className="text-muted-foreground uppercase tracking-widest text-xs mb-2 font-mono">Contact</p>
          <h2 className="text-5xl font-bold mb-4 font-heading">Find me here!</h2>
          <p className="text-muted-foreground text-lg">
            Send me a message or reach out through my accounts.
          </p>
        </header>

        {/* Social Badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111] border border-white/10 hover:border-white/20 transition-all hover:bg-[#181818] font-mono text-sm"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact Form Card */}
        <motion.div 
          className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <textarea 
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#583AFE] hover:bg-[#472ee0] text-white font-semibold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
