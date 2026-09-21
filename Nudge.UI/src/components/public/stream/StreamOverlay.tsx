"use client";

import { useState } from "react";
import { Eye, Zap, Volume2, Mic, Copy, Check, Radio } from "lucide-react";

export interface StreamAlert {
  senderName: string;
  amount: number;
  comment: string;
  ttsVoiceLabel: string;
}

export interface StreamOverlayProps {
  studioLabel?: string;
  alert: StreamAlert;
  widgetUrl: string;
}

/**
 * Mockup of the OBS/Streamlabs browser-source alert overlay, shown on the marketing page.
 */
export function StreamOverlay({
  studioLabel = "1080p60 • Kathmandu Studio",
  alert,
  widgetUrl,
}: StreamOverlayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(widgetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="bg-inverse-surface rounded-2xl p-4 shadow-xl border border-inverse-surface/80 text-inverse-on-surface">
      {/* OBS Studio Window Chrome Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-inverse-on-surface/10 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-error inline-block" />
            <span className="w-3 h-3 rounded-full bg-secondary-container inline-block" />
            <span className="w-3 h-3 rounded-full bg-tertiary-fixed inline-block" />
          </div>
          <span className="font-mono text-inverse-on-surface/70 pl-2 truncate text-[11px] sm:text-xs">
            OBS Studio 30.1 • Scene: &quot;{studioLabel}&quot;
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
          <span className="inline-flex items-center gap-1 text-error font-semibold">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" /> LIVE
          </span>
          <span className="text-inverse-on-surface/50 hidden sm:inline">60 FPS</span>
        </div>
      </div>

      {/* Video Canvas Stage */}
      <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-neutral-950 via-neutral-900 to-black flex flex-col justify-between p-4 border border-white/5">
        {/* Ambient Studio Lighting Glows */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

        {/* HUD Top Bar: Viewer Count + Milestone */}
        <div className="relative z-10 flex justify-between items-center text-xs">
          <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-white">
            <Eye size={13} className="text-error" />
            <span className="font-bold font-mono text-[11px]">1,842 Watching</span>
          </div>
          <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 text-secondary-fixed">
            <Zap size={13} />
            <span className="font-medium text-[11px]">Goal: 74% Met</span>
          </div>
        </div>

        {/* Floating Dakshina / Nudge Alert Card */}
        <div className="relative z-20 mx-auto max-w-lg w-full">
          <div className="bg-surface-container-lowest/95 backdrop-blur-lg border-2 border-primary-container p-3.5 rounded-2xl shadow-2xl text-on-surface relative overflow-hidden">
            {/* Cultural Top Gradient Border */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary-container to-primary absolute top-0 left-0" />

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-md">
                <Radio size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-on-surface text-xs sm:text-sm truncate">
                      {alert.senderName}
                    </span>
                    <span className="text-[9px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.2 rounded font-bold font-mono shrink-0">
                      eSewa 1-Tap
                    </span>
                  </div>
                  <span className="text-primary font-headline-md font-bold text-xs sm:text-sm shrink-0">
                    रु. {alert.amount.toLocaleString()}
                  </span>
                </div>

                <p className="text-on-surface-variant text-[11px] sm:text-xs mt-1 line-clamp-2 leading-tight">
                  &quot;{alert.comment}&quot;
                </p>

                {/* TTS Audio Indicator Bar */}
                <div className="mt-2 pt-2 border-t border-outline-variant/40 flex items-center justify-between text-[10px] text-on-surface-variant">
                  <div className="flex items-center gap-1 text-primary">
                    <Volume2 size={13} className="animate-pulse shrink-0" />
                    <span className="font-mono text-[10px] truncate">
                      TTS: {alert.ttsVoiceLabel}
                    </span>
                  </div>
                  <span className="text-[9px] text-outline font-mono shrink-0">
                    Singing Bowl Chime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Waveform / Dock Strip */}
        <div className="relative z-10 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[10px] font-mono text-white/80">
          <div className="flex items-center gap-1.5">
            <Mic size={12} className="text-tertiary-fixed" />
            <span className="truncate max-w-[170px] sm:max-w-none">Rode PodMic (Kathmandu Studio)</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-16 sm:w-20 h-1.5 bg-white/20 rounded-full overflow-hidden flex">
              <div className="bg-tertiary w-3/4 h-full" />
              <div className="bg-secondary-container w-1/4 h-full" />
            </div>
            <span>-6 dB</span>
          </div>
        </div>
      </div>

      {/* Bottom Browser Source URL Bar */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-inverse-on-surface/70 px-1 gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
          <span className="text-outline text-[10px] uppercase shrink-0">Source:</span>
          <code className="bg-black/50 px-2 py-0.5 rounded text-[10px] text-white/90 truncate">
            {widgetUrl}
          </code>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="text-primary-fixed-dim hover:text-white transition-colors shrink-0 flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check size={12} className="text-tertiary-fixed" />
              <span className="text-[10px] text-tertiary-fixed">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span className="text-[10px]">Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}