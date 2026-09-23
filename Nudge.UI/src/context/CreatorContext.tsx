"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type KycStatus = "pending" | "verified" | "rejected";

export interface CreatorSummary {
  creatorId: number;
  userId: number;
  username: string;
  email: string | null;
  fullName: string | null;
  avatarPhotoUrl: string | null;

  // Granular step status from kyc.vw_creator_profile_summary
  isStep1Completed: boolean;
  isStep2Completed: boolean;
  isStep3Completed: boolean;
  isStep4Completed: boolean;

  // Progress metrics
  currentKycStep: number;
  kycCompletionPercentage: number;

  // Verification codes & compliance
  kycStatusCode: number; // 1 = verified, 2 = pending, 3 = rejected
  kycStatus: KycStatus;
  isVerified: boolean;
  rejectionReason: string | null;
  verifiedAt: string | null;

  // Studio notifications
  unreadNotificationsCount: number;
}

interface CreatorContextType {
  summary: CreatorSummary | null;
  isLoading: boolean;
  refreshSummary: () => Promise<void>;
  updateLocalKycProgress: (nextStep: number, percentage: number) => void;
}

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

// Normalizes PostgreSQL / ASP.NET casing quirks
function normalizeSummary(raw: any): CreatorSummary {
  // Check boolean flag first, fallback to numeric status code 1 (verified)
  const isVerified: boolean =
    raw.isVerified ??
    raw.is_verified ??
    (raw.kycStatusCode !== undefined ? raw.kycStatusCode === 1 : undefined) ??
    (raw.kycstatus_code !== undefined ? raw.kycstatus_code === 1 : undefined) ??
    false;

  const rawStatus = String(raw.kycStatus ?? raw.kyc_status ?? "pending").toLowerCase();
  const kycStatus: KycStatus =
    rawStatus === "verified" || isVerified
      ? "verified"
      : rawStatus === "rejected"
      ? "rejected"
      : "pending";

  return {
    creatorId: Number(raw.creatorId ?? raw.creatorid ?? 0),
    userId: Number(raw.userId ?? raw.userid ?? 0),
    username: String(raw.username ?? ""),
    email: raw.email ?? null,
    fullName: raw.fullName ?? raw.fullname ?? null,
    avatarPhotoUrl: raw.avatarPhotoUrl ?? raw.avatarphotourl ?? null,

    isStep1Completed: Boolean(raw.isStep1Completed ?? raw.is_step1_completed ?? false),
    isStep2Completed: Boolean(raw.isStep2Completed ?? raw.is_step2_completed ?? false),
    isStep3Completed: Boolean(raw.isStep3Completed ?? raw.is_step3_completed ?? false),
    isStep4Completed: Boolean(raw.isStep4Completed ?? raw.is_step4_completed ?? false),

    currentKycStep: Number(raw.currentKycStep ?? raw.current_kyc_step ?? 0),
    kycCompletionPercentage: Number(raw.kycCompletionPercentage ?? raw.kyc_completion_percentage ?? 0),

    kycStatusCode: Number(raw.kycStatusCode ?? raw.kycstatus_code ?? (isVerified ? 1 : 2)),
    kycStatus,
    isVerified,
    rejectionReason: raw.rejectionReason ?? raw.rejectionreason ?? null,
    verifiedAt: raw.verifiedAt ?? raw.verifiedat ?? null,

    unreadNotificationsCount: Number(raw.unreadNotificationsCount ?? raw.unread_notifications_count ?? 0),
  };
}

export function CreatorProvider({ children }: { children: React.ReactNode }) {
  const [summary, setSummary] = useState<CreatorSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch("/api/Creator/Summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        const raw = result.data || result;
        if (raw) {
          setSummary(normalizeSummary(raw));
        }
      } else {
        console.warn(`Failed to fetch creator summary (status: ${res.status})`);
      }
    } catch (err) {
      console.error("Error loading creator summary:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // Optimistic UI progress booster for multi-step transitions
  const updateLocalKycProgress = (nextStep: number, percentage: number) => {
    setSummary((prev) =>
      prev
        ? {
            ...prev,
            currentKycStep: Math.max(prev.currentKycStep, nextStep),
            kycCompletionPercentage: Math.max(
              prev.kycCompletionPercentage,
              percentage
            ),
          }
        : null
    );
  };

  return (
    <CreatorContext.Provider
      value={{
        summary,
        isLoading,
        refreshSummary: fetchSummary,
        updateLocalKycProgress,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
}

export function useCreator() {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error("useCreator must be used within a CreatorProvider");
  }
  return context;
}