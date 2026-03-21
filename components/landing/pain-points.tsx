"use client";

import { AlarmClock, Frown, Volume2 } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const painPoints = [
  {
    icon: AlarmClock,
    label: "확실히 깨지 못하는 애매한 알람",
  },
  {
    icon: Frown,
    label: "좋아하던 노래도 싫어하게 되는 마법",
  },
  {
    icon: Volume2,
    label: "의미없는 알람 소리에 지치는 마음",
  },
];

export function PainPoints() {
  return (
    <section
      aria-labelledby="pain-points-heading"
      className="relative overflow-hidden bg-foreground px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* Decorative warm overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <AnimateOnScroll animation="blur-in">
            <h2
              className="text-xl font-bold tracking-tight text-balance text-background sm:text-2xl md:text-3xl"
              id="pain-points-heading"
            >
              매번 반복되고 지겨운 알람,
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                기상에 대한 동기부여
              </span>
              가 필요합니다
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {painPoints.map((point, index) => (
            <AnimateOnScroll 
              key={point.label} 
              animation="scale-up" 
              delay={150 + index * 100}
            >
              <div
                className="flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3 hover-lift transition-all duration-200 cursor-default"
              >
                <point.icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5"
                />
                <span className="text-sm font-medium text-background sm:text-base">
                  {point.label}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animation="scale-up" delay={500}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 shadow-lg shadow-primary/20 sm:px-8 hover-glow transition-all duration-300 cursor-default">
              <span className="text-sm font-semibold text-white sm:text-base">
                기분좋게 일어나고 싶다면, 온음이 도와드릴게요!
              </span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
