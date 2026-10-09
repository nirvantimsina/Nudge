// src/features/onboarding/types/onboarding.types.ts

export type ReferralOption =
  | "tiktok"
  | "youtube"
  | "friend"
  | "search"
  | "twitter"
  | "instagram"
  | "other";

export type IntendedUseOption =
  | "creator_page"
  | "donate_streamers"
  | "exploring"
  | "other";

export interface OnboardingSubmission {
  referralSource: string;
  intendedUse: string;
  otherReferralText?: string;
  creatorSlug?: string;
  creatorName?: string;
  categoryId?: number;
  bio?: string;
}

export interface OnboardingResult {
  onboardingId: number;
  creatorId: number;
  isCreator: boolean;
  creatorSlug?: string;
  message: string;
}

export interface OnboardingStatus {
  hasCompletedOnboarding: boolean;
  isCreator: boolean;
  creatorId: number;
}

export interface CreatorRegistrationRequest {
  slug: string;
  name: string;
  categoryId?: number;
  bio?: string;
  description?: string;
}

export interface CreatorRegistrationResult {
  creatorId: number;
  slug: string;
  name: string;
}
