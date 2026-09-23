// src/components/ui/InputField.tsx
"use client";

import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hint,
      error,
      isRequired = false,
      leftIcon,
      rightIcon,
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-on-surface"
          >
            {label} {isRequired && <span className="text-primary font-bold">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-on-surface-variant pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-surface-container-lowest border rounded-xl text-xs text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:outline-none ${
              leftIcon ? "pl-9" : "px-3.5"
            } ${rightIcon ? "pr-9" : "px-3.5"} py-2.5 ${
              error
                ? "border-error focus:ring-1 focus:ring-error"
                : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-on-surface-variant flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Dynamic validation/hint rendering */}
        {error ? (
          <div className="flex items-center gap-1 text-xs text-error mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </div>
        ) : hint ? (
          <p className="text-xs text-on-surface-variant/70 mt-1 pl-1">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";
