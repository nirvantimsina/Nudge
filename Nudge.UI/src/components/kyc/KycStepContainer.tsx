// src/components/kyc/KycStepContainer.tsx
"use client";

import React from "react";
import { KycStepper } from "@/src/components/kyc/KycStepper";
import { Button } from "@/src/components/ui";
import {
  FileText,
  Save,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Lock,
} from "lucide-react";

interface KycStepContainerProps {
  currentStep: 1 | 2 | 3 | 4;
  isVerified?: boolean;     // True ONLY when approved (status 1)
  isLocked?: boolean;       // True when verified OR submitted for review (status 1 or 5)
  bannerTitle: string;
  bannerBadge: string;
  bannerDescription: string;
  errorMessage?: string | null;
  isSubmitting?: boolean;
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
  onSaveDraft?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export function KycStepContainer({
  currentStep,
  bannerTitle,
  bannerBadge,
  bannerDescription,
  errorMessage,
  isSubmitting = false,
  isVerified = false,
  isLocked = false,
  backHref,
  nextHref,
  nextLabel = `Save & Proceed to Step ${currentStep + 1}`,
  onSaveDraft,
  onSubmit,
  children,
}: KycStepContainerProps) {
  return (
    <div className="max-w-5xl w-full mx-auto px-4 lg:px-8 py-8">
      {/* 1. Global Step Progress (Passes isVerified down) */}
      <KycStepper currentStep={currentStep} isVerified={isVerified} />

      {/* 2. Verified Banner Override OR Normal Regulatory Banner */}
      {isVerified ? (
        <div className="mb-6 p-5 rounded-2xl bg-secondary-fixed/30 border border-secondary-container/60 flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
            <ShieldCheck size={22} className="text-secondary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-on-surface">
                Identity Record Verified &amp; Locked
              </h3>
              <span className="bg-secondary text-on-secondary font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                Read-Only
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Your details have passed Nepal Government &amp; NRB compliance screening. In accordance with digital banking regulations, verified KYC credentials cannot be altered directly. Contact Nudge Support to request legal revisions.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-on-surface">{bannerTitle}</h3>
              {bannerBadge && (
                <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                  {bannerBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              {bannerDescription}
            </p>
          </div>
        </div>
      )}
{isLocked && !isVerified && (
        <div className="mb-6 p-4 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-between text-xs text-on-surface">
          <div>
            <span className="font-bold">Application Under Review</span>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Your application has been submitted and is currently under review. Editing is temporarily disabled.
            </p>
          </div>
          <span className="text-[11px] font-semibold bg-surface-container-highest px-2.5 py-1 rounded-full">
            Read-Only
          </span>
        </div>
      )}

      {/* 3. Error Feedback Alert */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-error shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 4. Main Form with Fieldset Lock */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Disables EVERY input inside automatically with warm tint styles */}
        <fieldset disabled={isVerified} className="space-y-6 border-0 p-0 m-0">
          {children}
        </fieldset>

        {/* 5. Footer Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-outline-variant">
          <div className="flex items-center gap-2">
            {backHref && (
              <Button
                type="button"
                variant="outline"
                leftIcon={<ArrowLeft size={15} />}
                disabled={isSubmitting}
                onClick={() => (window.location.href = backHref)}
              >
                Back
              </Button>
            )}

            {/* Hide draft button if already verified */}
            {onSaveDraft && !isVerified && (
              <Button
                type="button"
                variant="outline"
                leftIcon={<Save size={15} />}
                disabled={isSubmitting}
                onClick={onSaveDraft}
              >
                Save Draft
              </Button>
            )}
          </div>

          {/* When verified, the button acts purely as navigation to the next step */}
          {isVerified ? (
            nextHref ? (
              <Button
                type="button"
                variant="primary"
                onClick={() => (window.location.href = nextHref)}
                rightIcon={<ArrowRight size={16} />}
              >
                Next Step
              </Button>
            ) : null
          ) : (
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              loadingText="Saving Details..."
              rightIcon={<ArrowRight size={16} />}
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
