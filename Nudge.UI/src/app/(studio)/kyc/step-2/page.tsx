"use client";

import React from "react";
import { toast } from "@/lib/toast";
import Loading from "@/src/app/loading";
import { InputField } from "@/src/components/ui";
import { CheckCircle2, AlertCircle, UploadCloud, FileCheck } from "lucide-react";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import { useCreator } from "@/src/context/CreatorContext";
import { kycService } from "@/src/features/kyc/services/kyc.service";
import { creatorDocsSchema, creatorDocsProceedSchema } from "@/src/features/kyc/schemas/kyc.schemas";
import { CreatorDocsDTO } from "@/src/features/kyc/types/creator-docs.types";
import { useKycStep } from "@/src/features/kyc/hooks/useKycStep";

const INITIAL_FORM_DATA: CreatorDocsDTO = {
  citizenshipId: "",
  citizenshipIssuedDistrict: "",
  citizenshipIssuedDate: "",
  nid: null,
  passportId: null,
  passportExpiryDate: null,
  panNumber: null,
  avatarPhotoUrl: "",
  idFrontProofUrl: "",
  idBackProofUrl: "",
  panDocumentUrl: null,
};

export default function KycStepTwoPage() {
  const { summary, isLocked } = useCreator();
  const isVerified = summary?.isVerified ?? false;

  const { formData, setFormData, isLoading, isSubmitting, errorMsg, submit } = useKycStep<CreatorDocsDTO>({
    load: kycService.getCreatorDocs,
    save: (data) =>
      kycService.saveCreatorDocs({
        ...data,
        nid: data.nid?.trim() || null,
        passportId: data.passportId?.trim() || null,
        passportExpiryDate: data.passportExpiryDate?.trim() || null,
        panNumber: data.panNumber?.trim() || null,
        panDocumentUrl: data.panDocumentUrl?.trim() || null,
      }),
    initial: INITIAL_FORM_DATA,
    draftSchema: creatorDocsSchema,
    proceedSchema: creatorDocsProceedSchema,
    nextRoute: "/kyc/step-3",
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
      currentStep={2}
      isVerified={isVerified}
      isLocked={isLocked}
      bannerTitle="Inland Revenue Department &amp; NRB Compliance"
      bannerBadge="Income Tax Act 2058"
      bannerDescription="As per Nepal tax regulations, digital creators receiving tips, dakshina, and patronage are subject to a 1% advance Tax Deducted at Source (TDS). Your 9-digit PAN and Nepali Citizenship credentials must be verified before payouts can clear."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      backHref="/kyc/step-1"
      onSaveDraft={() => submit(undefined, false)}
      onSubmit={(e) => submit(e, true)}
    >
      <div className="space-y-6">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-error shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-6">
        <InputField
          label="Permanent Account Number (PAN)"
          isRequired
          disabled={isLocked}
          placeholder="e.g. 601234567"
          value={formData.panNumber || ""}
          onChange={(e) => {
            const clean = e.target.value.replace(/[^0-9]/g, "");
            setFormData((p) => ({ ...p, panNumber: clean }));
          }}
          name="panNumber"
          hint="Mandatory 9-digit IRD PAN registered under your legal name."
          rightIcon={(formData.panNumber?.length ?? 0) === 9 ? <CheckCircle2 size={16} className="text-tertiary" /> : undefined}
        />

          <InputField
            label="National Identity Card (NID)"
            placeholder="e.g. 123-456-7890"
            disabled={isLocked}
            value={formData.nid || ""}
            onChange={handleChange}
            name="nid"
            hint="Optional 10-digit biometric NID number."
          />
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Citizenship Certificate Number (नागरिकता नं.)"
            isRequired
            disabled={isLocked}
            placeholder="e.g. 27-01-75-01234"
            value={formData.citizenshipId}
            onChange={handleChange}
            name="citizenshipId"
            hint="As inscribed on your Nagarikta certificate."
            rightIcon={formData.citizenshipId.length > 4 ? <CheckCircle2 size={16} className="text-tertiary" /> : undefined}
          />

          <InputField
            label="Citizenship Issued District (जारी जिल्ला)"
            isRequired
            disabled={isLocked}
            placeholder="e.g. Kathmandu, Kaski, Morang"
            value={formData.citizenshipIssuedDistrict}
            onChange={handleChange}
            name="citizenshipIssuedDistrict"
            hint="District Administration Office (DAO)."
          />

          <InputField
            label="Citizenship Issue Date (जारी मिति)"
            isRequired
            disabled={isLocked}
            type="date"
            value={formData.citizenshipIssuedDate}
            onChange={handleChange}
            name="citizenshipIssuedDate"
            hint="Issue date in Gregorian (A.D.)."
          />
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="International Passport Number (राहदानी नं.)"
            placeholder="e.g. PA1234567"
            disabled={isLocked}
            value={formData.passportId || ""}
            onChange={handleChange}
            name="passportId"
            hint="Optional for creators on international tours."
          />

          <InputField
            label="Passport Expiry Date"
            type="date"
            disabled={isLocked}
            value={formData.passportExpiryDate || ""}
            onChange={handleChange}
            name="passportExpiryDate"
            hint="Leave blank if not applicable."
          />
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-on-surface mb-2">
            Verification Proofs &amp; Attachments
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Live Selfie Photo", key: "avatarPhotoUrl", status: formData.avatarPhotoUrl },
              { label: "Citizenship Front", key: "idFrontProofUrl", status: formData.idFrontProofUrl },
              { label: "Citizenship Back", key: "idBackProofUrl", status: formData.idBackProofUrl },
              { label: "PAN Document Card", key: "panDocumentUrl", status: formData.panDocumentUrl },
            ].map((doc) => (
              <div
                key={doc.key}
                onClick={() => toast.info("Document upload will be activated with media storage.")}
                className="p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant shrink-0">
                    <UploadCloud size={14} />
                  </div>
                  <span className="text-xs font-medium text-on-surface truncate">{doc.label}</span>
                </div>
                {doc.status ? (
                  <FileCheck size={14} className="text-tertiary shrink-0 ml-1" />
                ) : (
                  <span className="text-[10px] text-on-surface-variant font-medium shrink-0">Staged</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </KycStepContainer>
  );
}