"use client";

import React, { useState } from "react";
import { LogoLoader } from "@/src/components/public/common/LogoLoader";
import { Button } from "@/src/components/public/common/Button";

export default function TestLoaderPage() {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("Securing session with eSewa rails…");

  const triggerFullscreenSimulation = (durationMs = 3000) => {
    setShowFullscreen(true);
    setTimeout(() => {
      setShowFullscreen(false);
    }, durationMs);
  };

  return (
    <main className="min-h-screen bg-surface text-on-surface p-6 sm:p-12 max-w-4xl mx-auto space-y-10">
      {/* 1. Fullscreen Simulation */}
      {showFullscreen && (
        <LogoLoader
          label={activeLabel}
          fullscreen={true}
        />
      )}

      {/* Header */}
      <div className="border-b border-outline-variant/60 pb-5">
        <h1 className="text-2xl font-bold font-headline-md text-on-surface">
          Logo Loader Sandbox
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Verify SVG loop playback, theme contrast, and layout integration.
        </p>
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          onClick={() => {
            setActiveLabel("Authenticating your credentials…");
            triggerFullscreenSimulation(3500);
          }}
        >
          Test 3.5s Fullscreen Auth Loader
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            setActiveLabel("Preparing your Himalayan creator workspace…");
            triggerFullscreenSimulation(2000);
          }}
        >
          Test 2s Route Transition
        </Button>
      </div>

      {/* 2. Embedded Previews (Light vs Dark Card Contexts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Light Surface Container */}
        <div className="rounded-3xl border border-outline-variant/70 bg-surface-container-lowest p-8 flex flex-col items-center justify-center min-h-[320px] shadow-sm">
          <span className="text-[11px] font-mono uppercase tracking-widest text-outline mb-4">
            Surface Container Lowest
          </span>
          <LogoLoader
            fullscreen={false}
            label="Generating IRD 1% TDS Report…"
          />
        </div>

        {/* Elevated Dark/Muted Card */}
        <div className="rounded-3xl border border-outline-variant/70 bg-surface-container-high p-8 flex flex-col items-center justify-center min-h-[320px] shadow-sm">
          <span className="text-[11px] font-mono uppercase tracking-widest text-outline mb-4">
            Surface Container High
          </span>
          <LogoLoader
            fullscreen={false}
            label="Connecting OBS WebSocket…"
          />
        </div>
      </div>
    </main>
  );
}