export interface NudgeFeedItem {
  id: string;
  senderName: string;
  amountNpr: number;
  message?: string;
  paymentRail: "Fonepay" | "eSewa" | "Khalti" | "ConnectIPS" | "Stripe";
  tierBadge?: string;
  timestamp: string;
}

export interface Contributor {
  id: string;
  name: string;
  amount: number;
  nudgeCount: number;
  tierName?: string;
  avatarText: string;
}

export type ContributorFilter = "daily" | "weekly" | "monthly";

export interface PayoutProgressMetricsProps {
  grossDakshina?: number;
  lockedBalance?: number;
  isKycPending?: boolean;
  diasporaEarningsAud?: number;
  activeSubscribers?: number;
  goalTitle?: string;
  goalCurrent?: number;
  goalTarget?: number;
}

export interface BankSettlementCardProps {
  bankName?: string;
  accountEnding?: string;
  isAutoPayoutEnabled?: boolean;
}
