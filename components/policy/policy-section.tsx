import React from "react";

type PolicySectionProps = {
  id: string;
  heading: string;
  children: React.ReactNode;
};

export function PolicySection({ id, heading, children }: PolicySectionProps) {
  return (
    <section id={id} className="space-y-4">
      <div className="rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm shadow-pink-100/40">
        <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
        <div className="space-y-3 text-sm text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}
