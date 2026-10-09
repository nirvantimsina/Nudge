// src/components/loom/LoomValuePillars.tsx
import React from "react";
import { Layers, CreditCard, PiggyBank, BarChart3, Zap, CheckCircle2, MapPin } from "lucide-react";

export function LoomValuePillars() {
  return (
    <section className="snap-start py-20 bg-surface-container border-y border-outline-variant/50 relative" id="value-pillars">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-label-md font-label-md text-primary uppercase tracking-widest font-bold">
            The Four Threads
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mt-2 mb-4 font-bold">
            Why Nepali Creators Prefer Nudge Loom
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            Foreign bio link tools treat Nepal as an unsupported afterthought. Loom is architected around local payment rails, Himalayan storytelling, and zero platform exploitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Thread 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Layers size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                Thread 01
              </span>
              <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                Unify Your Digital Identity
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                One single URL to anchor your Instagram bio, TikTok profile, YouTube description, Substack, and GitHub without third-party redirect cookies.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-semibold">
              <Zap size={14} />
              <span>Sub-50ms Kathmandu edge loading</span>
            </div>
          </div>

          {/* Thread 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border-2 border-primary-container flex flex-col justify-between shadow-md relative">
            <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold">
              The Gamechanger
            </span>
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-xs">
                <CreditCard size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold text-primary-container uppercase tracking-wider">
                Thread 02
              </span>
              <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                Native In-Bio Patronage
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Unlike Linktree or Beacons which force followers to external US-only payment screens, your audience can support you with eSewa, Fonepay, or Khalti directly inside your bio.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-primary font-semibold">
              <CheckCircle2 size={14} />
              <span>3.4x higher tipping conversion</span>
            </div>
          </div>

          {/* Thread 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-4">
                <PiggyBank size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider">
                Thread 03
              </span>
              <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                Zero Platform Taxes
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                100% Free forever for Nudge creators. No paying $120/year to unlock custom themes, video embeds, or remove foreign branding logos.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-semibold">
              <CheckCircle2 size={14} />
              <span>Rs. 0 subscription fee</span>
            </div>
          </div>

          {/* Thread 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold text-tertiary uppercase tracking-wider">
                Thread 04
              </span>
              <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Know where your traffic thrives. Clear geographical breakdown across Nepali cities and diaspora hubs (Sydney, London, Dallas, Tokyo).
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-semibold">
              <MapPin size={14} />
              <span>Privacy-first diaspora tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
