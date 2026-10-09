"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Tv,
  Heart,
  Compass,
  Share2,
  Search,
  MessageSquare,
  Users,
  Video,
} from "lucide-react";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { onboardingService } from "@/src/features/onboarding/services/onboarding.service";
import { Button } from "@/src/components/ui/Button";

interface Step1Data {
  referralSource: string;
  otherReferralText: string;
}

interface Step2Data {
  intendedUse: string;
}

interface Step3Data {
  creatorSlug: string;
  creatorName: string;
  categoryId: number;
  bio: string;
}

const REFERRAL_OPTIONS = [
  { id: "tiktok", label: "TikTok / Instagram", icon: Video, desc: "Saw a video or reel" },
  { id: "youtube", label: "YouTube / Streamer", icon: Tv, desc: "Recommended on a stream" },
  { id: "friend", label: "Friend or Colleague", icon: Users, desc: "Personal referral" },
  { id: "twitter", label: "Twitter / X", icon: Share2, desc: "Saw a post or thread" },
  { id: "search", label: "Search Engine", icon: Search, desc: "Found on Google or web" },
  { id: "other", label: "Other Source", icon: MessageSquare, desc: "Community or event" },
];

const INTENT_OPTIONS = [
  {
    id: "creator_page",
    title: "Launch a Creator Page",
    desc: "Receive micro-nudges, stream tips, and set up my Nepali link-in-bio portal.",
    icon: Sparkles,
    badge: "Recommended for Creators",
  },
  {
    id: "donate_streamers",
    title: "Support Creators & Streamers",
    desc: "Tip streamers using Fonepay, eSewa, and Khalti with custom alerts.",
    icon: Heart,
    badge: "For Supporters",
  },
  {
    id: "exploring",
    title: "Just Exploring",
    desc: "Browse the community, view creator profiles, and check out the platform.",
    icon: Compass,
    badge: "Visitor",
  },
];

