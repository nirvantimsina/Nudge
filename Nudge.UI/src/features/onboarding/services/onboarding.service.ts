// src/features/onboarding/services/onboarding.service.ts
import { apiClient } from "@/lib/api-client";
import type {
  OnboardingSubmission,
  OnboardingResult,
  OnboardingStatus,
  CreatorRegistrationRequest,
  CreatorRegistrationResult,
} from "../types/onboarding.types";

export const onboardingService = {
  submitOnboarding: async (data: OnboardingSubmission): Promise<OnboardingResult> => {
    return await apiClient.post<OnboardingSubmission, OnboardingResult>("/api/onboarding", data);
  },

  getStatus: async (): Promise<OnboardingStatus> => {
    return await apiClient.get<OnboardingStatus>("/api/onboarding");
  },

  registerCreator: async (
    data: CreatorRegistrationRequest
  ): Promise<CreatorRegistrationResult> => {
    return await apiClient.post<CreatorRegistrationRequest, CreatorRegistrationResult>(
      "/api/creator/register",
      data
    );
  },
};
