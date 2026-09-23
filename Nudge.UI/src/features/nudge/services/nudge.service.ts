import { apiClient } from "@/lib/api-client";
import type { CreateNudgePayload, CreateNudgeResult, NudgeCreator } from "../models/nudge.model";

export const nudgeService = {
  getPreviewCreators: async (): Promise<NudgeCreator[]> => {
    const res = await apiClient.get<any>("/PublicAPI/CreatorCard/admin-nudge");

    let creator: NudgeCreator | null = null;

    if (res && typeof res === "object") {
      if ("data" in res && res.data && typeof res.data === "object" && "id" in res.data) {
        creator = res.data as NudgeCreator;
      } else if ("id" in res) {
        creator = res as NudgeCreator;
      }
    }

    return creator ? [creator] : [];
  },

  getCreatorNudgeProfile: async (slug: string): Promise<NudgeCreator> => {
    const res = await apiClient.get<any>(`/creators/${slug}/nudge-profile`);
    return (res?.data ?? res) as NudgeCreator;
  },

  createNudge: (payload: CreateNudgePayload) =>
    apiClient.post<CreateNudgePayload, CreateNudgeResult>("/nudge", payload),
};