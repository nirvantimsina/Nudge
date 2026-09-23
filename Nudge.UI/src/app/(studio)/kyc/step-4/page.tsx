"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import { toast } from "@/lib/toast";
import Loading from "@/src/app/loading";
import { InputField } from "@/src/components/ui";
import {
  Landmark,
  Wallet,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
  Building2,
  CreditCard,
  PhoneCall,
  FileCheck2,
} from "lucide-react";

// NRB Licensed Category A & B Banks in Nepal
const NEPAL_BANKS = [
  "Nabil Bank Limited",
  "Global IME Bank Limited",
  "Nepal Investment Mega Bank (NIMB)",
  "NIC Asia Bank Limited",
  "Sanima Bank Limited",
  "Siddhartha Bank Limited",
  "Standard Chartered Bank Nepal",
  "Himalayan Bank Limited",
  "Everest Bank Limited",
  "Kumari Bank Limited",
  "Laxmi Sunrise Bank Limited",
  "Prabhu Bank Limited",
  "Prime Commercial Bank Limited",
  "Rastriya Banijya Bank (RBB)",
  "Nepal Bank Limited (NBL)",
  "Agricultural Development Bank (ADBL)",
  "Garima Bikas Bank Limited",
  "Muktinath Bikas Bank Limited",
  "Kamana Sewa Bikas Bank",
  "Shine Resunga Development Bank",
  "Jyoti Bikas Bank Limited",
  "Mahalaxmi Bikas Bank Limited",
];

const WALLET_PROVIDERS = [
  { id: "esewa", label: "eSewa Mobile Wallet", icon: "🟢" },
  { id: "khalti", label: "Khalti Digital Wallet", icon: "🟣" },
  { id: "imepay", label: "IME Pay", icon: "🔴" },
];

interface PayoutFormData {
  payoutMethod: "bank" | "wallet";
  bankName: string;
  bankBranch: string;
  bankAccountNumber: string;
  bankAccountName: string;
  walletProvider: string;
  walletId: string;
}

