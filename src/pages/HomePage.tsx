import { useEffect } from "react";
import { HeroSection } from "@/features/home/HeroSection";
import { CategorySection } from "@/features/home/CategorySection";
import { FeaturedVehicles } from "@/features/home/FeaturedVehicles";
import { AuctionsSection } from "@/features/home/AuctionsSection";
import { FinanceSection } from "@/features/home/FinanceSection";
import { ServicesSection } from "@/features/home/ServicesSection";
import { PartsSection } from "@/features/home/PartsSection";
import { AIFeaturesSection } from "@/features/home/AIFeaturesSection";
import { DealerCTA } from "@/features/home/DealerCTA";
import { StatsSection } from "@/features/home/StatsSection";
import { TestimonialsSection } from "@/features/home/TestimonialsSection";
import { setPageMeta } from "@/utils/seo";
import { SITE_TAGLINE } from "@/lib/constants";

export function HomePage() {
  useEffect(() => {
    setPageMeta({
      title: "Home",
      description: SITE_TAGLINE,
    });
  }, []);

  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedVehicles />
      <AuctionsSection />
      <FinanceSection />
      <ServicesSection />
      <PartsSection />
      <AIFeaturesSection />
      <DealerCTA />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
