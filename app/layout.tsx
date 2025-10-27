import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://syphax.vercel.app'), // ✅ your deployed site domain
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

  // ✅ Favicon and app icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

  // ✅ Social / OG tags
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
    creator: '@syphax', // optional, if you have a Twitter handle
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
