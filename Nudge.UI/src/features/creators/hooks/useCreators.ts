"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiServerError } from "@/src/lib/api-client";
import type { Creator, CreatorCategory } from "../models/creator.model";
import { creatorService } from "../services/creator.service";

interface UseCreatorsResult {
  creators: Creator[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches featured creators for a given category and keeps loading/error state.
 * Re-fetches automatically whenever `category` changes.
 */
export function useCreators(category: CreatorCategory = "all"): UseCreatorsResult {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await creatorService.getFeaturedCreators(category);
      setCreators(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof ApiServerError ? err.message : "Couldn't load creators. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchCreators();
  }, [fetchCreators]);

  return { creators, isLoading, error, refetch: fetchCreators };
}
