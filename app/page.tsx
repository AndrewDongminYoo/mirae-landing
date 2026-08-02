import type { Metadata } from "next";

import { CTA } from "@/components/landing/cta";
import { FeatureRecord } from "@/components/landing/feature-record";
import { FeatureSettings } from "@/components/landing/feature-settings";
import { FeatureVoice } from "@/components/landing/feature-voice";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { PainPoints } from "@/components/landing/pain-points";
import { Problem } from "@/components/landing/problem";
import { ANDROID_STORE_URL, IOS_STORE_URL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

// `aggregateRating` is deliberately absent: the app has no ratings yet, and
// Google requires structured data to reflect content visible on the page.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "온음(WarmWake)",
  "alternateName": "온:음",
  "description":
    "미래의 자신에게 남기는 긍정적인 메시지와 함께 아침을 맞이하게 해주는 알람앱. 시끄러운 알람 대신, 내가 남긴 따뜻한 음성 메시지로 하루를 시작하세요.",
  "url": SITE_URL,
  "image": `${SITE_URL}/og.png`,
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "iOS 15.6+, Android",
  "inLanguage": "ko-KR",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW",
  },
  "author": {
    "@type": "Organization",
    "name": "donminzzi lab",
    "url": "https://me.donminzzi.kr",
  },
  "installUrl": [IOS_STORE_URL, ANDROID_STORE_URL],
};

// `jsonLd` is a static constant, but JSON.stringify leaves `<` intact, so
// escape it to keep a stray `</script>` from closing the tag early.
const jsonLdHtml = JSON.stringify(jsonLd).replaceAll("<", "\\u003c");

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script dangerouslySetInnerHTML={{ __html: jsonLdHtml }} type="application/ld+json" />
      <Header />
      <Hero />
      <Problem />
      <PainPoints />
      <FeatureVoice />
      <FeatureRecord />
      <FeatureSettings />
      <CTA />
      <FinalCTA />
      <Footer />
    </main>
  );
}
