import Image from "next/image";
import { Radio, Check, Link as LinkIcon, Eye, Zap, Volume2, Mic, Coffee } from "lucide-react";

export function ObsAlertsFeature() {
  return (
    <section className="py-space-3xl max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="stream-overlays">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        {/* Left Copy */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant text-primary text-label-sm font-label-sm mb-4">
            <Radio size={14} />
            <span>For YouTube, Facebook &amp; Twitch Streamers</span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-space-md">
            Instant cheers with Nepali Text-to-Speech &amp; authentic sound chimes.
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mb-space-lg leading-relaxed">
            Transform viewer love into on-screen celebration. Whenever an audience member tips via eSewa, Khalti, or Fonepay, trigger beautiful animated alert banners, voice narration in Devanagari, and cultural chimes in real-time.
          </p>

          <div className="space-y-4 mb-space-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center mt-0.5 shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-title-md font-title-md text-on-surface">1-Click Tokenized Browser Source</h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Compatible with OBS Studio, Streamlabs, vMix, and Prism Live with zero plugins.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center mt-0.5 shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-title-md font-title-md text-on-surface">Nepali Devanagari &amp; Romanized Voice Engine</h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Choose between &apos;Shreya&apos; and &apos;Bikram&apos; voices with automatic vulgarity and slur filtering.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center mt-0.5 shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-title-md font-title-md text-on-surface">Artisanal Cultural Chimes &amp; Limits</h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Singing Bowl Ding, Sarangi swell, or Madal groove with custom minimum limits.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-container rounded-xl border border-outline-variant/60 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <LinkIcon size={16} className="text-primary shrink-0" />
              <span className="text-body-sm font-mono text-outline truncate">https://nudge.np/overlay/v2/stream/892e...</span>
            </div>
            <button className="px-2.5 py-1 text-xs font-semibold bg-surface-container-lowest border border-outline-variant rounded hover:bg-surface text-primary shrink-0 active:scale-95 transition">
              Copy Link
            </button>
          </div>
        </div>

        {/* Right OBS Canvas */}
        <div className="lg:col-span-7">
          <div className="bg-inverse-surface rounded-2xl p-4 shadow-xl border border-inverse-surface/80 text-inverse-on-surface">
            {/* Title Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-inverse-on-surface/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-error inline-block" />
                  <span className="w-3 h-3 rounded-full bg-secondary-container inline-block" />
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed inline-block" />
                </div>
                <span className="font-mono text-inverse-on-surface/70 pl-2">OBS Studio 30.1 • Scene: &quot;Kathmandu Gaming Live&quot;</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="inline-flex items-center gap-1 text-error">
                  <span className="w-2 h-2 rounded-full bg-error animate-ping" /> LIVE 02:44:18
                </span>
                <span className="text-inverse-on-surface/50">60 FPS</span>
              </div>
            </div>

            {/* Video Canvas */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-black/90 flex flex-col justify-between p-4 md:p-6">
              <Image
                src="/logo.svg"
                alt="Kathmandu Streamer in Studio"
                fill
                className="object-cover opacity-40"
              />

              {/* Canvas HUD Top */}
              <div className="relative z-10 flex justify-between items-center text-xs">
                <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 text-white">
                  <Eye size={14} className="text-error" />
                  <span className="font-bold font-mono">1,842 Watching</span>
                </div>
                <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-secondary-fixed">
                  <Zap size={14} />
                  <span className="font-medium">Goal: 74% Met</span>
                </div>
              </div>

              {/* Floating Alert Card */}
              <div className="relative z-20 mx-auto max-w-lg w-full">
                <div className="bg-surface-container-lowest/95 backdrop-blur-lg border-2 border-primary-container p-4 rounded-2xl shadow-2xl text-on-surface relative overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary-container to-primary absolute top-0 left-0" />
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-md">
                      <Coffee size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-on-surface text-sm">Anmol Shrestha</span>
                          <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.5 rounded font-bold font-mono">eSewa 1-Tap</span>
                        </div>
                        <span className="text-primary font-bold text-sm">रु. १,५००</span>
                      </div>
                      <p className="text-on-surface-variant text-xs mt-1 line-clamp-2">
                        &quot;Mustang vlog episode 4 was breathtaking! 🏔️🔥 Keep representing Nepali stories!&quot;
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-outline-variant/50 flex items-center justify-between text-xs text-on-surface-variant">
                        <div className="flex items-center gap-1.5 text-primary">
                          <Volume2 size={14} className="animate-pulse" />
                          <span className="font-mono text-[11px]">Nepali TTS: Bikram</span>
                        </div>
                        <span className="text-[10px] text-outline font-mono">Singing Bowl Chime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Waveform Bottom Dock */}
              <div className="relative z-10 bg-black/70 backdrop-blur-md p-2 rounded-lg border border-white/10 flex items-center justify-between text-[11px] font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <Mic size={14} className="text-tertiary-fixed" />
                  <span>Rode PodMic (Kathmandu Studio)</span>
                </div>
                <span>-6 dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}