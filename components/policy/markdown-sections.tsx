import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const components: Components = {
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-4 text-sm text-muted-foreground/80 italic">
      {children}
    </blockquote>
  ),
  h1: () => null,
  h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-semibold text-foreground">{children}</h4>,
  ol: ({ children }) => (
    <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">{children}</ol>
  ),
  p: ({ children }) => <p className="text-sm text-muted-foreground">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs">{children}</table>
    </div>
  ),
  td: ({ children }) => <td className="px-3 py-2 text-muted-foreground">{children}</td>,
  th: ({ children }) => (
    <th className="px-3 py-2 font-semibold text-muted-foreground">{children}</th>
  ),
  tr: ({ children }) => <tr className="border-t border-border/50">{children}</tr>,
  ul: ({ children }) => (
    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{children}</ul>
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
        <section
          className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm shadow-pink-100/40"
          key={i}
        >
          <ReactMarkdown
            components={components}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {section}
          </ReactMarkdown>
        </section>
      ))}
    </>
  );
}
