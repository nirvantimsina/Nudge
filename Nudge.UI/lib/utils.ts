import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicting utility classes.
 * Requires `clsx` and `tailwind-merge` as dependencies.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
