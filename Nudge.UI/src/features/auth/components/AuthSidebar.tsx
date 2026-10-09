// src/features/auth/components/AuthSidebar.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export function AuthSidebar() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-surface-container-low border-r border-outline-variant/60 flex-col justify-between p-8 lg:p-12 select-none relative overflow-hidden shrink-0 h-full">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-0 w-72 h-72 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <Link className="inline-flex items-center gap-2.5 group" href="/">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.svg"
              alt="Nudge Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline-md font-bold tracking-tight text-2xl text-on-surface">
              Nudge
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed border border-secondary-container">
              नेपाल
            </span>
          </div>
        </Link>
      </div>

      <div className="my-auto relative z-10 max-w-lg space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/90 border border-outline-variant/70 text-xs font-semibold text-on-surface shadow-xs">
          <Sparkles size={14} className="text-primary" />
          <span>0% Fee for Humanitarian &amp; Open Source</span>
        </div>

        <div className="space-y-2.5">
          <h1 className="font-display-hero text-3xl lg:text-4xl font-bold tracking-tight leading-[1.18] text-on-surface">
            Direct support for your creative work,{" "}
            <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
              without intermediaries.
            </span>
          </h1>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Empowering Himalayan storytellers, podcasters, animators, and developers. Accept direct 1-tap support via eSewa, Khalti, and local mobile banking with next-day bank clearance.
          </p>
        </div>

        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-4 border border-outline-variant/70 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                SB
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-on-surface">Sisan Baniya</h4>
                  <CheckCircle2 size={13} className="text-tertiary fill-tertiary-fixed" />
                </div>
                <p className="text-[10px] text-on-surface-variant">Filmmaker &amp; Visual Storyteller</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
              रु 1.85L+ funded
            </span>
          </div>
          <p className="text-xs italic text-on-surface-variant leading-snug">
            &ldquo;Nudge allowed our audience to directly fund our Mustang winter expedition without corporate briefs.&rdquo;
          </p>
        </div>

        <div className="pt-2 border-t border-outline-variant/50 flex items-center justify-between text-xs text-outline">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <ShieldCheck size={14} className="text-tertiary" />
            <span>NRB Directive Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="font-semibold text-on-surface">Rails:</span>
            <span>Fonepay</span> • <span>eSewa</span> • <span>Khalti</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-xs text-outline">
        <span>&copy; 2026 Nudge Nepal Pvt. Ltd.</span>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  );
}
