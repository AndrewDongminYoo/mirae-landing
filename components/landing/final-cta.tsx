import { Apple, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getScreenPath } from "@/lib/screens";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-foreground px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Decorative warm gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"
      />

      {/* Decorative circles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold text-primary">내가 나에게 전하는 기상 알람</p>

            <h2
              className="mt-3 text-2xl font-bold tracking-tight text-balance text-background sm:text-3xl md:text-4xl"
              id="final-cta-heading"
            >
              온:음과 함께
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                기분 좋은 아침
              </span>
              을 시작해보세요
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-background/70 lg:mx-0">
              8번의 업데이트로 더욱 안정적이고 정교해진 음성 알람. 지금 바로 다운로드하고 내일 아침
              새로운 시작을 경험하세요.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                className="h-14 w-full max-w-xs gap-2.5 rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 sm:w-auto"
                size="lg"
              >
                <Link
                  href="https://apps.apple.com/app/id6758120543"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Apple className="h-5 w-5" />
                  App Store
                </Link>
              </Button>

              <Button
                asChild
                className="h-14 w-full max-w-xs gap-2.5 rounded-2xl border-2 border-background/30 bg-transparent px-8 text-base font-semibold text-background transition-all hover:border-background/50 hover:bg-background/10 sm:w-auto"
                size="lg"
                variant="outline"
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=kr.mirae.app"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Play className="h-5 w-5" />
                  Google Play
                </Link>
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative aspect-9/19 w-48 sm:w-56 md:w-64">
              <div className="absolute inset-0 rounded-[2.5rem] bg-primary/20 shadow-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-primary/30 bg-card shadow-2xl">
                <Image
                  alt="온음 앱 홈 화면"
                  className="object-cover"
                  fill
                  src={getScreenPath("homeFabs")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
