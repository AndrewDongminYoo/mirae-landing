"use client";

import { Apple, Menu, Play, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-lg"
          href="/"
        >
          <span>
            <span className="text-primary">온</span>:<span className="text-primary">음</span>
          </span>
        </Link>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          <Button
            asChild
            className="h-10 gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            size="sm"
          >
            <Link
              href="https://apps.apple.com/app/id6758120543"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Apple className="h-4 w-4" />
              App Store
            </Link>
          </Button>
          <Button
            asChild
            className="h-10 gap-2 rounded-xl border-foreground/20 bg-transparent px-5 font-semibold transition-all hover:border-foreground/30 hover:bg-muted"
            size="sm"
            variant="outline"
          >
            <Link
              href="https://play.google.com/store/apps/details?id=kr.mirae.app"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Play className="h-4 w-4" />
              Google Play
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          className="text-foreground hover:bg-primary/10 hover:text-primary sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          size="icon"
          variant="ghost"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-primary/10 bg-background sm:hidden">
          <div className="flex flex-col gap-3 px-4 py-4">
            <Button
              asChild
              className="h-12 gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-md shadow-primary/20"
            >
              <Link
                href="https://apps.apple.com/app/id6758120543"
                onClick={() => setMobileMenuOpen(false)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Apple className="h-4 w-4" />
                App Store에서 다운로드
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 gap-2 rounded-xl border-foreground/20 font-semibold"
              variant="outline"
            >
              <Link
                href="https://play.google.com/store/apps/details?id=kr.mirae.app"
                onClick={() => setMobileMenuOpen(false)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Play className="h-4 w-4" />
                Google Play에서 다운로드
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
