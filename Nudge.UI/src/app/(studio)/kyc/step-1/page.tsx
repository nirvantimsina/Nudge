"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  QrCode, 
  Save, 
  ArrowRight, 
  FileText,
  AlertCircle 
} from "lucide-react";
import { kycService } from "@/src/features/kyc/services/kyc.service";
import { CreatorInfoDTO } from "@/src/features/kyc/types/creator-info.types";
import { NepaliDatePicker } from "@/src/components/common/NepaliDatePicker";
import Loading from "@/src/app/loading";
import { InputField, RadioGroup } from "@/src/components/ui";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer"
import { toast } from "@/lib/toast"

export default function KycStepOnePage() {
  const router = useRouter();
  const { summary } = useCreator();
  const isVerified = summary?.kycStatus === "verified";
  const [formData, setFormData] = useState<CreatorInfoDTO>({
    fullName: "",
    dobAD: "",
    dobBS: "",
    gender: 0, // Default: 1 (Male)
    grandfatherName: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response: any = await kycService.getCreatorInfo();
        console.log("Fetched KYC Creator Info:", response);

        if (response && response.fullName) {
          // Read dobAd / dobBs with fallback to other casings
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
          setIsExistingRecord(true);
        }
      } catch {
        setIsExistingRecord(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent, proceedToNext: boolean = false) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    // 1. Strict validation ONLY when the user clicks "Save & Proceed"
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
      // 2. Lenient check for Drafts (require at least a legal name)
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
      
      if (proceedToNext) {
        toast.success("Personal details saved!");
        router.push("/kyc/step-2");
      } else {
        toast.success("Draft saved successfully.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to save details. Please check your connection.");
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
    bannerTitle="Nepal Rastra Bank & IRD Unified Directive"
    bannerBadge="NRB Directive 2080"
    bannerDescription="As per NRB digital wallet & patronage guidelines, creators receiving direct patron funds via eSewa, Fonepay, or Khalti must maintain verified three-generation family lineage (Teen Pustey Bibaran) matching your Nepali Citizenship or National ID (Rastriya Parichayapatra)."
    errorMessage={errorMsg}
    isSubmitting={isSubmitting}
    nextLabel="Save & Proceed to Step 2"
    onSaveDraft={() => handleSubmit(undefined, false)}
    onSubmit={(e) => handleSubmit(e, true)} // 👈 KycStepContainer's <form> handles this
  >
    <div className="max-w-5xl w-full mx-auto px-4 lg:px-8 py-8">
      {isVerified && (
        <div className="mb-6 p-4 rounded-2xl bg-tertiary-fixed/40 border border-tertiary/30 flex items-center justify-between text-xs text-on-tertiary-fixed">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-tertiary shrink-0" />
            <span className="font-semibold">
              Your legal identity documents are verified by Nudge Nepal and locked for compliance.
            </span>
          </div>
          <span className="text-[11px] underline cursor-pointer">Request Change</span>
        </div>
      )}


      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-error shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Surface */}
      <div className="space-y-6">
        <InputField
          label="Full Legal Name"
          isRequired
          placeholder="e.g. Aayush Shrestha (as on Citizenship / NID)"
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          hint="Must match your Nepali Citizenship Card character-for-character."
          rightIcon={formData.fullName.length > 3 ? <CheckCircle2 size={16} className="text-tertiary" /> : undefined}
          disabled={isVerified}
        />

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-on-surface">
            Date of Birth (जन्म मिति) <span className="text-primary font-bold">*</span>
          </label>
          <NepaliDatePicker
            dobAD={formData.dobAD}
            dobBS={formData.dobBS}
            onDateChange={({ dobAD, dobBS }) => setFormData((prev) => ({ ...prev, dobAD, dobBS }))}
            disabled={isVerified}
          />
        </div>

        {/* Gender as Integer: 1, 2, 3 */}
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
          disabled={isVerified}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Grandfather's Full Name (हजुरबुवाको नाम)"
            isRequired
            placeholder="Grandfather's legal name"
            value={formData.grandfatherName}
            onChange={handleChange}
            name="grandfatherName"
            hint="As recorded on your Father's or your Citizenship document."
            disabled={isVerified}
          />
          <InputField
            label="Father's Full Name (बुवाको नाम)"
            isRequired
            placeholder="Father's legal name"
            value={formData.fatherName}
            onChange={handleChange}
            name="fatherName"
            hint="Cross-checked with citizenship records."
            disabled={isVerified}
          />
          <InputField
            label="Mother's Full Name (आमाको नाम)"
            isRequired
            placeholder="Mother's legal name"
            value={formData.motherName}
            onChange={handleChange}
            name="motherName"
            disabled={isVerified}
          />
          <InputField
            label="Spouse's Full Name (पति / पत्नीको नाम)"
            placeholder="Leave blank if not applicable"
            value={formData.spouseName || ""}
            onChange={handleChange}
            name="spouseName"
            hint="Optional if unmarried"
            disabled={isVerified}
          />
        </div>

        {/* <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
          <Button
            type="button"
            variant="outline"
            leftIcon={<Save size={15} />}
            disabled={isSubmitting || isVerified}
            onClick={(e) => handleSubmit(e, false)}
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Saving Record..."
            rightIcon={<ArrowRight size={16}/>}
            disabled={isVerified}
          >
            Save &amp; Proceed to Step 2
          </Button>
        </div> */}
      </div>
    </div>
    </KycStepContainer>
  );
}