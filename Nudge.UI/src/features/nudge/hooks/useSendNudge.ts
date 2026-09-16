"use client";

import { useCallback, useState } from "react";
import { ApiServerError } from "@/src/lib/api-client";
import type { CreateNudgePayload, CreateNudgeResult } from "../models/nudge.model";
import { nudgeService } from "../services/nudge.service";

interface UseSendNudgeResult {
  sendNudge: (payload: CreateNudgePayload) => Promise<CreateNudgeResult | null>;
  isSending: boolean;
  error: string | null;
}

/** Submits a nudge and redirects to the returned payment URL on success. */
export function useSendNudge(): UseSendNudgeResult {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendNudge = useCallback(async (payload: CreateNudgePayload) => {
    setIsSending(true);
    setError(null);
    try {
      const result = await nudgeService.createNudge(payload);
      return result;
    } catch (err) {
      setError(err instanceof ApiServerError ? err.message : "Couldn't send that nudge. Please try again.");
      return null;
    } finally {
      setIsSending(false);
    }
  }, []);

  return { sendNudge, isSending, error };
}
