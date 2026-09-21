"use client";

import React from "react";
import { 
  Banknote, 
  Lock, 
  Globe2, 
  Users, 
  TrendingUp, 
  Target, 
  AlertCircle 
} from "lucide-react";

interface PayoutProgressMetricsProps {
  grossDakshina?: number;
  lockedBalance?: number;
  isKycPending?: boolean;
  diasporaEarningsAud?: number;
  activeSubscribers?: number;
  goalTitle?: string;
  goalCurrent?: number;
  goalTarget?: number;
}

export function PayoutProgressMetrics({
  grossDakshina = 48250,
  lockedBalance = 48250,
  isKycPending = true,
  diasporaEarningsAud = 420,
  activeSubscribers = 38,
  goalTitle = "Sony FX3 Cinema Rig",
  goalCurrent = 48250,
  goalTarget = 75000,
}: PayoutProgressMetricsProps) {
  const goalPercent = Math.min(Math.round((goalCurrent / goalTarget) * 100), 100);

  return (
    <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
        <div>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
            <Banknote size={20} className="text-primary" />
            Payout &amp; Revenue Progress
          </h3>
          <p className="text-xs text-on-surface-variant">
            Summary of domestic earnings, held settlements, and global patronage.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Dakshina */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gross Dakshina</span>
            <span className="p-1.5 rounded-lg bg-primary-fixed/40 text-primary">
              <Banknote size={16} />
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-headline-md text-on-surface">
              रु {grossDakshina.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-tertiary font-semibold">
              <TrendingUp size={13} />
              <span>+18.4% vs last week</span>
            </div>
          </div>
          <div className="text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/20">
            64 Himalayan Patrons
          </div>
        </div>

        {/* Card 2: Locked Balance (Conditioned on KYC) */}
        {isKycPending ? (
          <div className="p-4 rounded-xl bg-secondary-fixed/20 border-2 border-secondary-container flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Lock size={12} />
                Locked Balance
              </span>
              <span className="p-1.5 rounded-lg bg-secondary-container/40 text-secondary">
                <AlertCircle size={16} />
              </span>
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold font-headline-md text-on-surface flex items-baseline gap-2">
                <span>रु {lockedBalance.toLocaleString()}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-bold uppercase">
                  Held
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Pending Nagarik KYC approval.</p>
            </div>
            <div className="pt-2 border-t border-outline-variant/20">
              <button
                disabled
                className="w-full py-1.5 rounded-lg bg-surface-variant text-on-surface-variant/60 text-xs font-semibold cursor-not-allowed"
              >
                Withdrawals Locked
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] font-bold uppercase tracking-wider">Available Payout</span>
              <span className="p-1.5 rounded-lg bg-tertiary-fixed/40 text-tertiary">
                <Banknote size={16} />
              </span>
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold font-headline-md text-tertiary">
                रु {grossDakshina.toLocaleString()}
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Ready for instant settlement.</p>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 text-[11px] text-tertiary font-semibold">
              Automatic daily transfer active
            </div>
          </div>
        )}

        {/* Card 3: International Diaspora & Tiers */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Diaspora &amp; Tiers</span>
            <span className="p-1.5 rounded-lg bg-primary-fixed/40 text-primary">
              <Globe2 size={16} />
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-headline-md text-on-surface">
              {activeSubscribers} <span className="text-xs font-normal text-on-surface-variant">Subscribers</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Intl: <strong className="text-on-surface">~${diasporaEarningsAud} AUD</strong> via Stripe/Cards
            </p>
          </div>
          <div className="text-[11px] text-primary font-semibold pt-2 border-t border-outline-variant/20 flex items-center gap-1">
            <Users size={12} />
            <span>Tier Chiya retention: 94%</span>
          </div>
        </div>

        {/* Card 4: Active Creator Goal */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Goal</span>
            <span className="p-1.5 rounded-lg bg-surface-container text-on-surface">
              <Target size={16} />
            </span>
          </div>
          <div className="my-2 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-on-surface">
              <span className="truncate">{goalTitle}</span>
              <span className="text-primary">{goalPercent}%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: `${goalPercent}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-on-surface-variant">
              <span>रु {goalCurrent.toLocaleString()}</span>
              <span>Goal: रु {goalTarget.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-[11px] pt-2 border-t border-outline-variant/20 flex justify-between items-center">
            <span className="text-on-surface-variant">Active on OBS</span>
            <button className="text-primary font-bold hover:underline">Edit</button>
          </div>
        </div>
      </div>
    </section>
  );
}
