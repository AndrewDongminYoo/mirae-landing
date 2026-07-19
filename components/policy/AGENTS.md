## Overview

- `components/policy/` contains the legal page rendering layer and the canonical markdown source documents.
- Markdown files are the single source of truth for legal content; the components render them.

## Structure

- `privacy.md` - canonical privacy policy document (Korean).
- `service.md` - canonical terms of service document (Korean).
- `policy-layout.tsx` - page chrome shared by both legal routes (Header, Footer, title card).
- `markdown-sections.tsx` - splits a markdown document on `---` and renders each section as a styled card.

## Where to look

- To update privacy policy content: edit `components/policy/privacy.md`.
- To update terms of service content: edit `components/policy/service.md`.
- To change the legal page header/footer chrome: `policy-layout.tsx`.
- To change how markdown sections are styled: `markdown-sections.tsx`.

## Conventions

- `updatedAt` in `PolicyLayout` is parsed from the `**시행일**: YYYY-MM-DD` line in each markdown file — keep that line present and correctly formatted.
- Sections are delimited by `---` (horizontal rule) on its own line. The first block (before the first `---`) is the intro/meta block and is skipped by `MarkdownSections`; `PolicyLayout` owns that header area.
- Markdown files use Korean and follow the structure: `# Title`, intro block, then numbered `## 조/항` sections separated by `---`.

## Anti-patterns

- Do not duplicate legal text into JSX; edit the markdown files only.
- Do not remove the `**시행일**: YYYY-MM-DD` line from markdown — the page parses it for display.
- Do not hardcode section content in page files; add new sections to the markdown documents instead.
