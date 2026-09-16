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

/** Mockup of the OBS/Streamlabs browser-source alert overlay, shown on the marketing page. */
export function StreamOverlay({
  studioLabel = "1080p60 • Studio",
  alert,
  widgetUrl,
}: StreamOverlayProps) {
  return (
    <div className="relative bg-inverse-surface text-inverse-on-surface rounded-2xl p-5 shadow-2xl border-4 border-surface-container-highest overflow-hidden">
      <div className="flex items-center justify-between border-b border-surface-variant/30 pb-3 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="font-bold tracking-wide uppercase text-[11px] text-red-400">Live broadcast</span>
          <span className="text-outline-variant text-[11px]">| {studioLabel}</span>
        </div>
        <span className="bg-surface-variant/40 px-2 py-0.5 rounded text-[11px] text-surface-bright">
          OBS Studio
        </span>
      </div>

      <div className="relative aspect-video rounded-xl bg-surface-container-highest/20 border border-white/10 overflow-hidden flex flex-col justify-end p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

        <div className="stream-alert-glow relative z-10 w-full bg-gradient-to-r from-surface-container-lowest via-surface-container to-surface-bright text-on-surface p-3.5 rounded-xl border-2 border-secondary-container shadow-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center shadow-sm">
                🔔
              </span>
              <span className="text-xs font-extrabold text-primary tracking-wide uppercase">New nudge alert!</span>
            </div>
            <span className="bg-primary text-on-primary font-bold text-xs px-2.5 py-0.5 rounded-full shadow-xs">
              रु. {alert.amount.toLocaleString()}
            </span>
          </div>
          <p className="text-xs font-semibold text-on-surface mt-1 pl-1">
            <strong className="text-primary font-bold">{alert.senderName}</strong> nudged:{" "}
            <span className="italic font-normal">&quot;{alert.comment}&quot;</span>
          </p>
          <div className="mt-2 pt-1.5 border-t border-surface-container-high flex items-center justify-between text-[10px] text-outline pl-1">
            <span>TTS Voice: {alert.ttsVoiceLabel}</span>
            <span className="text-primary font-bold">Via eSewa Instant</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-outline-variant">
        <code className="bg-black/40 px-2 py-0.5 rounded text-[10px] text-surface-bright truncate max-w-[220px]">
          {widgetUrl}
        </code>
        <span className="text-tertiary-fixed font-semibold">Connected</span>
      </div>
    </div>
  );
}
