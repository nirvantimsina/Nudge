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
import { Button, InputField, RadioGroup } from "@/src/components/ui";
import { convertAdToBs, convertBsToAd } from "@/lib/nepali-calendar";
import { KycStepper } from "@/src/components/kyc/KycStepper";

export default function KycStepOnePage() {
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent, proceedToStep2: boolean = false) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic validation
    if (
      !formData.fullName.trim() ||
      !formData.dobAD ||
      !formData.dobBS ||
      !formData.grandfatherName.trim() ||
      !formData.fatherName.trim() ||
      !formData.motherName.trim()
    ) {
      setErrorMsg("Please fill in all required fields marked with *.");
      return;
    }

    setIsSubmitting(true);

    const payload: CreatorInfoDTO = {
      ...formData,
      gender: Number(formData.gender),
      spouseName: formData.spouseName?.trim() || undefined,
    };

    try {
      await kycService.saveCreatorInfo(payload);
      setIsExistingRecord(true);

      if (proceedToStep2) {
        router.push("/kyc/step-2");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save verification details. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl w-full mx-auto px-4 lg:px-8 py-8">
      {/* Stepper Navigation */}
      <KycStepper currentStep={1} />

      {/* Compliance Callout Banner */}
      <div className="mb-8 p-5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0">
          <FileText size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-on-surface">Nepal Rastra Bank &amp; IRD Unified Directive</h3>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[9px] uppercase px-2 py-0.5 rounded">
              NRB Directive 2080
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            As per NRB digital wallet &amp; patronage guidelines, creators receiving direct patron funds via eSewa, Fonepay, or Khalti must maintain verified three-generation family lineage (<em>Teen Pustey Bibaran</em>) matching your Nepali Citizenship or National ID (Rastriya Parichayapatra).
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("Nagarik App QR Sync will open your camera scanner.")}
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container-lowest border border-primary text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold transition-all shadow-xs"
        >
          <QrCode size={15} />
          <span>Fetch from Nagarik App QR</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-error shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Surface */}
      <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
        <InputField
          label="Full Legal Name"
          isRequired
          placeholder="e.g. Aayush Shrestha (as on Citizenship / NID)"
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          hint="Must match your Nepali Citizenship Card character-for-character."
          rightIcon={formData.fullName.length > 3 ? <CheckCircle2 size={16} className="text-tertiary" /> : undefined}
        />

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-on-surface">
            Date of Birth (जन्म मिति) <span className="text-primary font-bold">*</span>
          </label>
          <NepaliDatePicker
            dobAD={formData.dobAD}
            dobBS={formData.dobBS}
            onDateChange={({ dobAD, dobBS }) => setFormData((prev) => ({ ...prev, dobAD, dobBS }))}
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
          />
          <InputField
            label="Father's Full Name (बुवाको नाम)"
            isRequired
            placeholder="Father's legal name"
            value={formData.fatherName}
            onChange={handleChange}
            name="fatherName"
            hint="Cross-checked with citizenship records."
          />
          <InputField
            label="Mother's Full Name (आमाको नाम)"
            isRequired
            placeholder="Mother's legal name"
            value={formData.motherName}
            onChange={handleChange}
            name="motherName"
          />
          <InputField
            label="Spouse's Full Name (पति / पत्नीको नाम)"
            placeholder="Leave blank if not applicable"
            value={formData.spouseName || ""}
            onChange={handleChange}
            name="spouseName"
            hint="Optional if unmarried"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
          <Button
            type="button"
            variant="outline"
            leftIcon={<Save size={15} />}
            disabled={isSubmitting}
            onClick={(e) => handleSubmit(e, false)}
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Saving Record..."
            rightIcon={<ArrowRight size={16} />}
          >
            Save &amp; Proceed to Step 2
          </Button>
        </div>
      </form>
    </div>
  );
}