"use client";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function Problem() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="relative overflow-hidden border-t border-primary/10 bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Subtle decorative element with animation */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-scale absolute top-1/2 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <AnimateOnScroll animation="fade-up">
          <p className="text-sm font-medium text-primary">아침마다 반복되는</p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="blur-in" delay={100}>
          <h2
            className="mt-3 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
            id="problem-heading"
          >
            기분 좋은 아침을 맞이하고 계신가요?
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            매일 아침 같은 알람 소리에 지쳐가고 있다면, 이제 다른 방법을 시도해볼 때입니다.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
