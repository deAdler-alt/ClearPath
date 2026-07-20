import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { AppSection } from "@/components/app-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <AppSection />
      <footer className="border-t border-border/50 px-4 py-8 text-center text-sm text-muted-foreground">
        <p>ClearPath — Zrozum swoje zdrowie i prawa w sekundy.</p>
        <p className="mt-1">Powered by Groq AI + Next.js</p>
      </footer>
    </div>
  );
}
