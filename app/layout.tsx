import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://syphax.vercel.app'),
  title: 'Syphax – Developer & AI Enthusiast',
  description:
    'Portfolio showcasing projects in AI, machine learning, and creative coding. Exploring the intersection of technology and creativity.',
  keywords: [
    'developer',
    'AI',
    'machine learning',
    'portfolio',
    'creative coding',
    'FastAPI',
    'transformers',
    'deep learning',
    'pytorch',
    'data science',
  ],
  authors: [{ name: 'Syphax' }],

  icons: {
    icon: '/favicon.png',
  },

  openGraph: {
    title: 'Syphax – Developer & AI Enthusiast',
    description:
      'Personal portfolio showcasing projects in AI, ML, and creative experiments.',
    url: 'https://syphax.vercel.app',
    siteName: 'Syphax Portfolio',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Syphax – Developer & AI Enthusiast',
    description:
      'Showcasing my work in AI, deep learning, and software architecture.',
    creator: '@syphax_twt',
  },

  manifest: '/site.webmanifest',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="relative pl-10"> 
        {/* Left Vertical Line */}
        <div className="pointer-events-none fixed left-0 top-0 h-screen w-[2px] bg-white/10 z-[9999]" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Layout Container */}
          <div className="max-w-6xl mx-auto px-6 py-10 space-y-24">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
