"use client";

import { ShieldCheck, CheckCircle2, Volume2, Layers } from "lucide-react";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { StartPageCta } from "@/src/components/public/cta/StartPageCta";
import { CommunityCta } from "@/src/components/public/cta/CommunityCta";
import { LiveNudgePreview } from "@/src/components/public/nudge/LiveNudgePreview";
import { FeaturedCreatorsSection } from "@/src/components/public/creators/FeaturedCreatorsSection";
import { StreamOverlay } from "@/src/components/public/stream/StreamOverlay";
import { FeatureBento } from "@/src/components/public/sections/FeatureBento";
import { PricingComparisonTable } from "@/src/components/public/sections/PricingComparisonTable";
import { HowItWorksSteps } from "@/src/components/public/sections/HowItWorksSteps";
import { PagodaWatermark } from "@/src/components/public/decorative/PagodaWatermark";
import { ProductSuiteSection } from "../components/public/sections/ProductSuitSection";

export default function HomePage() {
  return (
    <>
      <NavBar />

      <main className="flex-grow nepal-mandala-bg relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-surface-container-high/40 to-transparent pointer-events-none" />
        <PagodaWatermark className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none opacity-[0.07] z-0" />

        {/* 1. Hero */}
        <section className="relative pt-space-xl md:pt-space-3xl pb-space-2xl px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant mb-space-md shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
                <span className="text-label-sm font-label-sm text-primary tracking-wide">
                  Nepal&apos;s Direct Patronage Platform • Simple &amp; Sustainable
                </span>
              </div>

              <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface tracking-tight mb-space-sm">
                Fund your creative passions{" "}
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
                directly
              </span>.
              </h1>

              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
                Nudge lets your community send direct support, one-time or recurring, so you can
                keep making the work only you make. Directly through local mobile banking, digital
                wallets, and diaspora cards.
              </p>

              <StartPageCta onSubmit={(handle) => console.log("check availability:", handle)} />

              <div className="w-full max-w-xl mt-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/80 flex items-start gap-2.5 text-xs text-on-surface-variant">
                <ShieldCheck size={20} className="text-tertiary shrink-0 mt-0.5" />
                <div className="flex-1 leading-snug">
                  <span className="font-bold text-on-surface flex items-center gap-1">
                    Identity Verified via eSewa KYC / Nagarik App &amp; Official Social Cross-Auth
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary" />
                  </span>
                  <p className="text-[11px] text-outline mt-0.5">
                    Public figure &amp; celebrity handles are reserved and strictly protected against
                    impersonation or unauthorized squatting.
                  </p>
                </div>
              </div>

              <p className="text-xs text-outline mt-2.5 ml-2 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-tertiary" />
                Free forever setup • 0% fee for open source developers &amp; relief initiatives
              </p>
            </div>

            <div className="lg:col-span-5 relative mt-space-lg lg:mt-0 w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary-fixed/40 rounded-full blur-2xl pointer-events-none" />
              <LiveNudgePreview onNudgeSent={(url) => (window.location.href = url)} />
            </div>
          </div>
        </section>

        {/* 2. Feature bento grid */}
        <FeatureBento />

        <ProductSuiteSection />

        {/* 3. Streamer / OBS overlay */}
        <section className="py-space-2xl px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto" id="streamers">
          <div className="rounded-3xl bg-surface-container-low border-2 border-outline-variant p-6 md:p-10 relative overflow-hidden shadow-sm">
            <div className="absolute -top-20 right-0 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/40 border border-primary/20 text-label-sm font-label-sm text-primary mb-3">
                  <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                  <span className="font-bold uppercase tracking-wider">OBS &amp; Streamlabs Ready</span>
                </div>

                <h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight mb-3">
                  Built for Streamers: Real-Time Alerts on YouTube &amp; Facebook Live
                </h2>

                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Take your gaming streams, acoustic guitar nights, talk shows, and podcasts to the
                  next level. Drop your personalized Nudge Browser Source link into OBS Studio,
                  Streamlabs, or vMix for instant on-screen cheers with sound chimes and Nepali
                  text-to-speech.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6 text-xs">
                  <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant flex items-center gap-2.5">
                    <Volume2 size={20} className="text-primary" />
                    <div>
                      <div className="font-bold text-on-surface">Custom Chimes &amp; TTS</div>
                      <div className="text-outline">Nepali &amp; English audio readout</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant flex items-center gap-2.5">
                    <Layers size={20} className="text-tertiary" />
                    <div>
                      <div className="font-bold text-on-surface">1-Click Browser Source</div>
                      <div className="text-outline">Works seamlessly with OBS &amp; PRISM</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600" /> YouTube Live
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" /> Facebook Gaming
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" /> Twitch Nepal
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <StreamOverlay
                  studioLabel="1080p60 • Kathmandu Studio"
                  widgetUrl="https://nudge.np/widgets/alerts?key=np_live_8f7a..."
                  alert={{
                    senderName: "Anmol Shrestha",
                    amount: 1000,
                    comment: "Keep the Mustang vlog series going bro! 🔥 धेरै कडा कन्टेन्ट!",
                    ttsVoiceLabel: "Nepali Female (Shreya)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Featured creators (API-driven) */}
        <FeaturedCreatorsSection onNudgeClick={(creator) => console.log("nudge clicked:", creator)} />

        {/* 5. Pricing / comparison */}
        <PricingComparisonTable />

        {/* 6. How it works */}
        <HowItWorksSteps />

        {/* 7. Closing CTA banner */}
        <CommunityCta />
      </main>

      <Footer
        logoUrl="/logo.png"
        copyrightText="© 2026 Nudge Nepal Pvt. Ltd. Empowering Himalayan storytellers & makers. Built with love in Kathmandu."
      />
    </>
  );
}
