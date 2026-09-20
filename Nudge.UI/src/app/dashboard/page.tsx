// src/app/dashboard/page.tsx
"use client";

import React from "react";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";
import { useRouter } from "next/navigation";

// Modular Components
import { StudioSidebar } from "@/src/components/dashboard/StudioSidebar";
import { StudioHeader } from "@/src/components/dashboard/StudioHeader";
import { KycActionBanner } from "@/src/components/dashboard/KycActionBanner";
import { VerificationChecklist } from "@/src/components/dashboard/VerificationChecklist";
import { PayoutProgressMetrics } from "@/src/components/dashboard/PayoutProgressMetrics";
import { NudgeVolumeGrowth } from "@/src/components/dashboard/NudgeVolumeGrowth";
import { TopContributorsCard } from "@/src/components/dashboard/TopContributorsCard";
import { LiveNudgesFeed } from "@/src/components/dashboard/LiveNudgesFeed";
import { StreamUtilitiesHub } from "@/src/components/dashboard/StreamUtilitiesHub";
import { BankSettlementCard } from "@/src/components/dashboard/BankSettlementCard";
import { DashboardFooter } from "@/src/components/dashboard/DashboardFooter";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  const scrollToVerification = () => {
    document.getElementById("verification-steps-card")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col lg:flex-row selection:bg-primary-fixed selection:text-primary">
      {/* 1. Modern Left Sidebar Rail */}
      <StudioSidebar user={user} onVerifyClick={scrollToVerification} />

      {/* 2. Main Body Column (Header + Canvas + Footer) */}
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader user={user} onLogout={handleLogout} />

        <main className="flex-1 pb-16 bg-mandala-texture">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-6 space-y-6">
            {/* Kyc Dismissible Warning */}
            <KycActionBanner onScrollToChecklist={scrollToVerification} />

            {/* Himalayan Creator Verification Checklist */}
            <VerificationChecklist currentStepId={3} />

            {/* Income & Payout Progress Metrics */}
            <PayoutProgressMetrics
              grossDakshina={48250}
              lockedBalance={48250}
              isKycPending={true}
              activeSubscribers={42}
            />

            {/* Asymmetric Bento Split (7 Cols / 5 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Feed & Analytics (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <NudgeVolumeGrowth />
                <LiveNudgesFeed />
              </div>

              {/* Right Utilities & Top Contributors (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <TopContributorsCard />
                <StreamUtilitiesHub userName={user?.userName || "creator"} />
                <BankSettlementCard />
              </div>
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}