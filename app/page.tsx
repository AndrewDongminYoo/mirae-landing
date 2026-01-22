import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Benefits } from "@/components/landing/benefits";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Screenshots } from "@/components/landing/screenshots";
import { About } from "@/components/landing/about";
import { Support } from "@/components/landing/support";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Screenshots />
      <About />
      <Support />
      <Footer />
    </main>
  );
}
