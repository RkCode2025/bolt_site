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

  const chartColor = resolvedTheme === 'dark' ? '#22c55e' : '#16a34a'; 
  const gridColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  return (
    <section id="hero" className="w-full pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="flex-1 w-full">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <h1 className="font-heading text-5xl md:text-6xl font-semibold mb-4 tracking-tight">
                Hi, I'm Syphax
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="font-info text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                I'm an AI/ML developer currently learning{" "}
                <span className="underline decoration-primary/40 decoration-2 underline-offset-4 text-foreground/90 font-medium">
                  Pytorch
                </span>{" "}
                and deep learning. I am interested in{" "}
                <span className="underline decoration-primary/40 decoration-2 underline-offset-4 text-foreground/90 font-medium">
                  Natural Language Processing
                </span>{" "}
                with focus on Research and implementing new designs for{" "}
                <span className="underline decoration-primary/40 decoration-2 underline-offset-4 text-foreground/90 font-medium">
                  Language Models
                </span>.
              </p>
            </BlurFade>

            <div className="mt-8">
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <h2 className="font-heading text-lg md:text-xl font-medium tracking-tight opacity-80">
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

            <div className="mt-8">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight opacity-80">
                  Tech Stack
                </h2>
              </BlurFade>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {techStack.map((tech, idx) => (
                  <BlurFade 
                    key={tech.name} 
                    delay={BLUR_FADE_DELAY * 6 + idx * 0.05} 
                    inView
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border 
                      bg-secondary/30 text-secondary-foreground border-border/40
                      dark:bg-neutral-900/40 dark:text-neutral-200 dark:border-neutral-800/50
                      transition-all duration-300 hover:scale-105 whitespace-nowrap">
                      <span className="text-xl shrink-0">{tech.icon}</span>
                      <span className="font-info text-xs md:text-sm font-semibold">{tech.name}</span>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 pt-4 hidden md:block">
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
                  className={`w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden shadow-2xl border border-white/5 transform transition-all duration-700 ease-out ${
                    loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  } group-hover:rotate-2 group-hover:scale-105`}
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
              <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Switch View</span>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Contribution Graph Section */}
        <div className="mt-20 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="flex items-end justify-between mb-8 px-2">
              <div className="space-y-1">
                <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight">
                  Activity
                </h2>
                <p className="text-sm text-muted-foreground font-medium">GitHub contributions • Last 6 months</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-2xl md:text-3xl font-mono font-bold text-primary tabular-nums">
                  {totalContributions}
                </span>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Units</p>
              </div>
            </div>
            
            {/* Height increased to 320px to prevent crammed feel */}
            <div className="w-full h-[320px] p-6 pb-2 rounded-[2.5rem] border border-border/40 bg-secondary/5 dark:bg-neutral-900/20 backdrop-blur-sm relative overflow-visible">
              {mounted && contributionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {/* Added more bottom margin here to fix the text cutting off */}
                  <AreaChart data={contributionData} margin={{ top: 10, right: 10, left: -25, bottom: 25 }}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="4 4" 
                      vertical={true} 
                      horizontal={true}
                      stroke={gridColor} 
                    />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      minTickGap={40}
                      tickFormatter={(str) => format(parseISO(str), 'MMM')}
                      // Style adjusted for better visibility
                      tick={{ fontSize: 12, fill: '#888', fontWeight: 600 }}
                      dy={20} // Pushes labels down away from the grid
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: chartColor, strokeWidth: 1 }} />
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
                <div className="w-full h-full flex items-center justify-center text-muted-foreground animate-pulse font-mono text-sm tracking-widest">
                  SYNCING_GTIHUB_METRICS...
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
