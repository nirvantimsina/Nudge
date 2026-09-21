"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function DashboardFooter() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-primary-fixed-dim/50 p-1 flex items-center justify-center">
              <Image src="/logo.svg" alt="Nudge Mark" width={24} height={24} className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-base font-bold text-primary tracking-tight font-headline-md">Nudge Studio</span>
              <span className="text-xs text-on-surface-variant ml-2 font-medium">
                Nepal Rastra Bank PSO/PSP Regulated Interface
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-on-surface-variant">
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/40">Fonepay Interoperable</span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/40">eSewa Direct</span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/40">Khalti 2.0</span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/40">NCHL IPS</span>
            <span className="px-2 py-0.5 rounded bg-tertiary-fixed/40 text-tertiary font-bold">Nagarik App Verified</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-y-3 text-xs text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/explore" className="hover:text-primary transition-colors">Explore Patrons</Link>
            <Link href="/toolkit" className="hover:text-primary transition-colors">Creator Toolkit</Link>
            <Link href="/security" className="hover:text-primary transition-colors">Payment Security</Link>
            <Link href="/guidelines" className="hover:text-primary transition-colors">Community Guidelines</Link>
            <Link href="/compliance" className="hover:text-primary font-semibold text-primary">Dakshina &amp; Tax Compliance</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>Kathmandu NOC Servers Online</span>
          </div>
        </div>

        <div className="text-[11px] text-on-surface-variant/80 pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-outline-variant/30">
          <p>© 2026 Nudge Nepal Pvt. Ltd. Empowering Himalayan storytellers &amp; makers.</p>
          <p className="text-[10px] text-on-surface-variant/70">
            All tips (Dakshina) are subject to 1% Advance Income Tax withholding per Section 88(4) Income Tax Act Nepal.
          </p>
        </div>
      </div>
    </footer>
  );
}
