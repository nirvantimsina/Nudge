import { Sliders, TrendingUp, Coffee, MessageSquare, Heart, Download, PlusCircle, PieChart } from "lucide-react";

export function CreatorStudioFeature() {
  return (
    <section className="py-space-3xl max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="creator-dashboard">
      <div className="text-center max-w-3xl mx-auto mb-space-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant text-label-sm font-label-sm mb-3">
          <Sliders size={14} />
          <span>Creator Studio Command Center</span>
        </div>
        <h2 className="text-headline-lg font-headline-lg text-on-surface">
          No fluff. Just the data, controls, and revenue clarity you need.
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-2">
          A utility-first workspace engineered for rapid workflow. Monitor live stream spikes, configure Chiya pricing, and interact with patrons in fluent Nepali.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {/* Card A: Revenue */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <span className="text-label-sm font-label-sm font-mono text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded">
                +32.4% vs last mo
              </span>
            </div>
            <h3 className="text-title-md font-title-md text-on-surface mb-1">Real-Time Dakshina &amp; Revenue</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
              Full visibility on peak cheer hours during live streams, plus payment channel breakdown.
            </p>
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 mb-4">
              <div className="text-xs text-outline font-mono">THIS MONTH EARNINGS</div>
              <div className="text-headline-md font-headline-md text-primary font-bold">रु. ९४,३५०</div>
              <div className="mt-4 pt-4 border-t border-outline-variant/40 flex items-end justify-between h-20 gap-1.5">
                <div className="w-full bg-primary-fixed h-[30%] rounded-t" />
                <div className="w-full bg-primary-fixed h-[45%] rounded-t" />
                <div className="w-full bg-primary-fixed h-[25%] rounded-t" />
                <div className="w-full bg-primary-container h-[95%] rounded-t relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-inverse-surface text-white px-1 rounded">Stream</span>
                </div>
                <div className="w-full bg-primary-fixed h-[55%] rounded-t" />
                <div className="w-full bg-primary-fixed h-[65%] rounded-t" />
                <div className="w-full bg-primary-fixed h-[80%] rounded-t" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-outline mt-2">
                <span>Baishakh 1</span>
                <span>Live Peak</span>
                <span>Today</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 text-xs text-on-surface-variant flex items-center justify-between">
            <span>Channel: 68% eSewa • 24% Khalti</span>
            <PieChart size={14} />
          </div>
        </div>

        {/* Card B: Chiya Perks */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                <Coffee size={20} />
              </div>
              <span className="text-label-sm font-label-sm text-on-surface font-mono bg-surface-container px-2 py-0.5 rounded">
                3 Active Tiers
              </span>
            </div>
            <h3 className="text-title-md font-title-md text-on-surface mb-1">Tier &amp; Chiya Perks Manager</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
              Customise your quick-patronage cups with authentic tea, coffee, and monthly patron tiers.
            </p>
            <div className="space-y-2 mb-4">
              <div className="p-2.5 rounded-xl border border-primary bg-surface-container-low flex items-center justify-between">
                <div className="text-xs font-bold text-on-surface">1 Masala Chiya</div>
                <span className="text-xs font-bold font-mono text-primary">रु. १००</span>
              </div>
              <div className="p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest flex items-center justify-between">
                <div className="text-xs font-bold text-on-surface">Special Pot + Discord</div>
                <span className="text-xs font-bold font-mono text-on-surface">रु. ५००</span>
              </div>
              <div className="p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest flex items-center justify-between">
                <div className="text-xs font-bold text-on-surface">Inner Circle Patron</div>
                <span className="text-xs font-bold font-mono text-on-surface">रु. १,५००</span>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-primary font-bold cursor-pointer hover:underline">
            <span>+ Add Custom Perk Tier</span>
            <PlusCircle size={14} />
          </div>
        </div>

        {/* Card C: Backer Communication Wall */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <span className="text-label-sm font-label-sm text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded font-mono">
                Live Feed
              </span>
            </div>
            <h3 className="text-title-md font-title-md text-on-surface mb-1">Backer Communication Wall</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
              Reply to notes in Nepali Unicode, heart messages, and export backer emails with 1 click.
            </p>
            <div className="space-y-3 mb-4">
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs">
                <div className="flex justify-between font-bold text-on-surface mb-1">
                  <span>Rohan Bajracharya</span>
                  <span className="text-[10px] text-outline font-normal">10m ago</span>
                </div>
                <p className="text-on-surface-variant">&quot;Dai, tutorial le career change garyo! Dhanyabad!&quot;</p>
                <div className="mt-2 flex items-center gap-3 text-primary text-[11px]">
                  <button className="flex items-center gap-1 font-bold"><Heart size={12} className="fill-current" /> Loved</button>
                  <button className="underline text-on-surface-variant">Reply</button>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs">
                <div className="flex justify-between font-bold text-on-surface mb-1">
                  <span>Sneha KC (Sydney)</span>
                  <span className="text-[10px] text-outline font-normal">2h ago</span>
                </div>
                <p className="text-on-surface-variant">&quot;Sending love from Australia. Keep documenting!&quot;</p>
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
            <span className="text-outline">Export for Video Credits</span>
            <button className="text-primary font-bold hover:underline flex items-center gap-1">
              <span>Download CSV</span>
              <Download size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}