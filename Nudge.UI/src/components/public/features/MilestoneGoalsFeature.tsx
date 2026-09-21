import { Flag, Users, Heart, Layers, Sparkles, Trophy, Award } from "lucide-react";

export function MilestoneGoalsFeature() {
  return (
    <section className="py-space-3xl bg-surface-container-low border-y border-outline-variant/60" id="milestone-goals">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Visual Goal Card */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-bold font-mono">
                    <Trophy size={14} />
                    ACTIVE CREATOR MILESTONE
                  </div>
                  <span className="text-body-sm font-body-sm text-outline">Target Deadline: 18 Days Left</span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                  Mustang Winter Expedition: 4K Cinema Lens
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6">
                  Funding specialized gear needed to document high-altitude Tibetan culture and forgotten monasteries across Upper Mustang in -15°C terrain.
                </p>

                {/* Progress Bar */}
                <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/40 mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <span className="text-currency-display font-currency-display text-primary">रु १,८५,०००</span>
                      <span className="text-body-sm font-body-sm text-outline"> raised of रु २,५०,०००</span>
                    </div>
                    <span className="text-title-md font-title-md text-primary font-bold">74%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-3.5 rounded-full overflow-hidden p-0.5">
                    <div className="bg-primary-container h-full rounded-full transition-all duration-500 shadow-sm w-[74%]" />
                  </div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant font-mono mt-3">
                    <span className="flex items-center gap-1">
                      <Users size={14} className="text-tertiary" />
                      412 Community Backers
                    </span>
                    <span>Average Nudge: रु ४४९</span>
                  </div>
                </div>

                {/* Backers footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline-variant/40">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed border-2 border-surface-container-lowest flex items-center justify-center font-bold text-xs text-primary">AS</div>
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed border-2 border-surface-container-lowest flex items-center justify-center font-bold text-xs text-secondary">PB</div>
                      <div className="w-8 h-8 rounded-full bg-tertiary-fixed border-2 border-surface-container-lowest flex items-center justify-center font-bold text-xs text-tertiary">SR</div>
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest flex items-center justify-center font-bold text-xs text-on-surface">+409</div>
                    </div>
                    <span className="text-body-sm font-body-sm text-on-surface">Pritam, Binita &amp; 410 others contributed</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-primary-container text-on-primary text-xs font-bold hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm active:scale-95">
                    <span>Support This Goal</span>
                    <Heart size={14} className="fill-current" />
                  </button>
                </div>
              </div>

              {/* Transparent Overlay Simulation Pill */}
              <div className="p-4 rounded-xl bg-inverse-surface text-inverse-on-surface flex items-center justify-between border border-outline/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-secondary-container">
                    <Layers size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-secondary-fixed">OBS Transparent HUD Overlay</div>
                    <div className="text-sm font-bold text-white">4K Lens Goal • 74% Complete [185k / 250k]</div>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-tertiary-fixed">Alpha Channel Ready</span>
              </div>
            </div>
          </div>

          {/* Right Narrative Copy */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/60 border border-outline-variant text-on-secondary-fixed text-label-sm font-label-sm mb-4">
              <Flag size={14} />
              <span>Community Milestones</span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-space-md">
              Turn your dream equipment and ambitious projects into community milestones.
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mb-space-lg leading-relaxed">
              Nepali fans want to be part of your journey, not just silent consumers. Create transparent project milestones—whether it&apos;s a new podcast mic, travel budget for Karnali documentation, or funding an indie game release.
            </p>
            <div className="space-y-3 mb-space-lg">
              <div className="flex items-center gap-3 text-body-md">
                <Sparkles size={18} className="text-primary shrink-0" />
                <span><strong>Transparent Rupee Target:</strong> Real-time progress bar synced across web &amp; OBS.</span>
              </div>
              <div className="flex items-center gap-3 text-body-md">
                <Trophy size={18} className="text-primary shrink-0" />
                <span><strong>Milestone Climax:</strong> Triggers celebratory sound effects when achieved.</span>
              </div>
              <div className="flex items-center gap-3 text-body-md">
                <Award size={18} className="text-primary shrink-0" />
                <span><strong>Exclusive Backer Perks:</strong> Export supporter list for YouTube end-credits.</span>
              </div>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border-l-4 border-primary">
              <p className="text-body-sm font-body-sm italic text-on-surface-variant">
                &quot;We funded our entire Langtang documentary camera rig in 9 days with small contributions from 320 trekking fans.&quot;
              </p>
              <div className="mt-2 text-xs font-bold text-on-surface">— Bibek Thapa, Himalayan Cinematographer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}