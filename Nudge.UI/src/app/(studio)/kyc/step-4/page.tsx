"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import { toast } from "@/lib/toast";
import Loading from "@/src/app/loading";
import { InputField } from "@/src/components/ui";
import {
  Globe,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

// SVG brand icons matching standard 24x24 Lucide icon dimensions
const YoutubeIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 6.33 6.31 6.33 6.33 0 0 0 6.33-6.31V8.6a8.28 8.28 0 0 0 4.84 1.54v-3.4a4.85 4.85 0 0 1-.91-.05z" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitchIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
  </svg>
);

const PLATFORMS = [
  { id: "YouTube", label: "YouTube", icon: YoutubeIcon, placeholder: "https://youtube.com/@yourchannel" },
  { id: "Instagram", label: "Instagram", icon: InstagramIcon, placeholder: "https://instagram.com/yourhandle" },
  { id: "TikTok", label: "TikTok", icon: TikTokIcon, placeholder: "https://tiktok.com/@yourhandle" },
  { id: "Facebook", label: "Facebook Page", icon: FacebookIcon, placeholder: "https://facebook.com/yourpage" },
  { id: "Twitch", label: "Twitch", icon: TwitchIcon, placeholder: "https://twitch.tv/yourhandle" },
  { id: "Website", label: "Personal Portfolio", icon: Globe, placeholder: "https://yourdomain.com" },
];

const INCOME_BRACKETS = [
  { value: "Under NPR 200,000", label: "Under NPR 2 Lakhs / yr (Casual Creator)" },
  { value: "NPR 200,000 - 500,000", label: "NPR 2 - 5 Lakhs / yr (Emerging Creator)" },
  { value: "NPR 500,000 - 1,500,000", label: "NPR 5 - 15 Lakhs / yr (Mid-tier Creator)" },
  { value: "Above NPR 1,500,000", label: "Above NPR 15 Lakhs / yr (Professional Studio)" },
];

export default function KycStepFourPage() {
  const router = useRouter();
  const { summary, isLocked, refreshSummary } = useCreator();
  const isVerified = summary?.isVerified ?? false;

  const [formData, setFormData] = useState({
    primaryPlatform: "YouTube",
    channelUrl: "",
    estimatedAnnualIncome: "NPR 200,000 - 500,000",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchExistingVerification() {
      try {
        const res = await fetch("/api/KYC/CreatorVerification", {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });

        if (!res.ok || res.status === 204) return;

        const raw = await res.json();
        const d = raw.data || raw;

        if (d && isMounted) {
          setFormData({
            primaryPlatform: d.primaryPlatform ?? d.primaryplatform,
            channelUrl: d.channelUrl ?? d.channelurl ?? "",
            estimatedAnnualIncome: d.estimatedAnnualIncome ?? d.estimatedannualincome,
          });
        }
      } catch (err) {
        console.warn("No existing verification record:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchExistingVerification();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedPlatform = PLATFORMS.find((p) => p.id === formData.primaryPlatform) || PLATFORMS[0];

  const handleSubmit = async (e?: React.FormEvent, isFinalSubmit: boolean = false) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (isFinalSubmit) {
      if (!formData.primaryPlatform.trim() || !formData.channelUrl.trim()) {
        toast.error("Please provide your primary creator channel/profile URL.");
        return;
      }
      try {
        new URL(formData.channelUrl.trim());
      } catch {
        toast.error("Please enter a valid URL (including https://).");
        return;
      }
    } else {
      if (!formData.channelUrl.trim()) {
        toast.error("Please enter a Channel URL to save a draft.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/KYC/CreatorVerification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          primaryPlatform: formData.primaryPlatform.trim(),
          channelUrl: formData.channelUrl.trim(),
          estimatedAnnualIncome: formData.estimatedAnnualIncome,
        }),
      });

      const rawText = await res.text();
      let resData: any = {};
      if (rawText && rawText.trim()) {
        try {
          resData = JSON.parse(rawText);
        } catch {
          resData = { msg: rawText };
        }
      }

      const isSuccess =
        res.ok &&
        (resData.status === 0 || resData.status === "0" || resData.statusCode === 200);

      if (!isSuccess) {
        throw new Error(resData.msg || resData.message || "Failed to submit verification request.");
      }

      await refreshSummary();

      if (isFinalSubmit) {
        toast.success("KYC submission complete! Your profile is under review.");
        router.push("/studio");
      } else {
        toast.success("Verification details saved as draft.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Connection error. Please try again.");
      toast.error(err.message || "Failed to submit verification details.");
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
      isLocked={isLocked}
      bannerTitle="Creator Platform & Revenue Verification"
      bannerBadge="Audience Legitimacy & AML Compliance"
      bannerDescription="Provide your primary digital broadcast channel. Nudge compliance reviews subscriber authenticity, public activity, and platform credentials before granting full creator status."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      backHref="/kyc/step-3"
      nextLabel="Submit Full KYC for Review"
      onSaveDraft={() => handleSubmit(undefined, false)}
      onSubmit={(e) => handleSubmit(e, true)}
    >
      {/* 1. Primary Platform Selection */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            <h2 className="text-sm font-bold text-on-surface">
              Primary Channel or Broadcast Platform *
            </h2>
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
                } ${isVerified ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <Icon size={20} />
                <span className="text-xs font-semibold">{platform.label}</span>
              </button>
            );
          })}
        </div>

        {/* Channel / Profile Link */}
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
            rightIcon={
              formData.channelUrl.startsWith("http") ? (
                <ExternalLink size={16} className="text-tertiary" />
              ) : undefined
            }
          />
        </div>
      </div>

      {/* 2. Projected Annual Creator Revenue */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="text-sm font-bold text-on-surface">
              Estimated Annual Revenue &amp; Sponsorships (अपेक्षित आम्दानी)
            </h3>
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
                } ${isVerified ? "opacity-60 cursor-not-allowed" : ""}`}
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
