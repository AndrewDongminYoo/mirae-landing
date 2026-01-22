import { Apple, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="mirae"
      className="relative overflow-hidden bg-background px-4 pt-20 pb-8 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8 lg:pt-32 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-150 bg-linear-to-b from-accent/5 via-accent/3 to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        {/* Logo / App Name */}
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">Mirae</p>

        {/* Main Headline */}
        <h1
          id="hero-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        >
          어제의 나에게서 온
          <br />
          <span className="text-accent">아침 메시지</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 w-full max-w-xs gap-2.5 rounded-xl bg-foreground px-6 text-background hover:bg-foreground/90 sm:w-auto"
          >
            <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <Apple className="h-5 w-5" />
              App Store
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full max-w-xs gap-2.5 rounded-xl border-border bg-transparent px-6 sm:w-auto"
          >
            <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <Play className="h-5 w-5" />
              Google Play
            </Link>
          </Button>
        </div>

        {/* Phone Mockups */}
        <div className="relative mx-auto mt-16 flex items-end justify-center gap-3 sm:mt-20 sm:gap-4 md:gap-6">
          {/* Left Phone */}
          <div className="relative aspect-9/19 w-24 shrink-0 sm:w-32 md:w-40 lg:w-48">
            <div className="absolute inset-0 rounded-[1.25rem] bg-foreground/5 shadow-lg sm:rounded-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-border/50 bg-card sm:rounded-3xl">
              <Image
                src="/images/mirae-time-picker.png"
                alt="Mirae 앱 알람 시간 설정 화면"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Center Phone (Main) */}
          <div className="relative -mb-4 aspect-9/19 w-36 shrink-0 sm:-mb-6 sm:w-44 md:w-52 lg:w-60">
            <div className="absolute inset-0 rounded-[1.75rem] bg-foreground/5 shadow-2xl sm:rounded-4xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border/50 bg-card sm:rounded-4xl">
              <Image
                src="/images/mirae-alarm-wake.png"
                alt="Mirae 앱 알람 화면 - 어제의 당신이 남긴 메시지입니다"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Phone */}
          <div className="relative aspect-9/19 w-24 shrink-0 sm:w-32 md:w-40 lg:w-48">
            <div className="absolute inset-0 rounded-[1.25rem] bg-foreground/5 shadow-lg sm:rounded-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-border/50 bg-card sm:rounded-3xl">
              <Image
                src="/images/mirae-voice-record.png"
                alt="Mirae 앱 음성 메시지 녹음 화면"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
