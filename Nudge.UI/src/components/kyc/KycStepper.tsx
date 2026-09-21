// src/components/kyc/KycStepper.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface KycStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

const steps = [
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

export function KycStepper({ currentStep }: KycStepperProps) {
  return (
    <div className="mb-6 bg-surface-container-lowest p-4 md:p-6 rounded-2xl border border-outline-variant shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((item) => {
          const isCurrent = item.step === currentStep;
          const isCompleted = item.step < currentStep;

          if (isCurrent) {
            return (
              <div
                key={item.step}
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-fixed/30 border-l-4 border-primary shadow-xs"
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

          if (isCompleted) {
            return (
              <Link
                key={item.step}
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm shrink-0">
                  <Check size={16} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <div className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-tertiary font-medium leading-tight">
                    Completed
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <div
              key={item.step}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest opacity-60 border border-outline-variant/40"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm shrink-0">
                {item.step}
              </div>
              <div className="min-w-0">
                <div className="font-label-md text-label-md text-on-surface font-medium truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-on-surface-variant leading-tight">
                  {item.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}