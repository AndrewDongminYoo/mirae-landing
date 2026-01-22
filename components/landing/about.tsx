import Link from "next/link";

export function About() {
  return (
    <section
      id="about"
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            donminzzi lab
          </p>
          <h2
            id="about-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            donminzzi lab 소개
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            donminzzi lab은 Flutter-first 모바일 앱을 중심으로, 디자인 시스템을
            기준 삼아 자동화와 CI 파이프라인을 적극 활용하는 1인 인디
            스튜디오입니다.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            소비자용 앱과 내부 도구 모두 다루며, 제품의 퀄리티를 끝까지 책임지기
            위해 테스트와 배포를 손으로 하지 않고 코드화된 흐름 안에서
            관리합니다.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Mirae는 donminzzi lab의 첫 번째 플래그십 앱으로, 따뜻한 아침 루틴을
            만드는 경험을 위해 태어났습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)]">
          <div className="rounded-2xl border border-border/50 bg-muted p-6 text-sm leading-relaxed text-muted-foreground shadow-sm sm:text-base">
            <p>
              donminzzi lab은 클라이언트 워크와 독립 프로젝트를 병행하며, 크고
              작은 실험을 지속합니다. Mirae는 그 가운데 일상에 가장 가까운
              경험을 먼저 선보이는 결과물입니다.
            </p>
          </div>
          <article className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">
              Business Info
            </h3>
            <dl className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <dt className="w-28 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  상호명
                </dt>
                <dd className="text-foreground">donminzzi lab</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="w-28 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  대표자
                </dt>
                <dd className="text-foreground">
                  <Link
                    href="https://andrewdongminyoo.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline-offset-2 transition hover:underline"
                  >
                    유동민
                  </Link>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="w-28 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  사업자번호
                </dt>
                <dd className="text-foreground">1591702569</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="w-28 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  소재지
                </dt>
                <dd className="text-foreground">서울시 강남구</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="w-28 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  이메일
                </dt>
                <dd className="text-foreground">
                  <Link
                    href="mailto:donminzzi@gmail.com"
                    className="text-foreground underline-offset-2 transition hover:underline"
                  >
                    donminzzi@gmail.com
                  </Link>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
