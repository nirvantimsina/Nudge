// src/components/loom/LoomHero.tsx
"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export function LoomHero() {
  const [claimHandle, setClaimHandle] = useState("");

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimHandle.trim()) return;
    const cleanHandle = claimHandle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    window.location.href = `/auth/register?handle=${encodeURIComponent(cleanHandle)}`;
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
      <div className="text-center max-w-3xl mx-auto">
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/70 mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-tertiary" />
          <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
            100% Free for Nudge Creators • Zero Platform Cut • Native Fonepay &amp; eSewa Support
          </span>
        </div>

        <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface tracking-tight mb-6 font-bold leading-tight">
          Every Thread of Your Digital Presence.{" "}
          <span className="text-primary-container underline decoration-secondary-container decoration-4 underline-offset-8">
            Woven Into One
          </span>{" "}
          Beautiful Link.
        </h1>

        <p className="text-body-md md:text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
          The artisanal link-in-bio crafted for Himalayan creators. Unify your YouTube docs, TikTok clips, Spotify playlists, and instant{" "}
          <strong className="text-on-surface font-bold">Fonepay, eSewa &amp; Khalti tips</strong> in one blazing-fast digital home.
        </p>

        {/* Handle Reservation Form */}
        <div
          className="max-w-xl mx-auto bg-surface-container-lowest p-2 rounded-2xl border-2 border-primary-container shadow-md transition-all hover:shadow-lg focus-within:ring-4 focus-within:ring-primary-container/20"
          id="claim-handle"
        >
          <form onSubmit={handleClaimSubmit} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center flex-1 px-3 py-2 w-full">
              <span className="text-xs sm:text-sm font-mono font-bold text-outline select-none shrink-0">
                nudge.np/@
              </span>
              <input
                type="text"
                required
                value={claimHandle}
                onChange={(e) =>
                  setClaimHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                }
                placeholder="yourhandle"
                className="w-full border-0 p-0 pl-1 text-on-surface font-title-md text-sm sm:text-base focus:ring-0 placeholder:text-outline-variant bg-transparent focus:outline-none"
              />
            </div>
            <Button variant="primary" size="md" type="submit" rightIcon={<ArrowRight size={16} />}>
              Claim Loom Link
            </Button>
          </form>
        </div>

        <p className="mt-3 text-label-sm font-label-sm text-on-surface-variant">
          Takes 30 seconds. Connects automatically to your existing Nudge Creator wallet.
        </p>
      </div>
    </section>
  );
}
