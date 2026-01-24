import HeroSection from "./(ui)/hero";
import CarouselSection from "./(ui)/carouselsection";
import EngagementSection from "./(ui)/EngagementSection";
import WhyCold from "./(ui)/whycold";
import DiscoverNfts from "./(ui)/discovernfts";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { 
  HeroSkeleton, 
  CarouselSectionSkeleton,
  EngagementSectionSkeleton,
  WhyColdSkeleton,
  DiscoverNFTSSkeleton 
} from "@/components/loading/LoadingSkeleton";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa", // Ana sayfa için başlık
};

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <section>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<CarouselSectionSkeleton />}>
          <CarouselSection />
        </Suspense>
        <Suspense fallback={<EngagementSectionSkeleton />}>
          <EngagementSection/>
        </Suspense>
        <Suspense fallback={<WhyColdSkeleton />}>
          <WhyCold />
        </Suspense>
        <Suspense fallback={<DiscoverNFTSSkeleton />}>
          <DiscoverNfts />
        </Suspense>
      </section>
    </ErrorBoundary>
  );
};

export default HomePage;
