import { Apple, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function FeatureVoice() {
  return (
    <section
      aria-labelledby="feature-voice-heading"
      className="relative overflow-hidden bg-linear-to-b from-accent/10 via-accent/5 to-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            {/* Logo */}
            <div className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                온음
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-accent sm:text-base">음성 메시지 알람</p>

            <h2
              className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
              id="feature-voice-heading"
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
                className="h-11 gap-2 rounded-xl bg-foreground px-5 text-background hover:bg-foreground/90"
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
                className="h-11 gap-2 rounded-xl border-border bg-transparent px-5"
                size="lg"
                variant="outline"
              >
                <Link href="https://play.google.com" rel="noopener noreferrer" target="_blank">
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
              <div className="relative aspect-9/19 w-32 translate-y-8 sm:w-40 md:w-44">
                <div className="absolute inset-0 rounded-3xl bg-foreground/5 shadow-lg" />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-card">
                  <Image
                    alt="온음 앱 알람 시간 설정"
                    className="object-cover"
                    fill
                    src="/images/warmwake-time-picker.png"
                  />
                </div>
              </div>

              {/* Main Phone */}
              <div className="relative aspect-9/19 w-40 sm:w-52 md:w-56">
                <div className="absolute inset-0 rounded-4xl bg-foreground/5 shadow-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-4xl border border-border/50 bg-card">
                  <Image
                    alt="온음 앱 알람 화면 - 어제의 당신이 남긴 메시지"
                    className="object-cover"
                    fill
                    src="/images/warmwake-alarm-wake.png"
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
