import { z } from "zod";

export const claimHandleSchema = z.object({
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters.")
    .max(30, "Handle cannot exceed 30 characters.")
    .regex(/^[a-z0-9_-]+$/, "Handle may only contain lowercase letters, numbers, hyphens, and underscores.")
    .refine((val) => !["admin", "root", "nudge", "api", "auth", "support"].includes(val), {
      message: "This handle is reserved by the platform.",
    }),
});

export type ClaimHandleInput = z.infer<typeof claimHandleSchema>;
