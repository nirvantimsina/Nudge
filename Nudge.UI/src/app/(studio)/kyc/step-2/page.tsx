// src/app/(studio)/kyc/step-2/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { KycStepper } from "@/src/components/kyc/KycStepper";
import Loading from "@/src/app/loading";
import { Button, InputField } from "@/src/components/ui";
import {
  FileText,
  Save,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileCheck,
} from "lucide-react";

export default function KycStepTwoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    citizenshipId: "",
    citizenshipIssuedDistrict: "",
    citizenshipIssuedDate: "",
    nid: "",
    passportId: "",
    passportExpiryDate: "",
    panNumber: "",
    avatarPhotoUrl: "",
    idFrontProofUrl: "",
    idBackProofUrl: "",
    panDocumentUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Hydrate existing Step 2 data
  useEffect(() => {
    let isMounted = true;

    const fetchExistingData = async () => {
      try {
        const res = await fetch("/api/KYC/CreatorDocs", {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });

        if (!res.ok) return;

        const raw = await res.json();
        const d = raw.data || raw;

        if (d && isMounted) {
          setFormData({
            citizenshipId: d.citizenshipId ?? d.citizenshipid ?? "",
            citizenshipIssuedDistrict:
              d.citizenshipIssuedDistrict ?? d.citizenshipissueddistrict ?? "",
            citizenshipIssuedDate: d.citizenshipIssuedDate
              ? String(d.citizenshipIssuedDate).split("T")[0]
              : d.citizenshipissueddate
              ? String(d.citizenshipissueddate).split("T")[0]
              : "",
            nid: d.nid ?? "",
            passportId: d.passportId ?? d.passportid ?? "",
            passportExpiryDate: d.passportExpiryDate
              ? String(d.passportExpiryDate).split("T")[0]
              : d.passportexpirydate
              ? String(d.passportexpirydate).split("T")[0]
              : "",
            panNumber: d.panNumber ?? d.pannumber ?? "",
            avatarPhotoUrl: d.avatarPhotoUrl ?? d.avatarphotourl ?? "",
            idFrontProofUrl: d.idFrontProofUrl ?? d.idfrontproofurl ?? "",
            idBackProofUrl: d.idBackProofUrl ?? d.idbackproofurl ?? "",
            panDocumentUrl: d.panDocumentUrl ?? d.pandocumenturl ?? "",
          });
        }
      } catch (err) {
        console.warn("No existing Step 2 record found:", err);
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

  const handleSubmit = async (e: React.FormEvent, proceedToStep3: boolean = false) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPan = formData.panNumber.replace(/[^0-9]/g, "");

    if (
      !cleanPan ||
      cleanPan.length !== 9 ||
      !formData.citizenshipId.trim() ||
      !formData.citizenshipIssuedDistrict.trim() ||
      !formData.citizenshipIssuedDate
    ) {
      setErrorMsg("Please fill in all mandatory fields marked with * (9-digit PAN and Citizenship details).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/KYC/CreatorDocs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          citizenshipId: formData.citizenshipId.trim(),
          citizenshipIssuedDistrict: formData.citizenshipIssuedDistrict.trim(),
          citizenshipIssuedDate: formData.citizenshipIssuedDate || null,
          nid: formData.nid?.trim() || null,
          passportId: formData.passportId?.trim() || null,
          passportExpiryDate: formData.passportExpiryDate || null,
          panNumber: cleanPan,
          avatarPhotoUrl: formData.avatarPhotoUrl || null,
          idFrontProofUrl: formData.idFrontProofUrl || null,
          idBackProofUrl: formData.idBackProofUrl || null,
          panDocumentUrl: formData.panDocumentUrl || null,
        }),
      });

      const result = await res.json();
      const isSuccess =
        res.ok &&
        (result.status === 0 ||
          result.status === "0" ||
          result.status === 1 ||
          result.status === "1" ||
          result.status === true ||
          result.statusCode === 200);

      if (isSuccess) {
        toast.success(proceedToStep3 ? "Legal documents saved!" : "Draft saved successfully.");
        if (proceedToStep3) {
          router.push("/kyc/step-3");
        }
      } else {
        setErrorMsg(result.msg || "Failed to save verification documents.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Connection error. Please try again.");
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
      <KycStepper currentStep={2} />

      {/* Compliance Callout Banner (Matching Step 1 exactly) */}
      <div className="mb-8 p-5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0">
          <FileText size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-on-surface">Inland Revenue Department &amp; NRB Compliance</h3>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[9px] uppercase px-2 py-0.5 rounded">
              Income Tax Act 2058
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            As per Nepal tax regulations, digital creators receiving tips, dakshina, and patronage are subject to a 1% advance Tax Deducted at Source (TDS). Your 9-digit PAN and Nepali Citizenship credentials must be verified before payouts can clear.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-error shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Surface (Exact same sleek input fields & layout as Step 1) */}
      <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Permanent Account Number (PAN)"
            isRequired
            placeholder="e.g. 601234567"
            value={formData.panNumber}
            onChange={(e) => {
              const clean = e.target.value.replace(/[^0-9]/g, "");
              setFormData((p) => ({ ...p, panNumber: clean }));
            }}
            name="panNumber"
            hint="Mandatory 9-digit IRD PAN registered under your legal name."
            rightIcon={formData.panNumber.length === 9 ? <CheckCircle2 size={16} className="text-tertiary" /> : undefined}
          />

          <InputField
            label="National Identity Card (NID)"
            placeholder="e.g. 123-456-7890"
            value={formData.nid}
            onChange={handleChange}
            name="nid"
            hint="Optional 10-digit biometric NID number."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Citizenship Certificate Number (नागरिकता नं.)"
            isRequired
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
            placeholder="e.g. Kathmandu, Kaski, Morang"
            value={formData.citizenshipIssuedDistrict}
            onChange={handleChange}
            name="citizenshipIssuedDistrict"
            hint="District Administration Office (DAO)."
          />

          <InputField
            label="Citizenship Issue Date (जारी मिति)"
            isRequired
            type="date"
            value={formData.citizenshipIssuedDate}
            onChange={handleChange}
            name="citizenshipIssuedDate"
            hint="Issue date in Gregorian (A.D.)."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="International Passport Number (राहदानी नं.)"
            placeholder="e.g. PA1234567"
            value={formData.passportId}
            onChange={handleChange}
            name="passportId"
            hint="Optional for creators on international tours."
          />

          <InputField
            label="Passport Expiry Date"
            type="date"
            value={formData.passportExpiryDate}
            onChange={handleChange}
            name="passportExpiryDate"
            hint="Leave blank if not applicable."
          />
        </div>

        {/* Lightweight Document Upload Placeholders (Clean & Compact) */}
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

        {/* Footer Actions (Exact same Button components as Step 1) */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              leftIcon={<ArrowLeft size={15} />}
              disabled={isSubmitting}
              onClick={() => router.push("/kyc/step-1")}
            >
              Back to Step 1
            </Button>
            <Button
              type="button"
              variant="outline"
              leftIcon={<Save size={15} />}
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e, false)}
            >
              Save Draft
            </Button>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Saving Documents..."
            rightIcon={<ArrowRight size={16} />}
          >
            Save &amp; Proceed to Step 3
          </Button>
        </div>
      </form>
    </div>
  );
}