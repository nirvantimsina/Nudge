"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

export function NudgeVolumeGrowth() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "90D" | "YTD">("30D");

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-5 md:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
        <div>
          <h3 className="font-title-md text-base font-bold text-on-surface flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <span>Nudge Volume &amp; Dakshina Growth</span>
          </h3>
          <p className="text-xs text-on-surface-variant">
            Real-time local currency patronage settlements
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/40">
          {(["7D", "30D", "90D", "YTD"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                timeframe === t
                  ? "bg-surface-container-lowest text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="pt-5">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xl font-bold font-headline-md text-primary">
            रु 28,450{" "}
            <span className="text-xs text-on-surface-variant font-normal">
              peak single day (Live Stream)
            </span>
          </span>
          <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-1 rounded-full bg-primary-container" /> eSewa &amp; Fonepay
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-1 rounded-full bg-secondary-container" /> Khalti &amp; Cards
            </span>
          </div>
        </div>

        {/* Vector Curve */}
        <div className="w-full h-44 relative mt-2">
          <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 700 180">
            <defs>
              <linearGradient id="terracottaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#bc4722" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#bc4722" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line stroke="#f4ede0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="30" y2="30" />
            <line stroke="#f4ede0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="90" y2="90" />
            <line stroke="#f4ede0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="150" y2="150" />

            {/* Area Fill */}
            <path d="M0,150 Q70,120 140,135 T280,105 T420,50 T560,70 T700,35 L700,180 L0,180 Z" fill="url(#terracottaGradient)" />
            {/* Main Trend Line */}
            <path d="M0,150 Q70,120 140,135 T280,105 T420,50 T560,70 T700,35" stroke="#bc4722" strokeLinecap="round" strokeWidth="3" />

            <circle cx="420" cy="50" fill="#bc4722" r="5" stroke="#ffffff" strokeWidth="2" />
            <circle cx="700" cy="35" fill="#bc4722" r="5" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Tooltip on stream spike */}
          <div className="absolute left-[58%] top-[10%] -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-md text-left pointer-events-none">
            <p className="text-[10px] font-bold text-secondary-fixed">⚡ Live Stream Spike</p>
            <p className="text-[10px] text-surface-variant">रु 28,450 (44 Nudges)</p>
          </div>
        </div>

        {/* X Axis */}
        <div className="flex justify-between text-[11px] text-on-surface-variant pt-3 border-t border-outline-variant/30 mt-2 font-mono">
          <span>Day 1</span>
          <span>Day 8</span>
          <span>Day 15 (Stream)</span>
          <span>Day 22</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
