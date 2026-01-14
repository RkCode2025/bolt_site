'use client';

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
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

const firstRow = techStack.slice(0, techStack.length / 2);
const secondRow = techStack.slice(techStack.length / 2);

const TechCard = ({ name, icon }: { name: string; icon: React.ReactNode }) => {
  return (
    <div className={cn(
      "relative w-44 cursor-pointer overflow-hidden rounded-xl border p-4",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      "transition-all duration-300 hover:scale-105"
    )}>
      <div className="flex items-center gap-3">
        <span className="text-2xl shrink-0">{icon}</span>
        <span className="text-sm font-medium dark:text-white truncate">{name}</span>
      </div>
    </div>
  );
};

export function TechStackMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      
      {/* Side Gradients for a seamless "fade" effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
