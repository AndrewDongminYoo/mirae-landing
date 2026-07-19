import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { MarkdownSections } from "@/components/policy/markdown-sections";
import { PolicyLayout } from "@/components/policy/policy-layout";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "개인정보처리방침 | 온음(WarmWake)",
  description:
    "온음(돈민찌랩)이 수집, 처리, 보관하는 개인정보 항목과 이용자 권리, 안전조치, 제3자 제공 현황, 변경 고지 방식을 안내합니다.",
  openGraph: {
    title: "개인정보처리방침 | 온음(WarmWake)",
    description:
      "온음(돈민찌랩)이 수집, 처리, 보관하는 개인정보 항목과 이용자 권리, 안전조치, 제3자 제공 현황, 변경 고지 방식을 안내합니다.",
  },
};

export default function PrivacyPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "components/policy/privacy.md"),
    "utf-8"
  );
  const updatedAt = content.match(/\*\*시행일\*\*:\s*(\S+)/)?.[1] ?? "";

  return (
    <PolicyLayout
      description="온음(돈민찌랩)은 로컬 중심 알람 환경을 지향하며, 수집되는 정보와 처리 목적, 제3자 전달 현황, 이용자 권리와 안전 조치 등을 투명하게 안내합니다."
      highlight="개인정보는 기본적으로 로컬에만 저장되며, 외부 전송은 품질 개선/오류 대응을 위한 최소한의 범위로 제한됩니다."
      title="개인정보처리방침"
      updatedAt={updatedAt}
    >
      <MarkdownSections content={content} />
    </PolicyLayout>
  );
}
