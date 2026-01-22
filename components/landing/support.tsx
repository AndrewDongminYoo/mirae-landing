import { Mail, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const policyLinks = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
];

export function Support() {
  return (
    <section
      id="support"
      className="border-t border-border/50 bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="support-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Support & Policies
          </p>
          <h2
            id="support-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            문의 / 지원
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Mirae나 donminzzi lab에 대한 문의는 언제든 환영합니다. 감각적이고
            든든한 지원을 약속드립니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
          <article className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <Mail className="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              문의 / 지원
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              채용, 협업, 앱 문의 모두 환영합니다. 답장은 영업일 기준 24시간
              내에 드립니다.
            </p>
            <Button
              asChild
              className="mt-6 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="mailto:donminzzi@gmail.com">이메일 보내기</Link>
            </Button>
          </article>

          <article
            id="privacy"
            className="rounded-2xl border border-border/50 bg-muted p-6 shadow-sm"
          >
            <div className="inline-flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent-blue" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground">
                정책 자료
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              정책은 언제든지 여기서 확인하세요. 링크는 실제 정책 문서가
              준비되는 즉시 업데이트됩니다.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center justify-between w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground transition hover:border-accent hover:text-accent"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
