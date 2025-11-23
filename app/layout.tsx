import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://syphax.vercel.app'),
  title: 'Syphax – Developer & AI Enthusiast',
  description:
    'Portfolio showcasing projects in AI, machine learning, and creative coding.',
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
    description: 'Portfolio showcasing AI and ML projects.',
    url: 'https://syphax.vercel.app',
    siteName: 'Syphax Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syphax – Developer & AI Enthusiast',
    description: 'AI, deep learning, and creative coding portfolio.',
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
      <body className="page-body relative">

        {/* LEFT VERTICAL LINE */}
        <div className="fixed left-0 top-0 h-screen w-[2px] bg-white/20 z-50" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* GRID CONTAINER */}
          <main className="grid min-h-screen w-full
                           grid-cols-1 md:grid-cols-12 
                           gap-6 px-6 md:px-12 py-10">

            {/* GRID CONTENT */}
            <div className="md:col-start-2 md:col-span-10">
              {children}
            </div>

          </main>
        </ThemeProvider>

      </body>
    </html>
  );
}
