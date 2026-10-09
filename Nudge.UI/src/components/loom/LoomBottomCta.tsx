// src/components/loom/LoomBottomCta.tsx
"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export function LoomBottomCta() {
  const [claimHandle, setClaimHandle] = useState("");

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimHandle.trim()) return;
    const cleanHandle = claimHandle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    window.location.href = `/auth/register?handle=${encodeURIComponent(cleanHandle)}`;
  };

  return (
    <section className="snap-start py-16 bg-linear-to-br from-primary via-surface-tint to-primary-container text-on-primary relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-space-md md:px-margin-tablet text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider mb-4">
          Start in 30 Seconds
        </span>

        <h2 className="text-display-hero-mobile md:text-display-hero font-display-hero font-bold tracking-tight mb-4 text-white">
          Weave Your Online Presence Today.
        </h2>

        <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Join thousands of Nepali creators who turned their bio into an artisanal canvas with native 1-tap Fonepay and eSewa patronage.
        </p>

        <div className="max-w-md mx-auto bg-surface-container-lowest p-2 rounded-2xl border-2 border-white/40 shadow-2xl">
          <form onSubmit={handleClaimSubmit} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center flex-1 px-3 py-2 w-full text-left">
              <span className="text-xs font-mono font-bold text-outline select-none shrink-0">
                nudge.np/@
              </span>
              <input
                type="text"
                required
                value={claimHandle}
                onChange={(e) =>
                  setClaimHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                }
                placeholder="claimyourname"
                className="w-full border-0 p-0 pl-1 text-on-surface font-title-md text-xs sm:text-sm focus:ring-0 placeholder:text-outline-variant bg-transparent focus:outline-none"
              />
            </div>
            <Button variant="primary" size="sm" type="submit" rightIcon={<ArrowUpRight size={14} />}>
              Claim Free
            </Button>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/85">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={14} /> Zero Setup Fees
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={14} /> No Credit Card Required
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={14} /> Instant Handle Activation
          </span>
        </div>
      </div>
    </section>
  );
}
