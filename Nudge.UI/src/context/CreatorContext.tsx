"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface CreatorSummary {
  creatorId: number;
  userId: number;
  username: string;
  email: string | null;
  fullName: string | null;
  avatarPhotoUrl: string | null;
  currentKycStep: number;
  kycCompletionPercentage: number;
  kycStatus: "draft" | "in_review" | "verified" | "rejected";
  unreadNotificationsCount: number;
}

interface CreatorContextType {
  summary: CreatorSummary | null;
  isLoading: boolean;
  refreshSummary: () => Promise<void>;
  updateLocalKycProgress: (nextStep: number, percentage: number) => void;
}

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

export function CreatorProvider({ children }: { children: React.ReactNode }) {
  const [summary, setSummary] = useState<CreatorSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch("/api/Creator/Summary", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const result = await res.json();
        const data = result.data || result;
        setSummary(data);
      }
    } catch (err) {
      console.error("Failed to load creator summary:", err);
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
            kycCompletionPercentage: Math.max(prev.kycCompletionPercentage, percentage),
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