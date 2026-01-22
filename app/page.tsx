import { About } from "@/components/landing/about";
import { Benefits } from "@/components/landing/benefits";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Screenshots } from "@/components/landing/screenshots";
import { Support } from "@/components/landing/support";

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
