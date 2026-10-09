import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { StudioHero } from "@/src/components/public/studio/StudioHero";
import { StudioWorkspaceBento } from "@/src/components/public/studio/StudioWorkspaceBento";
import { StudioPillars } from "@/src/components/public/studio/StudioPillars";
import { StudioComparison } from "@/src/components/public/studio/StudioComparison";
import { StudioEarningsCalculator } from "@/src/components/public/studio/StudioEarningsCalculator";
import { StudioTestimonials } from "@/src/components/public/studio/StudioTestimonials";
import { StudioBottomCta } from "@/src/components/public/studio/StudioBottomCta";

export const metadata = {
    title: "Nudge Studio | The Operating System for Himalayan Creators",
    description:
        "Run Patronage, Stream Alerts, and Tax Without the Chaos. Unified backer CRM, instant Fonepay & eSewa QR triggers, automated 1% TDS filing certificates, and OBS overlays.",
};

export default function StudioPage() {
    return (
        <>
            <NavBar />

            <main className="snap-start min-h-screen snap-y snap-proximity scroll-pt-6 scroll-smooth bg-background text-on-surface font-body-md selection:bg-primary selection:text-on-primary antialiased">
                {/* 1. HERO SECTION */}
                <StudioHero />

                {/* 2. LAYERED WORKSPACE MOCKUP (Bento Grid) */}
                <StudioWorkspaceBento />

                {/* 3. FOUR CORE PILLARS */}
                <StudioPillars />

                {/* 4. COMPARISON MATRIX */}
                <StudioComparison />

                {/* 5. INTERACTIVE SAVINGS CALCULATOR */}
                <StudioEarningsCalculator />

                {/* 6. VERIFIED CREATOR TESTIMONIALS */}
                <StudioTestimonials />

                {/* 7. HIGH-CONVERTING BOTTOM CLAIM CTA */}
                <StudioBottomCta />

                <div className="snap-start">
                    <Footer />
                </div>
            </main>
        </>
    );
}