// src/components/loom/LoomTestimonials.tsx
import React from "react";
import { TrendingUp, PiggyBank, Radio } from "lucide-react";

export function LoomTestimonials() {
  return (
    <section className="snap-start py-20 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="showcase">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
          Woven Across Nepal
        </span>
        <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1 font-bold">
          Loved by Filmmakers, Podcasters &amp; Independent Makers
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
          From Kathmandu tech builders to Pokhara adventure vloggers, see how Himalayan creators anchor their bio traffic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Creator 1 */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/70 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center shrink-0">
                SB
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Shreya Bajracharya</h4>
                <p className="text-xs font-mono font-bold text-primary">nudge.np/@shreyatalks</p>
                <span className="text-[11px] text-on-surface-variant">Host, &apos;Kathmandu Uncut&apos; Podcast</span>
              </div>
            </div>
            <p className="text-xs text-on-surface italic mb-4 leading-relaxed">
              &ldquo;Putting my Loom link on Instagram boosted my monthly chiya tips by 280%. Listeners in Sydney and Pokhara don&apos;t need an account—they just tap, scan Fonepay or Apple Pay, and support the show in seconds.&rdquo;
            </p>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
            <span>24.8k monthly clicks</span>
            <span className="text-tertiary font-bold flex items-center gap-1">
              <TrendingUp size={14} /> +340% tips
            </span>
          </div>
        </div>

        {/* Creator 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border-2 border-primary-container shadow-sm flex flex-col justify-between relative">
          <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
            Featured Creator
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center shrink-0">
                SK
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Sujan Karmacharya</h4>
                <p className="text-xs font-mono font-bold text-primary">nudge.np/@sujan_visuals</p>
                <span className="text-[11px] text-on-surface-variant">High-Altitude Cinematographer</span>
              </div>
            </div>
            <p className="text-xs text-on-surface italic mb-4 leading-relaxed">
              &ldquo;I canceled my $15 Linktree Pro subscription the morning Loom launched. Loom&apos;s Himalayan Lokta paper theme matches my visual brand completely, and I can showcase YouTube docs right at the top.&rdquo;
            </p>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
            <span>61.2k monthly clicks</span>
            <span className="text-tertiary font-bold flex items-center gap-1">
              <PiggyBank size={14} /> Saved $180/yr
            </span>
          </div>
        </div>

        {/* Creator 3 */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/70 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-tertiary/15 text-tertiary font-bold flex items-center justify-center shrink-0">
                NT
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Nitesh Thapa</h4>
                <p className="text-xs font-mono font-bold text-primary">nudge.np/@nitesh_code</p>
                <span className="text-[11px] text-on-surface-variant">Tech Educator &amp; Open Source Dev</span>
              </div>
            </div>
            <p className="text-xs text-on-surface italic mb-4 leading-relaxed">
              &ldquo;The OBS Stream Ticker sync is incredible. When I livestream coding workshops on YouTube, my students scan the QR on my Loom link and the donation alert triggers on my stream in real time.&rdquo;
            </p>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
            <span>18.3k monthly clicks</span>
            <span className="text-tertiary font-bold flex items-center gap-1">
              <Radio size={14} /> Live OBS alerts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
