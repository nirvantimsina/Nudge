"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type KycStatus = "pending" | "verified" | "rejected" | "submitted";

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
  kycStatusCode: number; // 1 = verified, 2 = pending, 4 = rejected, 5 = submitted
  kycStatus: KycStatus;
  isVerified: boolean;
  isSubmitted: boolean;
  isLocked: boolean; // Derived: true if verified OR submitted
  rejectionReason: string | null;
  verifiedAt: string | null;

  // Studio notifications
  unreadNotificationsCount: number;
}

interface CreatorContextType {
  summary: CreatorSummary | null;
  isLoading: boolean;
  isLocked: boolean; // Direct convenience access
  refreshSummary: () => Promise<void>;
  updateLocalKycProgress: (nextStep: number, percentage: number) => void;
}

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

function normalizeSummary(raw: any): CreatorSummary {
  const statusCode = Number(raw.kycStatusCode ?? raw.kycstatus_code ?? 2);

  // Status mapping
  const isVerified: boolean =
    raw.isVerified ??
    raw.is_verified ??
    statusCode === 1;

  const rawStatus = String(raw.kycStatus ?? raw.kyc_status ?? "").toLowerCase();

  let kycStatus: KycStatus = "pending";
  if (rawStatus === "verified" || statusCode === 1) {
    kycStatus = "verified";
  } else if (rawStatus === "submitted" || statusCode === 5) {
    kycStatus = "submitted";
  } else if (rawStatus === "rejected" || statusCode === 4) {
    kycStatus = "rejected";
  }

  const isSubmitted = kycStatus === "submitted" || statusCode === 5;
  
  // Forms lock down when submitted for review OR already approved
  const isLocked = isVerified || isSubmitted;

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

    kycStatusCode: statusCode,
    kycStatus,
    isVerified,
    isSubmitted,
    isLocked,
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
        isLocked: summary?.isLocked ?? false,
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
