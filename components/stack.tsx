'use client';

import { 
  SiPython, SiPytorch, SiTensorflow, SiNumpy, 
  SiScikitlearn, SiPandas, SiHuggingface, 
  SiOpenai, SiKeras, SiJupyter, SiLangchain, SiFastapi 
} from 'react-icons/si';

const techStack = [
  { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
  { name: 'PyTorch', icon: <SiPytorch className="text-[#EE4C2C]" /> },
  { name: 'TensorFlow', icon: <SiTensorflow className="text-[#FF9E0F]" /> },
  { name: 'NumPy', icon: <SiNumpy className="text-[#013243]" /> },
  { name: 'Scikit-learn', icon: <SiScikitlearn className="text-[#F7931E]" /> },
  { name: 'Pandas', icon: <SiPandas className="text-[#150458]" /> },
  { name: 'Hugging Face', icon: <SiHuggingface className="text-[#FFD21E]" /> },
  { name: 'OpenAI', icon: <SiOpenai className="text-[#412991] dark:text-white" /> },
  { name: 'LangChain', icon: <SiLangchain className="text-[#121212] dark:text-slate-300" /> },
  { name: 'FastAPI', icon: <SiFastapi className="text-[#05998B]" /> },
  { name: 'Keras', icon: <SiKeras className="text-[#D00000]" /> },
  { name: 'Jupyter', icon: <SiJupyter className="text-[#F37626]" /> },
];

const TechCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-3 px-6 py-4 mx-2 min-w-[160px] rounded-xl border border-gray-950/[.1] bg-gray-950/[.02] dark:border-gray-50/[.1] dark:bg-gray-50/[.05] hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.1] transition-colors">
    <span className="text-2xl shrink-0">{icon}</span>
    <span className="text-sm font-medium dark:text-white whitespace-nowrap">{name}</span>
  </div>
);

export function TechStackMarquee() {
  return (
    <div className="group relative flex flex-col gap-6 overflow-hidden py-10">
      {/* Custom Styles for Animation */}
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50%)); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .reverse-marquee {
          animation-direction: reverse;
        }
        .pause:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Row 1 */}
      <div className="flex pause">
        <div className="animate-marquee">
          {/* Render twice for seamless loop */}
          {[...techStack, ...techStack].map((tech, i) => (
            <TechCard key={`row1-${i}`} {...tech} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex pause">
        <div className="animate-marquee reverse-marquee">
          {[...techStack, ...techStack].map((tech, i) => (
            <TechCard key={`row2-${i}`} {...tech} />
          ))}
        </div>
      </div>

      {/* Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] z-10" />
    </div>
  );
}
