export function CTA() {
  return (
    <section
      className="bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">오늘의 메시지</p>

        <h2
          id="cta-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
        >
          오늘 하루를 <span className="text-accent">어떤 마음가짐으로</span>
          <br />
          시작할지 결정해 보세요
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
          오늘 밤, 내일 아침 일어날 나에게 따뜻한 응원을 남겨보세요. 어제의 내가 건네는 메시지로
          기분 좋은 아침을 시작하세요.
        </p>
      </div>
    </section>
  );
}
