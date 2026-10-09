// src/app/(public)/how-it-works/page.tsx
import type { Metadata } from "next";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { HowItWorksHero } from "@/src/components/public/how-it-works/HowItWorksHero";
import { HowItWorksJourney } from "@/src/components/public/how-it-works/HowItWorksJourney";
import { HowItWorksComparison } from "@/src/components/public/how-it-works/HowItWorksComparison";
import { HowItWorksFaq } from "@/src/components/public/how-it-works/HowItWorksFaq";
import { HowItWorksCta } from "@/src/components/public/how-it-works/HowItWorksCta";

export const metadata: Metadata = {
  title: "How Nudge Works • Frictionless Nepali Creator Patronage",
  description:
    "Explore how Nudge connects Nepali creators with fans through 1-tap Fonepay, eSewa, and Khalti QR clearance, diaspora card rails, and automatic next-day bank settlement.",
};

export default function HowItWorksPage() {
  return (
    <>
      <NavBar />

      <main className="snap-start relative h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-proximity scroll-pt-6 scroll-smooth bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {/* 1. Hero & 3-Step Overview */}
        <HowItWorksHero />

        {/* 2. Interactive Creator vs Supporter Journey */}
        <HowItWorksJourney />

        {/* 3. Settlement Comparison & Clearance Architecture */}
        <HowItWorksComparison />

        {/* 4. Frequently Asked Questions */}
        <HowItWorksFaq />

        {/* 5. Bottom Call to Action */}
        <HowItWorksCta />

        <Footer />
      </main>
    </>
  );
}