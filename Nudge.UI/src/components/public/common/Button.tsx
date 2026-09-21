import React from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"        // Main terracotta CTA (bg-primary-container hover:bg-primary)
  | "secondary"      // Amber / action CTA (bg-secondary-container hover:bg-secondary-fixed-dim)
  | "outline"        // Border outline on surface
  | "tint"           // Soft primary tint (bg-primary/10 text-primary)
  | "ghost";         // Borderless hoverable button

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none font-label-md";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary-container text-on-primary hover:bg-primary shadow-sm hover:shadow active:bg-primary",
    secondary:
      "bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed-dim shadow-sm active:bg-secondary-fixed-dim",
    outline:
      "bg-surface-container-lowest border border-outline-variant text-on-surface hover:border-primary hover:text-primary active:bg-surface-container",
    tint:
      "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 active:bg-primary/20",
    ghost:
      "bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container active:bg-surface-container-high",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "text-xs py-1.5 px-3 rounded-lg gap-1.5 h-8",
    md: "text-xs sm:text-sm py-2 px-4 rounded-xl gap-2 h-10",
    lg: "text-sm sm:text-base py-3 px-6 rounded-xl gap-2.5 h-12",
    icon: "p-2 rounded-full w-9 h-9",
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin text-current" />
          <span>{loadingText || "Processing…"}</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span className="truncate">{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}