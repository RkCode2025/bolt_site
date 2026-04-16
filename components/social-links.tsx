'use client';

import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import BlurFade from '@/components/blurfade';

const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/rkcode2025', 
    logo: 'https://cdn.simpleicons.org/github/white' 
  },
  { 
    name: 'X (Twitter)', 
    url: 'https://x.com/syphax_twt', 
    logo: 'https://cdn.simpleicons.org/x/white' 
  },
  { 
    name: 'Gmail', 
    url: 'mailto:syphaxtwt2025@gmail.com', 
    logo: 'https://cdn.simpleicons.org/gmail/EA4335' 
  },
];

const BLUR_FADE_DELAY = 0.04;

export function SocialLinks() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSend = async () => {
    // Basic validation
    if (!name.trim() || !message.trim()) return;

    setStatus('sending');

    // PASTE YOUR DISCORD WEBHOOK URL HERE
    const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: "🚀 New Portfolio Message",
            color: 0x5865F2, // Discord Blurple
            fields: [
              { name: "From", value: name, inline: true },
              { name: "Message", value: message }
            ],
            timestamp: new Date().toISOString(),
          }]
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setMessage('');
        // Reset button after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Discord Webhook Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
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
          
          {/* Left Side: Social Links */}
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
                    <img 
                      src={link.logo} 
                      alt={`${link.name} logo`}
                      className="w-4 h-4 object-contain transition-transform group-hover:scale-110" 
                    />
                    <span>{link.name}</span>
                  </a>
                </BlurFade>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="lg:col-span-2">
            <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
              <div className="group relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 transition-all hover:border-border/80">
                <div className="relative z-10 space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-info text-muted-foreground uppercase tracking-wider ml-1">Name</label>
                      <input
                        type="text"
                        disabled={status === 'sending'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-info text-sm disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-info text-muted-foreground uppercase tracking-wider ml-1">Message</label>
                      <textarea
                        rows={4}
                        disabled={status === 'sending'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none font-info text-sm disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: status === 'idle' ? 1.01 : 1 }}
                    whileTap={{ scale: status === 'idle' ? 0.99 : 1 }}
                    onClick={handleSend}
                    disabled={status !== 'idle' || !name || !message}
                    className={`w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg disabled:cursor-not-allowed
                      ${status === 'success' ? 'bg-green-600 text-white' : 
                        status === 'error' ? 'bg-red-600 text-white' : 
                        'bg-primary text-primary-foreground shadow-primary/10 disabled:opacity-50'}`}
                  >
                    {status === 'idle' && (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                    {status === 'sending' && (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent!
                      </>
                    )}
                    {status === 'error' && (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong
                      </>
                    )}
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
