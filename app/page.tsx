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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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
