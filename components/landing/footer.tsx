import Link from "next/link";
import { ExternalLink } from "lucide-react";

const footerLinks = [
  { href: "#mirae", label: "Mirae" },
  { href: "#support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "mailto:donminzzi@gmail.com", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand & About */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80"
            >
              donminzzi lab
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              모바일 앱에 집중하는 1인 인디 프로덕트 스튜디오입니다. 일상에
              도움이 되는 앱을 만듭니다.
            </p>

            {/* Links */}
            <nav className="mt-6" aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Business Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              사업자 정보
            </h3>
            <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <dt className="shrink-0">상호명</dt>
                <dd>donminzzi lab</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">대표자</dt>
                <dd>
                  <Link
                    href="https://andrewdongminyoo.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    유동민
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">사업자등록번호</dt>
                <dd>159-17-02569</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">소재지</dt>
                <dd>서울시 강남구</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">이메일</dt>
                <dd>
                  <Link
                    href="mailto:donminzzi@gmail.com"
                    className="hover:text-foreground"
                  >
                    donminzzi@gmail.com
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-border/50 pt-6 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} donminzzi lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
