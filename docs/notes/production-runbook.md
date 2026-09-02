# 프로덕션 운영 런북

## 적용 범위

온음 웹은 Vercel Hobby에서 운영하며 DNS는 AWS Route 53에서 관리한다.
데이터베이스와 인증 서비스는 사용하지 않는다.

## 담당과 연락 경로

- Incident Commander: Vercel 프로젝트의 Owner가 판단과 복구를 담당한다.
- 내부 기록: `AndrewDongminYoo/mirae-landing` 저장소의 GitHub Issue에 타임라인, 영향, 조치, 복구 시각을 기록한다.
- 사용자 문의: 개인정보 처리방침에 공개된 `donminzzi@gmail.com`으로 받는다.
- 플랫폼 장애: [Vercel Status](https://www.vercel-status.com/)와 [AWS Health Dashboard](https://health.aws.amazon.com/health/status)를 먼저 확인하고, 플랫폼 장애이면 해당 지원 채널로 에스컬레이션한다.

## 심각도와 초기 대응

- Critical: 프로덕션 접속 불가, TLS 또는 DNS 장애, 잘못된 앱 스토어 리디렉션이다.
- Degraded: 일부 콘텐츠, 분석, 성능 데이터만 영향을 받는 장애다.
- 알림을 받으면 배포 SHA, Vercel 배포 상태, `https://warmwake.donminzzi.kr/`, `/robots.txt`, `/llms.txt`, 앱 스토어 리디렉션을 확인한다.
- Critical이면 변경을 중단하고 이전 Ready 배포로 롤백한다.

## 스테이징과 프로덕션 승격

1. Pull Request의 Preview Deployment가 Ready인지 확인한다.
2. Vercel에 로그인한 Owner가 보호된 Preview에서 홈, 개인정보 처리방침, 서비스 이용약관, 앱 스토어 리디렉션을 확인한다.
3. `pnpm lint`, `pnpm test:production-readiness`, `pnpm test:tokens`, `pnpm build`를 통과시킨다.
4. 승인된 변경을 `main`에 병합해 Production Deployment를 만든다.
5. 배포된 Git SHA가 병합한 SHA와 같은지 확인한 뒤 아래의 배포 후 확인 명령을 실행한다.

## 배포 후 확인

다음 명령은 홈페이지의 보안 헤더와 agent discovery, `robots.txt`의 Content Signal, 정적 JavaScript 캐시를 확인한다.

```bash
set -euo pipefail

origin="https://warmwake.donminzzi.kr"
home_headers="$(curl -fsSI "$origin/" | tr -d '\r')"

printf '%s\n' "$home_headers" | rg -i "^content-security-policy: .*default-src 'self'"
printf '%s\n' "$home_headers" | rg -i '^link: .*</llms.txt>; rel="describedby"; type="text/plain"'
printf '%s\n' "$home_headers" | rg -i '^x-content-type-options: nosniff$'
curl -fsS "$origin/robots.txt" | rg '^Content-Signal: ai-train=no, search=yes, ai-input=yes$'

asset_path="$(curl -fsS "$origin/" | rg -o '/_next/static/[^" ]+\.js' | head -n 1)"
test -n "$asset_path"
curl -fsSI "$origin$asset_path" | tr -d '\r' | rg -i '^cache-control: .*immutable'

privacy_headers="$(curl -fsSI "$origin/privacy" | tr -d '\r')"
if printf '%s\n' "$privacy_headers" | rg -qi '^link: .*</llms.txt>'; then
  echo "Unexpected llms.txt Link header on /privacy" >&2
  exit 1
fi
```

홈페이지 이외의 경로에는 `llms.txt`용 `Link` 헤더가 없어야 한다.

## 롤백

1. Vercel Dashboard의 Deployments에서 마지막으로 정상 동작한 Ready 배포를 선택한다.
2. Rollback으로 프로덕션 별칭을 이전 배포에 연결한다.
3. 홈, 정책 페이지, `/robots.txt`, `/llms.txt`, 앱 스토어 리디렉션을 확인하고 배포 후 확인 명령을 다시 실행한다.
4. GitHub Issue에 롤백한 배포 SHA와 원인을 기록한다.
5. 애플리케이션 롤백 중에는 Route 53 레코드를 변경하지 않는다.

## DNS 장애

Route 53의 `warmwake.donminzzi.kr` 레코드와 Vercel이 안내하는 대상이 같은지 먼저 비교한다.
DNS 변경이 필요하면 기존 TTL만큼 기다릴 수 있도록 TTL을 미리 낮추고, Vercel 도메인 검증이 완료된 뒤 트래픽을 전환한다.
네임서버와 DNSSEC 변경은 애플리케이션 배포와 분리하고, 이전 레코드를 복구 값으로 기록한 뒤 진행한다.
