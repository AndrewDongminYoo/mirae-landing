"use client";

import { Clock, Moon, Palette, Volume2 } from "lucide-react";
import Image from "next/image";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { getScreenPath } from "@/lib/screens";

export function FeatureSettings() {
  return (
    <section
      aria-labelledby="feature-settings-heading"
      className="relative overflow-hidden bg-warm-gradient-subtle px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-white/40 blur-3xl animate-pulse-scale" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <AnimateOnScroll animation="fade-right">
              <p className="text-sm font-semibold text-primary sm:text-base">세부 설정</p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-right" delay={100}>
              <h2
                className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
                id="feature-settings-heading"
              >
                나에게 맞는 설정으로
                <br />
                <span className="text-primary">알람을 커스터마이즈</span>하세요
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-right" delay={200}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground lg:mx-0">
                볼륨, 스누즈 간격, 반복 요일 등 다양한 설정을 조절할 수 있어요.{" "}
                <span className="text-foreground/70">
                  라이트/다크 모드는 물론, 시간대별 자동 전환 기능도 제공합니다.
                </span>
              </p>
            </AnimateOnScroll>

            {/* Features */}
            <AnimateOnScroll animation="fade-right" delay={300}>
              <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <li className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm hover-lift transition-all duration-200">
                  <Volume2 className="h-4 w-4 text-primary" />
                  볼륨 조절
                </li>
                <li className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm hover-lift transition-all duration-200">
                  <Clock className="h-4 w-4 text-primary" />
                  스누즈 설정
                </li>
                <li className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm hover-lift transition-all duration-200">
                  <Palette className="h-4 w-4 text-primary" />
                  테마 변경
                </li>
                <li className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm hover-lift transition-all duration-200">
                  <Moon className="h-4 w-4 text-primary" />
                  자동 다크 모드
                </li>
              </ul>
            </AnimateOnScroll>

            {/* Plus features callout */}
            <AnimateOnScroll animation="scale-up" delay={400}>
              <div className="mt-8 rounded-2xl border border-primary/20 bg-white/60 p-4 backdrop-blur-sm lg:max-w-md hover-lift hover-glow transition-all duration-300">
                <p className="text-sm text-foreground/70">
                  <span className="font-semibold text-primary">온:음 Plus</span> - 링 화면
                  커스터마이즈, 앱 아이콘 테마, 음성 내보내기/가져오기 등 프리미엄 기능으로 더욱
                  나만의 알람을 만들어보세요.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Phone Mockups */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative flex items-center gap-4">
              {/* Background Phone */}
              <AnimateOnScroll animation="fade-left" delay={300}>
                <div className="relative aspect-9/19 w-32 translate-y-6 sm:w-40 md:w-44 hover-scale transition-transform duration-300">
                  <div className="absolute inset-0 rounded-3xl bg-foreground/5 shadow-lg" />
                  <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/50 bg-card shadow-xl">
                    <Image
                      alt="온음 앱 테마 설정 화면"
                      className="object-cover"
                      fill
                      src={getScreenPath("settingsTheme")}
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
                      alt="온음 앱 설정 화면"
                      className="object-cover"
                      fill
                      src={getScreenPath("settings")}
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
