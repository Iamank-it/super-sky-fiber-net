// Super Sky Fiber Net (SSFN) Official Homepage
import { HeroSection } from "@/components/homepage/HeroSection";
import { TrustBenefits } from "@/components/homepage/TrustBenefits";
import { FeaturedPlans } from "@/components/homepage/FeaturedPlans";
import { MarketBenchmarkComparison } from "@/components/homepage/MarketBenchmarkComparison";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { WhyChooseSsfn } from "@/components/homepage/WhyChooseSsfn";
import { CoverageCheckerSection } from "@/components/homepage/CoverageCheckerSection";
import { TestimonialsSection } from "@/components/homepage/TestimonialsSection";
import { FaqSection } from "@/components/homepage/FaqSection";
import { FinalCtaSection } from "@/components/homepage/FinalCtaSection";
import { db } from "@/lib/db";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Query benchmark sync status
  let lastSyncDate = "17 Nov 2026";
  try {
    const latestPlan = await db.bsnlPlan.findFirst({
      where: { isActive: true },
      orderBy: { sourceLastVerifiedAt: "desc" },
    });
    if (latestPlan) {
      lastSyncDate = new Date(latestPlan.sourceLastVerifiedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch {
    // Graceful fallback
  }

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust and Benefits Section */}
      <TrustBenefits />

      {/* 3. Featured Broadband Plans */}
      <FeaturedPlans />

      {/* 4. Market Benchmark Comparison with BSNL Jharkhand */}
      <MarketBenchmarkComparison lastVerifiedAt={lastSyncDate} />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Why Choose SSFN */}
      <WhyChooseSsfn />

      {/* 7. Coverage Area Checker Section */}
      <CoverageCheckerSection />

      {/* 8. Genuine Customer Experience Pledge */}
      <TestimonialsSection />

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Final CTA Section */}
      <FinalCtaSection />
    </div>
  );
}
