import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import React from "react";

import { GoogleAdsTag } from "@/components/google-ads-tag";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "온음(WarmWake) - 어제의 나에게서 온 아침 메시지",
  description:
    "미래의 자신에게 남기는 긍정적인 메시지와 함께 아침을 맞이하게 해주는 알람앱. 시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요.",
  generator: "Next.js",
  keywords: ["온음", "WarmWake", "알람", "음성메시지", "아침", "donminzzi lab", "모바일앱"],
  authors: [{ name: "donminzzi lab", url: "https://me.donminzzi.kr" }],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32",
      },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      {
        url: "/icon-192-maskable.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icon-512-maskable.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "온음(WarmWake) - 어제의 나에게서 온 아침 메시지",
    description: "미래의 자신에게 남기는 긍정적인 메시지와 함께 아침을 맞이하게 해주는 알람앱",
    type: "website",
    locale: "ko_KR",
    siteName: "온음(WarmWake)",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "온음(WarmWake) - 어제의 나에게서 온 아침 메시지",
      },
    ],
  },
  twitter: {
    // Without an explicit card type the preview falls back to the small
    // square card, which ignores the 1.91:1 image.
    card: "summary_large_image",
  },
  appleWebApp: {
    title: "온음",
    statusBarStyle: "black",
    capable: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "light",
  // The `.dark` block in globals.css is never applied — no ThemeProvider is
  // mounted — so the page always renders light. A single theme color matching
  // `--background` in `:root` keeps the browser chrome in step. Restore the
  // per-scheme array if dark mode is ever actually wired up.
  themeColor: "#fffbfe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <GoogleAdsTag />
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
