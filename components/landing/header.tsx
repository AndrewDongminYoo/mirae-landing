"use client";

import { Apple, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 sm:text-lg"
        >
          Mirae
        </Link>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 sm:flex">
          <Button
            asChild
            size="sm"
            className="h-9 gap-2 rounded-lg bg-foreground px-4 text-background hover:bg-foreground/90"
          >
            <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <Apple className="h-4 w-4" />
              Download
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background sm:hidden">
          <div className="flex flex-col px-4 py-4">
            <Button
              asChild
              className="h-11 gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90"
            >
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Apple className="h-4 w-4" />
                App Store에서 다운로드
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
