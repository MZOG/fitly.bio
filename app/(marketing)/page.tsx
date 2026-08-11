import { CallToAction } from "@/components/marketing/cta";
import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Idea } from "@/components/marketing/idea";
import { Pricing } from "@/components/marketing/pricing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Idea />
      <Features />
      <HowItWorks />
      <Pricing />
      <CallToAction />
    </>
  );
}
