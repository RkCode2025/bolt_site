'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import BlurFade from '@/components/blurfade';
import { 
  SiPython, 
  SiPytorch, 
  SiTensorflow, 
  SiNumpy, 
  SiScikitlearn, 
  SiPandas 
} from 'react-icons/si';
import { 
  XAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';
import { format, parseISO, subMonths, isAfter } from 'date-fns';

import profilePic from '/profile1.jpg';
import profilePic2 from '/profile2.jpg';

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileAlt, setIsProfileAlt] = useState(false);
  const [contributionData, setContributionData] = useState<any[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoaded(true), 50);
    
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/rkcode2025?y=last');
        const data = await response.json();
        
        if (data?.contributions) {
          const sixMonthsAgo = subMonths(new Date(), 6);
          const filteredData = data.contributions.filter((day: any) => 
            isAfter(parseISO(day.date), sixMonthsAgo)
          );

          setContributionData(filteredData);
          const total = filteredData.reduce((acc: number, curr: any) => acc + curr.count, 0);
          setTotalContributions(total);
        }
      } catch (error) {
        console.error("Failed to fetch github data", error);
      }
    };

    fetchContributions();
    return () => clearTimeout(timer);
  }, []);

  const techStack = [
    { name: 'Python', icon: <SiPython className="text-blue-400" /> },
    { name: 'PyTorch', icon: <SiPytorch className="text-orange-600" /> },
    { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-400" /> },
    { name: 'NumPy', icon: <SiNumpy className="text-blue-500" /> },
    { name: 'Scikit-learn', icon: <SiScikitlearn className="text-orange-500" /> },
    { name: 'Pandas', icon: <SiPandas className="text-indigo-400" /> },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border px-3 py-2 rounded-lg shadow-2xl backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            {format(parseISO(label), 'MMM d, yyyy')}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {payload[0].value} Contributions
          </p>
        </div>
      );
    }
    return null;
  };

  // Dynamic green color based on theme
  const chartColor = resolvedTheme === 'dark' ? '#22c55e' : '#16a34a'; 
  const gridColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  return (
    <section id="hero" className="w-full pt-10 pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1 w-full">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="font-heading text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
                Hi, I'm Syphax
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="font-info text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                I'm an AI/ML developer currently learning{" "}
                <span className="underline decoration-white-500/40 decoration-2 underline-offset-4 text-foreground/90">
                  Pytorch
                </span>{" "}
                and deep learning. I am interested in{" "}
                <span className="underline decoration-white-500/40 decoration-2 underline-offset-4 text-foreground/90">
                  Natural Language Processing
                </span>{" "}
                with focus on Research with implementing new designs for{" "}
                <span className="underline decoration-white-500/40 decoration-2 underline-offset-4 text-foreground/90">
                  Language Models
                </span>.
              </p>
            </BlurFade>

            <div className="mt-6">
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h2 className="font-heading text-lg md:text-xl font-medium tracking-tight">
                  About
                </h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <p className="font-info mt-2 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  I started coding and quickly found it both fun and interesting. I’m driven
                  by the desire to build things that make a real impact. My interests lie
                  primarily in Research and modern AI.
                </p>
              </BlurFade>
            </div>

            <div className="mt-6">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
                  Tech Stack
                </h2>
              </BlurFade>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {techStack.map((tech, idx) => (
                  <BlurFade 
                    key={tech.name} 
                    delay={BLUR_FADE_DELAY * 6 + idx * 0.05} 
                    inView
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border 
                      bg-secondary/50 text-secondary-foreground border-border/50
                      dark:bg-neutral-900/60 dark:text-neutral-200 dark:border-neutral-800
                      transition-all duration-300 hover:scale-105 whitespace-nowrap">
                      <span className="text-lg shrink-0">{tech.icon}</span>
                      <span className="font-info text-xs md:text-sm font-medium">{tech.name}</span>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-2 hidden md:block">
            <div 
              className="cursor-pointer group relative"
              onClick={() => setIsProfileAlt(!isProfileAlt)}
            >
              <BlurFade 
                key={isProfileAlt ? 'alt' : 'primary'} 
                delay={0} 
                duration={0.4}
              >
                <div
                  className={`w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border border-white/10 transform transition-all duration-700 ease-out ${
                    loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  } group-hover:scale-105 group-active:scale-95`}
                >
                  <Image
                    src={isProfileAlt ? profilePic2 : profilePic}
                    alt="Syphax Profile"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full select-none"
                    priority
                  />
                </div>
              </BlurFade>
              <div className="absolute -bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                <span className="text-[10px] font-medium uppercase tracking-widest">Click to flip</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="flex items-end justify-between mb-6 px-1">
              <div>
                <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
                  Contributions
                </h2>
                <p className="text-xs text-muted-foreground">Last 6 months activity</p>
              </div>
              <div className="text-right">
                <span className="text-xl md:text-2xl font-mono font-bold text-primary">
                  {totalContributions}
                </span>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Total Contributions</p>
              </div>
            </div>
            
            <div className="w-full h-[320px] p-6 pb-2 rounded-3xl border border-border/60 bg-gradient-to-b from-secondary/20 to-transparent backdrop-blur-sm relative overflow-hidden">
              {mounted && contributionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {/* Changed bottom margin to 30 to fix month name cutoff */}
                  <AreaChart data={contributionData} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      horizontal={true}
                      stroke={gridColor} 
                    />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      minTickGap={45}
                      tickFormatter={(str) => format(parseISO(str), 'MMM')}
                      tick={{ fontSize: 12, fill: '#888', fontWeight: 500 }}
                      dy={10} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke={chartColor} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorCount)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground animate-pulse font-mono text-sm">
                  LOADING_DATA_STREAM...
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
