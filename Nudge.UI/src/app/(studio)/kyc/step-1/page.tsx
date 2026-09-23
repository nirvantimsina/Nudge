"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { kycService } from "@/src/features/kyc/services/kyc.service";
import { CreatorInfoDTO } from "@/src/features/kyc/types/creator-info.types";
import { NepaliDatePicker } from "@/src/components/common/NepaliDatePicker";
import Loading from "@/src/app/loading";
import { InputField, RadioGroup } from "@/src/components/ui";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import { toast } from "@/lib/toast";

export default function KycStepOnePage() {
  const router = useRouter();
  const { summary, isLocked, refreshSummary } = useCreator();
  const isVerified = summary?.isVerified ?? false;


  const [formData, setFormData] = useState<CreatorInfoDTO>({
    fullName: "",
    dobAD: "",
    dobBS: "",
    gender: 1, // Default: 1 (Male)
    grandfatherName: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchExistingData = async () => {
      try {
        const response: any = await kycService.getCreatorInfo();

        if (response && response.fullName && isMounted) {
          const resolvedDobAD = response.dobAd ?? response.dobAD ?? response.dobad ?? "";
          const resolvedDobBS = response.dobBs ?? response.dobBS ?? response.dobbs ?? "";

          setFormData({
            fullName: response.fullName || "",
            dobAD: typeof resolvedDobAD === "string" ? resolvedDobAD.split("T")[0] : "",
            dobBS: typeof resolvedDobBS === "string" ? resolvedDobBS.trim() : "",
            gender: Number(response.gender) || 1,
            grandfatherName: response.grandfatherName || "",
            fatherName: response.fatherName || "",
            motherName: response.motherName || "",
            spouseName: response.spouseName || "",
          });
        }
      } catch (err) {
        console.warn("Could not load initial personal details:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchExistingData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent, proceedToNext: boolean = false) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    // 1. Strict validation when proceeding
    if (proceedToNext) {
      if (
        !formData.fullName.trim() ||
        !formData.dobAD ||
        !formData.dobBS ||
        !formData.grandfatherName.trim() ||
        !formData.fatherName.trim() ||
        !formData.motherName.trim()
      ) {
        toast.error("Please fill in all required fields marked with * to proceed.");
        return;
      }
    } else {
      // 2. Lenient check for drafts
      if (!formData.fullName.trim()) {
        toast.error("Please enter at least your Full Name before saving a draft.");
        return;
      }
    }

    setIsSubmitting(true);

    const payload: CreatorInfoDTO = {
      ...formData,
      gender: Number(formData.gender),
      spouseName: formData.spouseName?.trim() || undefined,
    };

    try {
      await kycService.saveCreatorInfo(payload);

      // Refresh CreatorContext so step progression & % calculate immediately
      await refreshSummary();

      if (proceedToNext) {
        toast.success("Personal details saved!");
        router.push("/kyc/step-2");
      } else {
        toast.success("Draft saved successfully.");
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to save details. Please check your connection.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
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
      onSaveDraft={() => handleSubmit(undefined, false)}
      onSubmit={(e) => handleSubmit(e, true)}
    >
      <div className="space-y-6">
        {/* Lock / Review Alert */}
          {errorMsg && (
          <div className="p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-error shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Container */}
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
              dobAD={formData.dobAD}
              dobBS={formData.dobBS}
              onDateChange={({ dobAD, dobBS }) =>
                setFormData((prev) => ({ ...prev, dobAD, dobBS }))
              }
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
