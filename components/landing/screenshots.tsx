import Image from "next/image";

const screenshots = [
  {
    src: "/images/mirae-alarm-wake.png",
    alt: "Mirae 앱 알람 화면 - 어제의 당신이 남긴 메시지입니다",
    caption: "알람 상세 설정",
  },
  {
    src: "/images/mirae-voice-record.png",
    alt: "Mirae 앱 음성 메시지 녹음 화면",
    caption: "음성 메시지 선택",
  },
  {
    src: "/images/mirae-time-picker.png",
    alt: "Mirae 앱 알람 추가 화면 - 시간 설정",
    caption: "사운드/볼륨 조절",
  },
  {
    src: "/images/mirae-alarm-sounds.png",
    alt: "Mirae 앱 알람 소리 선택 화면",
    caption: "정기 알람 목록",
  },
  {
    src: "/images/mirae-settings.png",
    alt: "Mirae 앱 설정 화면",
    caption: "설정 및 서포트",
  },
  {
    src: "/images/mirae-theme-light.png",
    alt: "Mirae 앱 테마 선택 - 라이트 모드",
    caption: "라이트/다크 모드",
  },
];

export function Screenshots() {
  return (
    <section
      className="border-t border-border/50 bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="screenshots-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="screenshots-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            앱 미리보기
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            직관적이고 깔끔한 인터페이스로 쉽게 사용하세요
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {screenshots.map((screenshot) => (
            <figure key={screenshot.src} className="group">
              <div className="relative aspect-[9/19] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all group-hover:shadow-md">
                <Image
                  src={screenshot.src || "/placeholder.svg"}
                  alt={screenshot.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm font-medium text-muted-foreground">
                {screenshot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
