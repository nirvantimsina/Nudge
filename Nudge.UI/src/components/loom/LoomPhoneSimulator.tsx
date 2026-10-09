// src/components/loom/LoomPhoneSimulator.tsx
import React from "react";
import {
  CheckCircle2,
  Camera,
  PlayCircle,
  Podcast,
  Globe,
  Coffee,
  Radio,
  BarChart3,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export function LoomPhoneSimulator() {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop border-t border-outline-variant/40"
      id="overview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Phone Screen Simulator */}
        <div className="snap-start lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-90 bg-[#1a1715] rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20">
            {/* Phone Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-zinc-800" />
            </div>

            {/* Inner Screen */}
            <div className="relative rounded-[40px] overflow-hidden bg-surface-bright text-on-surface border border-outline-variant/40 transition-all duration-300 min-h-[640px] flex flex-col justify-between">
              {/* Top Header Banner */}
              <div className="h-28 bg-linear-to-br from-primary-container via-surface-tint to-secondary-container relative overflow-hidden flex items-end p-4">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-4 border-white/20" />
                <span className="text-[10px] font-mono font-bold text-on-primary/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  nudge.np/@aayush_visuals
                </span>
              </div>

              {/* Profile Section */}
              <div className="px-5 -mt-10 relative z-10 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-surface-container-lowest flex items-center justify-center text-primary font-bold text-xl shadow-md">
                    AS
                  </div>
                  <span className="absolute bottom-0 right-0 bg-tertiary text-on-tertiary rounded-full p-0.5 ring-2 ring-surface-container-lowest">
                    <CheckCircle2 size={14} />
                  </span>
                </div>

                <h3 className="font-headline-sm text-base text-on-surface mt-2 font-bold">
                  Aayush Shrestha
                </h3>
                <p className="text-[11px] text-on-surface-variant max-w-[260px] line-clamp-2 leading-tight mt-0.5">
                  Documenting Himalayan trails, Newar heritage &amp; street photography. Kathmandu, Nepal 🇳🇵
                </p>

                {/* Social links */}
                <div className="flex items-center gap-2 mt-2.5 text-on-surface-variant">
                  <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                    <Camera size={14} />
                  </span>
                  <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                    <PlayCircle size={14} />
                  </span>
                  <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                    <Podcast size={14} />
                  </span>
                  <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                    <Globe size={14} />
                  </span>
                </div>
              </div>

              {/* Dynamic Blocks Stack */}
              <div className="p-4 flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[360px]">
                {/* In-Bio Direct Support Tile */}
                <div className="bg-surface-container-lowest border border-primary-container/40 rounded-2xl p-3 shadow-xs text-left relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Coffee size={16} className="text-primary-container" />
                      <span className="text-xs font-bold text-on-surface">Send Chiya / Support</span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container">
                      Instant Fonepay
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mb-2 leading-tight">
                    Fuel my next Mustang expedition directly with Nepali mobile wallets.
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button className="flex-1 py-1 px-1.5 rounded-lg bg-surface-container border border-outline-variant text-[11px] font-bold hover:border-primary-container transition-colors">
                      Rs. 100
                    </button>
                    <button className="flex-1 py-1 px-1.5 rounded-lg bg-primary-container text-on-primary text-[11px] font-bold shadow-xs">
                      Rs. 300
                    </button>
                    <button className="flex-1 py-1 px-1.5 rounded-lg bg-surface-container border border-outline-variant text-[11px] font-bold hover:border-primary-container transition-colors">
                      Rs. 500
                    </button>
                  </div>
                </div>

                {/* YouTube Video Embed Preview */}
                <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-2 flex items-center gap-2.5 shadow-xs hover:border-primary-container transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0 relative overflow-hidden">
                    <PlayCircle size={22} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-[9px] font-bold uppercase text-primary tracking-wider">
                      Latest Episode
                    </span>
                    <h5 className="font-bold text-xs text-on-surface truncate">
                      Mustang Chronicles 4K (Full Documentary)
                    </h5>
                  </div>
                </div>
              </div>

              {/* In-Bio Footer */}
              <div className="py-2.5 px-4 bg-surface-container-low text-center border-t border-outline-variant/30">
                <span className="text-[10px] text-on-surface-variant font-medium">
                  Weave yours free at <strong className="text-on-surface">nudge.np</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Studio Canvas Explanation */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/40 border border-primary/20 text-xs font-bold text-primary w-fit">
            <span>LIVE BROWSER ENGINE</span>
          </div>

          <h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">
            Not Just Another Link List. A Himalayan Micro-Portal.
          </h2>

          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Standard bio link tools force your fans across foreign redirects, slow ad trackers, and dollar gateways. Nudge Loom provides an ultra-lightweight, high-speed canvas natively hooked into Nepal&apos;s digital banking grid.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-2 rounded-xl bg-primary-fixed/40 text-primary">
                  <Radio size={18} />
                </div>
                <h4 className="font-title-md text-sm font-bold text-on-surface">
                  OBS Stream Ticker Sync
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Broadcast real-time milestone goals, recent tips, and top patrons directly onto your Twitch or YouTube live stream.
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-2 rounded-xl bg-surface-variant text-on-surface-variant">
                  <BarChart3 size={18} />
                </div>
                <h4 className="font-title-md text-sm font-bold text-on-surface">
                  Diaspora Analytics
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Track clicks by city (Kathmandu, Pokhara, Sydney, Dallas) and conversion rates without privacy violations.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#themes"
              className="inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:underline"
            >
              <span>Explore the live theme switcher below</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
