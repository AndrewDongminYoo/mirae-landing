import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "donminzzi lab | Mirae - 어제의 나에게서 온 아침 메시지",
  description:
    " 미래의 자신에게 남기는 긍정적인 메시지와 함께 아침을 맞이하게 해주는 알람앱. 시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요. donminzzi lab이 만든 첫 번째 앱, Mirae.",
  generator: "Next.js",
  keywords: ["Mirae", "미래", "알람", "음성메시지", "아침", "donminzzi lab", "모바일앱"],
  authors: [{ name: "donminzzi lab", url: "https://donminzzi.kr" }],
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
    title: "donminzzi lab | Mirae",
    description: "어제의 나에게서 온 아침 메시지",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBFE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
