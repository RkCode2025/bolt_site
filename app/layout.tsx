import './globals.css';                     // ← This is the required import
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
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
      { url: '/favicon/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/favicon/apple-touch-icon-167x167.png', sizes: '167x167' },
    ],
    shortcut: '/favicon/favicon.ico',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
      { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'msapplication-TileColor', url: '/favicon/mstile-150x150.png' },
    ],
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

  manifest: '/favicon/site.webmanifest',
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
