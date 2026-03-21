"use client";

import { ReactNode, CSSProperties } from "react";
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
  as?: keyof JSX.IntrinsicElements;
}

const animationClasses: Record<AnimationVariant, string> = {
  "fade-up": "animate-fade-up",
  "fade-down": "animate-fade-down",
  "fade-left": "animate-fade-left",
  "fade-right": "animate-fade-right",
  "scale-up": "animate-scale-up",
  "blur-in": "animate-blur-in",
  none: "",
};

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  once = true,
  as: Component = "div",
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
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "scroll-animate",
        isInView && animation !== "none" && animationClasses[animation],
        isInView && "in-view",
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

// Staggered children wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: AnimationVariant;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  animation = "fade-up",
  threshold = 0.1,
}: StaggerContainerProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "scroll-animate",
                isInView && animationClasses[animation],
                isInView && "in-view"
              )}
              style={{
                animationDelay: `${index * staggerDelay}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
