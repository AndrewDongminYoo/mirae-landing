"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const components: Components = {
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/30 bg-primary/5 pl-4 py-2 pr-2 rounded-r-lg text-sm text-muted-foreground/80 italic">
      {children}
    </blockquote>
  ),
  h1: () => null,
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-foreground border-b border-primary/20 pb-2 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-semibold text-foreground mt-3 mb-1">{children}</h4>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary/60">
      {children}
    </ol>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-xl border border-primary/15">
      <table className="min-w-full text-left text-xs">{children}</table>
    </div>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-muted-foreground border-t border-primary/10">{children}</td>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-foreground bg-primary/5">{children}</th>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-primary/5 transition-colors">{children}</tr>
  ),
  ul: ({ children }) => (
    <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary/60">
      {children}
    </ul>
  ),
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-primary font-medium hover:underline transition-colors hover:text-primary/80"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
};

export function MarkdownSections({ content }: { content: string }) {
  const sections = content
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  // sections[0] is the intro block (h1 + meta fields); PolicyLayout handles that
  const bodySections = sections.slice(1);

  return (
    <>
      {bodySections.map((section, i) => (
        <AnimateOnScroll key={i} animation="fade-up" delay={100 + i * 75}>
          <section
            className="space-y-4 rounded-3xl border-l-4 border-l-primary/40 border border-primary/15 bg-white/60 p-6 shadow-md shadow-primary/5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
          >
            <ReactMarkdown
              components={components}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {section}
            </ReactMarkdown>
          </section>
        </AnimateOnScroll>
      ))}
    </>
  );
}
