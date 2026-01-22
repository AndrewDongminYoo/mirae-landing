# Mirae Landing — donminzzi lab

donminzzi lab의 첫 번째 플래그십 앱 Mirae를 소개하는 Next.js(앱 라우터) + TypeScript 마케팅 랜딩 페이지입니다. Tailwind CSS를 기반으로 한 최소한의 디자인, “따뜻한 아침” 느낌의 색상 조합(#FFFBFE 배경, #FFB4AB/ #A8C7FA 강조), 그리고 화면 전반에 깔끔한 여백/둥근 모서리/부드러운 그림자를 적용합니다.

## 랜딩 구조

- **Header**: `donminzzi lab` 브랜드 로고와 Mirae, About, Support, Privacy, Contact로 스크롤하는 스티키 내비게이션.
- **Hero**: “어제의 나에게서 온 아침 메시지, Mirae” 카피, App Store/Google Play CTA, “Mirae 소개 보기” 안내 링크, 1~3개의 iOS 스크린샷을 강조한 데스크톱 중심 비주얼.
- **Benefits**: 3개의 핵심 카드를 통해 “나에게서 온 응원”, “아침 루틴을 더 부드럽게”, “기록 → 저장 → 알람으로 재생” 메시지를 전달.
- **How It Works**: 간단한 3단계 플로우(녹음 → 설정 → 기상)와 Lucide 아이콘.
- **Screenshots**: “알람 상세 설정”, “음성 메시지 선택”, “사운드/볼륨 조절”, “정기 알람 목록”, “설정 및 서포트”, “라이트/다크 모드” 캡션을 가진 실제 앱 스크린샷 그리드.
- **About**: donminzzi lab의 본질(Flutter-first, 디자인 시스템, 자동화/CI, Mirae 플래그십)과 비즈니스 정보 박스(상호명, 대표자, 사업자번호, 소재지, 이메일).
- **Support & Policies**: “문의 / 지원” CTA 카드(이메일 버튼) + 개인정보처리방침/이용약관 링크 카드.
- **Footer**: 브랜드 요약, 정책 링크, 연락처, 저작권 표기.

## 실행

```bash
pnpm install
pnpm dev
```

표준 Next.js 스크립트도 그대로입니다:

```bash
pnpm build
pnpm start
pnpm lint
```

## 구조 요약

- `app/layout.tsx`: 한국어 `<html lang="ko">`, 메타데이터, Analytics, Geist 폰트, 뷰포트 색상 설정.
- `app/page.tsx`: Header → Hero → Benefits → How It Works → Screenshots → About → Support → Footer 구성.
- `components/landing/*`: 각 섹션 컴포넌트(헤더, 히어로, 베네핏, 사용법, 스크린샷, About, Support, Footer).
- `components/ui`: 범용 UI(버튼, 카드 등)는 Tailwind+cva로 구현.
- `public/images`: Mirae iOS 스크린샷 자산.
- `app/globals.css`: CSS 변수, Tailwind 4, `Geist` 폰트 선언, 컬러 팔레트(`#FFFBFE` 기반, coral/sky accent).

## 스타일

Tailwind CSS 4와 `@theme inline` 테마 변수를 통해 기본 색상과 radius를 조정했습니다. 컴포넌트는 rounded-2xl, subtle border, soft shadows, `bg-accent/20`, `bg-accent-blue/20` 등의 클래스를 써서 “calm”한 마감감을 유지합니다. Hero의 CTA 버튼은 `Button` 컴포넌트에 커스텀 클래스를 붙여 접근성과 반응성을 확보합니다.

## 추가 참고

- 스크린샷은 `public/images`에 있으며 `components/landing/hero.tsx`, `components/landing/screenshots.tsx`에서 `next/image`로 불러옵니다.
- Contact/Support은 `mailto:donminzzi@gmail.com`으로 연결되며, policy 링크는 `/privacy`, `/terms` (플레이스홀더)로 이동합니다.
