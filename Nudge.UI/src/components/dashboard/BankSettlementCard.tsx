"use client";

import React, { useState } from "react";
import { Landmark, CheckCircle2, Zap } from "lucide-react";

interface BankSettlementCardProps {
  bankName?: string;
  accountEnding?: string;
  isAutoPayoutEnabled?: boolean;
}

export function BankSettlementCard({
  bankName = "Nabil Bank Ltd.",
  accountEnding = "4821",
  isAutoPayoutEnabled = true,
}: BankSettlementCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleInstantPayout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMsg("Payout of रु 48,250 dispatched via Fonepay Instant Clearing!");
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 1200);
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-5 shadow-xs" id="payouts">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
        <h4 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-2">
          <Landmark size={18} className="text-tertiary" />
          <span>Nepal Banking Settlement</span>
        </h4>
        <span className="text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded">
          {isAutoPayoutEnabled ? "Auto Payout" : "Manual"}
        </span>
      </div>

      <div className="pt-3 space-y-3">
        <div className="flex items-center gap-3 p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/40">
          <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-primary text-xs border border-outline-variant/50">
            NABIL
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold text-on-surface block">{bankName}</span>
            <span className="text-[11px] text-on-surface-variant font-mono">
              •••• •••• •••• {accountEnding} (Current A/C)
            </span>
          </div>
          <CheckCircle2 size={18} className="text-tertiary" />
        </div>

        <div className="text-xs text-on-surface-variant flex justify-between items-center px-1">
          <span>Next scheduled payout:</span>
          <span className="font-bold text-on-surface">Tomorrow, 10:00 AM</span>
        </div>

        {/* Instant Payout Action Button */}
        <button
          onClick={handleInstantPayout}
          disabled={isProcessing}
          className="w-full py-2.5 bg-tertiary text-on-tertiary text-xs font-bold rounded-xl hover:bg-tertiary-container transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98 disabled:opacity-50"
        >
          <Zap size={15} />
          <span>{isProcessing ? "Connecting to Fonepay..." : "Instant Payout (Fonepay / eSewa Clearing)"}</span>
        </button>

        {successMsg && (
          <p className="text-[11px] text-center font-semibold text-tertiary bg-tertiary-fixed/30 p-1.5 rounded-lg">
            {successMsg}
          </p>
        )}

        <p className="text-[10px] text-center text-on-surface-variant">
          Instant transfers subject to standard 0.25% clearing charge per NRB guidelines.
        </p>
      </div>
    </div>
  );
}
