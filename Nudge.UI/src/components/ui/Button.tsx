// src/components/ui/Button.tsx
"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "tint"
  | "ghost"
  | "tonal";

export type ButtonSize = "sm" | "md" | "lg" | "icon";
export type ButtonShape = "rounded" | "pill";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      shape = "rounded",
      fullWidth = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] font-label-md";

    const shapeStyle = shape === "pill" ? "rounded-full" : "";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary-container text-on-primary hover:bg-primary shadow-xs hover:shadow-sm active:bg-primary",
      secondary:
        "bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed-dim shadow-xs active:bg-secondary-fixed-dim",
      outline:
        "bg-surface-container-lowest border border-outline-variant text-on-surface hover:border-primary hover:text-primary active:bg-surface-container",
      tint:
        "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 active:bg-primary/20",
      ghost:
        "bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container active:bg-surface-container-high",
      tonal:
        "bg-primary-fixed/30 text-primary hover:bg-primary-fixed/50",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: shape === "pill" ? "text-xs py-1.5 px-3.5 rounded-full gap-1.5 h-8" : "text-xs py-1.5 px-3 rounded-lg gap-1.5 h-8",
      md: shape === "pill" ? "text-xs sm:text-sm py-2 px-5 rounded-full gap-2 h-10" : "text-xs sm:text-sm py-2 px-4 rounded-xl gap-2 h-10",
      lg: shape === "pill" ? "text-sm sm:text-base py-3 px-7 rounded-full gap-2.5 h-12" : "text-sm sm:text-base py-3 px-6 rounded-xl gap-2.5 h-12",
      icon: "p-2 rounded-full w-9 h-9",
    };

    const widthClass = fullWidth ? "w-full" : "w-auto";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyle} ${shapeStyle} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`.trim()}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin shrink-0" size={size === "sm" ? 14 : 16} />
            <span>{loadingText || "Processing…"}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
