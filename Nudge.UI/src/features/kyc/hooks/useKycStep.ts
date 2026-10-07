// src/features/kyc/hooks/useKycStep.ts
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { useCreator } from "@/src/context/CreatorContext";
import { ZodType } from "zod";

interface UseKycStepOptions<T> {
  load: () => Promise<T | null>;
  save: (data: T) => Promise<void>;
  initial: T;
  draftSchema: ZodType<T>;
  proceedSchema: ZodType<T>;
  nextRoute?: string;
}

export function useKycStep<T>({ load, save, initial, draftSchema, proceedSchema, nextRoute }: UseKycStepOptions<T>) {
  const router = useRouter();
  const { refreshSummary } = useCreator();

  const [formData, setFormData] = useState<T>(initial);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    load()
      .then((data) => {
        if (data && isMounted) setFormData({ ...initial, ...data });
      })
      .catch((err) => console.warn("No existing record:", err))
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  // useKycStep.ts
const submit = useCallback(
  async (e: React.SubmitEvent<HTMLFormElement> | undefined, proceeding: boolean) => {
    e?.preventDefault();
      setErrorMsg(null);

      const schema = proceeding ? proceedSchema : draftSchema;
      const result = schema.safeParse(formData);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message ?? "Please check the form for errors.");
        return;
      }

      setIsSubmitting(true);
      try {
        await save(formData);
        await refreshSummary();
        toast.success(proceeding ? "Saved!" : "Draft saved.");
        if (proceeding && nextRoute) router.push(nextRoute);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to save. Please try again.";
        setErrorMsg(message);
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, save, proceedSchema, draftSchema, nextRoute] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return { formData, setFormData, isLoading, isSubmitting, errorMsg, submit };
}