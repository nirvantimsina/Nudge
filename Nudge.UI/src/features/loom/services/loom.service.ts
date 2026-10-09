// src/features/loom/services/loom.service.ts
import { serverApiClient } from "@/lib/api-client.server";
import { apiClient } from "@/lib/api-client";
import type { LoomProfileData } from "../types/loom.types";

export const loomService = {
  /**
   * Server-side fetch for SSR/RSC (e.g. /loom/[slug])
   * GET /api/Loom/LoomLinkData/:slug
   */
  getProfileBySlugServer: async (slug: string): Promise<LoomProfileData | null> => {
    try {
      return await serverApiClient.get<LoomProfileData>(`/Loom/LoomLinkData/${slug}`);
    } catch (error) {
      console.error(`[loomService.getProfileBySlugServer] Error fetching slug "${slug}":`, error);
      return null;
    }
  },

  /**
   * Client-side fetch for browser navigation
   * GET /api/Loom/LoomLinkData/:slug
   */
  getProfileBySlugClient: async (slug: string): Promise<LoomProfileData | null> => {
    try {
      return await apiClient.get<LoomProfileData>(`/Loom/LoomLinkData/${slug}`);
    } catch (error) {
      console.error(`[loomService.getProfileBySlugClient] Error fetching slug "${slug}":`, error);
      return null;
    }
  },
};
