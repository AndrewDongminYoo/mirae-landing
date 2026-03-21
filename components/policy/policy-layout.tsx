"use client";

import Link from "next/link";
import React from "react";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

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
      <main className="relative min-h-screen pt-22.5 pb-20">
        {/* Decorative background elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-100 w-100 translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4">
          {/* Header Card */}
          <AnimateOnScroll animation="fade-down">
            <section className="relative overflow-hidden rounded-4xl border border-primary/20 bg-linear-to-br from-white/80 via-background/90 to-primary/5 p-6 shadow-lg ring-1 shadow-primary/10 ring-primary/10 backdrop-blur-sm sm:p-10">
              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl"
              />

              {/* Legal badge */}
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                Legal
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {description}
              </p>

              {highlight && (
                <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <span className="text-sm font-medium text-primary">핵심:</span>
                  <span className="text-sm text-foreground/80">{highlight}</span>
                </div>
              )}

              {updatedAt && (
                <p className="mt-4 text-sm text-muted-foreground">
                  최종 업데이트: <span className="font-semibold text-primary">{updatedAt}</span>
                </p>
              )}

              <p className="mt-6 text-sm text-muted-foreground">
                추가 문의는{" "}
                <Link
                  className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
                  href="mailto:donminzzi@gmail.com"
                >
                  donminzzi@gmail.com
                </Link>
                로 부탁드립니다.
              </p>
            </section>
          </AnimateOnScroll>

          {/* Content sections */}
          <div className="space-y-6">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
