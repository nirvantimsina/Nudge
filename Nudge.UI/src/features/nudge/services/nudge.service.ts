import { apiClient } from "@/lib/api-client";
import type { CreateNudgePayload, CreateNudgeResult, NudgeCreator } from "../models/nudge.model";

export const nudgeService = {
  /** GET /api/nudge/preview-creators — rotating set shown in the hero widget */
  getPreviewCreators: () => apiClient.get<NudgeCreator[]>("/nudge/preview-creators"),

  /** GET /api/creators/{slug}/nudge-profile — used on a creator's own page */
  getCreatorNudgeProfile: (slug: string) =>
    apiClient.get<NudgeCreator>(`/creators/${slug}/nudge-profile`),

  /** POST /api/nudge — sends a nudge; backend returns a payment redirect URL */
  createNudge: (payload: CreateNudgePayload) => apiClient.post<CreateNudgePayload, CreateNudgeResult>("/nudge", payload),
};
