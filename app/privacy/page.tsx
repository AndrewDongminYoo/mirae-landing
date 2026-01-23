import React from "react";

import { PolicyLayout } from "@/components/policy/policy-layout";
import { PolicySection } from "@/components/policy/policy-section";

export const metadata = {
  title: "개인정보처리방침 | Mirae",
  description:
    "Mirae(돈민찌랩)가 수집, 처리, 보관하는 개인정보 항목과 이용자 권리, 안전조치, 제3자 제공 현황, 변경 고지 방식을 안내합니다.",
};

const autoCollection = [
  {
    title: "기기/앱 정보",
    description:
      "기기 모델, OS 및 앱 버전, 언어·시간대, 인스턴스 ID 등 앱 동작에 필요한 기본 정보.",
  },
  {
    title: "이용 로그(분석)",
    description: "화면 조회·기능 사용 이벤트, 세션 정보 등 품질 개선 목적의 사용 통계.",
  },
  {
    title: "오류/크래시 정보",
    description: "크래시 로그, 스택트레이스, 오류 시점과 관련 기기 상태 정보.",
  },
  {
    title: "네트워크 정보",
    description:
      "요청 과정에서 IP 등 네트워크 정보가 임시 처리될 수 있으나 별도 저장은 하지 않습니다.",
  },
  {
    title: "푸시 토큰(공지성 알림)",
    description: "FCM 토큰 등 기기에서 발급되는 값은 공지성 알림 발송에 활용됩니다.",
  },
];

