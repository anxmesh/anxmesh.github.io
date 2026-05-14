"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
}: AnimatedSectionProps) {
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`animate-${animation} ${className}`}>
      {children}
    </div>
  );
}
