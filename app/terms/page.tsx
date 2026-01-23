import Link from "next/link";

import { PolicyLayout } from "@/components/policy/policy-layout";
import { PolicySection } from "@/components/policy/policy-section";

export const metadata = {
  title: "이용약관 | Mirae",
  description:
    "donminzzi lab이 제공하는 Mirae 서비스 이용자와 운영자의 권리·의무, 책임, 콘텐츠 처리 기준, 분쟁 해결 방식을 정리한 이용약관.",
};

const userObligations = [
  "서비스의 정상 운영을 방해하는 행위(비정상 트래픽, 취약점 악용 등)",
  "리버스 엔지니어링, 디컴파일, 디스어셈블 등 서비스를 무단 분석·변조하는 행위",
  "타인의 권리를 침해하는 콘텐츠 사용",
  "법령 및 공서양속에 반하는 행위",
];

const liabilityLimits = [
  "천재지변, 통신사 장애, OS 정책/권한 제한, 기기 설정(배터리 최적화, 방해금지 모드 등)은 면책",
  "알람/알림은 기기·OS 환경에 따라 달라질 수 있으며, 항상 중단 없이 작동한다고 보증하지 않음",
  "고의 또는 중대한 과실이 없을 경우 간접·특별·결과 손해에 대해 운영자가 책임지지 않음",
];

export default function TermsPage() {
  return (
    <PolicyLayout
      title="이용약관"
      description="본 약관은 Mirae 서비스 이용과 관련한 운영자(돈민찌랩)와 이용자 간의 권리·의무, 책임 범위 및 분쟁 해결 원칙을 정의합니다."
      highlight="서비스 이용에 앞서 약관을 충분히 숙지하시고, 변경 시 공지 이전에 검토해 주세요."
      updatedAt="2026-01-22"
    >
      <PolicySection id="purpose" heading="1. 목적">
        <p>
          본 약관은 운영자와 이용자가 Mirae 서비스를 이용함에 있어 필요한 권리·의무 및 책임사항을
          규정합니다.
        </p>
      </PolicySection>

      <PolicySection id="definition" heading="2. 정의">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            “서비스”는 이용자가 알람 설정과 음성 메시지를 활용해 기상할 수 있는 모바일 애플리케이션
            및 관련 기능을 의미합니다.
          </li>
          <li>“이용자”는 본 약관에 따라 서비스를 이용하는 모든 사용자를 말합니다.</li>
          <li>“콘텐츠”는 알람 설정, 음성 녹음 등 이용자가 생성/저장하는 데이터를 통칭합니다.</li>
        </ul>
      </PolicySection>

      <PolicySection id="effect" heading="3. 약관의 효력 및 변경">
        <p>약관은 서비스 내 또는 운영자가 제공하는 웹페이지에 게시한 시점부터 효력이 발생합니다.</p>
        <p>
          운영자는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 중요한 변경은 시행일
          이전에 공지합니다.
        </p>
        <p>
          이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 앱을 삭제함으로써 이용
          계약을 종료할 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection id="service" heading="4. 서비스 제공">
        <ul className="list-disc space-y-2 pl-5">
          <li>알람 설정 및 실행</li>
          <li>선택적 음성 메시지 녹음/재생</li>
          <li>공지성 푸시 알림(신기능/업데이트 안내 등)</li>
        </ul>
        <p>기본적으로 계정 없이 이용 가능하며, 이용자 콘텐츠는 기기에 로컬 저장됩니다.</p>
      </PolicySection>

      <PolicySection id="limitation" heading="5. 서비스 이용 제한 및 중단">
        <p>
          운영자는 정기 점검·교체, 고장, 통신 장애, 보안 이슈 등으로 인해 서비스 제공을 일시 중단할
          수 있습니다.
        </p>
        <p>불가피한 경우 사후 공지할 수 있습니다.</p>
      </PolicySection>

      <PolicySection id="user-obligations" heading="6. 이용자의 의무">
        <ul className="list-disc space-y-2 pl-5">
          {userObligations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="contents" heading="7. 콘텐츠 및 데이터">
        <p>
          이용자가 생성한 콘텐츠(예: 음성 녹음)는 원칙적으로 이용자 기기에 저장되며, 운영자는 서버에
          저장/보관하지 않습니다.
        </p>
        <p>
          기기 분실/삭제/초기화로 인한 콘텐츠 손실 가능성은 이용자가 감수하며, 콘텐츠 보관 책임은
          이용자에게 있습니다.
        </p>
        <p>OS 기능(백업/동기화 등)을 통한 간접 백업은 해당 OS 제공자의 정책을 따릅니다.</p>
      </PolicySection>

      <PolicySection id="ip" heading="8. 지식재산권">
        <p>서비스 및 앱에 대한 저작권과 지식재산권은 운영자 또는 정당한 권리자에게 귀속합니다.</p>
        <p>운영자의 사전 허락 없이 복제·배포·가공하는 것을 금지합니다.</p>
      </PolicySection>

      <PolicySection id="privacy" heading="9. 개인정보 보호">
        <p>
          개인정보 처리와 관련된 사항은 별도의{" "}
          <Link href="/privacy" className="font-semibold text-foreground underline">
            개인정보처리방침
          </Link>{" "}
          을 참고해 주시기 바랍니다.
        </p>
      </PolicySection>

      <PolicySection id="liability" heading="10. 면책 및 책임 제한">
        <ul className="list-disc space-y-2 pl-5">
          {liabilityLimits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="law" heading="11. 준거법 및 관할">
        <p>
          본 약관은 대한민국 법령을 준거법으로 하며, 분쟁 발생 시 민사소송법 등 관련 법령에 따른
          관할 법원에 제기합니다.
        </p>
      </PolicySection>

      <PolicySection id="inquiry" heading="12. 문의">
        <p>서비스 및 약관 관련 문의는 아래 연락처로 부탁드립니다.</p>
        <p className="font-semibold text-foreground">문의처: donminzzi@gmail.com</p>
      </PolicySection>
    </PolicyLayout>
  );
}
