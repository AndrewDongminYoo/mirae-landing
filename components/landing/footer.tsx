import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo & Copyright */}
          <div>
            <Link className="text-base font-semibold tracking-tight text-foreground" href="/">
              donminzzi lab
            </Link>
            <p className="mt-2 text-xs text-muted-foreground">
              © {currentYear} donminzzi lab. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="/privacy"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="/terms"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="mailto:donminzzi@gmail.com"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Business Info - Collapsible details */}
        <details className="group mt-8 border-t border-border/50 pt-6">
          <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
            사업자 정보
          </summary>
          <div className="mt-4 text-xs leading-relaxed text-muted-foreground">
            <p>상호명: donminzzi lab | 대표자: 유동민 | 사업자등록번호: 159-17-02569</p>
            <p className="mt-1">소재지: 서울시 강남구 | 이메일: donminzzi@gmail.com</p>
          </div>
        </details>
      </div>
    </footer>
  );
}
