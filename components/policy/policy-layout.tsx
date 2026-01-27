import Link from "next/link";
import React from "react";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

type PolicyLayoutProps = {
  title: string;
  description: string;
  highlight?: string;
  updatedAt?: string;
  children: React.ReactNode;
};

export function PolicyLayout({
  title,
  description,
  highlight,
  updatedAt,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="min-h-screen pt-22.5 pb-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4">
          <section className="rounded-4xl border border-border/60 bg-card/70 p-6 shadow-[0_20px_60px_rgba(248,226,224,0.6)] ring-1 ring-border/40 sm:p-10">
            <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              Legal
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-3xl text-base text-muted-foreground">{description}</p>
            {highlight && (
              <p className="mt-3 text-sm font-semibold text-foreground">
                <span className="text-muted-foreground">핵심:</span> {highlight}
              </p>
            )}
            {updatedAt && (
              <p className="mt-1 text-sm text-muted-foreground">
                최종 업데이트: <span className="font-medium text-foreground">{updatedAt}</span>
              </p>
            )}
            <p className="mt-6 text-sm text-muted-foreground">
              추가 문의는{" "}
              <Link
                className="font-semibold text-foreground transition-colors hover:text-foreground/80"
                href="mailto:donminzzi@gmail.com"
              >
                donminzzi@gmail.com
              </Link>
              로 부탁드립니다.
            </p>
          </section>
          <div className="space-y-10">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
