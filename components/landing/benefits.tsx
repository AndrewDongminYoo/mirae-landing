import { Heart, Sunrise, PlayCircle } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "나에게서 온 응원",
    description:
      "어젯밤 녹음한 내 목소리가 아침에 나를 깨워줍니다. 스스로에게 건네는 따뜻한 응원 메시지.",
    accentClass: "bg-accent/20 text-accent",
  },
  {
    icon: Sunrise,
    title: "아침 루틴을 더 부드럽게",
    description:
      "갑작스러운 알람 소리 대신, 익숙한 목소리로 하루를 천천히 시작할 수 있어요.",
    accentClass: "bg-accent-blue/20 text-accent-blue",
  },
  {
    icon: PlayCircle,
    title: "기록 → 저장 → 알람으로 재생",
    description:
      "간단한 3단계로 나만의 음성 알람을 만들고, 원하는 시간에 재생하세요.",
    accentClass: "bg-secondary text-foreground",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="border-t border-border/50 bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="benefits-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            왜 Mirae인가요?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            매일 아침을 나답게 시작하는 새로운 방법
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md sm:p-8"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${benefit.accentClass}`}
              >
                <benefit.icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
