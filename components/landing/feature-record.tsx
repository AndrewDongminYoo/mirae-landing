import Image from "next/image";

import { getScreenPath } from "@/lib/screens";

export function FeatureRecord() {
  return (
    <section
      aria-labelledby="feature-record-heading"
      className="relative overflow-hidden bg-linear-to-b from-accent-blue/10 via-accent-blue/5 to-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Phone Mockups */}
          <div className="flex justify-center">
            <div className="relative flex items-center gap-4">
              {/* Left Phone */}
              <div className="relative aspect-9/19 w-32 -translate-y-6 sm:w-40 md:w-44">
                <div className="absolute inset-0 rounded-3xl bg-foreground/5 shadow-lg" />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-card">
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
                <div className="relative h-full w-full overflow-hidden rounded-4xl border border-border/50 bg-card">
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
            <p className="text-sm font-medium text-accent-blue sm:text-base">간편한 녹음</p>

            <h2
              className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
              id="feature-record-heading"
            >
              내일 아침의 나에게
              <br />
              어떤 응원을 해줄까요?
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground lg:mx-0">
              버튼 하나로 쉽게 음성 메시지를 녹음할 수 있어요. 알람 소리와 함께, 또는 메시지만
              재생하는 것도 가능합니다.
            </p>

            {/* Features */}
            <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <li className="rounded-full bg-accent-blue/10 px-4 py-2 text-sm font-medium text-foreground">
                간편한 녹음
              </li>
              <li className="rounded-full bg-accent-blue/10 px-4 py-2 text-sm font-medium text-foreground">
                다양한 알람 소리
              </li>
              <li className="rounded-full bg-accent-blue/10 px-4 py-2 text-sm font-medium text-foreground">
                재생 모드 선택
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
