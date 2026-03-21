"use client";

import { Apple, Play, Shield, Sparkles, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { getScreenPath } from "@/lib/screens";

export function FeatureVoice() {
  return (
    <section
      aria-labelledby="feature-voice-heading"
      className="relative overflow-hidden bg-warm-gradient-subtle px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-primary/5 blur-3xl animate-pulse-scale" />
        <div className="absolute bottom-1/4 left-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl animate-pulse-scale delay-500" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            {/* Logo */}
            <AnimateOnScroll animation="fade-right">
              <div className="inline-flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  온<span className="text-primary">:</span>음
                </span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-right" delay={100}>
              <p className="mt-4 text-sm font-semibold text-primary sm:text-base">
                음성 메시지 알람
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-right" delay={200}>
              <h2
                className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
                id="feature-voice-heading"
              >
                나에게서 온 따뜻한 응원으로
                <br />
                <span className="text-primary">기분 좋은 아침</span>을 맞이하세요
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-right" delay={300}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground lg:mx-0">
                전날 밤, 내일 아침의 나에게 전할 메시지를 녹음하세요. 설정한 시간에 내 목소리가 울려
                퍼지며 하루가 시작됩니다.
              </p>
            </AnimateOnScroll>

            {/* Key benefits */}
            <AnimateOnScroll animation="fade-right" delay={400}>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-foreground/70 lg:justify-start">
                <div className="flex items-center gap-1.5 hover-lift px-3 py-1.5 rounded-full transition-colors hover:bg-white/60">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>안정적인 알람</span>
                </div>
                <div className="flex items-center gap-1.5 hover-lift px-3 py-1.5 rounded-full transition-colors hover:bg-white/60">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <span>고품질 음성 재생</span>
                </div>
                <div className="flex items-center gap-1.5 hover-lift px-3 py-1.5 rounded-full transition-colors hover:bg-white/60">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>실시간 파형</span>
                </div>
              </div>
            </AnimateOnScroll>

            {/* CTA */}
            <AnimateOnScroll animation="scale-up" delay={500}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  className="h-12 gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
                  size="lg"
                >
                  <Link
                    href="https://apps.apple.com/app/id6758120543"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Apple className="h-4 w-4" />
                    App Store
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-12 gap-2 rounded-xl border-foreground/20 bg-white/60 px-6 font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:scale-[1.02]"
                  size="lg"
                  variant="outline"
                >
                  <Link
                    href="https://play.google.com/store/apps/details?id=kr.mirae.app"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Play className="h-4 w-4" />
                    Google Play
                  </Link>
                </Button>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Phone Mockups */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative flex items-end gap-4">
              {/* Background Phone */}
              <AnimateOnScroll animation="fade-left" delay={300}>
                <div className="relative aspect-9/19 w-32 translate-y-8 sm:w-40 md:w-44 hover-scale transition-transform duration-300">
                  <div className="absolute inset-0 rounded-3xl bg-foreground/5 shadow-lg" />
                  <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/50 bg-card shadow-xl">
                    <Image
                      alt="온음 앱 알람 시간 및 요일 설정 화면"
                      className="object-cover"
                      fill
                      src={getScreenPath("alarmDetail")}
                    />
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Main Phone */}
              <AnimateOnScroll animation="fade-left" delay={100}>
                <div className="relative aspect-9/19 w-40 sm:w-52 md:w-56 animate-float-slow hover-scale transition-transform duration-300">
                  <div className="absolute inset-0 rounded-4xl bg-foreground/5 shadow-2xl" />
                  <div className="relative h-full w-full overflow-hidden rounded-4xl border border-white/50 bg-card shadow-2xl">
                    <Image
                      alt="온음 앱 알람 울림 화면 - 어제의 당신이 남긴 메시지"
                      className="object-cover"
                      fill
                      src={getScreenPath("alarmRing")}
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
