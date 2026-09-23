"use client";

import React, { useState } from "react";
import { 
  Check, 
  QrCode, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  ShieldCheck 
} from "lucide-react";

interface VerificationChecklistProps {
  currentStepId?: number; // 1 = ContactDone, 2 = HandleDone, 3 = CitizenPending, 4 = PanPending, 5 = AllDone
}

export function VerificationChecklist({ currentStepId = 3 }: VerificationChecklistProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Email & Mobile Verified",
      desc: "+977 98•••••••• verified with SMS OTP.",
      badge: "Primary contact locked",
      isDone: currentStepId > 1,
      isCurrent: currentStepId === 1,
    },
    {
      id: 2,
      title: "Creator Handle Claimed",
      desc: "Live public handle assigned.",
      badge: "Public tips active",
      isDone: currentStepId > 2,
      isCurrent: currentStepId === 2,
    },
    {
      id: 3,
      title: "Nagarik App / National ID",
      desc: "Verify citizenship via Nagarik App QR or manual upload.",
      badge: "Action Required",
      isDone: currentStepId > 3,
      isCurrent: currentStepId === 3,
    },
    {
      id: 4,
      title: "IRD PAN & Settlement Bank",
      desc: "9-digit PAN for legal 1% TDS rate & Fonepay / NCHL IPS bank account.",
      badge: "Requires Step 3",
      isDone: currentStepId > 4,
      isCurrent: currentStepId === 4,
    },
  ];

  return (
    <section id="verification-steps-card" className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 md:p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-outline-variant/40 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" />
              <span>Himalayan Creator Verification Checklist</span>
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-secondary-fixed/50 text-secondary">
              Step {currentStepId} of 4
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Complete Nagarik App identity &amp; IRD PAN linking for instantaneous auto-settlements to Fonepay or Nepal Clearing House (NCHL).
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <a
            href="https://nagarikapp.gov.np"
            target="_blank"
            rel="noreferrer"
            className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
          >
            <span>Why is this required?</span>
            <ExternalLink size={12} />
          </a>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
            title={isCollapsed ? "Expand Checklist" : "Collapse Checklist"}
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
          {steps.map((step) => {
            if (step.isDone) {
              return (
                <div key={step.id} className="p-4 rounded-xl bg-surface-container-low border border-tertiary/20 flex flex-col justify-between space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
                      <Check size={16} />
                    </div>
                    <span className="text-tertiary text-[10px] font-bold bg-tertiary-fixed/60 px-2 py-0.5 rounded-full">
                      Done
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-on-surface">{step.title}</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">{step.desc}</p>
                  </div>
                  <div className="text-[11px] text-tertiary flex items-center gap-1 font-semibold">
                    <span>{step.badge}</span>
                  </div>
                </div>
              );
            }

            if (step.isCurrent) {
              return (
                <div key={step.id} className="p-4 rounded-xl bg-primary-fixed/20 border-2 border-primary-container flex flex-col justify-between space-y-3 relative shadow-xs">
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-primary-container text-on-primary text-[9px] uppercase font-bold tracking-wider">
                    {step.badge}
                  </span>
                  <div className="flex items-start justify-between">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                      {step.id}
                    </div>
                    <span className="text-primary-container text-[10px] font-bold bg-primary-fixed px-2 py-0.5 rounded-full">
                      In Progress
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-on-surface">{step.title}</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">{step.desc}</p>
                  </div>
                  <button className="w-full py-1.5 px-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                    <QrCode size={14} />
                    <span>Scan Nagarik QR</span>
                  </button>
                </div>
              );
            }

            // Locked step
            return (
              <div key={step.id} className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/40 flex flex-col justify-between space-y-3 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="w-7 h-7 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs">
                    {step.id}
                  </div>
                  <span className="text-on-surface-variant text-[10px] font-bold bg-surface-variant px-2 py-0.5 rounded-full">
                    Locked
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-on-surface-variant">{step.title}</h4>
                  <p className="text-[11px] text-on-surface-variant/80 mt-0.5">{step.desc}</p>
                </div>
                <div className="text-[11px] text-on-surface-variant flex items-center gap-1 font-medium">
                  <Lock size={12} />
                  <span>{step.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
