"use client";

import Image from "next/image";
import {
  Sparkles,
  ExternalLink,
  Video,
  Music,
  ShoppingBag,
  CheckCircle2,
  Share2,
  Lock,
  Heart,
  QrCode,
  Layers,
  ArrowUpRight
} from "lucide-react";

export function VerifiedProfileFeature() {
  return (
    <section className="py-space-3xl bg-surface-container border-y border-outline-variant/60" id="verified-profile">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">

          {/* Left Narrative Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm mb-4">
              <Layers size={14} />
              <span>Introducing Nudge Loom</span>
            </div>

            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-space-md">
              The Nepali Link-in-Bio that actually weaves all your work and domestic revenue together.
            </h2>

            <p className="text-body-md font-body-md text-on-surface-variant mb-space-lg leading-relaxed">
              Linktree and Bio.site cannot process eSewa, Khalti, or Nepali QR payments. <strong>Nudge Loom</strong> is your all-in-one digital landing hub—curate your YouTube videos, Discord servers, photography prints, and let supporters send domestic dakshina in 10 seconds flat.
            </p>

            <div className="space-y-4 mb-space-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-title-md font-title-md text-on-surface">Integrated 1-Tap Rupee Checkout</h4>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Unlike standard link trees that send users to external payment gateways, Loom nests zero-redirect eSewa &amp; mobile banking tips right inside your bio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                  <Layers size={18} />
                </div>
                <div>
                  <h4 className="text-title-md font-title-md text-on-surface">Rich Himalayan Media Blocks</h4>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Embed your latest YouTube vlog, Spotify song, upcoming workshops, or sell digital photo presets without fans ever leaving your link.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <QrCode size={18} />
                </div>
                <div>
                  <h4 className="text-title-md font-title-md text-on-surface">Smart QR &amp; Nagarik Verified Identity</h4>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Get an instant printable Loom QR code for your merch, pop-up events, and YouTube descriptions with automated Nagarik identity verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mobile Canvas Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[400px] bg-surface-container-lowest rounded-[36px] p-5 border-4 border-outline-variant/80 shadow-2xl relative overflow-hidden">

              {/* Loom Browser / Handle Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-high text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full font-mono text-[11px] text-outline">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  loom.nudge.np/@smarika
                </div>
                <button className="p-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-primary transition-colors">
                  <Share2 size={13} />
                </button>
              </div>

              {/* Creator Bio Header */}
              <div className="text-center flex flex-col items-center mb-4">
                <div className="relative mb-2">
                  <Image
                    src="/logo.svg"
                    alt="Smarika Gautam"
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded-full object-cover border-2 border-primary shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-0.5 shadow">
                    <CheckCircle2 size={14} className="fill-primary text-white" />
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-on-surface">Smarika Gautam</h3>
                  <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.5 rounded font-bold font-mono">
                    Filmmaker
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant max-w-xs mt-1 leading-snug">
                  Preserving Kathmandu Valley&apos;s disappearing traditional water conduits (Hiti) through documentary cinema.
                </p>
              </div>

              {/* LOOM BLOCKS STACK */}
              <div className="space-y-2.5">

                {/* Loom Block 1: Native Nudge Dakshina Widget */}
                <div className="p-3 bg-primary-fixed/30 rounded-2xl border-2 border-primary/40 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Heart size={13} className="text-primary fill-primary" />
                      <span className="text-xs font-bold text-on-surface">Direct Patron Support</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Zero Fees
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mb-2 text-center">
                    <button className="py-1.5 px-2 bg-surface-container-lowest border border-outline-variant/80 rounded-xl text-xs font-bold text-on-surface hover:border-primary">
                      Rs. 150
                    </button>
                    <button className="py-1.5 px-2 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-sm">
                      Rs. 500
                    </button>
                    <button className="py-1.5 px-2 bg-surface-container-lowest border border-outline-variant/80 rounded-xl text-xs font-bold text-on-surface hover:border-primary">
                      Custom ₹
                    </button>
                  </div>

                  <button className="w-full py-2 bg-primary text-on-primary text-xs font-bold rounded-xl shadow transition active:scale-95 flex items-center justify-center gap-1">
                    <span>Nudge with eSewa / Khalti</span>
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[9px] text-outline mt-1.5">
                    <Lock size={9} />
                    <span>Instant local bank settlement</span>
                  </div>
                </div>

                {/* Loom Block 2: Featured Video Link */}
                <a
                  href="#youtube"
                  className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 hover:border-primary flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <svg
                        className="w-[18px] h-[18px] fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div className="truncate text-left">
                      <div className="text-xs font-bold text-on-surface truncate">Watch &quot;Lost Waters of Patan&quot; (4K)</div>
                      <div className="text-[10px] text-outline">New YouTube Mini-Doc • 18m</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-outline group-hover:text-primary shrink-0 ml-1 transition-colors" />
                </a>

                {/* Loom Block 3: Merch / Digital Downloads */}
                <a
                  href="#presets"
                  className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 hover:border-primary flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="truncate text-left">
                      <div className="text-xs font-bold text-on-surface truncate">Mustang Cinema LUTs Pack</div>
                      <div className="text-[10px] text-outline">Film emulation presets for Premiere &amp; DaVinci</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-outline group-hover:text-primary shrink-0 ml-1 transition-colors" />
                </a>

                {/* Loom Block 4: Community / Audio */}
                <a
                  href="#soundtrack"
                  className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 hover:border-primary flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Music size={18} />
                    </div>
                    <div className="truncate text-left">
                      <div className="text-xs font-bold text-on-surface truncate">Original Documentary Score</div>
                      <div className="text-[10px] text-outline">Stream on Spotify &amp; Apple Music</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-outline group-hover:text-primary shrink-0 ml-1 transition-colors" />
                </a>

              </div>

              {/* Loom Branding Footer */}
              <div className="mt-4 pt-2 text-center">
                <span className="text-[10px] font-mono text-outline uppercase tracking-wider inline-flex items-center gap-1">
                  Powered by <strong className="text-primary font-bold">Nudge Loom</strong>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}