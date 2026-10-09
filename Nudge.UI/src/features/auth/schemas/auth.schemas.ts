import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(30, "Username cannot exceed 30 characters.")
      .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores, and hyphens are allowed."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
