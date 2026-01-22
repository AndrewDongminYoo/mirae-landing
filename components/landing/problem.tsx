export function Problem() {
  return (
    <section
      className="border-t border-border/30 bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">아침마다 반복되는</p>

        <h2
          id="problem-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
        >
          기분 좋은 아침을 맞이하고 계신가요?
        </h2>
      </div>
    </section>
  );
}
