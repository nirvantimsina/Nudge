import type { Metadata } from "next";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { FeaturesHeroSection } from "@/src/components/public/features/FeaturesHeroSection";
import { FeaturesPillarsNav } from "@/src/components/public/features/FeaturesPillarsNav";
import { ObsAlertsFeature } from "@/src/components/public/features/ObsAlertsFeature";
import { MilestoneGoalsFeature } from "@/src/components/public/features/MilestoneGoalsFeature";
import { CreatorStudioFeature } from "@/src/components/public/features/CreatorStudioFeature";
import { VerifiedProfileFeature } from "@/src/components/public/features/VerifiedProfileFeature";
import { NepalBankPayoutsFeature } from "@/src/components/public/features/NepalBankPayoutFeature";
import { FeaturesFaqSection } from "@/src/components/public/features/FeaturesFAQSection";
import { ClaimHandleBanner } from "@/src/components/public/cta/ClaimHandleBanner";

export const metadata: Metadata = {
  title: "Features for Creators • Nudge Nepal Patronage Platform",
  description:
    "OBS live stream cheers with Nepali TTS, milestone goals, verified creator profiles, and direct next-day settlements to all banks in Nepal.",
};

export default function FeaturesPage() {
  return (
    <>
      <NavBar />

      <main className="grow nepal-mandala-bg relative overflow-hidden">
        {/* Top Vignette Gradient */}
        <div className="absolute top-0 pt-space-3xl inset-x-0 h-40 bg-linear-to-b from-surface-container-high/40 to-transparent pointer-events-none" />

        {/* 1. Hero & Stats */}
        <FeaturesHeroSection />

        {/* 2. Architecture Quick Jump Links */}
        <FeaturesPillarsNav />

        {/* 3. Feature 1: OBS & Stream Alerts */}
        <ObsAlertsFeature />

        {/* 4. Feature 2: Milestone Goals */}
        <MilestoneGoalsFeature />

        {/* 5. Feature 3: Creator Dashboard & Revenue */}
        <CreatorStudioFeature />

        {/* 6. Feature 4: Verified Public Profile */}
        <VerifiedProfileFeature />

        {/* 7. Feature 5: Direct Nepal Bank Settlements */}
        <NepalBankPayoutsFeature />

        {/* 8. FAQ Accordion */}
        <FeaturesFaqSection />

        {/* 9. Final Claim Handle CTA */}
        <ClaimHandleBanner />
      </main>

      <Footer
        logoUrl="/logo.png"
        copyrightText="© 2026 Nudge Nepal Pvt. Ltd. Empowering Himalayan storytellers & makers. Built with love in Kathmandu."
      />
    </>
  );
}