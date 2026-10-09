// src/app/kyc/step-4/page.tsx
"use client";

import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import Loading from "@/src/app/loading";
import { InputField } from "@/src/components/ui";
import { Globe, TrendingUp, ShieldCheck, ExternalLink } from "lucide-react";
import { kycService } from "@/src/features/kyc/services/kyc.service";
import { creatorVerificationSchema, creatorVerificationProceedSchema } from "@/src/features/kyc/schemas/kyc.schemas";
import { CreatorVerificationDTO } from "@/src/features/kyc/types/creator-verification.types";
import { useKycStep } from "@/src/features/kyc/hooks/useKycStep";

import {
  KYC_PLATFORMS as PLATFORMS,
  KYC_INCOME_BRACKETS as INCOME_BRACKETS,
  INITIAL_VERIFICATION_FORM_DATA as INITIAL_FORM_DATA,
} from "@/src/features/kyc/constants/kyc-platforms";

export default function KycStepFourPage() {
  const { summary, isLocked } = useCreator();
  const isVerified = summary?.isVerified ?? false;

  const { formData, setFormData, isLoading, isSubmitting, errorMsg, submit } = useKycStep<CreatorVerificationDTO>({
    load: kycService.getCreatorVerification,
    save: (data) =>
      kycService.saveCreatorVerification({
        ...data,
        primaryPlatform: data.primaryPlatform.trim(),
        channelUrl: data.channelUrl.trim(),
      }),
    initial: INITIAL_FORM_DATA,
    draftSchema: creatorVerificationSchema,
    proceedSchema: creatorVerificationProceedSchema,
    nextRoute: "/studio",
  });

  const selectedPlatform = PLATFORMS.find((p) => p.id === formData.primaryPlatform) || PLATFORMS[0];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KycStepContainer
      currentStep={4}
      isVerified={isVerified}
      isLocked={isLocked}
      bannerTitle="Creator Platform & Revenue Verification"
      bannerBadge="Audience Legitimacy & AML Compliance"
      bannerDescription="Provide your primary digital broadcast channel. Nudge compliance reviews subscriber authenticity, public activity, and platform credentials before granting full creator status."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      backHref="/kyc/step-3"
      nextLabel="Submit Full KYC for Review"
      onSaveDraft={() => submit(undefined, false)}
      onSubmit={(e) => submit(e, true)}
    >
      {/* 1. Primary Platform Selection */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            <h2 className="text-sm font-bold text-on-surface">Primary Channel or Broadcast Platform *</h2>
          </div>
          <span className="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
            Audience Verification
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isSelected = formData.primaryPlatform === platform.id;
            return (
              <button
                key={platform.id}
                type="button"
                disabled={isLocked}
                onClick={() => setFormData((p) => ({ ...p, primaryPlatform: platform.id }))}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                    : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
                } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <Icon size={20} />
                <span className="text-xs font-semibold">{platform.label}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <InputField
            label={`${selectedPlatform.label} Channel / Profile URL`}
            isRequired
            disabled={isLocked}
            placeholder={selectedPlatform.placeholder}
            value={formData.channelUrl}
            onChange={(e) => setFormData((p) => ({ ...p, channelUrl: e.target.value }))}
            name="channelUrl"
            hint="Must be publicly accessible and registered under your legal or studio alias."
            rightIcon={formData.channelUrl.startsWith("http") ? <ExternalLink size={16} className="text-tertiary" /> : undefined}
          />
        </div>
      </div>

      {/* 2. Projected Annual Creator Revenue */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="text-sm font-bold text-on-surface">Estimated Annual Revenue &amp; Sponsorships (अपेक्षित आम्दानी)</h3>
          </div>
          <span className="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
            NRB AML Bracket
          </span>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          Select your expected annual gross volume across tips, subscriptions, brand deals, and live gifts. This determines your initial monthly payout limit under Nepal Rastra Bank AML thresholds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INCOME_BRACKETS.map((bracket) => {
            const isSelected = formData.estimatedAnnualIncome === bracket.value;
            return (
              <label
                key={bracket.value}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"
                } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <input
                  type="radio"
                  name="estimatedAnnualIncome"
                  value={bracket.value}
                  checked={isSelected}
                  disabled={isLocked}
                  onChange={(e) => setFormData((p) => ({ ...p, estimatedAnnualIncome: e.target.value }))}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <span className="text-xs font-semibold text-on-surface">{bracket.label}</span>
              </label>
            );
          })}
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs mt-2">
          <ShieldCheck size={16} className="text-secondary shrink-0" />
          <span>Creators can request threshold increases after maintaining 3 months of consistent transactions.</span>
        </div>
      </div>
    </KycStepContainer>
  );
}