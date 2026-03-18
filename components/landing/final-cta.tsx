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
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-blue/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium text-background/70">내가 나에게 전하는 기상 알람</p>

            <h2
              className="mt-3 text-2xl font-bold tracking-tight text-balance text-background sm:text-3xl md:text-4xl"
              id="final-cta-heading"
            >
              온음과 함께
              <br />
              <span className="text-accent">기분 좋은 아침</span>을 시작해보세요
            </h2>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                className="h-12 w-full max-w-xs gap-2.5 rounded-xl bg-background px-6 text-foreground hover:bg-background/90 sm:w-auto"
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
                className="h-12 w-full max-w-xs gap-2.5 rounded-xl border-background/30 bg-transparent px-6 text-background hover:bg-background/10 sm:w-auto"
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
              <div className="absolute inset-0 rounded-[2.5rem] bg-background/10 shadow-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-background/20 bg-card">
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
