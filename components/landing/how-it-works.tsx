import { Bell, Mic, Settings } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Mic,
    title: "전날 밤, 내 목소리로 메시지를 녹음",
    description: "잠들기 전, 내일 아침의 나에게 전할 메시지를 녹음하세요.",
  },
  {
    step: 2,
    icon: Settings,
    title: "알람 시간과 재생 방식을 설정",
    description: "원하는 시간, 반복 요일, 볼륨 등 세부 설정을 조절하세요.",
  },
  {
    step: 3,
    icon: Bell,
    title: "아침에 메시지로 기상",
    description: "설정한 시간에 내 목소리가 울려 퍼지며 하루가 시작됩니다.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            사용 방법
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            간단한 3단계로 나만의 아침을 만드세요
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:gap-12">
          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center">
              {/* Connector line (hidden on mobile, shown on larger screens) */}
              {index < steps.length - 1 && (
                <div
                  className="absolute top-8 left-1/2 hidden h-0.5 w-full bg-border sm:block"
                  aria-hidden="true"
                />
              )}

              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                <item.icon className="h-7 w-7 text-foreground" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {item.step}
                </span>
              </div>

              <h3 className="mt-6 text-base font-semibold text-foreground">{item.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
