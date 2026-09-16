import { Wallet, ShieldCheck, Globe, HeartHandshake, Shield } from "lucide-react";
import { MandalaWatermark } from "@/src/components/public/decorative/MandalaWatermark";

export function FeatureBento() {
  return (
    <section className="py-space-2xl bg-surface-container-low/60 border-y border-outline-variant/60 relative overflow-hidden" id="how-it-works">
      <MandalaWatermark className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-[0.04]" />

      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-outline-variant text-label-sm font-label-sm text-primary mb-3 shadow-xs">
            <span>Crafted for Kathmandu, Pokhara &amp; Everywhere Beyond</span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
            Designed for Local Friction, Built for Global Love
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2">
            No international credit card hurdles. No delayed US wire fees. Instant local support
            rooted in the sacred spirit of <em>Dakshina</em> (दक्षिणा).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Transparent, creator-first platform */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-4">
                <Wallet size={24} />
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">
                Transparent, Creator-First Platform
              </h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed mb-3">
                A simple, predictable low platform fee so Nudge can sustainably empower creators,
                paired with scheduled, reliable bank payouts directly to all Nepali banks.
              </p>
              <div className="mb-4 p-2.5 rounded-xl bg-tertiary-fixed/40 border border-tertiary-container/30 flex items-start gap-2">
                <HeartHandshake size={18} className="text-tertiary shrink-0 mt-0.5" />
                <p className="text-[11.5px] font-bold text-tertiary leading-tight">
                  0% Platform Fee for Open Source Contributors &amp; Humanitarian Causes (Always Free).
                </p>
              </div>
            </div>
            <div className="bg-surface-container p-3 rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary" /> Predictable Payouts
              </span>
              <span className="text-primary font-semibold">Low 5% Platform Fee</span>
            </div>
          </div>

          {/* Impersonation shield & KYC */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ring-1 ring-tertiary/20">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-4">
                <ShieldCheck size={24} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Impersonation Shield &amp; KYC</h3>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-tertiary text-on-tertiary">
                  Protected
                </span>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed mb-4">
                Legitimate creators, artists, and public figures are verified through Nepal national
                ID (Nagarik App) and verified social cross-auth so fans always know they are nudging
                the genuine creator.
              </p>
            </div>
            <div className="bg-surface-container p-3 rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <span className="text-outline">Fraud Protection:</span>
              <span className="font-bold text-tertiary flex items-center gap-1">
                <Shield size={14} /> Nagarik App &amp; KYC
              </span>
            </div>
          </div>

          {/* Global diaspora patronage */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Global Diaspora Patronage</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed mb-4">
                Nepali diaspora in Sydney, Dallas, London, or Tokyo can pay with Apple Pay, Visa, and
                Mastercard in USD/AUD. You receive crisp NPR directly in Nepal.
              </p>
            </div>
            <div className="bg-surface-container p-3 rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <span className="text-outline">Supported Currencies:</span>
              <span className="font-bold text-on-surface">USD • AUD • GBP • EUR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