const thirdPartyPartners = [
  {
    category: "분석",
    provider: "Google Firebase Analytics",
    purpose: "사용 통계 분석, 기능 우선순위 결정",
    data: "앱 인스턴스 ID, 사용 이벤트, 기기/앱 정보",
    retention: "제공사 정책에 따름",
  },
  {
    category: "크래시/오류",
    provider: "Google Firebase Crashlytics",
    purpose: "크래시 및 오류 분석",
    data: "크래시 로그, 스택트레이스, 기기/앱 정보",
    retention: "제공사 정책에 따름",
  },
  {
    category: "푸시",
    provider: "Firebase Cloud Messaging (FCM)",
    purpose: "공지성 푸시 발송",
    data: "푸시 토큰, 전송/수신 메타데이터",
    retention: "제공사 정책에 따름",
  },
  {
    category: "설정",
    provider: "Firebase Remote Config",
    purpose: "설정값 원격 배포",
    data: "설정 요청 메타데이터(기기/앱 정보 일부)",
    retention: "제공사 정책에 따름",
  },
  {
    category: "오류 모니터링",
    provider: "Sentry",
    purpose: "오류/성능 진단",
    data: "오류 이벤트, 스택트레이스, 기기/앱 정보",
    retention: "제공사 정책에 따름",
  },
];

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="개인정보처리방침"
      description="Mirae(돈민찌랩)는 로컬 중심 알람 환경을 지향하며, 수집되는 정보와 처리 목적, 제3자 전달 현황, 이용자 권리와 안전 조치 등을 투명하게 안내합니다."
      highlight="개인정보는 기본적으로 로컬에만 저장되며, 외부 전송은 품질 개선/오류 대응을 위한 최소한의 범위로 제한됩니다."
      updatedAt="2026-01-22"
    >
      <PolicySection id="collection" heading="1. 수집하는 정보">
        <p>
          Mirae는 회원가입 없이 이용 가능한 로컬 중심 알람 앱입니다. 따라서 알람 설정·음성 메시지 등
          콘텐츠를 서버에 저장하지 않습니다. 다만 앱 품질 개선과 오류 대응을 위해 일부 정보가
          자동으로 생성되어 수집·전송될 수 있습니다.
        </p>
        <div className="space-y-4 rounded-2xl border border-border/50 bg-card/80 p-5">
          <h3 className="text-lg font-semibold text-foreground">1.1 자동 수집되는 정보</h3>
          <p className="text-sm text-muted-foreground">
            분석·오류 진단·성능 개선 목적의 필수 항목입니다.
          </p>
          <ul className="space-y-2 pl-5 text-sm text-muted-foreground">
            {autoCollection.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                {item.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 rounded-2xl border border-border/50 bg-background/80 p-5">
          <h3 className="text-lg font-semibold text-foreground">1.2 이용자가 제공하는 정보</h3>
          <p>
            현재 회원가입을 제공하지 않기 때문에 이메일 등 계정 정보는 원칙적으로 수집하지 않습니다.
            단, 고객문의 시 전달하는 정보는 문의 목적에 따라 제한적으로 사용합니다.
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-background/80 p-5">
          <h3 className="text-lg font-semibold text-foreground">1.3 아동(만 14세 미만) 정보</h3>
          <p>
            만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않으며, 해당 정보가 포함되었다고
            판단되면 문의처로 연락주시면 지체 없이 조치합니다.
          </p>
        </div>
      </PolicySection>

      <PolicySection id="purposes" heading="2. 정보의 이용 목적">
        <ul className="list-decimal space-y-2 pl-5">
          <li>서비스 제공 및 기능 동작(공지성 푸시 포함)</li>
          <li>품질 개선 및 통계 분석(사용성 개선, 기능 우선순위 결정 등)</li>
          <li>오류·크래시 대응 및 보안(비정상 동작 분석, 안정성 향상, 오남용 방지)</li>
        </ul>
      </PolicySection>

      <PolicySection id="third-parties" heading="3. 제3자 제공 및 처리위탁(외부 서비스)">
        <p>
          Mirae는 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만 앱 운영을 위해 아래와 같은
          처리위탁 서비스를 이용하며, 일부 정보가 이 과정에서 전송될 수 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="text-muted-foreground">
                <th className="px-3 py-2 font-semibold">구분</th>
                <th className="px-3 py-2 font-semibold">수탁자(서비스)</th>
                <th className="px-3 py-2 font-semibold">목적</th>
                <th className="px-3 py-2 font-semibold">전송 항목(예시)</th>
                <th className="px-3 py-2 font-semibold">보유/이용</th>
              </tr>
            </thead>
            <tbody>
              {thirdPartyPartners.map((partner) => (
                <tr key={partner.provider} className="border-t border-border/50">
                  <td className="px-3 py-2 font-semibold text-foreground">{partner.category}</td>
                  <td className="px-3 py-2 text-muted-foreground">{partner.provider}</td>
                  <td className="px-3 py-2 text-muted-foreground">{partner.purpose}</td>
                  <td className="px-3 py-2 text-muted-foreground">{partner.data}</td>
                  <td className="px-3 py-2 text-muted-foreground">{partner.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          ※ 위 수탁자들은 필요한 범위 내에서만 정보를 처리하며, 광고·맞춤광고 목적의 제3자 제공은
          하지 않습니다.
        </p>
      </PolicySection>

      <PolicySection id="overseas" heading="4. 개인정보의 국외 이전">
        <p>
          외부 서비스 제공사의 서버는 국외에 위치할 수 있으므로 정보가 이전될 수 있으며, 그
          항목·목적·보유기간은 각 제공사 정책을 따릅니다. Mirae는 최소한의 범위로 전송되도록
          구성합니다.
        </p>
      </PolicySection>

      <PolicySection id="retention" heading="5. 보유 및 이용 기간">
        <ul className="list-disc space-y-2 pl-5">
          <li>분석·오류·크래시·푸시 관련 로그: 제공사 정책에 따라 보관 후 삭제</li>
          <li>
            고객문의 정보: 문의 처리 완료 후 지체 없이 삭제 (법령상 의무가 있는 경우엔 해당 기간
            보관)
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="deletion" heading="6. 파기 절차 및 방법">
        <ul className="list-disc space-y-2 pl-5">
          <li>전자적 파일 형태의 정보는 복구 불가능한 방식으로 삭제합니다.</li>
          <li>처리위탁사 시스템에 저장된 정보는 제공사 정책 및 계약에 따라 삭제합니다.</li>
        </ul>
      </PolicySection>

      <PolicySection id="rights" heading="7. 이용자의 권리">
        <p>
          이용자는 열람·정정·삭제·처리정지 등을 요청할 수 있으며, 설정 기능으로 분석/오류 수집을
          제한할 수 있습니다.
        </p>
        <p>권리 행사는 아래 문의처로 부탁드립니다.</p>
        <p className="font-semibold text-foreground">문의처: donminzzi@gmail.com</p>
      </PolicySection>

      <PolicySection id="security" heading="8. 안전성 확보 조치">
        <ul className="list-disc space-y-2 pl-5">
          <li>전송 구간 암호화(HTTPS 등)를 적용합니다.</li>
          <li>접근 권한을 최소화합니다.</li>
          <li>보안 취약점을 지속적으로 개선하고 업데이트합니다.</li>
        </ul>
      </PolicySection>

      <PolicySection id="changes" heading="9. 방침 변경">
        <p>
          법령 및 서비스 변경에 따라 방침을 개정할 수 있으며, 중요한 변경 시 공지 또는 웹사이트에서
          안내합니다.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          <li>공고일자: 2026-01-22</li>
          <li>시행일자: 2026-01-22</li>
        </ul>
      </PolicySection>
    </PolicyLayout>
  );
}
