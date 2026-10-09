// src/components/loom/LoomComparisonTable.tsx
import React from "react";
import { Sparkles, CheckCircle2, XCircle, Lock } from "lucide-react";

export function LoomComparisonTable() {
  return (
    <section className="py-20 bg-surface-container-low border-y border-outline-variant/60" id="comparison">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="snap-start text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
            Unmatched Value
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1 font-bold">
            Loom vs Standard Foreign Bio Links
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
            Why pay foreign subscription fees when Nudge Loom builds local banking, cultural design, and community patronage into the foundational layer for free?
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container">
                <th className="p-4 md:p-5 text-sm font-bold text-on-surface w-2/5">Feature / Capability</th>
                <th className="p-4 md:p-5 text-sm font-bold text-primary bg-primary-fixed/40 w-1/4 border-x border-outline-variant">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={16} />
                    <span>Nudge Loom</span>
                  </div>
                </th>
                <th className="p-4 md:p-5 text-sm font-semibold text-on-surface-variant">Linktree</th>
                <th className="p-4 md:p-5 text-sm font-semibold text-on-surface-variant">Beacons.ai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50 text-xs sm:text-sm">
              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="p-4 md:p-5">
                  <div className="font-bold text-on-surface">Integrated Local Payment Rails</div>
                  <div className="text-xs text-on-surface-variant">Instant Fonepay, eSewa, Khalti &amp; mobile banking</div>
                </td>
                <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Native 1-Tap Checkout</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-error">
                  <div className="flex items-center gap-1.5">
                    <XCircle size={16} />
                    <span>None (Stripe / PayPal only)</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-error">
                  <div className="flex items-center gap-1.5">
                    <XCircle size={16} />
                    <span>None (Stripe only)</span>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="p-4 md:p-5">
                  <div className="font-bold text-on-surface">Creator Platform Fee</div>
                  <div className="text-xs text-on-surface-variant">Monthly cost to unlock video embeds, colors &amp; analytics</div>
                </td>
                <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>100% Free Forever</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-on-surface-variant">
                  $5 to $24 / mo (Rs. 700 - 3,200/mo)
                </td>
                <td className="p-4 md:p-5 text-on-surface-variant">
                  $10 to $30 / month
                </td>
              </tr>

              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="p-4 md:p-5">
                  <div className="font-bold text-on-surface">Artisanal Custom Branding</div>
                  <div className="text-xs text-on-surface-variant">Lokta textures, custom cards, zero forced watermarks</div>
                </td>
                <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Fully Unlocked for Everyone</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-error">
                  <div className="flex items-center gap-1.5">
                    <Lock size={15} />
                    <span>Paid Pro Tier Only</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-error">
                  <div className="flex items-center gap-1.5">
                    <Lock size={15} />
                    <span>Paid Tier Only</span>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="p-4 md:p-5">
                  <div className="font-bold text-on-surface">Nepal Rastra Bank &amp; TDS Compliance</div>
                  <div className="text-xs text-on-surface-variant">Automatic withholding certificate generation &amp; PAN credit</div>
                </td>
                <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Automated IRD Reports</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-outline">Unsupported</td>
                <td className="p-4 md:p-5 text-outline">Unsupported</td>
              </tr>

              <tr className="hover:bg-surface-container/30 transition-colors">
                <td className="p-4 md:p-5">
                  <div className="font-bold text-on-surface">OBS Browser Source Live Sync</div>
                  <div className="text-xs text-on-surface-variant">Show bio link supporters on your live broadcasts</div>
                </td>
                <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Instant Widget Included</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-error">
                  <div className="flex items-center gap-1.5">
                    <XCircle size={16} />
                    <span>No Stream Overlay</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-on-surface-variant">Requires 3rd party Zapier</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-on-surface-variant text-center">
          All Nudge Loom accounts include unlimited links, custom thumbnails, and automatic currency conversion for diaspora patrons.
        </p>
      </div>
    </section>
  );
}
