// src/components/public/how-it-works/HowItWorksJourney.tsx
"use client";

import React, { useState } from "react";
import {
  Palette,
  HeartHandshake,
  Fingerprint,
  Sliders,
  Landmark,
  Compass,
  QrCode,
  MessageSquare,
  ShieldCheck,
  Tv,
  CheckCircle2,
  Eye,
  Bolt,
} from "lucide-react";

export function HowItWorksJourney() {
  const [activeJourney, setActiveJourney] = useState<"creators" | "supporters">("creators");

  return (
    <section className="py-16 md:py-24 bg-surface-container-low" id="flow-segment">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        <div className="snap-start text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-4 font-bold">
            Choose Your Journey
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            Explore how Nudge creates a seamless bridge of mutual uplift between digital patrons and Nepali content architects.
          </p>

          {/* Segmented Journey Control */}
          <div className="inline-flex p-1.5 mt-8 bg-surface-container-high rounded-full border border-outline-variant/70 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveJourney("creators")}
              className={`px-6 py-2.5 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeJourney === "creators"
                  ? "bg-primary-container text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Palette size={18} />
              <span>For Creators &amp; Makers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveJourney("supporters")}
              className={`px-6 py-2.5 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeJourney === "supporters"
                  ? "bg-primary-container text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <HeartHandshake size={18} />
              <span>For Supporters &amp; Fans</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Creators Flow */}
        {activeJourney === "creators" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-primary transition-colors rounded-2xl">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-primary font-mono">
                STEP 01
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary mb-6">
                  <Fingerprint size={28} />
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                  Claim Handle &amp; Instant KYC
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Reserve your custom identity <code className="text-primary font-semibold bg-surface-container px-2 py-0.5 rounded text-xs">nudge.np/@yourhandle</code>. Fast-track official verification through Nepal&apos;s native Nagarik App API in under 2 minutes.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                <ShieldCheck size={18} className="text-tertiary shrink-0" />
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  Instant National ID Integration
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-primary transition-colors rounded-2xl">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-primary font-mono">
                STEP 02
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary mb-6">
                  <Sliders size={28} />
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                  Configure Tiers &amp; Overlays
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Design custom contribution tiers, set community goals for documentary projects or coding libraries, and embed real-time alert widgets into OBS Studio or Streamlabs.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                <Tv size={18} className="text-primary shrink-0" />
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  Native OBS Browser Source URL
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-primary transition-colors rounded-2xl">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-primary font-mono">
                STEP 03
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-tertiary mb-6">
                  <Landmark size={28} />
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                  Direct Bank Settlements
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Keep the lion&apos;s share of your patronage. Benefit from an exceptional <strong className="text-tertiary font-bold">0% platform fee</strong> for verified open-source engineers, cultural archives, and relief initiatives (5% flat standard for creators).
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                <CheckCircle2 size={18} className="text-tertiary shrink-0" />
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  Zero hidden FX conversion markups
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Supporters Flow */}
        {activeJourney === "supporters" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-secondary transition-colors rounded-2xl">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary font-mono">
                FAN 01
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary mb-6">
                  <Compass size={28} />
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                  Discover Authentic Talent
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Find your favorite Nepali podcasters, indie folk musicians, GitHub developers, and investigative reporters directly from social bios or our curated creator directory.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                <Eye size={18} className="text-secondary shrink-0" />
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  Curated Kathmandu &amp; Regional Feed
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-secondary transition-colors rounded-2xl">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary font-mono">
                FAN 02
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-tertiary mb-6">
                  <QrCode size={28} />
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                  1-Tap Scan &amp; Send
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  No registration required. Scan via Fonepay / eSewa / Khalti from Nepal, or pay using Apple Pay and diaspora international cards if you&apos;re cheering from Sydney, Dallas, or London.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                <Bolt size={18} className="text-tertiary shrink-0" />
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  Frictionless guest checkouts
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-secondary transition-colors rounded-2xl">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary font-mono">
                FAN 03
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary mb-6">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                  Leave an Encouraging Note
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Add a personal message to your contribution. Watch your tribute illuminate their OBS live stream overlay in real time with natural voice narration.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                <HeartHandshake size={18} className="text-primary shrink-0" />
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                  Real-time broadcast alerts
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
