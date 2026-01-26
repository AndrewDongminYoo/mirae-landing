import Image from "next/image";

export function FeatureSettings() {
  return (
    <section
      className="relative overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="feature-settings-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="text-sm font-medium text-muted-foreground sm:text-base">세부 설정</p>

            <h2
              id="feature-settings-heading"
              className="mt-2 text-2xl leading-tight font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
            >
              나에게 맞는 설정으로
              <br />
              알람을 커스터마이즈하세요
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground lg:mx-0">
              볼륨, 스누즈 간격, 반복 요일 등 다양한 설정을 조절할 수 있어요. 라이트/다크 모드도
              지원합니다.
            </p>

            {/* Features */}
            <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <li className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                볼륨 조절
              </li>
              <li className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                스누즈 설정
              </li>
              <li className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                테마 변경
              </li>
            </ul>
          </div>

          {/* Phone Mockups */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative flex items-center gap-4">
              {/* Background Phone */}
              <div className="relative aspect-9/19 w-32 translate-y-6 sm:w-40 md:w-44">
                <div className="absolute inset-0 rounded-3xl bg-foreground/5 shadow-lg" />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-card">
                  <Image
                    src="/images/warmwake-theme-light.png"
                    alt="온음 앱 테마 선택 화면"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Main Phone */}
              <div className="relative aspect-9/19 w-40 sm:w-52 md:w-56">
                <div className="absolute inset-0 rounded-4xl bg-foreground/5 shadow-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-4xl border border-border/50 bg-card">
                  <Image
                    src="/images/warmwake-settings.png"
                    alt="온음 앱 설정 화면"
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