export default function KycStepFourPage() {
  const router = useRouter();
  const { summary, refreshSummary } = useCreator();
  const isVerified = summary?.isVerified ?? false;

  const [formData, setFormData] = useState<PayoutFormData>({
    payoutMethod: "bank",
    bankName: "",
    bankBranch: "",
    bankAccountNumber: "",
    bankAccountName: summary?.fullName || "",
    walletProvider: "esewa",
    walletId: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Hydrate saved record on mount
  useEffect(() => {
    let isMounted = true;

    async function loadPayoutData() {
      try {
        const res = await fetch("/api/kyc/creatorpayout", {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });

        if (res.ok) {
          const raw = await res.json();
          const d = raw.data || raw;

          if (d && isMounted) {
            setFormData({
              payoutMethod: d.walletId || d.walletid ? "wallet" : "bank",
              bankName: d.bankName ?? d.bankname ?? "",
              bankBranch: d.bankBranch ?? d.bankbranch ?? "",
              bankAccountNumber: d.bankAccountNumber ?? d.bankaccountnumber ?? "",
              bankAccountName: d.bankAccountName ?? d.bankaccountname ?? summary?.fullName ?? "",
              walletProvider: d.walletProvider ?? d.walletprovider ?? "esewa",
              walletId: d.walletId ?? d.walletid ?? "",
            });
          }
        }
      } catch (err) {
        console.warn("Could not fetch existing payout configuration:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPayoutData();

    return () => {
      isMounted = false;
    };
  }, [summary?.fullName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWalletIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numeric inputs for mobile wallet identifiers
    const numeric = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, walletId: numeric }));
  };

  const handleSubmit = async (e?: React.FormEvent, isFinalSubmit: boolean = false) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (isFinalSubmit) {
      if (formData.payoutMethod === "bank") {
        if (
          !formData.bankName.trim() ||
          !formData.bankBranch.trim() ||
          !formData.bankAccountNumber.trim() ||
          !formData.bankAccountName.trim()
        ) {
          toast.error("Please fill in all mandatory bank clearance details.");
          return;
        }
      } else {
        if (!formData.walletProvider || !formData.walletId) {
          toast.error("Please provide your digital wallet phone number.");
          return;
        }
        if (formData.walletId.length !== 10 || !formData.walletId.startsWith("9")) {
          toast.error("Enter a valid 10-digit Nepali mobile number (starting with 98/97).");
          return;
        }
      }
    } else {
      // Lenient Draft Rule
      if (
        formData.payoutMethod === "bank" &&
        !formData.bankAccountNumber.trim() &&
        !formData.bankName.trim()
      ) {
        toast.error("Please enter at least a Bank Name or Account Number to save a draft.");
        return;
      }
      if (formData.payoutMethod === "wallet" && !formData.walletId.trim()) {
        toast.error("Please enter your Wallet Mobile ID to save a draft.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        bankName: formData.payoutMethod === "bank" ? formData.bankName.trim() : null,
        bankBranch: formData.payoutMethod === "bank" ? formData.bankBranch.trim() : null,
        bankAccountNumber: formData.payoutMethod === "bank" ? formData.bankAccountNumber.trim() : null,
        bankAccountName: formData.payoutMethod === "bank" ? formData.bankAccountName.trim() : null,
        walletProvider: formData.payoutMethod === "wallet" ? formData.walletProvider : null,
        walletId: formData.payoutMethod === "wallet" ? formData.walletId.trim() : null,
      };

      const res = await fetch("/api/kyc/creatorpayout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      const isSuccess =
        res.ok &&
        (result.status === 0 ||
          result.status === "0" ||
          result.status === true ||
          result.statusCode === 200);

      if (!isSuccess) {
        throw new Error(result.message || result.msg || "Failed to save payout routing.");
      }

      await refreshSummary();

      if (isFinalSubmit) {
        toast.success("Payout clearance configured & KYC submitted!");
        router.push("/studio");
      } else {
        toast.success("Payout draft saved.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving. Please try again.");
      toast.error(err.message || "Failed to save payout configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KycStepContainer
      currentStep={4}
      isVerified={isVerified}
      bannerTitle="Nepal Rastra Bank Payment Systems Directives (PSO/PSP)"
      bannerBadge="Automated Tip & Payout Settlements"
      bannerDescription="Direct deposit settlements are executed via NCHL (connectIPS) and licensed PSP wallet networks. To prevent money laundering and fraudulent withdrawals, account names must match your Citizenship record."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      backHref="/kyc/step-3"
      nextLabel="Submit Application for Review"
      onSaveDraft={() => handleSubmit(undefined, false)}
      onSubmit={(e) => handleSubmit(e, true)}
    >
      {/* Target Table Footprint Banner */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/60">
        <span className="font-semibold">RTGS &amp; NCHL ConnectIPS Clearance</span>
        <code className="text-primary font-bold text-[11px]">
          Target: transaction.tblcreatorpayout
        </code>
      </div>

      {/* Payment Channel Selector */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-primary" />
            <h2 className="text-sm font-bold text-on-surface">
              Select Primary Settlement Channel (भुक्तानी माध्यम)
            </h2>
          </div>
          <span className="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
            NRB Approved Rails
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bank Option */}
          <button
            type="button"
            disabled={isVerified}
            onClick={() => setFormData((p) => ({ ...p, payoutMethod: "bank" }))}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
              formData.payoutMethod === "bank"
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-outline-variant/70 hover:border-primary/40 bg-surface-container-lowest"
            } ${isVerified ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
              <Landmark size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span>Commercial Bank (Direct Deposit)</span>
                {formData.payoutMethod === "bank" && (
                  <CheckCircle2 size={14} className="text-primary" />
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                ConnectIPS / NCHL batch transfer directly to your Class A/B Nepali bank account. Suitable for payouts exceeding NPR 50,000.
              </p>
            </div>
          </button>

          {/* Wallet Option */}
          <button
            type="button"
            disabled={isVerified}
            onClick={() => setFormData((p) => ({ ...p, payoutMethod: "wallet" }))}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
              formData.payoutMethod === "wallet"
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-outline-variant/70 hover:border-primary/40 bg-surface-container-lowest"
            } ${isVerified ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
              <Wallet size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span>Digital Wallet (eSewa / Khalti / IME Pay)</span>
                {formData.payoutMethod === "wallet" && (
                  <CheckCircle2 size={14} className="text-primary" />
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Instant tip disbursements straight to your mobile wallet. Minimum withdrawal: NPR 500.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Channel Form Fields */}
      {formData.payoutMethod === "bank" ? (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-3">
            <Building2 size={18} className="text-primary" />
            <h3 className="text-sm font-bold text-on-surface">
              Commercial Bank Account Details (बैंक खाता विवरण)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bank Name Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface flex justify-between">
                <span>Bank Name (बैंकको नाम) *</span>
                <span className="text-[10px] text-outline">Class A / B</span>
              </label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                disabled={isVerified}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">Select Financial Institution...</option>
                {NEPAL_BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Name */}
            <InputField
              label="Branch Name (शाखा)"
              isRequired
              placeholder="e.g. New Road, Putalisadak, Biratnagar"
              value={formData.bankBranch}
              onChange={handleChange}
              name="bankBranch"
              hint="Branch office where your account was inaugurated."
            />

            {/* Account Number */}
            <InputField
              label="Account Number (खाता नम्बर)"
              isRequired
              placeholder="e.g. 012010000012345"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              name="bankAccountNumber"
              hint="Triple-check numbers to avoid NCHL return penalties."
            />

            {/* Account Holder Name */}
            <div className="space-y-1">
              <InputField
                label="Account Holder Name (खातावालाको नाम)"
                isRequired
                placeholder="e.g. RAM BAHADUR THAPA"
                value={formData.bankAccountName}
                onChange={handleChange}
                name="bankAccountName"
                hint="Must match your citizenship certificate name."
              />
              {summary?.fullName && formData.bankAccountName.toLowerCase() !== summary.fullName.toLowerCase() && (
                <span className="text-[10px] text-amber-500 font-medium block">
                  Warning: Name differs from Step 1 full name ({summary.fullName}). Review may be delayed.
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs mt-2">
            <FileCheck2 size={15} className="text-secondary shrink-0" />
            <span>Nudge automatically verifies account legitimacy via IPS inter-bank name inquiry before transfer.</span>
          </div>
        </div>
      ) : (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-3">
            <Wallet size={18} className="text-primary" />
            <h3 className="text-sm font-bold text-on-surface">
              Digital Wallet Configuration (वालेट विवरण)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Wallet Provider Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface flex justify-between">
                <span>Wallet Provider *</span>
                <span className="text-[10px] text-outline">NRB Licensed PSP</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {WALLET_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    disabled={isVerified}
                    onClick={() => setFormData((p) => ({ ...p, walletProvider: provider.id }))}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      formData.walletProvider === provider.id
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
                    } ${isVerified ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <span>{provider.icon}</span>
                    <span>{provider.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet Mobile Number */}
            <div className="space-y-1">
              <InputField
                label="Registered Mobile Number (eSewa / Khalti ID)"
                isRequired
                placeholder="98XXXXXXXX"
                value={formData.walletId}
                onChange={handleWalletIdChange}
                name="walletId"
                hint="Your 10-digit mobile number linked with your digital wallet."
                rightIcon={
                  formData.walletId.length === 10 ? (
                    <CheckCircle2 size={16} className="text-tertiary" />
                  ) : undefined
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs mt-2">
            <PhoneCall size={15} className="text-secondary shrink-0" />
            <span>Ensure your wallet account is KYC-verified by the provider to receive payouts above NPR 5,000.</span>
          </div>
        </div>
      )}

      {/* Compliance Notice */}
      <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-low flex items-start gap-3">
        <HelpCircle size={16} className="text-outline shrink-0 mt-0.5" />
        <div className="text-xs text-on-surface-variant space-y-1 leading-relaxed">
          <p className="font-semibold text-on-surface">Payout Cadence &amp; TDS Statement</p>
          <p>
            Creator revenues and tips are disbursed on the 1st and 15th of each Nepali solar month (Bikram Sambat). A 1% Advance Withholding Tax (TDS) is automatically credited to your IRD PAN record mapped in Step 2.
          </p>
        </div>
      </div>
    </KycStepContainer>
  );
}