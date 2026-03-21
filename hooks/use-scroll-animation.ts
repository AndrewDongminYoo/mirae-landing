"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasTriggered(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, hasTriggered };
}

// Hook for staggered animations on multiple children
export function useStaggerAnimation(
  itemCount: number,
  baseDelay: number = 100
) {
  const getDelay = useCallback(
    (index: number) => `${index * baseDelay}ms`,
    [baseDelay]
  );

  const getDelayClass = useCallback(
    (index: number) => {
      const delay = index * baseDelay;
      if (delay <= 100) return "delay-100";
      if (delay <= 200) return "delay-200";
      if (delay <= 300) return "delay-300";
      if (delay <= 400) return "delay-400";
      if (delay <= 500) return "delay-500";
      return "";
    },
    [baseDelay]
  );

  return { getDelay, getDelayClass };
}
