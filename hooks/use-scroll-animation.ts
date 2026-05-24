"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  useLayoutEffect(() => {
    // Enable CSS hiding only after JS has initialized (idempotent, set by the first instance)
    document.documentElement.dataset.jsAnimations = "";

    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reveal fallbacks after hydration without changing initial markup
      setIsInView(true);
      return;
    }

    // Reveal elements already in the viewport before the first paint — no animation flash
    const { top, bottom } = element.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- useLayoutEffect is designed for synchronous DOM reads + state updates before paint
      setIsInView(true);
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback reveal is handled in the layout effect above.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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

  return { ref, isInView };
}
