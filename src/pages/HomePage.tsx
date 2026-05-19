import { useEffect } from "react";
import { HeroSection } from "@/features/home/HeroSection";
import { QuickAccessSection } from "@/features/home/QuickAccessSection";
import { HomeTrustBand } from "@/features/home/HomeTrustBand";
import { CategorySection } from "@/features/home/CategorySection";
import { VehicleEcosystemSection } from "@/features/home/VehicleEcosystemSection";
import { NewCarsHomeSection } from "@/features/home/NewCarsHomeSection";
import { PreownedCarsHomeSection } from "@/features/home/PreownedCarsHomeSection";
import { AuctionsSection } from "@/features/home/AuctionsSection";
import { FinanceSection } from "@/features/home/FinanceSection";
import { BanksStripSection } from "@/features/home/BanksStripSection";
import { ServicesSection } from "@/features/home/ServicesSection";
import { PartsSection } from "@/features/home/PartsSection";
import { AIFeaturesSection } from "@/features/home/AIFeaturesSection";
import { DealerCTA } from "@/features/home/DealerCTA";
import { CommunitySection } from "@/features/home/CommunitySection";
import { AppDownloadSection } from "@/features/home/AppDownloadSection";
import { StatsSection } from "@/features/home/StatsSection";
import { TestimonialsSection } from "@/features/home/TestimonialsSection";
import { HeroSearchProvider } from "@/features/home/components/hero-search-context";
import { useHeroSearch } from "@/features/home/components/hero-search-context";
import { getHomeSectionVisibility } from "@/features/home/data/hero-hub-config";
import { setPageMeta } from "@/utils/seo";
import { SITE_TAGLINE } from "@/lib/constants";

function HomePageSections() {
  const { mode } = useHeroSearch();
  const vis = getHomeSectionVisibility(mode);

  return (
    <>
      {vis.trustBand && <HomeTrustBand />}
      {vis.ecosystem && <VehicleEcosystemSection />}
      {vis.newCars && <NewCarsHomeSection />}
      {vis.preowned && <PreownedCarsHomeSection />}
      {vis.categories && <CategorySection />}
      {vis.auctions && <AuctionsSection />}
      {vis.finance && <FinanceSection />}
      {vis.banks && <BanksStripSection />}
      {vis.services && <ServicesSection />}
      {vis.parts && <PartsSection />}
      {vis.ai && <AIFeaturesSection />}
      {vis.dealer && <DealerCTA />}
      {vis.community && <CommunitySection />}
      {vis.stats && <StatsSection />}
      {vis.testimonials && <TestimonialsSection />}
      {vis.appDownload && <AppDownloadSection />}
    </>
  );
}

export function HomePage() {
  useEffect(() => {
    setPageMeta({
      title: "Home",
      description: SITE_TAGLINE,
    });
  }, []);

  return (
    <div className="home-page bg-background">
      <HeroSearchProvider>
        <HeroSection />
        <QuickAccessSection />
        <HomePageSections />
      </HeroSearchProvider>
    </div>
  );
}
