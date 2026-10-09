// src/components/public/how-it-works/HowItWorksHero.tsx
import React from "react";
import Link from "next/link";
import { Bolt, Eye } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export function HowItWorksHero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-space-xl md:pb-24 overflow-hidden border-b border-outline-variant/50">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(188,71,34,0.08)_0%,rgba(253,190,80,0.05)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop text-center relative z-10">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/60 text-secondary mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
          <span className="text-label-sm font-label-sm uppercase tracking-wider text-on-secondary-container font-semibold">
            Built for the Nepali Creator Economy
          </span>
        </div>

        <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface max-w-4xl mx-auto tracking-tight mb-6">
          Simple, transparent patronage for Nepali{" "}
          <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
            storytellers, podcasters, creators, and developers
          </span>.
        </h1>

        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          The frictionless 3-step loop: Creators set up in 60s, fans support via{" "}
          <span className="text-tertiary font-bold">eSewa / Khalti / Fonepay</span> or diaspora cards,
          and payouts hit Nepali bank accounts automatically with zero friction.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/start">
            <Button variant="primary" size="lg" rightIcon={<Bolt size={18} />}>
              Start Your Page
            </Button>
          </Link>
          <Link href="#payment-comparison">
            <Button variant="outline" size="lg" leftIcon={<Eye size={18} className="text-outline" />}>
              Explore Clearance Rails
            </Button>
          </Link>
        </div>

        {/* 3-Step Overview Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6 text-left">
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-1 font-bold">
                Set Up in 60 Seconds
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Claim your custom handle and verify via Nagarik App with zero physical paperwork.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-1 font-bold">
                1-Tap Fan Support
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Fans contribute directly using any local mobile banking app or overseas Visa/Mastercard.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-1 font-bold">
                Auto Bank Settlement
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Funds clear daily directly to your Nepali commercial bank account with automated statements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
