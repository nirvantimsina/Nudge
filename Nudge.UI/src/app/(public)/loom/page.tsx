// src/app/(public)/loom/page.tsx
import type { Metadata } from "next";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { LoomHero } from "@/src/components/loom/LoomHero";
import { LoomPhoneSimulator } from "@/src/components/loom/LoomPhoneSimulator";
import { LoomValuePillars } from "@/src/components/loom/LoomValuePillars";
import { LoomThemeShowcase } from "@/src/components/loom/LoomThemeShowcase";
import { LoomComparisonTable } from "@/src/components/loom/LoomComparisonTable";
import { LoomTestimonials } from "@/src/components/loom/LoomTestimonials";
import { LoomBottomCta } from "@/src/components/loom/LoomBottomCta";

export const metadata: Metadata = {
  title: "Nudge Loom • Artisanal Link-in-Bio for Nepali Creators",
  description:
    "Every thread of your digital presence woven into one beautiful link. Unify your YouTube, TikTok, and Spotify links with instant Fonepay, eSewa & Khalti support.",
};

export default function LoomPage() {
  return (
    <>
      <NavBar />

      <main className="snap-start relative min-h-screen bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#bc4722_0.75px,transparent_0.75px),radial-gradient(#dfc0b7_0.75px,#fff9ed_0.75px)] bg-size-[30px_30px] opacity-25 pointer-events-none" />

        {/* 1. Hero Section & Handle Claim */}
        <LoomHero />

        {/* 2. Phone Screen Simulator & Studio Overview */}
        <LoomPhoneSimulator />

        {/* 3. The Four Value Pillars */}
        <LoomValuePillars />

        {/* 4. Interactive Atmospheric Theme Switcher */}
        <LoomThemeShowcase />

        {/* 5. Loom vs Foreign Competitors Matrix */}
        <LoomComparisonTable />

        {/* 6. Creator Stories & Testimonials */}
        <LoomTestimonials />

        {/* 7. Bottom Action CTA */}
        <LoomBottomCta />

        {/* 8. Footer */}
        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </>
  );
}