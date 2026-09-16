import { apiClient } from "@/src/lib/api-client";
import type { CreatorCategory, CreatorListResponse } from "../models/creator.model";

export const creatorService = {
  /**
   * GET /api/creators/featured?category=music
   * Backend should treat "all" the same as an omitted category filter.
   */
  getFeaturedCreators: (category: CreatorCategory = "all") =>
    apiClient.get<CreatorListResponse>("/PublicAPI/FeaturedCreators", {
      params: { category: category === "all" ? undefined : category },
    }),
};
