import { AlarmClock, Frown, Volume2 } from "lucide-react";

const painPoints = [
  {
    icon: AlarmClock,
    label: "확실히 깨지 못하는 애매한 알람",
  },
  {
    icon: Frown,
    label: "좋아하던 노래도 싫어하게 되는 마법",
  },
  {
    icon: Volume2,
    label: "의미없는 알람 소리에 지치는 마음",
  },
];

export function PainPoints() {
  return (
    <section
      className="bg-foreground px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="pain-points-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            id="pain-points-heading"
            className="text-xl font-bold tracking-tight text-balance text-background sm:text-2xl md:text-3xl"
          >
            매번 반복되고 지겨운 알람,
            <br />
            <span className="text-accent">기상에 대한 동기부여</span>가 필요합니다
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {painPoints.map((point) => (
            <div
              key={point.label}
              className="flex items-center gap-2.5 rounded-full border border-background/20 bg-background/10 px-4 py-2.5 sm:px-5 sm:py-3"
            >
              <point.icon
                className="h-4 w-4 shrink-0 text-accent sm:h-5 sm:w-5"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-background sm:text-base">
                {point.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-6 py-3 sm:px-8">
            <span className="text-sm font-semibold text-accent-foreground sm:text-base">
              기분좋게 일어나고 싶다면, 온음이 도와드릴게요!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