const CATEGORIES = [
  { id: 1, name: "Gaming & Esports" },
  { id: 2, name: "Tech & Software" },
  { id: 3, name: "Music & Performing Arts" },
  { id: 4, name: "Digital Art & Animation" },
  { id: 5, name: "Podcasts & Talk Shows" },
  { id: 6, name: "Education & Tutorials" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, refreshSession } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [step1, setStep1] = useState<Step1Data>({
    referralSource: "youtube",
    otherReferralText: "",
  });

  const [step2, setStep2] = useState<Step2Data>({
    intendedUse: "creator_page",
  });

  const [step3, setStep3] = useState<Step3Data>({
    creatorSlug: user?.userName || "",
    creatorName: user?.name || "",
    categoryId: 1,
    bio: "",
  });

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!step1.referralSource) {
        setError("Please choose how you discovered Nudge.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!step2.intendedUse) {
        setError("Please select how you plan to use Nudge.");
        return;
      }
      // If user chose creator page, proceed to creator profile setup
      if (step2.intendedUse === "creator_page") {
        setStep(3);
      } else {
        // Skip creator setup directly to submission
        handleSubmit();
      }
    } else if (step === 3) {
      if (!step3.creatorSlug.trim()) {
        setError("Creator handle is required.");
        return;
      }
      handleSubmit();
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onboardingService.submitOnboarding({
        referralSource: step1.referralSource,
        intendedUse: step2.intendedUse,
        otherReferralText:
          step1.referralSource === "other" ? step1.otherReferralText : undefined,
        creatorSlug:
          step2.intendedUse === "creator_page" ? step3.creatorSlug.trim() : undefined,
        creatorName:
          step2.intendedUse === "creator_page" ? step3.creatorName.trim() : undefined,
        categoryId:
          step2.intendedUse === "creator_page" ? step3.categoryId : undefined,
        bio: step2.intendedUse === "creator_page" ? step3.bio.trim() : undefined,
      });

      // Refresh authentication context so creatorId and isCreator update
      await refreshSession();

      setStep(4); // Success screen
    } catch (err: any) {
      setError(err?.message || "Failed to save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = step2.intendedUse === "creator_page" ? 3 : 2;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface text-on-surface p-4 sm:p-6 font-sans">
      <div className="w-full max-w-xl bg-surface-container-low border border-outline-variant/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Header / Brand */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-primary font-serif">
              Nudge
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Onboarding
            </span>
          </div>
          {step <= 3 && (
            <span className="text-xs font-bold text-outline">
              Step {step} of {totalSteps}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {step <= 3 && (
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* STEP 1: Discovery & Analytics */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                Where did you hear about Nudge?
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Help us understand how Nepali creators and patrons find us.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {REFERRAL_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = step1.referralSource === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setStep1((prev) => ({ ...prev, referralSource: item.id }))
                    }
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary/40"
                        : "border-outline-variant/60 bg-surface-container-lowest hover:border-outline text-on-surface"
                    }`}
                  >
                    <Icon size={18} className="mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {step1.referralSource === "other" && (
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-outline mb-1 uppercase tracking-wider">
                  Tell us where you discovered us
                </label>
                <input
                  type="text"
                  value={step1.otherReferralText}
                  onChange={(e) =>
                    setStep1((prev) => ({
                      ...prev,
                      otherReferralText: e.target.value,
                    }))
                  }
                  placeholder="e.g. Discord server, Twitch stream, podcast..."
                  className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs focus:outline-none focus:border-primary"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Intent & Features */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                What brings you to Nudge today?
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                We will personalize your dashboard based on what you need.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {INTENT_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = step2.intendedUse === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setStep2({ intendedUse: opt.id })
                    }
                    className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary/40"
                        : "border-outline-variant/60 bg-surface-container-lowest hover:border-outline text-on-surface"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${
                        isSelected
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-on-surface">
                          {opt.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container text-outline">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Creator Profile Creation */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                Set up your Creator Profile
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                We are creating your creator record so patrons can find and tip you.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              {/* Creator Handle */}
              <div>
                <label className="block text-[11px] font-bold text-outline mb-1 uppercase tracking-wider">
                  Creator Handle (Slug)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs text-outline font-semibold select-none">
                    nudge.np/@
                  </span>
                  <input
                    type="text"
                    value={step3.creatorSlug}
                    onChange={(e) =>
                      setStep3((prev) => ({
                        ...prev,
                        creatorSlug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                      }))
                    }
                    placeholder="yourhandle"
                    className="w-full pl-22 pr-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs font-semibold focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Display / Stage Name */}
              <div>
                <label className="block text-[11px] font-bold text-outline mb-1 uppercase tracking-wider">
                  Display / Stage Name
                </label>
                <input
                  type="text"
                  value={step3.creatorName}
                  onChange={(e) =>
                    setStep3((prev) => ({ ...prev, creatorName: e.target.value }))
                  }
                  placeholder="e.g. Saurav Nepali / Gaming Nepal"
                  className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-outline mb-1 uppercase tracking-wider">
                  Primary Category
                </label>
                <select
                  value={step3.categoryId}
                  onChange={(e) =>
                    setStep3((prev) => ({
                      ...prev,
                      categoryId: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs focus:outline-none focus:border-primary cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[11px] font-bold text-outline mb-1 uppercase tracking-wider">
                  Short Bio / Tagline
                </label>
                <textarea
                  rows={2}
                  value={step3.bio}
                  onChange={(e) =>
                    setStep3((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Creating weekly Nepali gaming tutorials and music live streams."
                  className="w-full px-3.5 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Success & Celebration */}
        {step === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                You’re all set!
              </h2>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-2">
                Your profile and preferences have been registered. Your dashboard is now
                initialized and ready for you.
              </p>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => router.push("/dashboard")}
                rightIcon={<ArrowRight size={16} />}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Actions Footer */}
        {step <= 3 && (
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-outline-variant/60">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 text-xs font-semibold text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              isLoading={isSubmitting}
              rightIcon={<ArrowRight size={14} />}
            >
              {step === totalSteps
                ? step2.intendedUse === "creator_page"
                  ? "Launch Creator Page"
                  : "Complete Setup"
                : "Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
