"use client";

import type { CSSProperties, ReactNode } from "react";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "none";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animationClasses: Record<AnimationVariant, string> = {
  "fade-up": "animate-fade-up",
  "fade-down": "animate-fade-down",
  "fade-left": "animate-fade-left",
  "fade-right": "animate-fade-right",
  "scale-up": "animate-scale-up",
  "blur-in": "animate-blur-in",
  "none": "",
};

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  once = true,
}: AnimateOnScrollProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: once,
  });

  const style: CSSProperties = {
    animationDelay: delay ? `${delay}ms` : undefined,
    animationDuration: `${duration}ms`,
  };

  return (
    <div
      className={cn(
        "scroll-animate",
        isInView && animation !== "none" && animationClasses[animation],
        isInView && "in-view",
        className
      )}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
