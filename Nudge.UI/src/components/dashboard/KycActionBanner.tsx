"use client";

import React, { useState } from "react";
import { Lock, X, ArrowRight, ShieldCheck } from "lucide-react";

interface KycActionBannerProps {
  grossAmountNpr?: number;
  currentStep?: number;
  totalSteps?: number;
  onScrollToChecklist?: () => void;
}

export function KycActionBanner({
  grossAmountNpr = 48250,
  currentStep = 2,
  totalSteps = 4,
  onScrollToChecklist,
}: KycActionBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="bg-surface-container-lowest border-2 border-primary-container/30 rounded-2xl p-5 md:p-6 shadow-xs relative overflow-hidden bg-gradient-to-r from-primary-fixed/20 via-surface-container-low to-surface-container-lowest">
      {/* Close button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3.5 right-3.5 p-1 rounded-full text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-container transition-colors z-20"
        title="Dismiss Alert"
      >
        <X size={18} />
      </button>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 pr-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary text-[11px] font-bold tracking-wide uppercase">
            <Lock size={12} />
            <span>Action Required · Withdrawals Paused</span>
          </div>

          <h2 className="font-headline-md text-xl md:text-2xl font-bold text-primary tracking-tight">
            Payouts are on hold: Complete creator verification to withdraw funds
          </h2>

          <p className="text-body-md text-[14px] text-on-surface-variant leading-relaxed">
            You have collected <strong className="text-on-surface font-semibold">रु {grossAmountNpr.toLocaleString()}</strong> in patron Nudges! Under <span className="font-semibold text-on-surface">Nepal Rastra Bank Digital Payment Directive 2080</span>, direct withdrawals to eSewa, Khalti, or commercial bank accounts require verified citizen identity and personal PAN.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-primary-container">
              KYC Progress: {currentStep} of {totalSteps} Steps ({percent}%)
            </span>
            <div className="w-full sm:w-60 bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-on-surface-variant text-xs">Estimated: ~3 mins remaining</span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
          <button
            onClick={onScrollToChecklist}
            className="px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <ShieldCheck size={16} />
            <span>Complete Nagarik KYC (5 mins)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
