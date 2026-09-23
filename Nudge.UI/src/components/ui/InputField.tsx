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
      disabled = false,
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
            <div
              className={`absolute left-3 pointer-events-none transition-colors ${
                disabled ? "text-on-surface-variant/40" : "text-on-surface-variant"
              }`}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full rounded-xl text-xs transition-all placeholder:text-on-surface-variant/50 focus:outline-none ${
              leftIcon ? "pl-9" : "px-3.5"
            } ${rightIcon ? "pr-9" : "px-3.5"} py-2.5 ${
              disabled
                ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed select-none focus:ring-0 focus:border-outline-variant/60 shadow-none"
                : error
                ? "bg-surface-container-lowest border border-error text-on-surface focus:ring-1 focus:ring-error shadow-xs"
                : "bg-surface-container-lowest border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div
              className={`absolute right-3 flex items-center pointer-events-none transition-colors ${
                disabled ? "text-on-surface-variant/40" : "text-on-surface-variant"
              }`}
            >
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
