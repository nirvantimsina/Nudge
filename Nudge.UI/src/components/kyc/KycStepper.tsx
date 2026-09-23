"use client";

import React from "react";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { useCreator } from "@/src/context/CreatorContext";

interface KycStepperProps {
  currentStep: 1 | 2 | 3 | 4;
  isVerified?: boolean;
}

interface StepItem {
  step: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  path: string;
}

const steps: StepItem[] = [
  {
    step: 1,
    title: "Personal & Family",
    subtitle: "Creator Identity",
    path: "/kyc/step-1",
  },
  {
    step: 2,
    title: "Legal Documents",
    subtitle: "Citizenship & PAN",
    path: "/kyc/step-2",
  },
  {
    step: 3,
    title: "Residential Address",
    subtitle: "Municipality & Ward",
    path: "/kyc/step-3",
  },
  {
    step: 4,
    title: "Channel & Payout",
    subtitle: "Bank Cross-Check",
    path: "/kyc/step-4",
  },
];

export function KycStepper({ currentStep, isVerified = false }: KycStepperProps) {
  const { summary } = useCreator();

  // 1. Direct boolean flags (once backend is recompiled)
  // 2. Progression fallback (if on Step 2+, Step 1 is done)
  // 3. Percentage thresholds (25% = Step 1, 50% = Step 2, etc.)
  const pct = summary?.kycCompletionPercentage ?? 0;

  const isStep1Done = (summary?.isStep1Completed ?? false) || currentStep > 1 || pct >= 25;
  const isStep2Done = (summary?.isStep2Completed ?? false) || currentStep > 2 || pct >= 50;
  const isStep3Done = (summary?.isStep3Completed ?? false) || currentStep > 3 || pct >= 75;
  const isStep4Done = (summary?.isStep4Completed ?? false) || pct >= 100;

  const stepCompletedMap: Record<number, boolean> = {
    1: isStep1Done,
    2: isStep2Done,
    3: isStep3Done,
    4: isStep4Done,
  };

  const canAccessStep = (stepNumber: number): boolean => {
    if (isVerified) return true;
    if (stepNumber === 1) return true;
    if (stepNumber === 2) return stepCompletedMap[1];
    if (stepNumber === 3) return stepCompletedMap[1] && stepCompletedMap[2];
    if (stepNumber === 4) return stepCompletedMap[1] && stepCompletedMap[2] && stepCompletedMap[3];
    return false;
  };

  return (
    <div className="mb-6 bg-white dark:bg-surface-container-lowest p-4 md:p-6 rounded-2xl border border-outline-variant shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((item) => {
          const isCurrent = item.step === currentStep;
          const isCompleted = stepCompletedMap[item.step];
          const isAccessible = canAccessStep(item.step);

          // State 1: Active step the user is viewing right now
          if (isCurrent) {
            return (
              <div
                key={item.step}
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-fixed/30 border-l-4 border-primary shadow-xs select-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-primary font-bold truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-on-surface-variant leading-tight">
                    Step {item.step} of 4 • In Progress
                  </div>
                </div>
              </div>
            );
          }

          // State 2: Completed step (has green check, fully clickable Link)
          if (isCompleted || isVerified) {
            return (
              <Link
                key={item.step}
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container hover:border-primary/40 border border-transparent transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Check size={16} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-tertiary font-medium leading-tight">
                    {isVerified ? "Verified • Click to view" : "Completed • Click to view"}
                  </div>
                </div>
              </Link>
            );
          }

          // State 3: Next Unlocked Step (not completed yet, but accessible to start)
          if (isAccessible) {
            return (
              <Link
                key={item.step}
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant hover:border-primary/40 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-surface-container-highest group-hover:bg-primary/20 text-on-surface flex items-center justify-center font-bold text-sm shrink-0 transition-colors">
                  {item.step}
                </div>
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-on-surface font-medium group-hover:text-primary transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-on-surface-variant leading-tight">
                    Unlocked • Next
                  </div>
                </div>
              </Link>
            );
          }

          // State 4: Hard Locked Step (user hasn't finished prior prerequisites)
          return (
            <div
              key={item.step}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest opacity-50 border border-outline-variant/30 select-none cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant/60 flex items-center justify-center font-bold text-sm shrink-0">
                <Lock size={14} />
              </div>
              <div className="min-w-0">
                <div className="font-label-md text-label-md text-on-surface-variant font-medium truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-on-surface-variant/60 leading-tight">
                  Prerequisites Required
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}