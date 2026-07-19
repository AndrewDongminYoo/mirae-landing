"use client";

import { Apple, Play, Shield, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { getScreenPath } from "@/lib/screens";
import { ANDROID_STORE_URL, IOS_STORE_URL } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-warm-gradient-hero relative overflow-hidden px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-28"
      id="warmwake"
    >
      {/* Decorative concentric circles with animation */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-pulse-scale absolute top-1/3 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
        <div className="animate-pulse-scale absolute top-1/3 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-2xl delay-300" />
        <div className="animate-pulse-scale absolute top-1/3 left-1/2 h-50 w-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-xl delay-500" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        {/* Version Badge */}
        <AnimateOnScroll animation="scale-up" duration={500}>
          <div className="hover-lift mb-6 inline-flex cursor-default items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>v1.8.0 - 더욱 정교해진 음성 알람</span>
          </div>
        </AnimateOnScroll>

        {/* Logo / App Name */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="text-sm font-bold tracking-widest text-primary uppercase sm:text-base">
            WarmWake
          </p>
        </AnimateOnScroll>

        {/* Main Headline */}
        <AnimateOnScroll animation="fade-up" delay={200}>
          <h1
            className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
            id="hero-heading"
          >
            어제의 내가
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              오늘의 나를 깨워요
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={300}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-foreground/70 sm:text-lg md:text-xl">
            시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요.
            <br className="hidden sm:block" />
            <span className="text-foreground/60">
              8번의 업데이트로 더욱 안정적이고 정교해진 음성 알람 경험을 만나보세요.
            </span>
          </p>
        </AnimateOnScroll>

        {/* Trust Indicators */}
        <AnimateOnScroll animation="fade-up" delay={400}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/60 sm:gap-6">
            <div className="hover-lift flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-white/40">
              <Shield className="h-4 w-4 text-primary" />
              <span>100% 무료 핵심 기능</span>
            </div>
            <div className="hover-lift flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-white/40">
              <Zap className="h-4 w-4 text-primary" />
              <span>안정적인 알람 실행</span>
            </div>
            <div className="hover-lift flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-white/40">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>실시간 파형 시각화</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* CTA Buttons */}
        <AnimateOnScroll animation="scale-up" delay={500}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              asChild
              className="h-14 w-full max-w-xs gap-2.5 rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
              size="lg"
            >
              <Link
                href={IOS_STORE_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Apple className="h-5 w-5" />
                App Store
              </Link>
            </Button>

            <Button
              asChild
              className="h-14 w-full max-w-xs gap-2.5 rounded-2xl border-2 border-foreground/20 bg-white/60 px-8 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-foreground/30 hover:bg-white/80 sm:w-auto"
              size="lg"
              variant="outline"
            >
              <Link
                href={ANDROID_STORE_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Play className="h-5 w-5" />
                Google Play
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>

        {/* Phone Mockups */}
        <div className="relative mx-auto mt-16 flex items-end justify-center gap-3 sm:mt-20 sm:gap-4 md:gap-6">
          {/* Left Phone */}
          <AnimateOnScroll animation="fade-right" delay={600}>
            <div className="hover-scale relative aspect-9/19 w-24 shrink-0 sm:w-32 md:w-40 lg:w-48">
              <div className="absolute inset-0 rounded-[1.125rem] bg-foreground/5 shadow-lg" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.125rem] border border-white/50 bg-card shadow-xl">
                <Image
                  alt="온음 앱 음성 메시지 목록 화면"
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  src={getScreenPath("voiceMessagesList")}
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Center Phone (Main) - Float animation */}
          <AnimateOnScroll animation="scale-up" delay={400}>
            <div className="animate-float-slow hover-scale relative -mb-4 aspect-9/19 w-36 shrink-0 sm:-mb-6 sm:w-44 md:w-52 lg:w-60">
              <div className="absolute inset-0 rounded-[1.25rem] bg-foreground/5 shadow-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/50 bg-card shadow-2xl">
                <Image
                  alt="온음 앱 알람 울림 화면 - 어제의 당신이 남긴 메시지"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                  src={getScreenPath("alarmRing")}
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Phone */}
          <AnimateOnScroll animation="fade-left" delay={600}>
            <div className="hover-scale relative aspect-9/19 w-24 shrink-0 sm:w-32 md:w-40 lg:w-48">
              <div className="absolute inset-0 rounded-[1.125rem] bg-foreground/5 shadow-lg" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.125rem] border border-white/50 bg-card shadow-xl">
                <Image
                  alt="온음 앱 홈 화면"
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  src={getScreenPath("homeFabs")}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
