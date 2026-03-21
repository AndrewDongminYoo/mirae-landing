import { AudioWaveform, Mic, Music } from "lucide-react";
import Image from "next/image";

import { getScreenPath } from "@/lib/screens";

export function FeatureRecord() {
  return (
    <section
      aria-labelledby="feature-record-heading"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Decorative elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Phone Mockups */}
          <div className="flex justify-center">
            <div className="relative flex items-center gap-4">
              {/* Left Phone */}
              <div className="relative aspect-9/19 w-32 -translate-y-6 sm:w-40 md:w-44">
                <div className="absolute inset-0 rounded-3xl bg-foreground/5 shadow-lg" />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-xl">
                  <Image
                    alt="온음 앱 알람 소리 선택 화면"
                    className="object-cover"
                    fill
                    src={getScreenPath("soundPicker")}
                  />
                </div>
              </div>

              {/* Main Phone */}
              <div className="relative aspect-9/19 w-40 sm:w-52 md:w-56">
                <div className="absolute inset-0 rounded-4xl bg-foreground/5 shadow-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-4xl border border-border/50 bg-card shadow-2xl">
                  <Image
                    alt="온음 앱 음성 메시지 미리 듣기 화면"
                    className="object-cover"
                    fill
                    src={getScreenPath("messagePreview")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold text-primary sm:text-base">간편한 녹음</p>

            <h2
              className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
              id="feature-record-heading"
            >
              내일 아침의 나에게
              <br />
              <span className="text-primary">어떤 응원</span>을 해줄까요?
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground lg:mx-0">
              버튼 하나로 쉽게 음성 메시지를 녹음할 수 있어요. 알람 소리와 함께, 또는 메시지만
              재생하는 것도 가능합니다.{" "}
              <span className="text-foreground/70">
                실시간 파형 시각화로 녹음 상태를 한눈에 확인하세요.
              </span>
            </p>

            {/* Features */}
            <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <li className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-medium text-foreground">
                <Mic className="h-4 w-4 text-primary" />
                간편한 녹음
              </li>
              <li className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-medium text-foreground">
                <Music className="h-4 w-4 text-primary" />
                다양한 알람 소리
              </li>
              <li className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-medium text-foreground">
                <AudioWaveform className="h-4 w-4 text-primary" />
                재생 모드 선택
              </li>
            </ul>

            {/* Enhanced messaging */}
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-4 lg:max-w-md">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-primary">v1.5.0 업데이트</span> - 실시간 파형
                시각화로 녹음 품질을 바로 확인하고, 더욱 정확한 음성 메시지를 녹음할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
