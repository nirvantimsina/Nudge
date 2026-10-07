// src/app/kyc/step-1/page.tsx
"use client";

import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { kycService } from "@/src/features/kyc/services/kyc.service";
import { CreatorInfoDTO } from "@/src/features/kyc/types/creator-info.types";
import { creatorInfoSchema, creatorInfoProceedSchema } from "@/src/features/kyc/schemas/kyc.schemas";
import { useKycStep } from "@/src/features/kyc/hooks/useKycStep";
import { NepaliDatePicker } from "@/src/components/common/NepaliDatePicker";
import Loading from "@/src/app/loading";
import { InputField, RadioGroup } from "@/src/components/ui";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";

const INITIAL_FORM_DATA: CreatorInfoDTO = {
  fullName: "",
  dobAd: "",
  dobBs: "",
  gender: 1, // Default: 1 (Male)
  grandfatherName: "",
  fatherName: "",
  motherName: "",
  spouseName: "",
};

export default function KycStepOnePage() {
  const { summary, isLocked } = useCreator();
  const isVerified = summary?.isVerified ?? false;

  const { formData, setFormData, isLoading, isSubmitting, errorMsg, submit } = useKycStep<CreatorInfoDTO>({
    load: kycService.getCreatorInfo,
    save: (data) =>
      kycService.saveCreatorInfo({
        ...data,
        spouseName: data.spouseName?.trim() || undefined,
      }),
    initial: INITIAL_FORM_DATA,
    draftSchema: creatorInfoSchema,
    proceedSchema: creatorInfoProceedSchema,
    nextRoute: "/kyc/step-2",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KycStepContainer
      currentStep={1}
      isVerified={isVerified}
      isLocked={isLocked}
      bannerTitle="Nepal Rastra Bank & IRD Unified Directive"
      bannerBadge="NRB Directive 2080"
      bannerDescription="As per NRB digital wallet & patronage guidelines, creators receiving direct patron funds via eSewa, Fonepay, or Khalti must maintain verified three-generation family lineage (Teen Pustey Bibaran) matching your Nepali Citizenship or National ID (Rastriya Parichayapatra)."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      nextLabel="Save & Proceed to Step 2"
      onSaveDraft={() => submit(undefined, false)}
      onSubmit={(e) => submit(e, true)}
    >
      <div className="space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-error shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-6">
          <InputField
            label="Full Legal Name"
            isRequired
            placeholder="e.g. Aayush Shrestha (as on Citizenship / NID)"
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
            hint="Must match your Nepali Citizenship Card character-for-character."
            rightIcon={
              formData.fullName.length > 3 ? (
                <CheckCircle2 size={16} className="text-tertiary" />
              ) : undefined
            }
            disabled={isLocked}
          />

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-on-surface">
              Date of Birth (जन्म मिति) <span className="text-primary font-bold">*</span>
            </label>
            <NepaliDatePicker
              dobAD={formData.dobAd}
              dobBS={formData.dobBs}
              onDateChange={({ dobAD, dobBS }) => setFormData((prev) => ({ ...prev, dobAD, dobBS }))}
              disabled={isLocked}
            />
          </div>

          <RadioGroup
            label="Legal Gender"
            isRequired
            value={String(formData.gender)}
            onChange={(val) => setFormData((prev) => ({ ...prev, gender: Number(val) }))}
            options={[
              { value: "1", label: "Male (पुरुष)" },
              { value: "2", label: "Female (महिला)" },
              { value: "3", label: "Other (अन्य)" },
            ]}
            disabled={isLocked}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-outline-variant/60">
            <InputField
              label="Grandfather's Full Name (हजुरबुवाको नाम)"
              isRequired
              placeholder="Grandfather's legal name"
              value={formData.grandfatherName}
              onChange={handleChange}
              name="grandfatherName"
              hint="As recorded on your Father's or your Citizenship document."
              disabled={isLocked}
            />
            <InputField
              label="Father's Full Name (बुवाको नाम)"
              isRequired
              placeholder="Father's legal name"
              value={formData.fatherName}
              onChange={handleChange}
              name="fatherName"
              hint="Cross-checked with citizenship records."
              disabled={isLocked}
            />
            <InputField
              label="Mother's Full Name (आमाको नाम)"
              isRequired
              placeholder="Mother's legal name"
              value={formData.motherName}
              onChange={handleChange}
              name="motherName"
              disabled={isLocked}
            />
            <InputField
              label="Spouse's Full Name (पति / पत्नीको नाम)"
              placeholder=""
              value={formData.spouseName || ""}
              onChange={handleChange}
              name="spouseName"
              hint="Optional if unmarried"
              disabled={isLocked}
            />
          </div>
        </div>
      </div>
    </KycStepContainer>
  );
}