// src/app/(studio)/dashboard/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";

// Modular Dashboard Components
import { KycActionBanner } from "@/src/components/dashboard/KycActionBanner";
import { VerificationChecklist } from "@/src/components/dashboard/VerificationChecklist";
import { PayoutProgressMetrics } from "@/src/components/dashboard/PayoutProgressMetrics";
import { NudgeVolumeGrowth } from "@/src/components/dashboard/NudgeVolumeGrowth";
import { TopContributorsCard } from "@/src/components/dashboard/TopContributorsCard";
import { LiveNudgesFeed } from "@/src/components/dashboard/LiveNudgesFeed";
import { StreamUtilitiesHub } from "@/src/components/dashboard/StreamUtilitiesHub";
import { BankSettlementCard } from "@/src/components/dashboard/BankSettlementCard";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleStartKyc = () => {
    router.push("/kyc/step-1");
  };

  const isKycPending = !user?.isKycVerified;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-6 space-y-6">
      {/* 1. Dismissible KYC Notification Banner (Shown when unverified) */}
      {isKycPending && (
        <KycActionBanner
          grossAmountNpr={48250}
          currentStep={1}
          totalSteps={4}
          onScrollToChecklist={handleStartKyc}
        />
      )}

      {/* 2. Himalayan Creator Verification Stepper / Checklist */}
      <VerificationChecklist currentStepId={user?.isKycVerified ? 5 : 1} />

      {/* 3. Payout Progress & Financial Health Metrics */}
      <PayoutProgressMetrics
        grossDakshina={48250}
        lockedBalance={48250}
        isKycPending={isKycPending}
        diasporaEarningsAud={420}
        activeSubscribers={42}
        goalTitle="Mustang Winter Expedition 4K Lens"
        goalCurrent={48250}
        goalTarget={75000}
      />

      {/* 4. Asymmetric Bento Split (7 Columns Feed & Analytics / 5 Columns Stream Hub) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols = ~58% width on Desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <NudgeVolumeGrowth />
          <LiveNudgesFeed />
        </div>

        {/* Right Column (5 Cols = ~42% width on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <TopContributorsCard />
          <StreamUtilitiesHub userName={user?.userName || "creator"} />
          <BankSettlementCard />
        </div>
      </div>
    </div>
  );
}