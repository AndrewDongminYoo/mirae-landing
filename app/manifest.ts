import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "온음(WarmWake) - 어제의 나에게서 온 아침 메시지",
    short_name: "온음",
    description:
      "미래의 자신에게 남기는 긍정적인 메시지와 함께 아침을 맞이하게 해주는 알람앱. 시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요.",
    lang: "ko",
    start_url: "/",
    display: "standalone",
    // Matches `--background` / `--primary` in globals.css (light theme).
    background_color: "#fffbfe",
    theme_color: "#f99c50",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
