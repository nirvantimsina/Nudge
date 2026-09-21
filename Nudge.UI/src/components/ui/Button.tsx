// src/components/ui/Button.tsx
"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "tonal";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition-all rounded-full select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-xs px-5 py-2.5 gap-2",
      lg: "text-sm px-7 py-3 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-primary text-on-primary hover:opacity-90 shadow-xs",
      secondary:
        "bg-secondary text-on-secondary hover:opacity-90 shadow-xs",
      tonal:
        "bg-primary-fixed/30 text-primary hover:bg-primary-fixed/50",
      outline:
        "border border-outline-variant text-on-surface bg-surface-container-lowest hover:bg-surface-container-low hover:border-outline",
      ghost:
        "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 relative animate-pulse">
              <Image
                src="/animation-logo.svg"
                alt="Loading"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";