// src/components/public/sections/ProductSuiteSection.tsx
import Link from "next/link";
import { Monitor, Spline, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/public/common/Button";

export function ProductSuiteSection() {
  return (
    <section className="py-space-2xl px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto">
      {/* Header Pill & Heading */}
      <div className="text-center max-w-2xl mx-auto mb-space-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/50 text-primary text-label-sm font-label-sm mb-3">
          <Sparkles size={14} />
          <span>The Nudge Product Ecosystem</span>
        </div>
        <h2 className="text-headline-lg font-headline-lg text-on-surface">
          Everything built for creators, under one roof.
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-2">
          Pick the tools that match your creative flow—or connect them together under your verified identity.
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Product 1: Nudge Studio (Flagship) */}
        <div className="bg-linear-to-br from-surface-container-lowest via-surface-container-low to-primary-fixed/20 rounded-3xl p-6 sm:p-8 border-2 border-primary/30 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-5 right-5 bg-primary text-on-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Flagship
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-4 shadow-sm">
              <Monitor size={24} />
            </div>
            <h3 className="text-title-md font-title-md text-on-surface font-bold mb-1">
              Nudge Studio
            </h3>
            <span className="text-xs font-mono text-primary font-semibold">
              studio.nudge.np
            </span>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed">
              Our flagship command center for managing your digital presence. Monitor real-time live stream OBS alerts, configure perk tiers, and track automated next-day bank clearance.
            </p>
          </div>
          <div className="pt-6">
            <Link href="/studio">
              <Button variant="primary" size="sm" fullWidth rightIcon={<ArrowRight size={14} />}>
                Launch Studio
              </Button>
            </Link>
          </div>
        </div>

        {/* Product 2: Nudge Loom (New Link-in-Bio) */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-5 right-5 bg-secondary text-on-secondary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            New
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-4">
              <Spline size={24} />
            </div>
            <h3 className="text-title-md font-title-md text-on-surface font-bold mb-1">
              Nudge Loom
            </h3>
            <span className="text-xs font-mono text-secondary font-semibold">
              loom.nudge.np/@handle
            </span>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-3 leading-relaxed">
              The link-in-bio built to guide your crowd. Embed YouTube releases, Spotify tracks, photography presets, and receive 1-tap domestic mobile wallet tips without leaving your page.
            </p>
          </div>
          <div className="pt-6">
            <Link href="/loom">
              <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight size={14} />}>
                Explore Loom
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}