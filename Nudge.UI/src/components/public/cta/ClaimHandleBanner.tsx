"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function ClaimHandleBanner() {
  const [handle, setHandle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!handle.trim()) return;
    window.location.href = `/auth/register?handle=${encodeURIComponent(handle.trim())}`;
  }

  return (
    <section className="py-space-3xl max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="claim-handle">
      <div className="rounded-3xl bg-gradient-to-br from-primary-container via-primary to-inverse-surface p-8 md:p-16 text-center text-on-primary relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider inline-block mb-4">
            Start In Under 60 Seconds
          </span>
          <h2 className="text-display-hero-mobile md:text-display-hero font-display-hero text-white mb-space-md leading-tight">
            Ready to build your community on your own terms?
          </h2>
          <p className="text-body-lg font-body-lg text-white/90 mb-space-xl leading-relaxed">
            Join 4,500+ Nepali creators, filmmakers, musicians, and coders who are earning predictable, dignified patronage today.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-surface-container-lowest p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
          >
            <div className="flex items-center pl-3 w-full text-on-surface">
              <span className="font-mono text-outline text-sm select-none">nudge.np/@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                placeholder="your_handle"
                required
                className="w-full px-2 py-2.5 text-sm font-mono focus:outline-none border-none focus:ring-0 text-on-surface bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-on-primary font-bold text-sm hover:bg-primary whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
            >
              <span>Claim My Page</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-4 text-xs text-white/80 flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Zero setup fee</span>
            <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> Free OBS integration</span>
            <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} /> No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
}