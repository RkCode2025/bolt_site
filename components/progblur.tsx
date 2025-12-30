import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  intensity?: string; // How strong the maximum blur is
  className?: string;
}

export function ProgressiveBlur({
  position = "bottom",
  height = "40%",
  intensity = "12px",
  className,
}: ProgressiveBlurProps) {
  
  // Mapping positions to CSS mask directions
  const maskDirections = {
    top: "to bottom",
    bottom: "to top",
    left: "to right",
    right: "to left",
  };

  const direction = maskDirections[position];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-40 select-none",
        // Position the blur container based on the prop
        position === "bottom" && "top-auto bottom-0 w-full",
        position === "top" && "bottom-auto top-0 w-full",
        position === "left" && "right-auto left-0 h-full",
        position === "right" && "left-auto right-0 h-full",
        className
      )}
      style={{
        // Sets the size of the blur area
        height: (position === "top" || position === "bottom") ? height : "100%",
        width: (position === "left" || position === "right") ? height : "100%",
        
        // The Magic: A backdrop blur combined with a linear mask
        backdropFilter: `blur(${intensity})`,
        WebkitBackdropFilter: `blur(${intensity})`,
        
        // This creates the "fade" effect of the blur itself
        WebkitMaskImage: `linear-gradient(${direction}, black, transparent)`,
        maskImage: `linear-gradient(${direction}, black, transparent)`,
      }}
    />
  );
}
