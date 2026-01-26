# 온음(WarmWake) Landing — donminzzi lab

donminzzi lab의 플래그십 앱 온음(WarmWake)를 중심에 놓고, 따뜻한 모닝 무드와 미니멀한 모션을 입힌 Next.js(앱 라우터) + TypeScript 마케팅 페이지입니다. Tailwind CSS 4를 기반으로 한 시스템 색상 변수(#FFFBFE, #FFB4AB, #A8C7FA, #1C1B1F), rounded-xl/2xl 코너, subtle borders, soft shadows, 그리고 “warm morning” 느낌의 여백 조율로 잔잔하면서도 세련된 인상을 냅니다.

## 핵심 경험

- **Sticky 내비게이션**: `donminzzi lab` 로고 + 온음(WarmWake) · About · Support · Privacy · Contact(메일) 링크. 데스크톱과 모바일에서 모두 고정되어 스크롤을 돕습니다.
- **Hero**: 한국어 헤드라인 `어제의 나에게서 온 아침 메시지, 온음(WarmWake)`와 서브카피 `시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요.`, App Store/Google Play CTA, `온음(WarmWake) 소개 보기` 스크롤 유도. `public/images` 폴더에 두고 있는 1~3개의 iOS 스크린샷을 phone-mock 스타일로 배치해 제품을 앞세웠습니다.
- **Social proof / Key benefits**: 3개의 카드에 각각 `나에게서 온 응원`, `아침 루틴을 더 부드럽게`, `기록 → 저장 → 알람으로 재생` 타이틀과 설명을 넣고 Lucide 아이콘 + pastel accent 배경으로 강조합니다.
- **How it works**: `전날 밤, 내 목소리로 메시지를 녹음` → `알람 시간과 재생 방식을 설정` → `아침에 메시지로 기상` 순서로 3단계 플로우와 톤온톤 아이콘, connector line, step 배지로 프로세스를 보여줍니다.
- **Screenshots**: 6개 이미지 그리드(`알람 상세 설정`, `음성 메시지 선택`, `사운드/볼륨 조절`, `정기 알람 목록`, `설정 및 서포트`, `라이트/다크 모드`)와 간단한 캡션을 붙여 실제 UI를 시각화합니다.
- **About donminzzi lab**: Flutter-first, 디자인 시스템 중심, 자동화/CI에 집중하는 인디 스튜디오라는 소개와, 온음(WarmWake)를 첫 플래그십으로 내세운 2~3개 단락, 그리고 상호명/대표자/사업자번호/소재지/이메일을 담은 Business Info 카드.
- **Support & Policies**: `문의 / 지원` CTA 카드(이메일 버튼 `mailto:donminzzi@gmail.com`)와 개인정보처리방침·이용약관 placeholder 링크 카드로 접근성을 확보합니다.
- **Footer**: 브랜드 설명, 서브 링크, 사업자 정보 요약, 저작권 문구(`© {year} donminzzi lab. All rights reserved.`).

## 실행

```bash
pnpm install
pnpm dev
```

표준 Next.js 스크립트도 그대로 운영됩니다.

```bash
pnpm build
pnpm start
pnpm lint
```

## 구현 구조

| 책임          | 위치                           | 설명                                                                                                                      |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 페이지 뼈대   | `app/page.tsx`                 | Header → Hero → Benefits → HowItWorks → Screenshots → About → Support → Footer 순으로 컴포넌트를 렌더합니다.              |
| 글로벌 설정   | `app/layout.tsx`               | `<html lang="ko">`, `Geist`/`Geist Mono` 폰트, 메타데이터(Open Graph/키워드), Analytics, `viewport.themeColor = #FFFBFE`. |
| 섹션 컴포넌트 | `components/landing/*`         | 각 영역을 독립 컴포넌트로 분리하여 유지보수가 쉽도록 구성했습니다.                                                        |
| 공통 UI       | `components/ui/button.tsx` 등  | cva로 `Button` variants/size를 정의하고, 모바일 CTA나 policy link에 활용합니다.                                           |
| 스타일        | `app/globals.css`              | Tailwind 4 + `@theme inline` 변수를 활용해 색상, radius, shadows를 설정합니다.                                            |
| 스크린샷      | `public/images/warmwake-*.png` | iOS 테마 스크린샷을 그대로 `next/image`로 로드하여 hero와 Screenshots 섹션에서 그대로 보여줍니다.                         |

## 시각 시스템 & 액센트

- **베이스 컬러**: `#FFFBFE` 배경, 텍스트 `#1C1B1F`, accent coral `#FFB4AB`, accent blue `#A8C7FA`.
- **타이포**: `Geist`/`Geist Mono` + 시스템 글꼴(`font-sans`)을 믹스하여 rounded한 sans serif 느낌을 줍니다.
- **데코 요소**: Hero 뒤에 큰 blurred circle gradient, 카드 경계선, subtle shadows, rounded-2xl/3xl, `bg-card`, `border-border/50`를 적극 활용.
- **모션 & 반응성**: CTA 버튼 hover, mobile menu 토글, `group-hover:shadow-md` 등을 통해 미묘한 인터랙션을 줍니다.

## 참고 링크

- Policy placeholders: `/privacy`, `/terms`
- 문의: `mailto:donminzzi@gmail.com`
- 대표자 링크: https://andrewdongminyoo.vercel.app

필요한 정보는 위경로/컴포넌트를 참고하거나, `pnpm dev` 후 `http://localhost:3000`에서 실시간 확인할 수 있습니다.
