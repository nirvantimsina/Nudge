"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiServerError } from "@/lib/api-client";
import type { NudgeCreator } from "../models/nudge.model";
import { nudgeService } from "../services/nudge.service";

interface Selection {
  /** id of the selected preset tier, or null when a custom amount is active */
  tierId: string | null;
  customAmount: number;
}

interface UseNudgePreviewResult {
  creator: NudgeCreator | null;
  creators: NudgeCreator[];
  activeIndex: number;
  isLoading: boolean;
  error: string | null;
  selection: Selection;
  selectedAmount: number;
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  selectTier: (tierId: string) => void;
  selectCustom: (amount: number) => void;
}

const DEFAULT_CUSTOM_AMOUNT = 1500;

/**
 * Drives the rotating "Live Creator Nudge Preview" hero widget: loads a
 * handful of creators, tracks which one is active, and tracks the
 * currently selected tier (or custom amount) for that creator.
 */
export function useNudgePreview(): UseNudgePreviewResult {
  const [creators, setCreators] = useState<NudgeCreator[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectionByCreator, setSelectionByCreator] = useState<Record<string, Selection>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await nudgeService.getPreviewCreators();
        if (cancelled) return;
        setCreators(data);
        setSelectionByCreator(
          Object.fromEntries(
            data.map((c) => [c.id, { tierId: c.tiers[0]?.id ?? null, customAmount: DEFAULT_CUSTOM_AMOUNT }])
          )
        );
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiServerError ? err.message : "Couldn't load creators right now.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const creator = creators[activeIndex] ?? null;
  const selection: Selection = (creator && selectionByCreator[creator.id]) ?? {
    tierId: null,
    customAmount: DEFAULT_CUSTOM_AMOUNT,
  };

  const selectedAmount = useMemo(() => {
    if (!creator) return 0;
    if (selection.tierId) {
      return creator.tiers.find((t) => t.id === selection.tierId)?.amount ?? 0;
    }
    return selection.customAmount;
  }, [creator, selection]);

  const goTo = useCallback(
    (index: number) => {
      if (creators.length === 0) return;
      setActiveIndex(((index % creators.length) + creators.length) % creators.length);
    },
    [creators.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const selectTier = useCallback(
    (tierId: string) => {
      if (!creator) return;
      setSelectionByCreator((prev) => ({
        ...prev,
        [creator.id]: { ...prev[creator.id], tierId },
      }));
    },
    [creator]
  );

  const selectCustom = useCallback(
    (amount: number) => {
      if (!creator) return;
      setSelectionByCreator((prev) => ({
        ...prev,
        [creator.id]: { tierId: null, customAmount: amount },
      }));
    },
    [creator]
  );

  return {
    creator,
    creators,
    activeIndex,
    isLoading,
    error,
    selection,
    selectedAmount,
    goNext,
    goPrev,
    goTo,
    selectTier,
    selectCustom,
  };
}
