import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Syphax – Developer & AI Enthusiast',
  description: 'Portfolio showcasing projects in AI, machine learning, and creative coding. Exploring the intersection of technology and creativity.',
  keywords: ['developer', 'AI', 'machine learning', 'portfolio', 'creative coding', 'FastAPI', 'transformers'],
  authors: [{ name: 'Syphax' }],
  openGraph: {
    title: 'Syphax – Developer & AI Enthusiast',
    description: 'Personal portfolio showcasing projects in AI, ML, and creative experiments.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
