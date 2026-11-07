"use client";

import { CheckCircle, Clock, Shield, Sparkles } from "lucide-react";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { APP_RELEASE_STATUS, APP_VERSION } from "@/lib/site";

const updates = [
  {
    icon: Clock,
    title: "알람별 다시 울림",
    description: "알람마다 간격을 정할 수 있어요.",
  },
  {
    icon: Sparkles,
    title: "시간대에 맞는 인사",
    description: "음성 메시지가 없을 때도 인사를 전해요.",
  },
  {
    icon: Shield,
    title: "알람별 기상 확인",
    description: "사용 여부와 대기 시간을 정해요.",
  },
  {
    icon: CheckCircle,
    title: "100% 무료 핵심 기능",
    description: "광고 없이 하루를 시작해요.",
  },
];

export function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-scale absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <AnimateOnScroll animation="fade-up">
          <p className="text-sm font-semibold text-primary">오늘의 메시지</p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="blur-in" delay={100}>
          <h2
            className="mt-3 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
            id="cta-heading"
          >
            오늘 하루를 <span className="text-primary">어떤 마음가짐으로</span>
            <br />
            시작할지 결정해 보세요
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
            오늘 밤, 내일 아침 일어날 나에게 따뜻한 응원을 남겨보세요. 어제의 내가 건네는 메시지로
            기분 좋은 아침을 시작하세요.
          </p>
        </AnimateOnScroll>

        {/* Updates Grid */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {updates.map((update, index) => (
            <AnimateOnScroll animation="scale-up" delay={300 + index * 100} key={update.title}>
              <div className="hover-lift flex cursor-default flex-col items-center rounded-2xl border border-primary/10 bg-primary/5 p-4 text-center transition-all duration-200 hover:border-primary/20 hover:bg-primary/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <update.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{update.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{update.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Version info */}
        <AnimateOnScroll animation="scale-up" delay={700}>
          <div className="animate-pulse-glow mt-10 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">v{APP_VERSION}</span>
            <span>업데이트</span>
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            {APP_RELEASE_STATUS}
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
