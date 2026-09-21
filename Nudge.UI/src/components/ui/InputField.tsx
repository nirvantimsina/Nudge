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

        {error ? (
          <p className="text-[11px] text-error flex items-center gap-1 mt-1">
            <AlertCircle size={13} className="shrink-0" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p className="text-[11px] text-on-surface-variant mt-1">{hint}</p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";