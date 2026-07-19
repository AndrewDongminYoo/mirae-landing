import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { MarkdownSections } from "@/components/policy/markdown-sections";
import { PolicyLayout } from "@/components/policy/policy-layout";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "이용약관 | 온음(WarmWake)",
  description:
    "donminzzi lab이 제공하는 온음(WarmWake) 서비스 이용자와 운영자의 권리·의무, 책임, 콘텐츠 처리 기준, 분쟁 해결 방식을 정리한 이용약관.",
  openGraph: {
    title: "이용약관 | 온음(WarmWake)",
    description:
      "donminzzi lab이 제공하는 온음(WarmWake) 서비스 이용자와 운영자의 권리·의무, 책임, 콘텐츠 처리 기준, 분쟁 해결 방식을 정리한 이용약관.",
  },
};

export default function TermsPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "components/policy/service.md"),
    "utf-8"
  );
  const updatedAt = content.match(/\*\*시행일\*\*:\s*(\S+)/)?.[1] ?? "";

  return (
    <PolicyLayout
      description="본 약관은 온음(WarmWake) 서비스 이용과 관련한 운영자(돈민찌랩)와 이용자 간의 권리·의무, 책임 범위 및 분쟁 해결 원칙을 정의합니다."
      highlight="서비스 이용에 앞서 약관을 충분히 숙지하시고, 변경 시 공지 이전에 검토해 주세요."
      title="이용약관"
      updatedAt={updatedAt}
    >
      <MarkdownSections content={content} />
    </PolicyLayout>
  );
}
