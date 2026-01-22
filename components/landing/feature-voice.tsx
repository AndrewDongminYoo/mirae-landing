import { Apple, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function FeatureVoice() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-accent/10 via-accent/5 to-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="feature-voice-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            {/* Logo */}
            <div className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Mirae
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-accent sm:text-base">음성 메시지 알람</p>

            <h2
              id="feature-voice-heading"
              className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
            >
              나에게서 온 따뜻한 응원으로
              <br />
              기분 좋은 아침을 맞이하세요
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground lg:mx-0">
              전날 밤, 내일 아침의 나에게 전할 메시지를 녹음하세요. 설정한 시간에 내 목소리가 울려
              퍼지며 하루가 시작됩니다.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-11 gap-2 rounded-xl bg-foreground px-5 text-background hover:bg-foreground/90"
              >
                <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                  <Apple className="h-4 w-4" />
                  App Store
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 gap-2 rounded-xl border-border bg-transparent px-5"
              >
                <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4" />
                  Google Play
                </Link>
              </Button>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative flex items-end gap-4">
              {/* Background Phone */}
              <div className="relative aspect-[9/19] w-32 translate-y-8 sm:w-40 md:w-44">
                <div className="absolute inset-0 rounded-[1.5rem] bg-foreground/5 shadow-lg" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-border/50 bg-card">
                  <Image
                    src="/images/mirae-time-picker.png"
                    alt="Mirae 앱 알람 시간 설정"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Main Phone */}
              <div className="relative aspect-[9/19] w-40 sm:w-52 md:w-56">
                <div className="absolute inset-0 rounded-[2rem] bg-foreground/5 shadow-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border/50 bg-card">
                  <Image
                    src="/images/mirae-alarm-wake.png"
                    alt="Mirae 앱 알람 화면 - 어제의 당신이 남긴 메시지"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
