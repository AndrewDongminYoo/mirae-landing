"use client";

import React from "react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

type PolicySectionProps = {
  id: string;
  heading: string;
  children: React.ReactNode;
  index?: number;
};

export function PolicySection({ id, heading, children, index = 0 }: PolicySectionProps) {
  return (
    <AnimateOnScroll animation="fade-up" delay={100 + index * 50}>
      <section className="space-y-4" id={id}>
        <div className="rounded-3xl border-l-4 border-l-primary/40 border border-primary/15 bg-white/60 p-6 shadow-md shadow-primary/5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10">
          <h2 className="text-xl font-bold text-foreground">{heading}</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
        </div>
      </section>
    </AnimateOnScroll>
  );
}
