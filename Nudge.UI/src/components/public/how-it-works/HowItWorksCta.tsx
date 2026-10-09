// src/components/public/how-it-works/HowItWorksCta.tsx
import React from "react";
import Link from "next/link";
import { Bolt, ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export function HowItWorksCta() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-high border-t border-outline-variant relative overflow-hidden">
      <div className="snap-start max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-on-primary mb-6 shadow-md">
          <Bolt size={32} />
        </div>

        <h2 className="text-display-hero-mobile md:text-headline-lg font-headline-lg text-on-surface max-w-2xl mx-auto mb-4 font-bold">
          Join 4,500+ Nepali Creators. Set up your page today.
        </h2>

        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
          Turn community appreciation into sustainable livelihood. Free setup, no credit card required, verified in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/start">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Claim Your Nudge Page
            </Button>
          </Link>
          <Link href="/support">
            <Button variant="outline" size="lg" leftIcon={<Headphones size={18} />}>
              Contact Creator Support
            </Button>
          </Link>
        </div>

        <p className="text-body-sm font-body-sm text-on-surface-variant mt-6">
          Takes only 60 seconds · Zero monthly subscription fees · 100% compliant with Nepal Rastra Bank
        </p>
      </div>
    </section>
  );
}
