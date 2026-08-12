import { lazy, Suspense } from "react";

const Features = lazy(() => import("../../components/marketing/features"));
const CallToAction = lazy(() => import("../../components/marketing/cta"));
const HowItWorks = lazy(
  () => import("../../components/marketing/how-it-works"),
);
const Idea = lazy(() => import("../../components/marketing/idea"));
const Pricing = lazy(() => import("../../components/marketing/pricing"));

import { Hero } from "@/components/marketing/hero";

import { Skeleton } from "@/components/ui/skeleton";

const renderLoader = () => {
  return (
    <div className="flex mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={renderLoader()}>
        <Idea />
      </Suspense>

      <Suspense fallback={renderLoader()}>
        <Features />
      </Suspense>

      <Suspense fallback={renderLoader()}>
        <HowItWorks />
      </Suspense>

      <Suspense fallback={renderLoader()}>
        <Pricing />
      </Suspense>

      <Suspense fallback={renderLoader()}>
        <CallToAction />
      </Suspense>
    </>
  );
}
