// src/components/loom/LoomThemeShowcase.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowUpRight, Coffee, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { LOOM_THEMES } from "@/src/features/loom/constants/loom-themes";

export function LoomThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState<string>("artisanal");
  const currentTheme = LOOM_THEMES[activeTheme] ?? LOOM_THEMES.artisanal;

  return (
    <section className="py-20 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="themes">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
        <div>
          <span className="snap-start text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
            Atmospheric Design
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1 font-bold">
            Pick a Canvas Aesthetic. Or Weave Your Own.
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-xl mt-2 leading-relaxed">
            Toggle through live styles to see how your links, chiya pledges, and avatars adapt to your creative identity.
          </p>
        </div>

        {/* Theme Selector Pills */}
        <div className="flex items-center gap-1.5 bg-surface-container-high p-1 rounded-full border border-outline-variant/60 w-fit">
          {Object.values(LOOM_THEMES).map((th) => (
            <button
              key={th.id}
              type="button"
              onClick={() => setActiveTheme(th.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTheme === th.id
                  ? "bg-primary-container text-on-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {th.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Simulation Frame */}
      <div className="rounded-3xl border border-outline-variant bg-surface p-6 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
          {/* Left: Theme Details */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary-fixed text-on-primary-fixed">
              {currentTheme.badge}
            </span>
            <h3 className="text-2xl font-bold text-on-surface">
              {currentTheme.title}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {currentTheme.desc}
            </p>

            <ul className="space-y-2 pt-1 text-xs text-on-surface">
              {currentTheme.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <Link href="#claim-handle">
                <Button variant="primary" size="sm" rightIcon={<ArrowUpRight size={14} />}>
                  Use this theme for free
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Simulated Rendered Card */}
          <div className="lg:col-span-7 flex justify-center">
            <div className={`w-full max-w-md rounded-3xl p-6 transition-all duration-300 ${currentTheme.cardClass}`}>
              {/* Mini Profile Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-outline-variant flex items-center justify-center font-bold text-base shrink-0">
                  {currentTheme.creatorName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base">{currentTheme.creatorName}</h4>
                    <CheckCircle2 size={15} className="text-tertiary fill-tertiary-fixed" />
                  </div>
                  <p className={`text-xs font-mono font-semibold ${currentTheme.headerAccentClass}`}>
                    {currentTheme.creatorHandle}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                    {currentTheme.creatorBio}
                  </p>
                </div>
              </div>

              {/* Links Inside Theme Card */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/60 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <currentTheme.tile1Icon size={16} className="text-primary shrink-0" />
                    <span className="font-semibold">{currentTheme.tile1Text}</span>
                  </div>
                  <ArrowRight size={14} className="text-outline" />
                </div>

                <div className={`p-3 rounded-xl flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer shadow-sm ${currentTheme.primaryActionClass}`}>
                  <div className="flex items-center gap-2.5">
                    <Coffee size={16} />
                    <div>
                      <div className="font-bold">Support My Creative Work</div>
                      <div className="text-[10px] opacity-85">Instant Fonepay / eSewa Support</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/20 text-[10px] font-bold">Nudge</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/60 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <currentTheme.tile3Icon size={16} className="text-secondary shrink-0" />
                    <span className="font-semibold">{currentTheme.tile3Text}</span>
                  </div>
                  <ArrowRight size={14} className="text-outline" />
                </div>
              </div>

              {/* Card Security Strip */}
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-tertiary" />
                  <span>Encrypted Rails</span>
                </span>
                <span className="font-semibold text-primary font-mono">NRB Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
