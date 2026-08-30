import { HeroBackground } from "@/components/HeroBackground";

export default function TestPage() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10">{/* Twój content hero */}</div>
    </section>
  );
}
