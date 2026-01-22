import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Apple, Play, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="mirae"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-accent-blue/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1
              id="hero-heading"
              className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              어제의 나에게서 온
              <br />
              아침 메시지, <span className="text-accent">Mirae</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
              시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를
              시작하세요.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-12 w-full gap-2 rounded-xl bg-foreground px-6 text-background hover:bg-foreground/90 sm:w-auto"
              >
                <Link
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Apple className="h-5 w-5" />
                  App Store
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full gap-2 rounded-xl border-border px-6 sm:w-auto bg-transparent"
              >
                <Link
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="h-5 w-5" />
                  Google Play
                </Link>
              </Button>
            </div>

            {/* Secondary CTA */}
            <div className="mt-8">
              <Link
                href="#about"
                className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Mirae 소개 보기
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="relative flex items-center justify-center">
            <div className="flex gap-4 sm:gap-6">
              {/* Main Screenshot - Alarm Wake Screen */}
              <div className="relative aspect-[9/19] w-40 sm:w-48 lg:w-56">
                <div className="absolute inset-0 rounded-[2rem] bg-foreground/5 shadow-xl shadow-foreground/5" />
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border/50 bg-card">
                  <Image
                    src="/images/mirae-alarm-wake.png"
                    alt="Mirae 앱 알람 화면 - 어제의 당신이 남긴 메시지입니다"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Secondary Screenshots (hidden on very small screens) */}
              <div className="hidden flex-col gap-4 sm:flex sm:gap-6">
                <div className="relative aspect-[9/19] w-32 sm:w-36 lg:w-44">
                  <div className="absolute inset-0 rounded-[1.5rem] bg-foreground/5 shadow-lg shadow-foreground/5" />
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-border/50 bg-card">
                    <Image
                      src="/images/mirae-voice-record.png"
                      alt="Mirae 앱 음성 메시지 녹음 화면"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative aspect-[9/19] w-32 sm:w-36 lg:w-44">
                  <div className="absolute inset-0 rounded-[1.5rem] bg-foreground/5 shadow-lg shadow-foreground/5" />
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-border/50 bg-card">
                    <Image
                      src="/images/mirae-time-picker.png"
                      alt="Mirae 앱 알람 추가 화면"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
