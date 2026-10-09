import { z } from "zod";

export const createNudgeSchema = z.object({
  creatorId: z.string().min(1, "Creator ID is required."),
  tierId: z.string().optional(),
  amount: z
    .number()
    .min(10, "Minimum support amount is रु 10.")
    .max(500000, "Maximum single transaction limit is रु 5,00,000.")
    .optional(),
  displayName: z
    .string()
    .max(50, "Name cannot exceed 50 characters.")
    .optional(),
  message: z
    .string()
    .max(280, "Message cannot exceed 280 characters.")
    .optional(),
});

export type CreateNudgeInput = z.infer<typeof createNudgeSchema>;
