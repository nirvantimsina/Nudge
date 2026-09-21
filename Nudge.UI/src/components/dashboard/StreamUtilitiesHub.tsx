"use client";

import React, { useState } from "react";
import { 
  Radio, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Share2, 
  Volume2, 
  Sliders, 
  ExternalLink,
  Sparkles 
} from "lucide-react";

interface StreamUtilitiesHubProps {
  userName?: string;
}

export function StreamUtilitiesHub({ userName = "aayush_visuals" }: StreamUtilitiesHubProps) {
  const [showKey, setShowKey] = useState(false);
  const [copiedObs, setCopiedObs] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLoom, setCopiedLoom] = useState(false);
  const [minAlert, setMinAlert] = useState(100); // Default to Rs. 100 as requested

  const obsUrl = `https://stream.nudge.np/v1/alerts/live_tok_${userName}`;
  const publicLink = `https://nudge.np/@${userName}`;
  const loomLink = `https://loom.nudge.np/@${userName}`;

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* 1. OBS Stream Widget Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-primary-fixed/40 text-primary">
              <Radio size={18} />
            </span>
            <div>
              <h4 className="font-title-md text-sm font-bold text-on-surface">OBS Stream Widget</h4>
              <p className="text-[11px] text-on-surface-variant">Live tip notifications for YouTube &amp; Twitch</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-tertiary text-[10px] font-bold">
            1080p Ready
          </span>
        </div>

        <div className="space-y-1 pt-1">
          <label className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Private Browser Source URL
          </label>
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-lg border border-outline-variant/50">
            <input
              type={showKey ? "text" : "password"}
              value={obsUrl}
              readOnly
              className="bg-transparent text-xs font-mono text-on-surface w-full focus:outline-none px-1"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-1 text-on-surface-variant hover:text-on-surface"
              title={showKey ? "Hide URL" : "Show URL"}
            >
              {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
            <button
              onClick={() => copyToClipboard(obsUrl, setCopiedObs)}
              className="px-2.5 py-1 bg-primary-container text-on-primary rounded text-xs font-semibold hover:bg-primary transition-colors flex items-center gap-1 shrink-0"
            >
              {copiedObs ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedObs ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px]">
          <span className="text-on-surface-variant">Sound: Himalayan Singing Bowl Chime</span>
          <button
            onClick={() => alert("Sample test alert chime sent to OBS Studio!")}
            className="text-primary font-bold hover:underline flex items-center gap-1"
          >
            <Volume2 size={13} />
            <span>Send Test Alert</span>
          </button>
        </div>
      </div>

      {/* 2. Public Patron & Loom Link Hub */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 shadow-xs space-y-3">
        <h4 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-1.5">
          <Share2 size={16} className="text-primary" />
          <span>Public Links Hub</span>
        </h4>

        {/* Public Patron Page */}
        <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-2 border border-outline-variant/30">
          <div className="truncate">
            <div className="font-mono text-xs font-semibold text-primary truncate">{publicLink}</div>
            <div className="text-[10px] text-on-surface-variant">Patron tipping page</div>
          </div>
          <button
            onClick={() => copyToClipboard(publicLink, setCopiedLink)}
            className="p-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface"
            title="Copy Public Link"
          >
            {copiedLink ? <Check size={14} className="text-tertiary" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Public Loom Threads Bio */}
        <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-2 border border-outline-variant/30">
          <div className="truncate">
            <div className="font-mono text-xs font-semibold text-secondary truncate">{loomLink}</div>
            <div className="text-[10px] text-on-surface-variant">Nudge Loom link-in-bio &amp; tiers</div>
          </div>
          <button
            onClick={() => copyToClipboard(loomLink, setCopiedLoom)}
            className="p-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface"
            title="Copy Loom Link"
          >
            {copiedLoom ? <Check size={14} className="text-tertiary" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* 3. Interactive Stream Settings with Default Rs. 100 Min Sound */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 shadow-xs space-y-3">
        <h4 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-1.5">
          <Sliders size={16} className="text-primary" />
          <span>Stream Alert Preferences</span>
        </h4>

        <div className="space-y-3 text-xs">
          {/* Minimum Alert Sound Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span className="text-on-surface-variant">Minimum Alert Sound:</span>
              <span className="text-primary font-bold">रु {minAlert}</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={minAlert}
              onChange={(e) => setMinAlert(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-surface-variant rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant">
              <span>रु 50 (Any Nudge)</span>
              <span>Default: रु 100</span>
              <span>रु 1,000+</span>
            </div>
          </div>

          {/* Bilingual TTS */}
          <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
            <div>
              <span className="font-semibold text-on-surface block">Nepali Unicode TTS</span>
              <span className="text-[10px] text-on-surface-variant">Bilingual AI reader</span>
            </div>
            <select className="bg-surface-container-low border border-outline-variant/60 rounded-lg text-xs font-semibold py-1 px-2 text-on-surface focus:outline-none">
              <option>Shreya (Natural Nepali)</option>
              <option>Aayush (Male Studio)</option>
              <option>Mute TTS</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
